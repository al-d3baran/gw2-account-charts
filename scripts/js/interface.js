const uiCharts = document.getElementById('charts');
const uiToken = document.getElementById('token');
const uiLog = document.getElementById('log');
const uiRaces = document.getElementById('races');
const uiProfessions = document.getElementById('professions');
const uiGenders = document.getElementById('genders');
const uiLevels = document.getElementById('levels');
const uiPlayed = document.getElementById('played');
const uiDeaths = document.getElementById('deaths');

uiToken.addEventListener('keydown', async (e) => {
	if (e.key === 'Enter') {
		uiCharts.style.display = 'none';
		let token = e.target.value;
		uiLog.textContent = 'verifying token';

		try {
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
			let parsed = parseCharacterData(data);

			generatePieChart(uiRaces, parsed.race);
			generatePieChart(uiProfessions, parsed.profession);
			generatePieChart(uiGenders, parsed.gender);
			generatePieChart(uiLevels, parsed.level);
			generateBarChart(uiPlayed, parsed.played);
			generateBarChart(uiDeaths, parsed.deaths);

			uiLog.textContent = 'done';
			uiCharts.style.display = 'inline';
		} catch (error) {
			console.error(error);
			uiLog.textContent = 'An error occurred. Please check the console for details.';
		}
	}
});