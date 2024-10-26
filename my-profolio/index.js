"use strict";

async function getRandomData(){
    try {
        const userNameElement = document.getElementById("RandomData");
        const response = await fetch("https://randomuser.me/api/?results=3&nat=US");

        // statusCheck
        if (!response.ok) {
            throw new Error(await response.text());        
        }

        const data = await response.json();
        const users = data.results;

        const user1 = `${users[0].name.first}`;
        const user1_gender =  `${users[0].gender}`;
        const  user1_place = `${users[0].location.state}`;
      
        const user2 = `${users[1].name.first}`;
        const user2_gender =  `${users[1].gender}`;
        const  user2_place = `${users[1].location.state}`;

        const user3 = `${users[2].name.first}`;
        const user3_gender =  `${users[2].gender}`;
        const  user3_place = `${users[2].location.state}`;
         // non trivial element
        const newH4 = document.createElement("h4");

         // non trivial element
        newH4.textContent = user1 + ', ' + user1_gender + " live in " + user1_place + 
            " ----- " + user2 + ', ' + user2_gender + " live in " + user2_place + " ----- " +
            user3 + ', ' + user3_gender + " live in " + user3_place;
        
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
            resolve();
        }, 5000); 
    });
}




