// ==UserScript==
// @name         Imageholics
// @namespace    http://initiumlab.com/
// @version      0.2
// @description  enter something useful
// @author       You
// @match        https://theinitium.com/*
// @grant        none
// ==/UserScript==

$(function(){
    var awesomeBar = $('<div>')
    var images = $('figure.image')
    images.map(function(){
        $(this).find('img').css('max-width', '100%')
        $(this)
        .css('max-width', '200px')
        .css('display', 'inline-block')
            //.css('max-height', '200px')
    })
    console.log(images)
    var article = $('article')
    var list = $('<ul>')
    list.css('max-width', '100%')
    for (var i=0; i < images.length; i++){
        var li = $('<li>').append(images[i])
        li.css('display', 'inline')
        list.append(li)
    }
    awesomeBar.append(list)
    awesomeBar.insertAfter(article.find('h1'))
})
