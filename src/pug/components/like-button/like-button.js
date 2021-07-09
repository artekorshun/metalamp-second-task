$('.like-button__button').on('click', function () {
	let counterValue = parseInt($(this).children('.like-button__counter').text());
	if ($(this).hasClass('like-button__button_liked')) {
		$(this).children('.like-button__counter').text(counterValue - 1)
		$(this).removeClass('like-button__button_liked')
		$(this).addClass('like-button__button_unliked')
	}
	else if ($(this).hasClass('like-button__button_unliked')) {
		$(this).children('.like-button__counter').text(counterValue + 1)
		$(this).addClass('like-button__button_liked')
		$(this).removeClass('like-button__button_unliked')
	}
});