import { HttpStatusCode } from 'axios'
import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as WinbriEndpoints from '../../constants/winbri_endpoints'

// Winbri Life Science
export async function LoginWinbri(data: {
	email: string
	password: string
	authenticator_token?: string
}): Promise<WinbriAPIResponse> {
	return await APIPost(WinbriEndpoints.Login, undefined, undefined, data)
		.then(async (response: any) => {
			if (response.status === HttpStatusCode.Ok) {
				localStorage.setItem('@winbri+auth', response.data.authorization)
				return await GetUniversalAccessTokens()
			} else {
				return response
			}
		})
		.catch((error) => error)
}

// Login with Email-Password and OTP
export function LoginWithEmailPasswordOTP(data: {
	email: string
	password: string
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.LoginWithEmailOTP, undefined, undefined, data)
}

export async function VerifyEmailOTP(data: {
	verification_id: string
	otp: string
}): Promise<WinbriAPIResponse> {
	return await APIPost(WinbriEndpoints.VerifyEmailOTP, undefined, undefined, data)
		.then(async (response: any) => {
			if (response.status === HttpStatusCode.Ok) {
				localStorage.setItem('@winbri+auth', response.data.authorization)
				return await GetUniversalAccessTokens()
			} else {
				return response
			}
		})
		.catch((error) => error)
}

export async function GetUniversalAccessTokens(): Promise<WinbriAPIResponse> {
	return await APIGet(WinbriEndpoints.GetUniversalAccessToken, {
		Authorization: localStorage.getItem('@winbri+auth'),
	})
		.then((response: any) => {
			if (response.status !== 200) throw response
			if (response?.data?.length) {
				const currentUrl = window.location.pathname
				response?.data.forEach((item: { platform: string; access: string }) => {
					if (item.platform && item.access) {
						localStorage.setItem('auth_' + item.platform, item.access)
						if (currentUrl === '/master/login') {
							localStorage.setItem('admin', 'Master')
						} else {
							localStorage.setItem('admin', 'Admin')
						}
					}
				})
				// window.location.href = '/'
			}
			return response
		})
		.catch((error) => error)
		.finally(() => {
			localStorage.removeItem('@winbri+auth')
		})
}

export function getProfile(): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetProfile, getAPIHeaders('winbri_life_science'))
}

export function UpdateProfile(data: {
	first_name?: string
	last_name?: string
	birth_date?: string
	email?: string
	phone?: string
	address_line_1?: string
	address_line_2?: string
	city?: string
	state?: string
	pin_code?: string
	country?: string
	fcm_token?: string
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.UpdateProfile, getAPIHeaders('winbri_life_science'), undefined, data)
}

/**
 * Change the password for the user.
 * @param data - An object containing the new password and the old password.
 * @returns A Promise that resolves to the result of the API call.
 */
export function ChangePassword(data: {
	password: string
	old_password: string
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.ChangePassword, getAPIHeaders('winbri_life_science'), undefined, data)
}

export function AddAuthenticatorSecret(body: {
	secret: string
	remark: string
}): Promise<WinbriAPIResponse> {
	return APIPost(
		WinbriEndpoints.AddAuthenticatorSecret,
		getAPIHeaders('winbri_life_science'),
		undefined,
		body
	)
}

export function RemoveAuthenticatorSecret(body: {
	secret_id: string
}): Promise<WinbriAPIResponse> {
	return APIPost(
		WinbriEndpoints.RemoveAuthenticatorSecret,
		getAPIHeaders('winbri_life_science'),
		undefined,
		body
	)
}

export function FileUploadToWinbri(
	files: any,
	body: { directory: string } = { directory: 'files' }
): Promise<WinbriAPIResponse> | null {
	if (!files) {
		return null
	}

	const formData = new FormData()

	formData.append('directory', body.directory)

	if (!Array.isArray(files)) {
		files = [files]
	}

	files.forEach((file: any) => {
		file.fileURL = URL.createObjectURL(file)
		formData.append('files', file)
	})

	return APIPost(
		WinbriEndpoints.FileUpload,
		getAPIHeaders('winbri_life_science', { 'Content-Type': 'multipart/form-data' }),
		undefined,
		formData
	)
}
