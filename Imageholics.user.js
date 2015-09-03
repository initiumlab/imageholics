// ==UserScript==
// @name         Imageholics
// @namespace    http://initiumlab.com/
// @version      0.2
// @description  enter something useful
// @author       You
// @match        https://theinitium.com/*
// @grant        none
// @require      https://raw.githubusercontent.com/kombai/freewall/master/freewall.min.js
// ==/UserScript==

$(function(){
    var images = $('figure.image')
    var images = images.map(function(){
        var oldFigure = $(this)
        var newFigure = oldFigure.clone()
        newFigure.find('img').css('max-width', '100%')
        newFigure
        .css('max-width', '200px')
        .css('display', 'inline-block')
            //.css('max-height', '200px')
        newFigure.click(function(){
            $('html, body').animate({
                scrollTop: oldFigure.offset().top
            }, 800);
        })
        //newFigure.addClass('brick')
        newFigure.find('figcaption').hide()
        return newFigure
    })
    console.log(images)
    var article = $('article')
    var list = $('<div id="freewall">')
    list.css('max-width', '100%')
    for (var i=0; i < images.length; i++){
        var li = $('<div class="brick">').append(images[i])
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
    }, 500)
})
