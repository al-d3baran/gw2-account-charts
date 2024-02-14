const apiUrl = 'https://api.guildwars2.com/v2/';

const requestApi = async (api, key = null) => {
	return new Promise(async (resolve, reject) => {
		const uri = key === null ? encodeURI(`${apiUrl}${api}`) : encodeURI(`${apiUrl}${api}?access_token=${key}`);
		const xhr = new XMLHttpRequest();

		xhr.addEventListener('load', () => {
			if (xhr.readyState === 4 && xhr.status === 200)
				resolve(JSON.parse(xhr.responseText));
			else
				reject({ status: xhr.status, statusText: xhr.statusText, error: 'Request failed' });
		});

		xhr.addEventListener('error', () => {
			reject({ status: xhr.status, statusText: xhr.statusText, error: 'Request failed' });
		});

		xhr.open('GET', uri, true);
		xhr.send();
	});
};

const fetchCharacters = async token => {
	try {
		const data = await requestApi('characters', token);
		return data;
	} catch (error) {
		return null;
	}
};

const fetchData = async (token, characters) => {
	const tasks = characters.map(character => () => requestApi(`characters/${character}`, token));

	try {
		const data = await Promise.all(tasks.map(task => task()));
		return data;
	} catch (error) {
		return null;
	}
};

const verifyPermissions = async (token, permissions) => {
	try {
		const data = await requestApi('tokeninfo', token);
		return permissions.every(permission => data.permissions.includes(permission));
	} catch (error) {
		return false;
	}
};

const verifyToken = token => {
	const key = token.trim().replace(/-/g, '').toUpperCase();
	return /^[0-9A-F]+$/.test(key) && key.length === 64;
};