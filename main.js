let isLoggedIn = false;

function toggleMenu() {
    var whiteBox = document.getElementById('whiteBox');
    if (whiteBox.classList.contains('show')) {
        whiteBox.classList.remove('show');
    } else {
        whiteBox.classList.add('show');
    }
}

function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function() {
    const bsListItems = document.querySelectorAll(".bs-list");

    bsListItems.forEach(item => {
        const title = item.querySelector("p");
        if (title.textContent.length > 15) {
            title.textContent = title.textContent.substring(0, 15) + "...";
            title.style.overflowX = "auto";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");
    const songs = document.querySelectorAll(".list");

    let filteredSongs = [];

    form.addEventListener("input", function(event) {
        const searchText = form.querySelector("input[name='search-text']").value.toLowerCase();

        filteredSongs = Array.from(songs).filter(song => {
            const title = song.querySelector(".song-name").textContent.toLowerCase();
            const artist = song.querySelector(".artist").textContent.toLowerCase();
            return title.includes(searchText) || artist.includes(searchText);
        });

        songs.forEach(song => {
            if (filteredSongs.includes(song)) {
                song.style.display = "block";
            } else {
                song.style.display = "none";
            }
        });
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (filteredSongs.length === 1) {
            const songUrl = filteredSongs[0].getAttribute("href");
            window.location.href = songUrl; 
        }
    });

    window.addEventListener("unload", function(event) {
        form.querySelector("input[name='search-text']").value = "";
    });
});


loadPage('home.html');

function validateForm() {
    var name = document.forms["registrationForm"]["enterName"].value;
    var email = document.forms["registrationForm"]["enterEmail"].value;
    var password = document.forms["registrationForm"]["EnterPw"].value;
    var age = document.forms["registrationForm"]["EnterAge"].value;
    var gender = document.querySelector('input[name="gender"]:checked');

    if (name == "" && email == "" && password == "" && age == "" && gender == null) {
        alert("All fields must be filled out");
        return false;
    }

    if (name == "") {
        alert("Please enter your name");
        return false;
    }
    
    if (!validateName(name)) {
        alert("Name must not contains special characters");
        return false;
    }

    if (email == "") {
        alert("Please enter your email");
        return false;
    }

    if (password == "") {
        alert("Please enter your password");
        return false;
    }

    if (age == "") {
        alert("Please enter your age");
        return false;
    }

    if (gender == null) {
        alert("Please choose your gender");
        return false;
    }

    if (!email.endsWith("@gmail.com")) {
        alert("Invalid email. Email must ends with @gmail.com")
        return false;
    }

    if (!validatePassword(password)) {
        alert("Password must contain at least one uppercase letter, one number, and be at least 8 characters long");
        return false;
    }
    
    if (age > 100 || age < 0){
        alert("Enter a valid age!")
        return false;
    }

    return validateSuccess();
}

function validateSuccess() {
    isLoggedIn = true;
    window.location.href="/home/home.html";
}



function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }

    var hasUpperCase = false;
    var hasNumber = false;
    for (var i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        if (!isNaN(parseInt(char))) {
            hasNumber = true;
        } else if (char === char.toUpperCase()) {
            hasUpperCase = true;
        }
    }

    return hasUpperCase && hasNumber;
}

function validateName(name) {
    for (var i = 0; i < name.length; i++) {
        var char = name.charAt(i);
        if (!((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z'))) {
            return false;
        }
    }
    return true;
}



