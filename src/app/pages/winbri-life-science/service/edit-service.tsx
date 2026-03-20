import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { PageTitle } from '../../../../_metronic/layout/core'
import InputField from '../../../components/InputField'
import SelectField from '../../../components/SelectField'
import TableButton from '../../../components/TableButton'
import { GetServices, UpdateService } from '../../../Functions/WinbriLifeScience/Service'

const ServiceListEdit = () => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const service_id: string | any = searchParams.get('service_id')
	const [serviceData, setServiceData] = useState<any>({})

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target

		if (name === 'paymentMode') {
			setServiceData((prev: any) => ({
				...prev,
				paymentMode: value,
				cashReceivedAmount: '',
				upiReceivedAmount: '',
			}))
			return
		}

		if (
			event.target instanceof HTMLInputElement &&
			event.target.files &&
			event.target.files.length > 0
		) {
			const file = event.target.files[0]

			setServiceData((prev: any) => ({
				...prev,
				[name]: file,
				[`${name}Preview`]: URL.createObjectURL(file),
			}))
			return
		}

		setServiceData((prev: any) => ({
			...prev,
			[name]: value,
		}))
	}

	// const handleInputChange = (
	// 	event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	// 	index?: number
	// ) => {
	// 	const { name, value } = event.target

	// 	if (name.startsWith('assigned_user_') && index !== undefined) {
	// 		setServiceData((prev: any) => {
	// 			const updatedAssignments = [...(prev.healthCheckupAssignments || [])]

	// 			if (name === 'assigned_user_full_name') {
	// 				updatedAssignments[index].user.full_name = value
	// 			}

	// 			if (name === 'assigned_user_mobile') {
	// 				updatedAssignments[index].user.mobile = value
	// 			}

	// 			if (name === 'assigned_user_task') {
	// 				updatedAssignments[index].task = value.split(',')
	// 			}

	// 			return {
	// 				...prev,
	// 				healthCheckupAssignments: updatedAssignments,
	// 			}
	// 		})
	// 		return
	// 	}

	// 	setServiceData((prev: any) => ({
	// 		...prev,
	// 		[name]: value,
	// 	}))
	// }

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
			const payload: any = new FormData()

			payload.append('id', service_id)
			payload.append('serviceName', serviceData.serviceName)
			// payload.append('amount', serviceData.amount)
			payload.append('paymentMode', serviceData.paymentMode)
			payload.append('status', serviceData.status)

			if (serviceData.cashReceivedAmount)
				payload.append('cashReceivedAmount', serviceData.cashReceivedAmount)

			if (serviceData.upiReceivedAmount)
				payload.append('upiReceivedAmount', serviceData.upiReceivedAmount)

			if (serviceData.ecgReport) payload.append('ecgReport', serviceData.ecgReport)
			if (serviceData.pftReport) payload.append('pftReport', serviceData.pftReport)
			if (serviceData.bloodReport) payload.append('bloodReport', serviceData.bloodReport)
			if (serviceData.paymentImage) payload.append('paymentImage', serviceData.paymentImage)

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

	const handleFileButtonClick = () => {
		const fileInput = document.getElementById('fileInput') as HTMLInputElement | null
		if (fileInput) {
			fileInput.click()
		}
	}

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
										<div className='col-md-12 row text-center mb-5'>
											<div className='col-md-2 col-6'>
												<div className='mt-3'>
													<label
														htmlFor='ECG'
														className='fw-bold fs-6 mb-5'>
														ECG Report
													</label>
												</div>
												<img
													alt='ECG'
													src={serviceData.ecgReportPreview || '/media/avatars/winbri-logo.png'}
													style={{ borderRadius: '10px', width: '70%' }}
												/>
												<div className='mt-3'>
													<label className='mt-5 px-2 py-1 mb-2 btn btn-success'>
														Upload Document
														<input
															type='file'
															name='ecgReport'
															className='d-none'
															onChange={handleInputChange}
														/>
													</label>
												</div>
											</div>
											<div className='col-md-2 col-6'>
												<div className='mt-3'>
													<label
														htmlFor='PFT'
														className='fw-bold fs-6 mb-5'>
														PFT Report
													</label>
												</div>
												<img
													alt='PFT'
													src={serviceData.pftReportPreview || '/media/avatars/winbri-logo.png'}
													style={{ borderRadius: '10px', width: '70%' }}
												/>
												<div className='mt-3'>
													<label className='mt-5 px-2 py-1 mb-2 btn btn-success'>
														Upload Document
														<input
															type='file'
															name='pftReport'
															className='d-none'
															onChange={handleInputChange}
														/>
													</label>
												</div>
											</div>
											<div className='col-md-2 col-6'>
												<div className='mt-3'>
													<label
														htmlFor='Blood'
														className='fw-bold fs-6 mb-5'>
														Blood Report
													</label>
												</div>
												<img
													alt='Blood'
													src={serviceData.bloodReportPreview || '/media/avatars/winbri-logo.png'}
													style={{ borderRadius: '10px', width: '70%' }}
												/>
												<div className='mt-3'>
													<label className='mt-5 px-2 py-1 mb-2 btn btn-success'>
														Upload Document
														<input
															type='file'
															name='bloodReport'
															className='d-none'
															onChange={handleInputChange}
														/>
													</label>
												</div>
											</div>
											{(serviceData?.paymentMode === 'UPI' ||
												serviceData?.paymentMode === 'UPI & Cash') && (
												<div className='col-md-2 col-6 text-center'>
													<div className='mt-3'>
														<label
															htmlFor='Payment'
															className='fw-bold fs-6 mb-5'>
															Payment Image
														</label>
													</div>

													<img
														alt='Payment'
														src={
															serviceData.paymentImagePreview || '/media/avatars/winbri-logo.png'
														}
														style={{ borderRadius: '10px', width: '70%' }}
													/>

													<div className='mt-8'>
														<label className='d-md-block d-none mt-5 px-2 py-1 mb-2 btn btn-success'>
															Upload Image
															<input
																type='file'
																name='paymentImage'
																className='d-none'
																onChange={handleInputChange}
															/>
														</label>
														<label className='d-md-none d-block mt-5 px-2 py-1 mb-2 btn btn-success'>
															Upload <br /> Image
															<input
																type='file'
																name='paymentImage'
																className='d-none'
																onChange={handleInputChange}
															/>
														</label>
													</div>
												</div>
											)}
										</div>
										<SelectField
											className='col-md-6 fv-row mb-7'
											label='Payment Mode'
											name='paymentMode'
											value={serviceData?.paymentMode}
											onChange={handleInputChange}
											htmlFor='paymentMode'
											options={['Cash', 'UPI', 'UPI & Cash']}
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
										<SelectField
											className='col-md-6 fv-row mb-7'
											label='Status'
											name='status'
											value={serviceData?.status}
											onChange={handleInputChange}
											htmlFor='status'
											options={['Completed', 'Pending', 'Cancelled']}
										/>
										{/* </div> */}
									</div>
									<div className='col-md-4 fv-row mb-7'>
										<TableButton
											action='edit'
											onClick={() => handleUpdateButtonClick()}
											text='Update Service'
											backgroundDark={true}
											className='ms-0'
										/>
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

export { ServiceListEdit }
