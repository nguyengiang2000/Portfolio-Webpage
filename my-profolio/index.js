"use strict";

/*
  Name: Nguyen Giang
  Date: Oct 26, 2024
  This is the index.js page for my portfolio of web development work.
 */

window.addEventListener('load', function() {
    function setBorderMode() {
        const element = document.getElementById("ThinkOutSide");
        element.classList.toggle("addBorder");
    }

    const myButton = document.getElementById("myButton");
    myButton.onclick = setBorderMode;
});
