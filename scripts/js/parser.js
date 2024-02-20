function parseCharacterData(data) {
	const result = {
		races: {
			type: 'pie',
			labels: ['Asura', 'Charr', 'Human', 'Norn', 'Sylvari'],
			values: [0, 0, 0, 0, 0],
			colors: ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF']
		},
		professions: {
			type: 'pie',
			labels: ['Elementalist', 'Engineer', 'Guardian', 'Mesmer', 'Necromancer', 'Ranger', 'Revenant', 'Thief', 'Warrior'],
			values: [0, 0, 0, 0, 0, 0, 0, 0, 0],
			colors: ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF', '#B3EB00']
		},
		genders: {
			type: 'pie',
			labels: ['Female', 'Male'],
			values: [0, 0],
			colors: ['#DFFF00', '#FFBF00']
		},
		levels: {
			type: 'bars',
			labels: [],
			values: [],
			colors: ['#B6D1FF']
		},
		age: {
			type: 'bars',
			labels: [],
			values: [],
			colors: ['#FFBF00']
		},
		deaths: {
			type: 'bars',
			labels: [],
			values: [],
			colors: ['#FF7F50']
		}
	}

	data.forEach((character) => {
		const race = result.races.labels.indexOf(character.race);
		const profession = result.professions.labels.indexOf(character.profession);

		result.races.values[race] += 1;
		result.professions.values[profession] += 1;
		result.genders.values[character.gender === 'Female' ? 0 : 1] += 1;

		result.levels.labels.push(character.name);
		result.levels.values.push(character.level);

		result.age.labels.push(character.name);
		result.age.values.push(character.age);

		result.deaths.labels.push(character.name);
		result.deaths.values.push(character.deaths);
	});

	return result;
}