const dropdown = function (options) {
	let minusButton = $('.dropdown__quantity-button-minus');
	let plusButton = $('.dropdown__quantity-button-plus');
	let clearButton = $('.dropdown__change-button-clear');
	let applyButton = $('.dropdown__change-button-apply');

	let closeDropdown = function () {
		$('.dropdown__input').removeClass('dropdown__input_opened');
		$('.dropdown__options-list').removeClass('dropdown__options-list_opened');
	};

	minusButton.prop('disabled', true);

	$('.dropdown__input').on('click', function () {
		$(this).toggleClass('dropdown__input_opened');
		$(this).siblings('.dropdown__options-list').toggleClass('dropdown__options-list_opened');
	});

	$('.dropdown__icon').on('click', function () {
		$(this).siblings('.dropdown__input').toggleClass('dropdown__input_opened');
		$(this).siblings('.dropdown__options-list').toggleClass('dropdown__options-list_opened');
	});

	clearButton.on('click', function (event) {
		$(this).closest('.dropdown').each(function () {
			$(this).find('.dropdown__counter').text(0);
			$(this).find('.dropdown__input').val('');
			$(this).find(minusButton).prop('disabled', true);
		});
		event.stopPropagation();
	});

	applyButton.on('click', function () {
		closeDropdown();
	});

	$('body').on('click', function (event) {
		if ($(event.target).closest('.dropdown__button').length) return;
		closeDropdown();
		event.stopPropagation();
	});

	minusButton.on('click', function () {
		let value = parseInt($(this).siblings('.dropdown__counter').text());
		if (value > 0) {
			value--;
			if (value < 1) {
				$(this).prop('disabled', true);
			};
			$(this).siblings('.dropdown__counter').text(value);
			updateValue($(this));
		};
	});

	plusButton.on('click', function () {
		let value = parseInt($(this).siblings('.dropdown__counter').text());
		value++;
		if (value > 0) {
			$(this).siblings(minusButton).prop('disabled', false);
		};
		$(this).siblings('.dropdown__counter').text(value);
		updateValue($(this));
	});

	let updateValue = function (context) {
		let output = [];
		let allOptions = context.closest('.dropdown').find('.dropdown__counter');
		if (context.closest('.dropdown').hasClass('dropdown__facilities')) {
			options = [['спальня', 'спальни', 'спален'], ['кровать', 'кровати', 'кроватей'], ['ванная комната', 'ванных комнаты', 'ванных комнат']];
			let checkValue = function () {
				let stepValue = parseInt($(this).text());
				let stepIndex = $(this).attr('data-index');
				if (stepValue > 4) {
					output.push(stepValue + ' ' + options[stepIndex][2]);
				}
				else if (stepValue > 1 && stepValue < 5) {
					output.push(stepValue + ' ' + options[stepIndex][1]);
				}
				else if (stepValue === 1) {
					output.push(stepValue + ' ' + options[stepIndex][0]);
				}
			};
			allOptions.map(checkValue);
			context.closest('.dropdown').find('.dropdown__input').val(output.join(', '));
		}
		else if (context.closest('.dropdown').hasClass('dropdown__guests')) {
			options = ['гость', 'гостя', 'гостей'];
			let sum = 0;
			context.closest('.dropdown').find('.dropdown__counter').each(function () {
				sum += parseInt($(this).text());
			});
			if (sum > 4) {
				output.push(sum + ' ' + options[2]);
			}
			else if (sum > 1 && sum < 5) {
				output.push(sum + ' ' + options[1]);
			}
			else if (sum === 1) {
				output.push(sum + ' ' + options[0]);
			};
			context.closest('.dropdown').find('.dropdown__input').val(output);
		};
	};
};

dropdown();