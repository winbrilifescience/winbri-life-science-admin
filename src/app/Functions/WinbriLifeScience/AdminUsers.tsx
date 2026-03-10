import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as WinbriEndpoints from '../../constants/winbri_endpoints'

export function GetAdminUsers(query?: { adminID?: string }): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetAdminUsers, getAPIHeaders('winbri_life_science'), query)
}

export function ResetPassword(body: { id: string; password: string }): Promise<WinbriAPIResponse> {
	return APIPost(
		WinbriEndpoints.ResetAdminUserPassword,
		getAPIHeaders('winbri_life_science'),
		undefined,
		body
	)
}

export function RemoveAdminUser(body: { id: string }): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.RemoveAdminUser, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function CreateAdmin(body: {
	full_name: string
	mobile: string
	type: string
	email: string
	password: string
	franchise_id: string
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.CreateAdminAccount, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function UpdateAdmin(body: {
	full_name: string
	email: string
	mobile: string
	id: string
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.UpdateAdminUsers, getAPIHeaders('winbri_life_science'), undefined, body)
}
