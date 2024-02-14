function parseCharacterData(data) {
	const values = {
		races: [{
			label: 'Races',
			data: [0, 0, 0, 0, 0],
			backgroundColor: ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF']
		}],
		professions: [{
			label: 'Professions',
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			backgroundColor: ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF', '#B3EB00']
		}],
		genders: [{
			label: 'Genders',
			data: [0, 0],
			backgroundColor: ['#DFFF00', '#FFBF00']
		}],
		levels: {
			labels: [],
			datasets: [{
				label: 'levels',
				data: [],
				backgroundColor: '#6495ED'
			}]
		},
		age: {
			labels: [],
			datasets: [{
				label: 'age (seconds)',
				data: [],
				backgroundColor: '#FFBF00'
			}]
		},
		deaths: {
			labels: [],
			datasets: [{
				label: 'deaths',
				data: [],
				backgroundColor: '#FF7F50'
			}]
		}
	}

	data.forEach((character) => {
		const raceIndex = chartsStructure.Races.data.labels.indexOf(character.race);
		const professionIndex = chartsStructure.Professions.data.labels.indexOf(character.profession);

		values.races[0].data[raceIndex] += 1;
		values.professions[0].data[professionIndex] += 1;
		values.genders[0].data[character.gender === 'Female' ? 0 : 1] += 1;

		values.levels.labels.push(character.name);
		values.levels.datasets[0].data.push(character.level);

		values.age.labels.push(character.name);
		values.age.datasets[0].data.push(character.age);

		values.deaths.labels.push(character.name);
		values.deaths.datasets[0].data.push(character.deaths);
	});

	return values;
}