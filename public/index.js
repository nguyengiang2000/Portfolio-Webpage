"use strict";

/*
  Name: Nguyen Giang
  Date: Oct 26, 2024
  This is the index.js page for my portfolio of web development work.
 */

 
window.addEventListener('load', function() {
   /**
    * Toggles the border on the element with the ID "ThinkOutSide".
    * This function retrieves the element by its ID and toggles the "addBorder" class,
    * which can be used to apply or remove a border through CSS.
    */
    function setBorderMode() {
        const element = document.getElementById("ThinkOutSide");
        element.classList.toggle("addBorder");
    }

    const myButton = document.getElementById("myButton");
    myButton.onclick = setBorderMode;
});
