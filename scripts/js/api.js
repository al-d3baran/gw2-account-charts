const apiUrl = 'https://api.guildwars2.com/v2/';

const requestApi = async (api, key = null) => {
	const uri = key === null ? `${apiUrl}${api}` : `${apiUrl}${api}?access_token=${key}`;

	try {
		const response = await fetch(uri);

		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		throw new Error(`Request failed: ${error.message}`);
	}
};

const fetchCharacters = async (token) => {
	try {
		const data = await requestApi('characters', token);
		return data;
	} catch (error) {
		console.error(`Error fetching characters: ${error.message}`);
		return null;
	}
};

const fetchData = async (token, characters) => {
	try {
		const tasks = characters.map((character) => requestApi(`characters/${character}`, token));
		const data = await Promise.all(tasks);
		return data;
	} catch (error) {
		console.error(`Error fetching data: ${error.message}`);
		return null;
	}
};

const verifyPermissions = async (token, permissions) => {
	try {
		const data = await requestApi('tokeninfo', token);
		return permissions.every((permission) => data.permissions.includes(permission));
	} catch (error) {
		console.error(`Error verifying permissions: ${error.message}`);
		return false;
	}
};

const verifyToken = (token) => {
	const key = token.trim().replace(/-/g, '').toUpperCase();
	return /^[0-9A-F]+$/.test(key) && key.length === 64;
};
