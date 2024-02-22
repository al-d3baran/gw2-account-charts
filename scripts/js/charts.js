function sortDataByValues(data) {
	const { labels, values, colors } = data;

	const dataArray = labels.map((label, index) => ({
		label,
		value: values[index],
		color: colors[index % colors.length]
	}));

	dataArray.sort((a, b) => {
		if (a.value === b.value)
			return a.label.localeCompare(b.label);

		return b.value - a.value;
	});

	const sortedLabels = dataArray.map(item => item.label);
	const sortedValues = dataArray.map(item => item.value);
	const sortedColors = dataArray.map(item => item.color);

	return {
		type: data.type,
		labels: sortedLabels,
		values: sortedValues,
		colors: sortedColors
	}
}

function drawPieChart(canvas, data) {
	canvas.width = 400;
	canvas.height = 400;

	var ctx = canvas.getContext('2d');
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = Math.min(canvas.width, canvas.height) / 2;
	var total = data.values.reduce((sum, value) => sum + value, 0);
	var startAngle = 0;

	for (var i = 0; i < data.values.length; i++) {
		var endAngle = startAngle + (data.values[i] / total) * (Math.PI * 2);

		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.fillStyle = data.colors[i];
		ctx.fill();

		startAngle = endAngle;
	}
}

function drawPieCenter(list, color) {
	const canvas = list.querySelector('canvas');

	var ctx = canvas.getContext('2d');
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = Math.min(canvas.width, canvas.height) / 2;

	ctx.beginPath();
	ctx.arc(centerX, centerY, radius / 2, 0, Math.PI * 2);
	ctx.fillStyle = color == 'dark' ? '#222' : '#fff';
	ctx.fill();
}

function generateChart(list, data) {
	switch (data.type) {
		case 'pie':
			const ul = list.querySelector('ul');
			const canvas = list.querySelector('canvas');

			ul.innerHTML = '';

			for (let i = 0; i < data.values.length; i++) {
				let li = document.createElement('li');

				li.textContent = `${data.labels[i]}: ${data.values[i]}`;
				li.style.borderColor = data.colors[i];

				ul.appendChild(li);
			}

			drawPieChart(canvas, data);
			drawPieCenter(list, document.body.className);

			return true;

		case 'bars':
			list.innerHTML = '';

			const maxWidth = list.offsetWidth;
			const maxValue = Math.max(...data.values);
			const sorted = sortDataByValues(data);

			for (let i = 0; i < data.values.length; i++) {
				let li = document.createElement('li');
				let div = document.createElement('div');
				let label = document.createElement('span');
				let value = document.createElement('span');

				div.style.backgroundColor = sorted.colors[i];
				div.style.width = `${(sorted.values[i] / maxValue) * maxWidth}px`;

				label.textContent = sorted.labels[i];

				value.classList.add('value');
				value.textContent = sorted.values[i];

				li.appendChild(label);
				li.appendChild(value);
				li.appendChild(div);
				list.appendChild(li);
			}

			break;

		default:
			return;
	}
}