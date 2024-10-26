"use strict";

/*

  Name: Nguyen Giang
  Date: Oct 26, 2024
  This is the index.html page for my portfolio of web development work.
 */

function setDarkMode(){
    const element = document.getElementById("ThinkOutSide");
    element.classList.toggle("addBorder");
}

const myButton = document.getElementById("myButton");
myButton.onclick = setDarkMode;