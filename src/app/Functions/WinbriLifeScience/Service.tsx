import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as WinbriEndpoints from '../../constants/winbri_endpoints'

export function CreateService(body: {
	serviceName: string
	amount: number
	assignedUsers: [string]
	healthCheckupAssignments: [
		{
			user: string
			task: [string]
		},
		{
			user: string
			task: [string]
		}
	]
	address: string
	location: string
	mobile: number
	paymentMode: string
	upiReceivedAmount: number
	cashReceivedAmount: number
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.CreateService, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function UpdateService(body: {
	id: string
	serviceName: string
	amount: number
	assignedUsers: [string]
	healthCheckupAssignments: [
		{
			user: string
			task: [string]
		},
		{
			user: string
			task: [string]
		}
	]
	address: string
	location: string
	mobile: number
	paymentMode: string
	upiReceivedAmount: number
	cashReceivedAmount: number
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.UpdateService, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function RemoveService(body: { id: string }): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.RemoveService, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function GetServices(
	query?: { id?: string } & WinbriSearchOptions & WinbriPaginationOptions & WinbriSortOptions
): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetServices, getAPIHeaders('winbri_life_science'), query)
}
