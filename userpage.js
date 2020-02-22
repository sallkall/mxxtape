
//Toggle user menu dropdown
var userProfileIcon = document.getElementById("userDropdownIcon");
var userProfileMenu = document.getElementById("userMenu");
userProfileIcon.onclick = function() {
	if (userProfileMenu.style.display == "block") {
		userProfileMenu.style.display = "none";
	} else {
		userProfileMenu.style.display = "block";
	}
}