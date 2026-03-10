import { HttpStatusCode } from 'axios'
import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as WinbriEndpoints from '../../constants/winbri_endpoints'

export function GetUsers(
	query?: { id?: string } & WinbriSearchOptions & WinbriPaginationOptions & WinbriSortOptions
): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetUsers, getAPIHeaders('winbri_life_science'), query)
}

export function GetStudents(
	query?: {
		id?: string
		course_id?: string
		alumni?: boolean
		course_category?: string
	} & WinbriSearchOptions &
		WinbriPaginationOptions &
		WinbriSortOptions
): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetStudentUsers, getAPIHeaders('winbri_life_science'), query)
}

export function UpdateUser(body: {
	id: string
	first_name?: string
	last_name?: string
	alumni?: boolean
	address_line_1?: string
	address_line_2?: string
	city?: string
	state?: string
	country?: string
	pin_code?: string
	notes?: string
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.UpdateUser, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function LockUnlockUser(body: {
	user_id: string
	lock?: boolean
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.LockUnlockUser, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function RemoveUser(body: { id: string }): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.RemoveUser, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function CreateUser(body: {
	first_name: string
	last_name: string
	mobile: string
	email: string
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.CreateUser, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function GetUserDietPreferences(
	query?: { user_id?: string } & WinbriSearchOptions &
		WinbriPaginationOptions &
		WinbriSortOptions
): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetUserDietPreference, getAPIHeaders('winbri_life_science'), query)
}

export function SendPushNotification(body: {
	user_id?: string
	email?: string
	mobile?: string
	message?: string
	title: string
	channelId?: string
	channelName?: string
}): Promise<WinbriAPIResponse> {
	if (!body.user_id && !body.email && !body.mobile) {
		return Promise.reject({
			status: HttpStatusCode.BadRequest,
			response: 'Bad Request',
			message: 'At least one of user_id, email or mobile is required',
		})
	}

	return APIPost(WinbriEndpoints.SendFCMNotification, getAPIHeaders('winbri_life_science'), undefined, body)
}
