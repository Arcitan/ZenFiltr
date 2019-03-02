var userName;

function openSettings () {
	document.getElementById('settings').classList.toggle("settings-open");
	clearName();
}

function saveName() {
	localStorage.setItem('receivedName', userName);

	userName=localStorage.getItem('receivedName');

	if( userName == null){
		userName = "friend";
	}
}

function changeName() {
	if(userName = document.getElementById("name-input").value == ""){
		userName = "friend";
	}else {
		userName = document.getElementById("name-input").value;
	}
	

	saveName();
	getGreeting();
}

function getGreeting() {
	document.getElementById('greeting').innerHTML = `Hello, ${userName}. What news are you interested in today?`;
}

function clearName() {
	document.getElementById("name-input").value = "";
}

document.getElementById("settings-button").addEventListener('click', openSettings);

document.getElementById("name-form").addEventListener('submit', function(e) {
	e.preventDefault();

	changeName();
	clearName();
});

document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.button'),
        loader = document.querySelector('.loader'),
        check = document.querySelector('.check');
    
    btn.addEventListener('click', function () {
      loader.classList.add('active');    
    });
   
    loader.addEventListener('animationend', function() {
      check.classList.add('active'); 
    });
  });