import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIDelete, APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as WinbriEndpoints from '../../constants/winbri_endpoints'

type BillingAddress = {
	address_line_1?: string
	city?: string
	state?: string
	pin_code?: string
}

type BankDetails = {
	account_type?: string
	account_number?: string
	bank_name?: string
	branch_code?: string
}

type item = {
	_id?: string
	item_name: string
	amount: string
	totalAmount: string
	quantity: string
	delete?: boolean
}

export function createInvoice(body: {
	invoice_category: string
	invoice_number?: string
	date: string
	branch_name?: string
	name: string
	email?: string
	mobile?: string
	billing_address?: BillingAddress
	bank_details?: BankDetails
	payment_method?: string
	net_amount: number
	paid_amount: number
	note?: string
	items: item[]
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.CreateInvoice, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function updateInvoice(body: {
	id: string
	invoice_number?: number
	date?: string
	branch_name?: string
	name?: string
	email?: string
	mobile?: string
	billing_address?: BillingAddress
	bank_details?: BankDetails
	payment_method?: string
	net_amount?: number
	paid_amount?: number
	note?: string
	items?: item[]
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.UpdateInvoice, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function deleteInvoice(query: { id: string }): Promise<WinbriAPIResponse> {
	return APIDelete(WinbriEndpoints.DeleteInvoice, getAPIHeaders('winbri_life_science'), query)
}

export function getInvoice(
	query?: {
		id?: string
		invoice_category?: string
		from_date?: Date
		to_date?: Date
		unpaid_only?: boolean
		paid_only?: boolean
	} & WinbriSearchOptions &
		WinbriPaginationOptions &
		WinbriSortOptions
): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetInvoices, getAPIHeaders('winbri_life_science'), query)
}

export function getNextInvoiceSequence(query?: {
	invoice_category: string
}): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetNextInvoiceSequence, getAPIHeaders('winbri_life_science'), query)
}

/**
 * @deprecated Use Insights API (Insights/GetInvoiceInsights) instead
 * @see Insights.GetInvoiceInsights
 */
export function getInvoiceStats(query: { invoice_category: string }): Promise<WinbriAPIResponse> {
	console.warn(
		`[DEPRECATED] Use Insights API (Insights/GetInvoiceInsights) instead of GetInvoiceStats()`
	)
	return APIGet(WinbriEndpoints.GetInvoiceStats, getAPIHeaders('winbri_life_science'), query)
}
