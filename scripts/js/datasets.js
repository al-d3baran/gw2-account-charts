const chartsStructure = {
	Races: {
		type: 'polarArea',
		data: {
			labels: ['Asura', 'Charr', 'Human', 'Norn', 'Sylvari'],
			datasets: [{
				label: 'Races',
				data: [0, 0, 0, 0, 0],
				backgroundColor: ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF']
			}]
		},
		options: {
			animation: {
				animateRotate: false,
				animateScale: false
			},
			plugins: {
				legend: {
					position: 'left',
				}
			}
		}
	},
	Professions: {
		type: 'polarArea',
		data: {
			labels: ['Elementalist', 'Engineer', 'Guardian', 'Mesmer', 'Necromancer', 'Ranger', 'Revenant', 'Thief', 'Warrior'],
			datasets: [{
				label: 'Professions',
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
				backgroundColor: ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF', '#B3EB00']
			}]
		},
		options: {
			animation: {
				animateRotate: false,
				animateScale: false
			},
			plugins: {
				legend: {
					position: 'left',
				}
			}
		}
	},
	Genders: {
		type: 'doughnut',
		data: {
			labels: ['Female', 'Male'],
			datasets: [{
				data: [0, 0],
				backgroundColor: ['#DFFF00', '#FFBF00']
			}]
		},
		options: {
			animation: {
				animateRotate: false,
				animateScale: false
			},
			plugins: {
				legend: {
					position: 'left',
				}
			}
		}
	},
	Levels: {
		type: 'bar',
		data: {
			labels: [],
			datasets: [{
				label: 'levels',
				data: [],
				backgroundColor: '#6495ED'
			}]
		},
		options: {
			indexAxis: 'y',
			responsive: true
		}
	},
	Played: {
		type: 'bar',
		data: {
			labels: [],
			datasets: [{
				label: 'played',
				data: [],
				backgroundColor: '#FFBF00'
			}]
		},
		options: {
			indexAxis: 'y',
			responsive: true
		}
	},
	Deaths: {
		type: 'bar',
		data: {
			labels: [],
			datasets: [{
				label: 'deaths',
				data: [],
				backgroundColor: '#FF7F50'
			}]
		},
		options: {
			indexAxis: 'y',
			responsive: true
		}
	}
}