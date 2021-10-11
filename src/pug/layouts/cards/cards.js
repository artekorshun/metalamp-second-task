import Masonry from 'masonry-layout';

var container = document.querySelector('#masonry-grid');
var msnry = new Masonry(container, {
	columnWidth: 380,
	itemSelector: '.cards__grid-item',
	gutter: 40,
	fitWidth: true,
	horizontalOrder: true
});