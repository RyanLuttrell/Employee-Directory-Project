//Global variables 
const gallery = document.querySelector('#gallery');
const employees = []
const newContainerDiv = document.createElement('div');
newContainerDiv.className = 'modal-container';
let index = 0


//Retrieve the necessary data from the Random User generator API using fetch
fetch('https://randomuser.me/api/?results=12&inc=name,location,email,dob,phone,picture&nat=US')
    .then(data => data.json())
    .then(res => pushToArray(res))
    .then(data => generateUsers(employees))
    .catch(error => new Error('Looks like there was an issue:', error))

//Helper Functions
//Send the data that has been parsed into JSON into an array of objects in the 'employees' variable
function pushToArray(data) {
    for (i = 0; i < data.results.length; i++) {
       employees.push(data.results[i]) 
    }
    return data
}

//This functinon will generate a page full of employees with the appropriate information displayed for each employee
function generateUsers(data) {
    for (let i = 0; i < data.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'card';
//Add box shadow styling for exceeds expectations
        newDiv.style.boxShadow = '10px 10px 8px 1px lightgrey'
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
}

//Filters through the cards to detect which card has been selectd and display the appropiate person's information in the modal window
function generateModal(data, event) {
    for (i = 0; i < data.length; i++){
        if ((data[i].name.first + ' ' + data[i].name.last) == event.closest('.card').children[1].children[0].textContent) {
            newContainerDiv.innerHTML = `
            <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src='${data[i].picture.large}' alt='profile picture'>
                <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                <p class="modal-text">${data[i].email}</p>
                <p class="modal-text cap">${data[i].location.city}</p>
                <hr>
                <p class="modal-text">${data[i].phone}</p>
                <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.state} ${data[i].location.postcode}</p>
                <p class="modal-text">Birthday: ${data[i].dob.date[5]}${data[i].dob.date[6]}/${data[i].dob.date[8]}${data[i].dob.date[9]}/${data[i].dob.date[2]}${data[i].dob.date[3]}</p>
            </div>
            <div class='modal-btn-container'>
                <button type='button' id='modal-prev' class='modal-prev btn'>Prev</button>
                <button type='button' id='modal-next' class='modal-next btn'>Next</button>
            </div>
            `
            gallery.appendChild(newContainerDiv)
            index = i;
        }
    }
}

// Event listener to target to create the modal when any part of a card is clicked
gallery.addEventListener('click', e => {
    if (e.target.closest('.card')) {
        generateModal(employees, e.target)

//After the modal has been created, add an event listener to the close button of the modal to ensure the user can exit out of the modal
        const modalButton = document.getElementById('modal-close-btn');
        modalButton.addEventListener('click', () => {
            newContainerDiv.remove();
        })

//After the modal has been created, add event listeners to both the previous and next button to be able to cycle through the different employees
        const modalPrev = document.querySelector('#modal-prev');
        const modalNext = document.querySelector('#modal-next');

        modalPrev.addEventListener('click', switchToPrev);
        modalNext.addEventListener('click', switchToNext);
    }
})


/* 
EXCEEDS EXPECTATIONS
*/
//Create the search option on the screen
const searchContainer = document.querySelector('.search-container');
searchContainer.innerHTML = `
    <form action='#' method='get'>
        <input type='search' id='search-input' class='search-input' placeholder='Search...'>
        <input type='submit' value='&#x1F50D;' id='search-submit' class='search-submit'>
    </form>
`;

const searchInput = document.querySelector('#search-input');
const searchSubmit = document.querySelector('#search-submit');

//Create search functionality for the employees
searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].children[1].children[0].textContent.toUpperCase().includes(searchInput.value.toUpperCase())) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
})

//Creating the functionality of the "Prev" button on the modal
function switchToPrev() {
    const cards = document.querySelectorAll('.card');
    if (index > 0) {
        index--;
        newContainerDiv.innerHTML = `
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src='${employees[index].picture.large}' alt='profile picture'>
            <h3 id="name" class="modal-name cap">${employees[index].name.first} ${employees[index].name.last}</h3>
            <p class="modal-text">${employees[index].email}</p>
            <p class="modal-text cap">${employees[index].location.city}</p>
            <hr>
            <p class="modal-text">${employees[index].phone}</p>
            <p class="modal-text">${employees[index].location.street.number} ${employees[index].location.street.name}, ${employees[index].location.state} ${employees[index].location.postcode}</p>
            <p class="modal-text">Birthday: ${employees[index].dob.date[5]}${employees[index].dob.date[6]}/${employees[index].dob.date[8]}${employees[index].dob.date[9]}/${employees[index].dob.date[2]}${employees[index].dob.date[3]}</p>
        </div>
        <div class='modal-btn-container'>
            <button type='button' id='modal-prev' class='modal-prev btn'>Prev</button>
            <button type='button' id='modal-next' class='modal-next btn'>Next</button>
        </div>
        `
        const modalPrev = document.querySelector('#modal-prev');
        const modalNext = document.querySelector('#modal-next');

        modalPrev.addEventListener('click', switchToPrev);
        modalNext.addEventListener('click', switchToNext);
        const modalButton = document.getElementById('modal-close-btn');
        modalButton.addEventListener('click', () => {
            newContainerDiv.remove();
        })
    }
}

//Creating the functionality of the "Next" button on the modal
function switchToNext() {
    const cards = document.querySelectorAll('.card');
    if (index < cards.length - 1) {
        index++;
        newContainerDiv.innerHTML = `
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src='${employees[index].picture.large}' alt='profile picture'>
            <h3 id="name" class="modal-name cap">${employees[index].name.first} ${employees[index].name.last}</h3>
            <p class="modal-text">${employees[index].email}</p>
            <p class="modal-text cap">${employees[index].location.city}</p>
            <hr>
            <p class="modal-text">${employees[index].phone}</p>
            <p class="modal-text">${employees[index].location.street.number} ${employees[index].location.street.name}, ${employees[index].location.state} ${employees[index].location.postcode}</p>
            <p class="modal-text">Birthday: ${employees[index].dob.date[5]}${employees[index].dob.date[6]}/${employees[index].dob.date[8]}${employees[index].dob.date[9]}/${employees[index].dob.date[2]}${employees[index].dob.date[3]}</p>
        </div>
        <div class='modal-btn-container'>
            <button type='button' id='modal-prev' class='modal-prev btn'>Prev</button>
            <button type='button' id='modal-next' class='modal-next btn'>Next</button>
        </div>
        `
        const modalPrev = document.querySelector('#modal-prev');
        const modalNext = document.querySelector('#modal-next');

        modalPrev.addEventListener('click', switchToPrev);
        modalNext.addEventListener('click', switchToNext);
        const modalButton = document.getElementById('modal-close-btn');
        modalButton.addEventListener('click', () => {
            newContainerDiv.remove();
        })
    }
}
