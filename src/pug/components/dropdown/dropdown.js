let dropdownMenu = document.querySelector('.dropdown__input');

dropdownMenu.onclick = function () {
	this.classList.toggle("dropdown__input_opened");
}