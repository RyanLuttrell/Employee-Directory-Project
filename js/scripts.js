const gallery = document.querySelector('#gallery');

//Retrieve the necessary data from the Random User generator API using fetch
fetch('https://randomuser.me/api/?results=12&inc=name,location,email,dob,phone,picture')
    .then(data => data.json())
    .then(res => {
        for (let i = 0; i < res.results.length; i++) {
            const newDiv = document.createElement('div');
            newDiv.className = 'card';
            newDiv.innerHTML = `
            <div class = 'card-img-container'>
                <img class='card-img' src='${res.results[i].picture.thumbnail}' alt='profile picture'>
            </div>
            <div class='card-info-container'>
                <h3 id='name' class='card-name cap'>${res.results[i].name.first} ${res.results[i].name.last}</h3>
                <p class='card-text'>${res.results[i].email}</p>
                <p class='card-text-cap'>${res.results[i].location.city}, ${res.results[i].location.state}</p>
            </div>
            `
            gallery.appendChild(newDiv);
        }
    })