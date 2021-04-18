var tabs = document.querySelectorAll(".lboard_tabs ul li");
var username = document.querySelector(".username");
var score = document.querySelector(".score");
var grade = document.querySelector(".grade");
var age = document.querySelector(".age");
var state = document.querySelector(".state");
var items = document.querySelectorAll(".lboard_item");

tabs.forEach(function(tab){
	tab.addEventListener("click", function(){
		var currenttab = tab.getAttribute("data-li");
		
		tabs.forEach(function(tab){
			tab.classList.remove("active");
		})

		tab.classList.add("active");

		items.forEach(function(item){
			item.style.display = "none";
		})

		/* if (currenttab == "username") {
			username.style.display = "block";
		}  else if (currenttab == "grade") {
			grade.style.display = "block";
		} else if (currenttab == "age") {
			age.style.display = "block";
		} else if (currenttab == "state") {
			state.style.display = "block";
		}  else {
			username.style.display = "block";
		} */
		if (currenttab == "username") {
			username.style.display = "block";
		} else {
			username.style.display = "block";
		}
	})
})