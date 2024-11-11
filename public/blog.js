"use strict";

/*
  Name: Nguyen Giang
  Date: Oct 26, 2024
  This is the blog.js page for my portfolio of web development work.
 */

window.addEventListener('load', function() {
    /**
 * Fetches random user data from the Random User API and displays it.
 * This function uses the "RandomData" element to display the user's name, gender, location, and avatar.
 * If the API call is successful, the data is appended as an `h4` element and an `img` element in the "creativeBox" container.
 *
 * @async
 * @function getRandomData
 * @throws {Error} Logs any error that occurs during the API call or data processing.
 */
    async function getRandomData() {
        try {
            const userNameElement = document.getElementById("RandomData");
            const response = await fetch("https://randomuser.me/api/?results=1&nat=US");

            // statusCheck
            await statusCheck(response);

            const data = await response.json();
            const users = data.results;

            const user1 = `${users[0].name.first}`;
            const user1_gender = `${users[0].gender}`;
            const user1_place = `${users[0].location.state}`;
            const user1_avatar = `${users[0].picture.large}`;


            // non-trivial element
            const newH4 = document.createElement("h4");
            const newImg = document.createElement("img");

            // non-trivial element
            newImg.src = user1_avatar;
            newH4.textContent = user1 + ', (' + user1_gender + ") lives in " + user1_place;


            // non-trivial element
            document.getElementById("creativeBox").appendChild(newH4);
            document.getElementById("creativeBox").appendChild(newImg);


        } catch (error) {
            console.error(error);
        }
    }

/**
 * Removes all `h4` and `img` elements from the "creativeBox" container.
 * This function is called when user data needs to be cleared from the container.
 *
 * @function deleteButton
 */ 

    function deleteButton() {
        const followerDiv = document.getElementById("creativeBox");
        const h4Elements = followerDiv.querySelectorAll("h4"); 
        const imgElements = followerDiv.querySelectorAll("img"); 


        h4Elements.forEach(h4 => {
            h4.remove();
        });

        imgElements.forEach(img => {
            img.remove();
        });
    }
        
    // second async / promised
/**
 * Deletes all content from "creativeBox" after a delay, with user confirmation via alert.
 * This function calls `deleteButton` to remove elements and `deleteNotify` to confirm deletion.
 *
 * @function deleteContent
 */    
    function deleteContent() {
        return new Promise((resolve) => {
            alert("All characters will be removed. Please wait for a while!");
            setTimeout(() => {
                deleteButton(); 
                deleteNotify();
                resolve();
            }, 2000); 
        });
    }
    
/**
 * Deletes all content from "creativeBox" after a delay, with user confirmation via alert.
 * This function calls `deleteButton` to remove elements and `deleteNotify` to confirm deletion.
 *
 * @function deleteNotify
 */ 
    // third async / promised
    function deleteNotify() {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert("All characters have been removed successfully!");
                resolve();
            }, 500); 
        });
    }

/**
 * Checks if the API response is valid.
 * Throws an error if the response is not OK, including the response text as the error message.
 *
 * @async
 * @function statusCheck
 * @param {Response} res - The fetch API response object to check.
 * @throws {Error} Throws an error if the response status is not OK.
 */
    async function statusCheck(res){
        if(!res.ok){
            throw new Error(await res.text());
        }
        return res;
    }

    const fetchDataButton = document.getElementById("generateButton");
    const deleteDataButton = document.getElementById("deleteButton");

    fetchDataButton.onclick = getRandomData;
    deleteDataButton.onclick = deleteContent;
});
