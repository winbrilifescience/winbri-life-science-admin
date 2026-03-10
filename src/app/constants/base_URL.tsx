// let winbriBaseUrl = 'https://dev-api.threestyle.in',
let winbriBaseUrl = 'http://localhost',
	// winbriLifeBaseUrl = 'http://localhost:82'
	winbriLifeBaseUrl = 'https://app-api.threestyle.in'

if (process.env.REACT_APP_NODE_ENV === 'production') {
	winbriBaseUrl = 'https://api.threestyle.in'
	winbriLifeBaseUrl = 'https://app-api.threestyle.in'
}

export const WINBRI_FILE_BASE_URL = 'https://files.threestyle.in'
export const WINBRI_BASE_URL = winbriBaseUrl
export const WINBRI_LIFE_BASE_URL = winbriLifeBaseUrl
