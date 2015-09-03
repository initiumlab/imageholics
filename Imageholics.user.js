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

// Treat this as your global CSS.
// Put one rule per line.
var globalStyles = [
    '.enlarge:hover{transform:scale(1.2,1.2); transform-origin:50% 50%;}'
]
var stylesheet = document.styleSheets[0]
for (var i=0; i < globalStyles.length; i++){
    stylesheet.insertRule(globalStyles[i])
}

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

var buildFreeWall = function(jqFreeWall){
    // jqFreeWall: A jQuery object pointing to freewall object.
    //             The id is usually "#freewall"
    var wall = new freewall(jqFreeWall)
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
    window.setTimeout(function(){
        console.log('delayed fit width')
        wall.fitWidth()
    }, 200)
    window.setTimeout(function(){
        console.log('delayed fit width')
        wall.fitWidth()
    }, 400)
    jqFreeWall.find('img').load(function(){
        console.log('load image; fit width')
        wall.fitWidth()
    })
}

$(function(){    
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
    
    figures.map(function(){
        var li = $('<div class="brick">').append($(this))
        li.css('display', 'inline')
        return li
    }).appendTo(list)
    
    var awesomeBar = $('<div id="awesome-bar">')
    awesomeBar.append(list)
    awesomeBar
    .css('margin-bottom', '2em')
    .css('margin-top', '2em')
    awesomeBar.insertAfter(article.find('h1'))
    
    buildFreeWall(awesomeBar.find('#freewall'))
})
