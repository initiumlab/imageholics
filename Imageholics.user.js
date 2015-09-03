// ==UserScript==
// @name         Imageholics
// @namespace    http://initiumlab.com/
// @version      0.4
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
    '#awesome-bar .enlarge:hover{transform:scale(1.1,1.1); transform-origin:50% 50%;}',
    '#awesome-bar .enlarge:hover{cursor: pointer}',
    '#awesome-bar .enlarge:hover{border: solid 1px #31AFBE}',
    '#awesome-bar .enlarge:hover{background-color: white}',
    '#awesome-bar .enlarge:hover{padding: 1.5px}',
    '#awesome-bar .enlarge:hover{z-index: 10 !important}',
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

var processFigure = function(){
    var oldFigure = $(this)
    var newFigure = oldFigure.clone()
    addAltToImage(newFigure)
    addAltToImage(oldFigure)
    
    oldFigure.find('figcaption').append(
        $('<a>')
        .text('Back to AwesomeBar')
        .css('margin-left', '1em')
        .css('padding-left', '1em')
        .css('padding-right', '1em')
        .css('cursor', 'pointer')
        .click(function(){
            $('html, body').animate({
                scrollTop: $('#awesome-bar').offset().top - 30
            }, 800)
        })
    )
    
    newFigure.find('img').css('max-width', '100%')
    
    newFigure
    .css('max-width', '200px')
    .css('margin', '0.5em')
    .css('display', 'inline-block')
    
    newFigure.click(function(){
        $('html, body').animate({
            scrollTop: oldFigure.offset().top - 20
        }, 800)
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
    return wall
}

var main = function(){
    var figures = $('figure.image').map(processFigure)
    
    var list = $('<div id="freewall">').css('max-width', '100%')
    
    figures.map(function(){
        var li = $('<div class="brick">').append($(this))
        li.css('display', 'inline')
        li.hover(function() {
            li.addClass('enlarge')
        }, function() {
            li.removeClass('enlarge')
        })
        return li
    }).appendTo(list)
    
    var awesomeBar = $('<div id="awesome-bar">')
    .append(list)
    .css('margin-bottom', '2em')
    .css('margin-top', '2em')
    .insertAfter($('article h1'))
    
    buildFreeWall(awesomeBar.find('#freewall'))
}

$(function(){
    main()
})
