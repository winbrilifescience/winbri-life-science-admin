export const getPlatformAuthorizationToken = (
	platform: 'winbri_life_science'
): string | null => {
	return localStorage.getItem('auth_' + platform)
}

export function getAPIHeaders(
	platform: 'winbri_life_science',
	additionalHeaders?: object
): object {
	return {
		'Content-Type': 'application/json',
		Authorization: getPlatformAuthorizationToken(platform),
		...additionalHeaders,
	}
}
