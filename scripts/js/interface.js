const uiToken = document.querySelector('#token');
const uiLog = document.querySelector('#log');
const uiRaces = document.querySelector('#races');
const uiProfessions = document.querySelector('#professions');
const uiGenders = document.querySelector('#genders');
const uiLevels = document.querySelector('#levels ul');
const uiAge = document.querySelector('#age ul');
const uiDeaths = document.querySelector('#deaths ul');
const uiScreenshot = document.querySelector('#screenshot');
const uiGraphs = document.querySelector('#graphs');
const uiThemeLight = document.querySelector('#light');
const uiThemeDark = document.querySelector('#dark');
const uiNavigation = document.querySelectorAll('nav a');

let drawnRaces = false;
let drawnProfessions = false;
let drawnGenders = false;

uiToken.addEventListener('keydown', async (e) => {
	if (e.key === 'Enter') {
		let token = e.target.value;
		uiLog.textContent = 'verifying token';

		try {
			uiGraphs.classList.remove('show');

			if (!verifyToken(token))
				throw new Error('Token verification failed');

			uiLog.textContent = 'verifying permissions';

			if (!(await verifyPermissions(token, ['characters'])))
				throw new Error('Permission verification failed');

			uiLog.textContent = 'fetching characters';
			let characters = await fetchCharacters(token);

			if (characters === null)
				throw new Error('Failed to fetch characters');

			uiLog.textContent = 'fetching data';
			let data = await fetchData(token, characters);

			if (data === null)
				throw new Error('Failed to fetch data');

			uiLog.textContent = 'generating charts';

			const parsed = parseCharacterData(data);

			drawnRaces = generateChart(uiRaces, parsed.races);
			drawnProfessions = generateChart(uiProfessions, parsed.professions);
			drawnGenders = generateChart(uiGenders, parsed.genders);
			generateChart(uiLevels, parsed.levels);
			generateChart(uiAge, parsed.age);
			generateChart(uiDeaths, parsed.deaths);

			uiLog.textContent = 'done';
			uiGraphs.classList.add('show');
		} catch (error) {
			console.error(error);
			uiLog.textContent = 'An error occurred. Please check the console for details.';
		}
	}
});

uiNavigation.forEach(a => {
	a.addEventListener('click', e => {
		e.preventDefault();

		switch (a.id) {
			case 'light':
				document.body.className = '';

				if (drawnRaces)
					drawPieCenter(uiRaces, document.body.className);

				if (drawnProfessions)
					drawPieCenter(uiProfessions, document.body.className);

				if (drawnGenders)
					drawPieCenter(uiGenders, document.body.className);

				break;

			case 'dark':
				document.body.className = 'dark';

				if (drawnRaces)
					drawPieCenter(uiRaces, document.body.className);

				if (drawnProfessions)
					drawPieCenter(uiProfessions, document.body.className);

				if (drawnGenders)
					drawPieCenter(uiGenders, document.body.className);

				break;

			case 'screenshot':
				html2canvas(uiGraphs).then(canvas => {
					var link = document.createElement('a');
					link.href = canvas.toDataURL('image/png');
					link.download = 'gw2-account-charts.png';
					link.click();
				});

				break;
		}
	});
});

document.body.className = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '';