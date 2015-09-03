// ==UserScript==
// @name         Imageholics
// @namespace    http://initiumlab.com/
// @version      0.3
// @description  Awesome experience for image-aholics
// @author       Pili Hu @ Initium Lab
// @match        https://theinitium.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/freewall/1.0.5/freewall.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sugar/1.4.1/sugar-full.min.js
// ==/UserScript==

var addAltToImage = function(jqFigure){
    // jqFigure: a jQuery object pointing to <figure>
    var image = jqFigure.find('img')
    var caption = jqFigure.find('figcaption')
    var text = ''
    if (caption.length > 0){
        text = caption.text().trim()
    } else {
        text = jqFigure.text().trim()
    }
    image.attr('alt', text)
}

var processFigure = function(jqFigure){
    var oldFigure = jqFigure
    var newFigure = oldFigure.clone()
    addAltToImage(newFigure)
    addAltToImage(oldFigure)
    
    newFigure.find('img').css('max-width', '100%')
    
    newFigure
    .css('max-width', '200px')
    .css('margin', '0.5em')
    .css('display', 'inline-block')
    //.css('max-height', '200px')
    
    newFigure.click(function(){
        $('html, body').animate({
            scrollTop: oldFigure.offset().top
        }, 800)
    })

    newFigure.css('cursor', 'pointer')
    newFigure.hover(function() {
        newFigure.addClass('enlarge')
    }, function() {
        newFigure.removeClass('enlarge')
    })
    
    return newFigure
}

$(function(){
    var stylesheet = document.styleSheets[0]
    var globalStyles = [
        '.enlarge:hover{transform:scale(1.2,1.2); transform-origin:50% 50%;}'
    ]
    for (var i=0; i < globalStyles.length; i++){
        stylesheet.insertRule(globalStyles[i])
    }
    
    var figures = $('figure.image')
    var figures = figures.map(function(){
        var oldFigure = $(this)
        var newFigure = processFigure(oldFigure)
        return newFigure
    })
    
    console.log(figures)
    var article = $('article')
    var list = $('<div id="freewall">')
    list.css('max-width', '100%')
    for (var i=0; i < figures.length; i++){
        var li = $('<div class="brick">').append(figures[i])
        li.css('display', 'inline')
        list.append(li)
    }
    var awesomeBar = $('<div id="awesome-bar">')
    awesomeBar.append(list)
    awesomeBar
    //.css('width', '800px')
    //.css('height', '1000px')
    .css('margin-bottom', '3em')
    .css('margin-top', '3em')
    awesomeBar.insertAfter(article.find('h1'))
    var wall = new freewall('#freewall')  
    wall.reset({
        selector: '.brick',
        animate: true,
        cellW: 200,
        cellH: 'auto',
        onResize: function() {
            console.log('on resize')
            wall.fitWidth()
        }
    });
    //awesomeBar.width('700px')
    window.setTimeout(function(){
        console.log('delayed fit width')
        wall.fitWidth()
    }, 200)
    window.setTimeout(function(){
        console.log('delayed fit width')
        wall.fitWidth()
    }, 400)
    awesomeBar.find('img').load(function(){
        console.log('load image; fit width')
        wall.fitWidth()
    })
})
