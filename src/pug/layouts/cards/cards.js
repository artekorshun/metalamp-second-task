import 'masonry-layout/masonry.js';

$('.cards__grid-container').masonry({
	// options
	itemSelector: '.cards__grid-item',
	columnWidth: 380,
	horizontalOrder: true
});