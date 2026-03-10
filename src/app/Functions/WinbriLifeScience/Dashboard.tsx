import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet } from '../../../_metronic/helpers/Utils'
import * as WinbriEndpoints from '../../constants/winbri_endpoints'

export function GetGeneralDashboard(): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GeneralDashboardStats, getAPIHeaders('winbri_life_science'))
}

/**
 * @deprecated
 * @see Insights.GetStudentsStats
 */
export function GetStudentDashboard(): Promise<WinbriAPIResponse> {
	console.warn(
		'[DEPRECATED] Use Insights.GetStudentsStats() instead of Dashboard.GetStudentDashboard()'
	)
	return APIGet(WinbriEndpoints.StudentDashboardStats, getAPIHeaders('winbri_life_science'))
}
