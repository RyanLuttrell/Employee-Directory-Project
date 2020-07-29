const gallery = document.querySelector('#gallery');
const employees = []


//Retrieve the necessary data from the Random User generator API using fetch
fetch('https://randomuser.me/api/?results=12&inc=name,location,email,dob,phone,picture&nat=US')
    .then(data => data.json())
    .then(res => pushToArray(res))
    .then(data => generateUsers(employees))
    .catch(error => new Error('Looks like there was an issue:', error))

//Helper Functions

function pushToArray(data) {
    for (i = 0; i < data.results.length; i++) {
       employees.push(data.results[i]) 
    }
    return data
}

function generateUsers(data) {
    for (let i = 0; i < data.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'card';
        newDiv.innerHTML = `
        <div class = 'card-img-container'>
            <img class='card-img' src='${data[i].picture.large}' alt='profile picture'>
        </div>
        <div class='card-info-container'>
            <h3 id='name' class='card-name cap'>${data[i].name.first} ${data[i].name.last}</h3>
            <p class='card-text'>${data[i].email}</p>
            <p class='card-text-cap'>${data[i].location.city}</p>
        </div>
        `
        gallery.appendChild(newDiv);
    }
    return data
}



// function generateModal(data, event) {
//     const newContainerDiv = document.createElement('div');
//     newContainerDiv.className = 'modal-container';
//     for (i = 0; i < data.length; i++){
//         if ((data[i].name.first + ' ' + data[i].name.last) == event) {
//             newContainerDiv.innerHTML = `
//             <div class="modal">
//             <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//             <div class="modal-info-container">
//                 <img class="modal-img" src='${data[i].picture.large}' alt='profile picture'>
//                 <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
//                 <p class="modal-text">${data[i].email}</p>
//                 <p class="modal-text cap">${data[i].location.city}</p>
//                 <hr>
//                 <p class="modal-text">${data[i].phone}</p>
//                 <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.state} ${data[i].location.postcode}</p>
//                 <p class="modal-text">Birthday: ${data[i].dob.date[5]}${data[i].dob.date[6]}/${data[i].dob.date[8]}${data[i].dob.date[9]}/${data[i].dob.date[2]}${data[i].dob.date[3]}</p>
//             </div>
//             `
//             gallery.appendChild(newContainerDiv)
//         }
//     }
//     console.log(data[1].name.first + ' ' + data[1].name.last)
//     console.log(data);
//     console.log(event.closest('name'))

// }

//Event listener to target to create the modal when any part of a card is clicked
// gallery.addEventListener('click', e => {
//     if (e.target.closest('.card')) {
//         generateModal(employees, e.target.closest('.card-name'))
//     }
// })

