import IMask from 'imask';

let dateMaskedInput = document.querySelectorAll(
	'.masked-text-field__input'
);

let maskOptions = {
	mask: Date,
	min: new Date(1901, 1, 1),
	max: new Date(),
	overwrite: true,
	autofix: true
};

if (dateMaskedInput.length != 0) {
	for (let i = 0; i < dateMaskedInput.length; i++) {
		IMask(dateMaskedInput[i], maskOptions);
	}
};