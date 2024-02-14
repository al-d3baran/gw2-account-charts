function parseCharacterData(data) {
	const values = {
		gender: [{ name: 'Male', value: 0 }, { name: 'Female', value: 0 }],
		level: [{ name: 'Capped', value: 0 }, { name: 'Uncapped', value: 0 }],
		profession: [
			{ name: 'Elementalist', value: 0 },
			{ name: 'Engineer', value: 0 },
			{ name: 'Guardian', value: 0 },
			{ name: 'Mesmer', value: 0 },
			{ name: 'Necromancer', value: 0 },
			{ name: 'Ranger', value: 0 },
			{ name: 'Revenant', value: 0 },
			{ name: 'Thief', value: 0 },
			{ name: 'Warrior', value: 0 },
		],
		race: [
			{ name: 'Asura', value: 0 },
			{ name: 'Charr', value: 0 },
			{ name: 'Human', value: 0 },
			{ name: 'Norn', value: 0 },
			{ name: 'Sylvari', value: 0 },
		],
		played: [],
		deaths: [],
	}

	data.forEach((character) => {
		character.gender === 'Male' ? values.gender[0].value++ : values.gender[1].value++;
		character.level === 80 ? values.level[0].value++ : values.level[1].value++;

		const professionIndex = values.profession.findIndex((p) => p.name === character.profession);

		if (professionIndex !== -1)
			values.profession[professionIndex].value++;

		const raceIndex = values.race.findIndex((r) => r.name === character.race);

		if (raceIndex !== -1)
			values.race[raceIndex].value++;

		values.played.push({ name: character.name, value: character.age });
		values.deaths.push({ name: character.name, value: character.deaths });
	});

	return values;
}
