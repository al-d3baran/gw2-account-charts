const pieWidth = 320;
const pieHeight = 320;
const pieRadius = 10;
const pieCenter = '#FFFFFF';
const barWidth = 800;
const listColors = ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF', '#B3EB00', '#CC9900', '#CC7033', '#AE0C33', '#6FC298', '#20B0A0', '#407DA0', '#99AACC'];

function randomColors(total) {
	const index = Math.floor(Math.random() * listColors.length);
	const reorder = [...listColors.slice(index), ...listColors.slice(0, index)];
	const result = [];

	for (let i = 0; i < total; i++)
		result.push(reorder[i % reorder.length]);

	return result;
}

function degreesToRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

function drawPieSlice(ctx, x, y, radius, start, end, color) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.arc(x, y, radius, start, end);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function appendPieItem(list, name, value, color) {
	const li = document.createElement('li');
	li.innerHTML = `<span style="color: ${color}">${name}</span>${value}`;
	list.appendChild(li);
}

function generatePieChart(ui, data) {
	const list = ui.querySelector('ul');
	list.innerHTML = '';

	const canvas = document.createElement('canvas');
	canvas.width = pieWidth;
	canvas.height = pieHeight;

	const ctx = canvas.getContext('2d');
	const centerX = pieWidth / 2;
	const centerY = pieHeight / 2;
	const radius = Math.min(centerX, centerY) - pieRadius;
	const colors = randomColors(data.length);
	const totalValue = data.reduce((t, d) => {
		return t + d.value;
	}, 0);

	let currentAngle = -90;

	data.forEach((item, idx) => {
		const divPercent = item.value / totalValue;
		const totalPercent = divPercent * 100;
		const endAngle = currentAngle + divPercent * 360;

		drawPieSlice(ctx, centerX, centerY, radius, degreesToRadians(currentAngle), degreesToRadians(endAngle), colors[idx]);
		appendPieItem(list, item.name, `${item.value} (${totalPercent.toFixed(2)}%)`, colors[idx]);

		currentAngle = endAngle;
	});

	ctx.beginPath();
	ctx.arc(centerX, centerY, radius / 2, 0, degreesToRadians(360));
	ctx.fillStyle = pieCenter;
	ctx.fill();
	ctx.closePath();

	const dataUrl = canvas.toDataURL();
	ui.style.backgroundImage = `url(${dataUrl})`;
}

function generateBarChart(ui, data) {
	const list = ui.querySelector('ul');
	const sorted = [...data].sort((a, b) => b.value - a.value);
	const high = data.reduce((max, current) => (max.value > current.value) ? max : current, {});
	const colors = randomColors(data.length);

	sorted.forEach((item, idx) => {
		const div = document.createElement('div');
		const divPercent = item.value / high.value;
		const totalPercent = divPercent * 100;
		div.style.width = divPercent * 800 + 'px';
		div.style.backgroundColor = colors[idx];

		const li = document.createElement('li');
		li.innerHTML = `<span>${item.name}: ${item.value} (${totalPercent.toFixed(2)}%)</span>`;

		li.appendChild(div);
		list.appendChild(li);
	});
}
