import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { KTCard } from '../../../../_metronic/helpers'
import { DayJS } from '../../../../_metronic/helpers/Utils'
import { PageTitle } from '../../../../_metronic/layout/core'
import LengthMenu from '../../../components/LengthMenu'
import SearchFilter from '../../../components/SearchFilter'
import Table from '../../../components/Table'
import TableButton from '../../../components/TableButton'
import UsersListPagination from '../../../components/TablePagination'
import { GetServices, UpdateService } from '../../../Functions/WinbriLifeScience/Service'

const ServiceList: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [serviceData, setServiceData] = useState<any>([])
	const [metaData, setMetaData] = useState<any>()
	const [sort, setSort] = useState('createdAt')
	const [sortOrder, setSortOrder] = useState<QuerySortOptions>('desc')
	const [visibleDetails, setVisibleDetails] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [pagination, setPagination] = useState({
		page: 1,
		itemsPerPage: 10,
	})

	const fetchData = async (page?: number) => {
		setLoading(true)
		try {
			const response: any = await GetServices({
				page: page || pagination.page,
				limit: pagination.itemsPerPage,
				search: searchTerm,
				sort,
				sortOrder,
			})
			setServiceData(response.data)

			const metaData: any = response.metadata
			setMetaData(metaData.pagination)
		} catch (error: any) {
			console.error(error)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [pagination.page, pagination.itemsPerPage, sort, sortOrder])

	const handleItemsPerPageChange = (value: number) => {
		setPagination({ ...pagination, itemsPerPage: value })
	}

	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (searchTerm.trim() || searchTerm === '') {
			setPagination((prev) => ({ ...prev, page: 1 }))
			if (pagination.page === 1) fetchData()
		}
	}, [searchTerm])

	const handlePageChange = (page: number) => {
		setPagination({ ...pagination, page })
		sessionStorage.setItem('currentPage', page.toString())
	}

	useEffect(() => {
		const storedPage = sessionStorage.getItem('currentPage')
		if (storedPage) {
			setPagination((prev) => ({ ...prev, page: parseInt(storedPage, 10) }))
		}
	}, [])

	const handleSortChange = (newSort: string, newSortOrder: QuerySortOptions) => {
		setSort(newSort)
		setSortOrder(newSortOrder)
	}

	const sortableFields = [
		// { title: 'entry No', field: '_id' },
		{ title: 'Service', field: 'serviceName' },
		{ title: 'Assigned Users', field: 'assignedUsers' },
		{ title: 'Mobile', field: 'mobile' },
		{ title: 'amount', field: 'amount' },
		{ title: 'Status', field: 'status' },
		{ title: 'Created At', field: 'createdAt' },
	]

	const handleRowClick = (id: string) => {
		if (window.innerWidth <= 1024) {
			setVisibleDetails(visibleDetails === id ? null : id)
		}
	}

	const handleCopy = (id: string) => {
		navigator.clipboard
			.writeText(id)
			.then(() => {
				toast.success('ID copied to clipboard!')
			})
			.catch((err) => {
				console.error('Failed to copy ID: ', err)
				toast.success('Failed to copy ID!')
			})
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>, id: string) => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleCopy(id)
		}
	}

	const handleRemoveService = async (service_id: any) => {
		try {
			const payload: any = {
				id: service_id,
				status: false,
			}
			await UpdateService(payload)

			toast.success('Service Remove Successfully')
			fetchData()
		} catch (error: any) {
			toast.error(error.message)
			console.error(error)
		}
	}

	return (
		<>
			<PageTitle breadcrumbs={[]}>Winbri Life Science Services</PageTitle>
			<KTCard>
				<div className='card-header border-0 pt-6'>
					<div className='card-title'>
						<div className='card-branch_code d-flex'>
							{/* <SearchFilter
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
							/>
							<LengthMenu
								expenseData={serviceData}
								handleItemsPerPageChange={handleItemsPerPageChange}
							/> */}
							<div className='col-md-7'>
								<SearchFilter
									searchTerm={searchTerm}
									setSearchTerm={setSearchTerm}
								/>
							</div>
							<div className='d-md-block d-none ms-3'>
								<LengthMenu
									expenseData={serviceData}
									handleItemsPerPageChange={handleItemsPerPageChange}
								/>
							</div>
						</div>
					</div>
					<div className='card-toolbar'>
						<div className='d-md-none d-block'>
							<LengthMenu
								expenseData={serviceData}
								handleItemsPerPageChange={handleItemsPerPageChange}
							/>
						</div>
						<TableButton
							action='add'
							to='/winbri-life-science/service-add'
							text='Add Service'
						/>
					</div>
				</div>
				<div className='py-4 card-body'>
					<div className='table-responsive'>
						<Table
							data={serviceData}
							columns={sortableFields}
							sort={sort}
							sortOrder={sortOrder}
							onSortChange={handleSortChange}
							renderRow={(service: any, index: number, actualIndex: number, isVisible: boolean) => (
								<React.Fragment key={index}>
									<tr
										onClick={() => handleRowClick(service._id)}
										className='data-row'>
										<td>
											<span className='text-dark fw-bold d-flex ms-6 mb-1 fs-6'>
												<FontAwesomeIcon
													icon={faPlusCircle}
													className='me-2 plus-icon'
													style={{ color: '#607D8B', fontSize: '18px' }}
												/>
												{actualIndex}
											</span>
										</td>
										<td>
											<span className='text-dark fw-bold  d-block mb-1 fs-6'>
												{DayJS(service.createdAt).format('DD/MM/YYYY hh:mm A')}
											</span>
										</td>
										<td>
											<span className='text-dark fw-bold  d-block mb-1 fs-6'>
												{service.serviceName}
											</span>
										</td>
										<td>
											<div className='d-flex align-items-center'>
												<div className='d-flex justify-content-start flex-column'>
													{service?.healthCheckupAssignments.map((data: any, index: any) => (
														<div
															className='d-flex align-items-center'
															key={index}>
															<div className=' me-5'>
																<div
																	style={{
																		height: '7px',
																		width: '7px',
																		backgroundColor: 'rgb(179 179 179)',
																		borderRadius: '50%',
																	}}></div>
															</div>
															<div className='d-flex justify-content-start flex-column'>
																<span
																	className='text-dark fw-bold  fs-6'
																	key={index}>
																	{data?.user?.full_name}
																</span>
																<span className='text-muted fw-semibold text-muted d-block fs-7'>
																	{data?.user?.mobile}
																</span>
																<span className='text-dark fw-semibold d-block fs-7'>
																	{data?.task?.join(', ')}
																</span>
															</div>
														</div>
													))}
												</div>
											</div>
										</td>
										<td>
											<span className='text-dark fw-bold  d-block mb-1 fs-6'>{service.mobile}</span>
										</td>
										<td>
											<span className='text-dark fw-bold  d-block mb-1 fs-6'>
												₹{service.amount}
											</span>
										</td>
										<td>
											<span className='text-dark fw-bold  d-block mb-1 fs-6'>{service.status}</span>
										</td>
										<td>
											<div className='row flex-column'>
												<TableButton
													action='edit'
													className='col-8 my-2'
													to={'/winbri-life-science/service-edit?service_id=' + service._id}
												/>
												<TableButton
													action='view'
													className='col-8 my-2'
													to={'/winbri-life-science/service-view?service_id=' + service._id}
												/>
												<TableButton
													action='remove'
													className='col-8 my-2'
													onClick={() => handleRemoveService(service?._id)}
												/>
											</div>
										</td>
									</tr>
									{isVisible && (
										<tr className={`detail-row ${isVisible ? 'is-visible' : ''}`}>
											<td colSpan={12}>
												<div className='p-3'>
													<div>
														<strong>Service:</strong> {service.serviceName}
													</div>

													<div className='mt-2'>
														<strong>Assigned Users:</strong>
														<ul>
															{service?.healthCheckupAssignments?.map(
																(data: any, index: number) => (
																	<li>
																		<div
																			key={index}
																			className='ms-1 mt-1'>
																			<div>
																				<b>{data?.user?.full_name}</b>
																			</div>
																			<div className='text-muted'>{data?.user?.mobile}</div>
																			<div>{data?.task?.join(', ')}</div>
																		</div>
																	</li>
																)
															)}
														</ul>
													</div>

													<div className='mt-2'>
														<strong>Mobile:</strong> {service.mobile}
													</div>

													<div className='mt-2'>
														<strong>Amount:</strong> ₹{service.amount}
													</div>

													<div className='mt-2'>
														<strong>Status:</strong> {service.status}
													</div>

													<div className='mt-2'>
														<strong>Created At:</strong>{' '}
														{DayJS(service.createdAt).format('DD/MM/YYYY hh:mm A')}
													</div>
												</div>
											</td>
										</tr>
									)}
								</React.Fragment>
							)}
							visibleDetails={visibleDetails}
							pagination={pagination}
							setPagination={setPagination}
							loading={loading}
						/>
					</div>
					{serviceData.length === 0 && !loading && (
						<div className='d-flex text-center w-100 align-content-center justify-content-center mt-5'>
							<b>No records found</b>
						</div>
					)}
					{serviceData.length > 0 && (
						<UsersListPagination
							totalPages={metaData?.totalPages}
							currentPage={pagination.page}
							onPageChange={handlePageChange}
						/>
					)}
				</div>
			</KTCard>
		</>
	)
}

export default ServiceList
