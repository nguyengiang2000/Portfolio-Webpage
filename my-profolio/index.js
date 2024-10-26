

async function getRandomData(){
    try {
        const userNameElement = document.getElementById("RandomData");
            const response = await fetch("https://randomuser.me/api/?results=3&nat=US");

        if (!response.ok) {
            throw new Error("Failed to fetch data!");
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
        
        userNameElement.textContent = user1 + ', ' + user1_gender + " live in " + user1_place + 
        " ----- " + user2 + ', ' + user2_gender + " live in " + user2_place + " ----- " +
        user3 + ', ' + user3_gender + " live in " + user3_place;

    } catch (error) {
        console.error(error);
    }
}

