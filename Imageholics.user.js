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
    var images = $('figure img')
    images.map(function(){
        $(this).css('max-height', '200px').css('max-width', '100%')
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
    article.before(list)
})
