import IMask from 'imask';
import 'air-datepicker/dist/js/datepicker';

let datePickerInput = document.querySelectorAll('.date-dropdown__field_from, .date-dropdown__field_to');

let datePickerOptions = {
	mask: Date,
	min: new Date(),
	overwrite: true,
	autofix: true
};

if (datePickerInput.length != 0) {
	for (let i = 0; i < datePickerInput.length; i++) {
		IMask(datePickerInput[i], datePickerOptions);
	}
};

$('.date-dropdown__field_from').datepicker({
	minDate: new Date(),
	range: true,
	autoClose: true,
	multipleDatesSeparator: ' - ',
	onSelect: function (fd, d, picker) {
		$('.date-dropdown__field_from').val(fd.split('-')[0]);
		$('.date-dropdown__field_to').val(fd.split('-')[1]);
	}
});

$('.date-dropdown__field_to').datepicker({
	minDate: new Date(),
	range: true,
	autoClose: true,
	multipleDatesSeparator: ' - ',
	onSelect: function (fd, d, picker) {
		$('.date-dropdown__field_to').val(fd.split('-')[1]);
		$('.date-dropdown__field_from').val(fd.split('-')[0]);
	}
});

$('.date-dropdown__field_range').datepicker({
	minDate: new Date(),
	showEvent: 'click',
	range: true,
	dateFormat: `dd M`,
	autoClose: true,
	multipleDatesSeparator: ' - ',
});


