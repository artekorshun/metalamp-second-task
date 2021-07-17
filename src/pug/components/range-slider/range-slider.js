import wNumb from '~/js/libs/wNumb/wNumb.min.js';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import '@components/range-slider/range-slider.scss';

let slider = document.getElementById('js-range-slider');
let nonLinearStepSliderValueElement = document.getElementById('js-slider-non-linear-step-value');

noUiSlider.create(slider, {
	start: [5000, 10000],
	connect: true,
	range: {
		'min': 0,
		'max': 16000
	},
	format: wNumb({
		decimals: 0,
		thousand: ' ',
		suffix: '₽'
	})
});

slider.noUiSlider.on('update', function (values) {
	nonLinearStepSliderValueElement.innerHTML = values.join(' - ');
});