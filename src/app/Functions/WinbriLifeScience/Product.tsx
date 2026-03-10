import { getAPIHeaders } from '../../../_metronic/helpers/AuthToken'
import { APIGet, APIPost } from '../../../_metronic/helpers/Utils'
import * as WinbriEndpoints from '../../constants/winbri_endpoints'

export function AddProduct(body: {
	display_image: string[]
	name: string
	price: number
	original_price: number
	discount_percentage: number
	description: string
	short_description: string
	categories: string
	fabric: string
	sub_categories: string
	tags: string[]
	variants?: {
		name: string
		price: number
		stock: number
		images: string[]
		color?: {
			color_name: string
			color_code: string
		}
	}[]
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.AddProduct, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function UpdateProduct(body: {
	id: string
	display_image?: string[]
	name: string
	price?: number
	original_price?: number
	discount_percentage?: number
	description?: string
	categories?: string
	fabric?: string
	sub_categories?: string
	stock?: number
	color?: {
		color_name?: string
		color_code?: string
	}
	tags?: string[]
	variants?: {
		name: string
		price?: number
		original_price?: number
		discount_percentage?: number
		stock?: number
		images?: string[]
		color?: {
			color_name?: string
			color_code?: string
		}
		size?: string
		sku?: string
	}[]
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.UpdateProduct, getAPIHeaders('winbri_life_science'), undefined, body)
}

export function GetProduct(
	query?: { id?: string } & WinbriSearchOptions & WinbriPaginationOptions & WinbriSortOptions
): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetProduct, getAPIHeaders('winbri_life_science'), query)
}

export function SetProductTrackingStatus(body: {
	user_product_id: string
	status: boolean
	shipment_status: ShipmentStatusValue
}): Promise<WinbriAPIResponse> {
	return APIPost(
		WinbriEndpoints.SetProductTrackingStatus,
		getAPIHeaders('winbri_life_science'),
		undefined,
		body
	)
}

/**
 *
 * @deprecated
 * @see GetProductFeedback
 */
export function GetProductReviews(
	query?: WinbriPaginationOptions & WinbriSortOptions
): Promise<WinbriAPIResponse> {
	console.warn('[DEPRECATED] Use GetProductFeedback() instead of GetProductReviews()')
	return APIGet(WinbriEndpoints.GetProductReviews, getAPIHeaders('winbri_life_science'), query)
}

/**
 * @deprecated The method should not be used
 * @see UpdateProductFeedback
 */
export function UpdateProductReview(body: {
	id: string
	status: boolean
}): Promise<WinbriAPIResponse> {
	console.warn('[DEPRECATED] Use UpdateProductFeedback() instead of UpdateProductReview()')
	return APIPost(
		WinbriEndpoints.UpdateProductReview,
		getAPIHeaders('winbri_life_science'),
		undefined,
		body
	)
}

export function GetProductFeedback(
	query?: { feedback_id?: string } & WinbriPaginationOptions & WinbriSortOptions
): Promise<WinbriAPIResponse> {
	return APIGet(WinbriEndpoints.GetProductFeedback, getAPIHeaders('winbri_life_science'), query)
}

export function UpdateProductFeedback(body: {
	feedback_id: string
	status: FeedbackStatusValue
}): Promise<WinbriAPIResponse> {
	return APIPost(WinbriEndpoints.GetProductFeedback, getAPIHeaders('winbri_life_science'), undefined, body)
}
