export const feedbackStatus = {
	pending: 'PENDING',
	approved: 'APPROVED',
	rejected: 'REJECTED',
}

export const orderStatus = {
	success: 'SUCCESS', // After Successful Payment
	pending: 'PENDING', // Before Successful Payment
	failed: 'FAILED', // Failed due to not paid for long time
	cancelled: 'CANCELLED', // Cancelled by user
	refunded: 'REFUNDED', // Refunded by admin
}

export const itemType = {
	books: 'BOOKS', // Ref.: Books [WINBRI]
}

export const shipmentStatus = {
	placed: 'PLACED',
	dispatched: 'DISPATCHED',
	delivered: 'DELIVERED',
	cancelled: 'CANCELLED',
	returned: 'RETURN',
}

export const projectSubmissionStatus = {
	submitted: 'Submitted',
	reassigned: 'Reassigned',
	rejected: 'Rejected',
	approved: 'Approved',
}

export type StudentBatchTimeTableType = [
	{
		id?: string
		date: string // YYYY/MM/DD
		end_date?: string // YYYY/MM/DD
		frequency_interval?: FrequencyInterval
		note?: string
		time?: {
			start_time?: string // HH:MM
			end_time?: string // HH:MM
		}
		meeting_link?: {
			link?: string
			platform?: string
			join_password?: string
		}
	}
]

export const timeUnit = {
	day: 'DAY',
	week: 'WEEK',
	month: 'MONTH',
	year: 'YEAR',
}
export type TimeUnit = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'

export type FrequencyInterval = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'
