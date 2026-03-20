import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { PageTitle } from '../../../../_metronic/layout/core'
import InputField from '../../../components/InputField'
import TableButton from '../../../components/TableButton'
import { GetServices, UpdateService } from '../../../Functions/WinbriLifeScience/Service'

const ServiceListView = () => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const service_id: string | any = searchParams.get('service_id')
	const [serviceData, setServiceData] = useState<any>({})

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index?: number
	) => {
		const { name, value } = event.target

		if (name.startsWith('assigned_user_') && index !== undefined) {
			setServiceData((prev: any) => {
				const updatedAssignments = [...(prev.healthCheckupAssignments || [])]

				if (name === 'assigned_user_full_name') {
					updatedAssignments[index].user.full_name = value
				}

				if (name === 'assigned_user_mobile') {
					updatedAssignments[index].user.mobile = value
				}

				if (name === 'assigned_user_task') {
					updatedAssignments[index].task = value.split(',')
				}

				return {
					...prev,
					healthCheckupAssignments: updatedAssignments,
				}
			})
			return
		}

		setServiceData((prev: any) => ({
			...prev,
			[name]: value,
		}))
	}

	const fetchServiceData = async () => {
		try {
			const response: any = await GetServices({ id: service_id })

			setServiceData(response.data?.[0])
		} catch (error) {
			console.error(error)
		}
	}

	const handleUpdateButtonClick = async () => {
		try {
			const payload: any = {
				id: service_id,
				serviceName: serviceData?.serviceName,
				amount: serviceData?.amount,
				assignedUsers: serviceData?.healthCheckupAssignments?.map((item: any) => item?.user?._id),
				healthCheckupAssignments: serviceData?.healthCheckupAssignments?.map((item: any) => ({
					user: item?.user?._id,
					task: item?.task,
				})),
				address: serviceData?.address,
				location: serviceData?.location,
				mobile: serviceData?.mobile,
				paymentMode: serviceData?.paymentMode,
				upiReceivedAmount: serviceData?.upiReceivedAmount,
				cashReceivedAmount: serviceData?.cashReceivedAmount,
			}

			await UpdateService(payload)

			toast.success('Service Updated Successfully')
			fetchServiceData()
		} catch (error: any) {
			toast.error(error.message)
			console.error(error)
		}
	}

	useEffect(() => {
		fetchServiceData()
	}, [])

	return (
		<>
			<PageTitle breadcrumbs={[]}>Service View</PageTitle>
			<div className='row'>
				<div className='col-12 mt-3'>
					<div className='card pt-10'>
						<div className='card-body'>
							<div className='row'>
								<div className='col-12'>
									<div className='row'>
										<InputField
											placeholder='Enter Service Name'
											type='text'
											className='col-md-6 fv-row mb-7'
											name='serviceName'
											label='Service Name'
											htmlFor='serviceName'
											value={serviceData?.serviceName}
											onChange={handleInputChange}
										/>
										<InputField
											placeholder='Enter Mobile'
											type='text'
											className='col-md-6 fv-row mb-7'
											name='mobile'
											label='Mobile'
											htmlFor='mobile'
											value={serviceData?.mobile}
											onChange={handleInputChange}
										/>
										<InputField
											placeholder='Enter Address'
											type='text'
											className='col-12 fv-row mb-7'
											name='address'
											label='Address'
											htmlFor='address'
											value={serviceData?.address}
											onChange={handleInputChange}
										/>
										<InputField
											placeholder='Enter Location'
											type='text'
											className='col-md-6 fv-row mb-7'
											name='location'
											label='Location'
											htmlFor='location'
											value={serviceData?.location}
											onChange={handleInputChange}
										/>
										<InputField
											placeholder='Enter Amount'
											type='text'
											className='col-md-6 fv-row mb-7'
											name='amount'
											label='Amount'
											htmlFor='amount'
											value={serviceData?.amount}
											onChange={handleInputChange}
										/>
										<div className='col-md-12 fv-row border-top pt-5'>
											<label
												htmlFor='type'
												className='required fw-bold fs-6 mb-5'>
												Assigned Users
											</label>
											{serviceData?.healthCheckupAssignments?.map((data: any, index: any) => {
												return (
													<div
														className='row'
														key={index}>
														<InputField
															placeholder='Enter Name'
															type='text'
															className='col-md-4 fv-row mb-7'
															name='assigned_user_full_name'
															label='Name'
															htmlFor='assigned_user_full_name'
															value={data?.user?.full_name}
															onChange={(e: any) => handleInputChange(e, index)}
														/>
														<InputField
															placeholder='Enter Mobile'
															type='text'
															className='col-md-4 fv-row mb-7'
															name='assigned_user_mobile'
															label='Mobile'
															htmlFor='assigned_user_mobile'
															value={data?.user?.mobile}
															onChange={(e: any) => handleInputChange(e, index)}
														/>
														<InputField
															placeholder='Enter Task'
															type='text'
															className='col-md-4 fv-row mb-7'
															name='assigned_user_task'
															label='Task'
															htmlFor='assigned_user_task'
															value={data?.task?.join(',')}
															onChange={(e: any) => handleInputChange(e, index)}
														/>
													</div>
												)
											})}
										</div>
										<div className='fv-row col-12 border-top pt-5'>
											<InputField
												placeholder='Enter Payment Mode'
												type='text'
												className='col-md-6 fv-row mb-7'
												name='paymentMode'
												label='Payment Mode'
												htmlFor='paymentMode'
												value={serviceData?.paymentMode}
												onChange={handleInputChange}
											/>
											{serviceData?.paymentMode === 'Cash' && (
												<InputField
													placeholder='Enter Cash Amount'
													type='text'
													className='col-md-6 fv-row mb-7'
													name='cashReceivedAmount'
													label='Received Cash Amount'
													htmlFor='cashReceivedAmount'
													value={serviceData?.cashReceivedAmount || ''}
													onChange={handleInputChange}
												/>
											)}
											{serviceData?.paymentMode === 'UPI' && (
												<InputField
													placeholder='Enter UPI Amount'
													type='text'
													className='col-md-6 fv-row mb-7'
													name='upiReceivedAmount'
													label='Received UPI Amount'
													htmlFor='upiReceivedAmount'
													value={serviceData?.upiReceivedAmount || ''}
													onChange={handleInputChange}
												/>
											)}
											{serviceData?.paymentMode === 'UPI & Cash' && (
												<>
													<InputField
														placeholder='Enter Cash Amount'
														type='text'
														className='col-md-6 fv-row mb-7'
														name='cashReceivedAmount'
														label='Received Cash Amount'
														htmlFor='cashReceivedAmount'
														value={serviceData?.cashReceivedAmount || ''}
														onChange={handleInputChange}
													/>

													<InputField
														placeholder='Enter UPI Amount'
														type='text'
														className='col-md-6 fv-row mb-7'
														name='upiReceivedAmount'
														label='Received UPI Amount'
														htmlFor='upiReceivedAmount'
														value={serviceData?.upiReceivedAmount || ''}
														onChange={handleInputChange}
													/>
												</>
											)}
											<InputField
												placeholder='Enter Status'
												type='text'
												className='col-md-6 fv-row mb-7'
												name='status'
												label='Status'
												htmlFor='status'
												value={serviceData?.status}
												onChange={handleInputChange}
											/>
										</div>
										<div className='col-md-4 fv-row mb-7'>
											<TableButton
												action='edit'
												onClick={() => handleUpdateButtonClick()}
												text='Update Service'
												backgroundDark={true}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <AddAuthApp /> */}
		</>
	)
}

export { ServiceListView }
