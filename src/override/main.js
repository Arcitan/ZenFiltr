var newsType;
var newsMood; 

function changePage(){
  window.location.href = "newsfeed.html";
} 

function saveType () {
	newsType = document.getElementById('focus-input').value;
	localStorage.setItem("type", newsType)
}

function sendUplifting () {
	newsMood = "positive";
	localStorage.setItem("mood", newsMood)
	run(newsMood);
}

function sendControversial () {
	newsMood = "negative";
	localStorage.setItem("mood", newsMood)
	run(newsMood);
}


function changeType() {
	if(newstype = document.getElementById("focus-input").value == ""){
		newsType = "None";
	}else {
		newsType = document.getElementById("focus-input").value;
	}
	

	saveType();
}


function clearType() {
	document.getElementById("focus-input").value = "";
	document.getElementById("focus-form").reset()
}

document.getElementById("uplifting-button").addEventListener('click', sendUplifting);
document.getElementById("controversial-button").addEventListener('click', sendControversial);

document.getElementById("focus-form").addEventListener('submit', function(e) {
	e.preventDefault();


	changeType();
	clearType();
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
	


	function run(sentiment){

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();
		if (dd < 10) {dd = '0' + dd;}
		if (mm < 10) { mm = '0' + mm;}
		today = yyyy+'-'+ mm + '-' + dd;
		
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		var dd = yesterday.getDate();
		var mm = yesterday.getMonth() + 1; //January is 0!
		var yyyy = yesterday.getFullYear();
		if (dd < 10) {dd = '0' + dd;}
		if (mm < 10) { mm = '0' + mm;}
		yesterday = yyyy+'-'+ mm + '-' + dd;
		
		var string;
		string=newsType;
		document.getElementById("answer").value= "test"+sentiment;
		
		const url = 'https://newsapi.org/v2/everything?q='+string+'&from='+yesterday+'&to='+today+'&sortBy=relevancy&language=en&pageSize=100&apiKey=ef950cdea10e4b31a640905503ce0f7f'
		document.getElementById("test2").innerHTML=url
		
		fetch(url)
			.then((resp) => resp.json())
			//.then(response => document.getElementById("answer").value= JSON.stringify(response))
			.then(response => response['articles'][0]['title'])
			.then(response => document.getElementById("answer").innerHTML= JSON.stringify(response))
			//.then(function(data) {document.getElementById("answer").value= "ok"})
			//for (var i = 0; i < result.d.length; i++) { 
			//  alert(result.d[i].employeename);}
			.catch(document.getElementById("answer").innerHTML= 'error')
		//(resp) => resp.json())
		
		//sentiment=positive
		}