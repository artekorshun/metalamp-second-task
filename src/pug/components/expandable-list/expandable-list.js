let expandableList = document.getElementsByClassName("expandable-list__button");
let i;

for (i = 0; i < expandableList.length; i++) {
	expandableList[i].addEventListener("click", function () {
		this.classList.toggle("expandable-list__button_active");
		let content = this.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
}