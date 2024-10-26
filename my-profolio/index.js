"use strict";

async function getRandomData(){
    try {
        const userNameElement = document.getElementById("RandomData");
        const response = await fetch("https://randomuser.me/api/?results=1&nat=US");

        // statusCheck
        if (!response.ok) {
            throw new Error(await response.text());        
        }

        const data = await response.json();
        const users = data.results;

        const user1 = `${users[0].name.first}`;
        const user1_gender =  `${users[0].gender}`;
        const  user1_place = `${users[0].location.state}`;
      
         // non trivial element
        const newH4 = document.createElement("h4");

         // non trivial element
        newH4.textContent = user1 + ', (' + user1_gender + ") live in " + user1_place;
        
        // non trivial element
        document.getElementById("follower").appendChild(newH4);

    } catch (error) {
        console.error(error);
    }
}

function deleteButton() {
    const followerDiv = document.getElementById("follower");
    const h4Elements = followerDiv.querySelectorAll("h4"); 

    h4Elements.forEach(h4 => {
        h4.remove();
    });

}
    
// second async / promised
function deleteContent() {
    return new Promise((resolve) => {
        alert("All characters will be removed. Please wait for awhile !");
        setTimeout(() => {
            deleteButton(); 
            deleteNotify();
            resolve();
        }, 5000); 
    });
}

// third async / promised
function deleteNotify() {
    return new Promise((resolve) => {
        setTimeout(() => {
            alert("All characters have been removed successfully!");
            resolve();
        }, 500); 
    });
}



const fetchDataButton = document.getElementById("generateButton");
const deleteDataButton = document.getElementById("deleteButton");


fetchDataButton.addEventListener("click", getRandomData);


deleteDataButton.addEventListener("click", deleteContent);