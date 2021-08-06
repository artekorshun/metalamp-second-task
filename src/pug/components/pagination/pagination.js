import '~/js/libs/simplePagination/jquery.simplePagination.js';

$(function () {
	$('.pagination__simple-pagination').pagination({
		items: 180,
		itemsOnPage: 12,
		displayedPages: 3,
		edges: 1,
		prevText: ' ',
		nextText: ' ',
	});
});