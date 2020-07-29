const gallery = document.querySelector('#gallery');

//Retrieve the necessary data from the Random User generator API using fetch
fetch('https://randomuser.me/api/?results=12&inc=name,location,email,dob,phone,picture')
    .then(data => data.json())
    .then(res => generateUsers(res))
    // .then(res => generateModals(res))

//Helper Functions

function generateUsers(data) {
    for (let i = 0; i < data.results.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'card';
        newDiv.innerHTML = `
        <div class = 'card-img-container'>
            <img class='card-img' src='${data.results[i].picture.large}' alt='profile picture'>
        </div>
        <div class='card-info-container'>
            <h3 id='name' class='card-name cap'>${data.results[i].name.first} ${data.results[i].name.last}</h3>
            <p class='card-text'>${data.results[i].email}</p>
            <p class='card-text-cap'>${data.results[i].location.city}, ${data.results[i].location.state}</p>
        </div>
        `
        gallery.appendChild(newDiv);
    }
    return data
}

// function generateModals(data) {
//     const newContainerDiv = document.createElement('div');
//     const body
//     newContainerDiv.className = 'modal-container';
//     console.log(data.results);
//     gallery.nextSibling(newContainerDiv);

// }
