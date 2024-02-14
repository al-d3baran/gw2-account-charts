const uiToken = document.getElementById('token');
const uiLog = document.getElementById('log');
const uiRaces = document.getElementById('races');
const uiProfessions = document.getElementById('professions');
const uiGenders = document.getElementById('genders');
const uiLevels = document.getElementById('levels');
const uiPlayed = document.getElementById('played');
const uiDeaths = document.getElementById('deaths');

const chartRaces = new Chart(uiRaces, chartsStructure.Races);
const chartProfessions = new Chart(uiProfessions, chartsStructure.Professions);
const chartGenders = new Chart(uiGenders, chartsStructure.Genders);
const chartLevels = new Chart(uiLevels, chartsStructure.Levels);
const chartPlayed = new Chart(uiPlayed, chartsStructure.Played);
const chartDeaths = new Chart(uiDeaths, chartsStructure.Deaths);

uiToken.addEventListener('keydown', async (e) => {
	if (e.key === 'Enter') {
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

			const parsed = parseCharacterData(data);

			chartsStructure.Races.data.datasets = parsed.races;
			chartsStructure.Professions.data.datasets = parsed.professions;
			chartsStructure.Genders.data.datasets = parsed.genders;
			chartsStructure.Levels.data = parsed.levels;
			chartsStructure.Played.data = parsed.played;
			chartsStructure.Deaths.data = parsed.deaths;

			chartRaces.update();
			chartProfessions.update();
			chartGenders.update();
			chartLevels.update();
			chartPlayed.update();
			chartDeaths.update();

			uiLog.textContent = 'done';
		} catch (error) {
			console.error(error);
			uiLog.textContent = 'An error occurred. Please check the console for details.';
		}
	}
});