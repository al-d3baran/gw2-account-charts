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
				},
				title: {
					display: true,
					text: 'Races',
					align: 'start',
					padding: {
						top: 0,
						bottom: 0
					}
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
				},
				title: {
					display: true,
					text: 'Professions',
					align: 'start',
					padding: {
						top: 0,
						bottom: 0
					}
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
				},
				title: {
					display: true,
					text: 'Genders',
					align: 'start',
					padding: {
						top: 0,
						bottom: 0
					}
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
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: 'Levels',
					align: 'start',
					padding: {
						top: 0,
						bottom: 0
					}
				}
			}
		}
	},
	Age: {
		type: 'bar',
		data: {
			labels: [],
			datasets: [{
				label: 'age (seconds)',
				data: [],
				backgroundColor: '#FFBF00'
			}]
		},
		options: {
			indexAxis: 'y',
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: 'Age',
					align: 'start',
					padding: {
						top: 0,
						bottom: 0
					}
				}
			}
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
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: 'Deaths',
					align: 'start',
					padding: {
						top: 0,
						bottom: 0
					}
				}
			}
		}
	}
}