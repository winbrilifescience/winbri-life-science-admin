type FeedbackStatusValue = 'PENDING' | 'APPROVED' | 'REJECTED'
type OrderStatusValue = 'SUCCESS' | 'PENDING' | 'FAILED' | 'CANCELLED' | 'REFUNDED'
type OrderItemTypeValue = 'BOOKS'
type ShipmentStatusValue = 'PLACED' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED' | 'RETURN'
type ProjectSubmissionStatusValue = 'Reassigned' | 'Rejected' | 'Approved'

// API Response
type WinbriAPIResponse = {
	status: number
	response: string
	message?: string
	data?: object | object[] | any
	error?: string
	customCode?: string
	metadata?: object
	_developer?: string | object | object[]
}

type WinbriSearchOptions = {
	search?: string
}

type WinbriPaginationOptions = {
	page?: number
	limit?: number
	skip?: number
}

type WinbriSortOptions = {
	sort?: string
	sortOrder?: QuerySortOptions
}

type PaymentGateway =
	| 'RAZORPAY'
	| 'RAZORPAY_WINBRI'