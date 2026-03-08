import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import { PageTitle } from '../../../../_metronic/layout/core'
import InputField from '../../../components/InputField'
import TableButton from '../../../components/TableButton'
import { AddProduct, FileUploadToFGGroup } from '../../../Functions/FGGroup'
import { GetCategories } from '../../../Functions/FGGroup/Categories'
import { GetFabric } from '../../../Functions/FGGroup/Fabric'
import { GetSubCategories } from '../../../Functions/FGGroup/SubCategories'
import SelectFieldManual from '../../../components/SelectFieldManual'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { TagsInput } from 'react-tag-input-component'

const AddProducts = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [categoriesData, setCategoriesData] = useState([])
	const [fabricData, setFabricData] = useState([])
	const [subCategoriesData, setSubCategoriesData] = useState([])
	const [selectedData, setSelectedData] = useState<any>({
		categories: { name: '', _id: '' },
		fabric: { name: '', _id: '' },
		subCategories: { name: '', _id: '' },
	})

	const [formData, setFormData] = useState({
		name: '',
		price: '',
		display_image: '',
		original_price: '',
		discount_percentage: '',
		description: '',
		short_description: '',
		stock: '',
		color_name: '',
		color_code: '',
		tags: [] as string[],
		selectedFile: null as File | null,
		variants: [{}] as any[],
	})

	const [imageArray, setImageArray] = useState<string[]>([])
	const [editingIndex, setEditingIndex] = useState<number | null>(null)
	const addImageInputRef = useRef<HTMLInputElement>(null)
	const variantFileInputs = useRef<(HTMLInputElement | null)[]>([])

	// ===== Fetch dropdown data =====
	useEffect(() => {
		GetCategories().then((res: any) => setCategoriesData(res.data))
		GetFabric().then((res: any) => setFabricData(res.data))
		GetSubCategories().then((res: any) => setSubCategoriesData(res.data))
	}, [])

	// ===== Variants Handling =====
	const handleAddVariant = () => {
		setFormData((prev) => ({
			...prev,
			variants: [...prev.variants, { stock: '', color_name: '', color_code: '', images: [] }],
		}))
	}

	const handleRemoveVariant = (vIndex: number) => {
		setFormData((prev) => ({
			...prev,
			variants: prev.variants.filter((_: any, i: number) => i !== vIndex),
		}))
	}

	const handleVariantChange = (vIndex: number, field: string, value: any) => {
		const updatedVariants = [...formData.variants]
		updatedVariants[vIndex][field] = value
		setFormData((prev) => ({ ...prev, variants: updatedVariants }))
	}

	const handleAddVariantImage = (vIndex: number) => {
		variantFileInputs.current[vIndex]?.click()
	}

	const handleVariantImageChange = async (
		vIndex: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0]
		if (!file) return
		try {
			const res: any = await FileUploadToFGGroup([file], { directory: 'files' })
			const imgUrl = res.data?.fileURLs[0]
			if (imgUrl) {
				const updatedVariants = [...formData.variants]
				updatedVariants[vIndex].images = [...(updatedVariants[vIndex].images || []), imgUrl]
				setFormData((prev) => ({ ...prev, variants: updatedVariants }))
				toast.success('Variant image uploaded')
			}
		} catch (err) {
			console.error(err)
			toast.error('Failed to upload variant image')
		}
	}

	const handleRemoveVariantImage = (vIndex: number, index: number) => {
		const updatedVariants = [...formData.variants]
		updatedVariants[vIndex].images = updatedVariants[vIndex].images.filter(
			(_: string, i: number) => i !== index
		)
		setFormData((prev) => ({ ...prev, variants: updatedVariants }))
	}

	// ===== Common Handlers =====
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, name, value } = event.target
		if (id === 'fileInput' && event.target instanceof HTMLInputElement && event.target.files) {
			const file = event.target.files[0]
			setFormData((prev) => ({
				...prev,
				selectedFile: file,
				display_image: URL.createObjectURL(file),
			}))
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }))
		}
	}

	const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const selectedId = event.target.value
		const name = event.target.name
		const findAndSet = (data: any[], key: string) => {
			const selectedData: any = data.find((d: any) => d._id === selectedId)
			if (selectedData) {
				setSelectedData((prev: any) => ({
					...prev,
					[key]: { name: selectedData.name, _id: selectedData._id },
				}))
			}
		}
		if (name === 'categories') findAndSet(categoriesData, 'categories')
		else if (name === 'fabric') findAndSet(fabricData, 'fabric')
		else if (name === 'sub_categories') findAndSet(subCategoriesData, 'subCategories')
	}

	// ===== Image Handlers =====
	const handleUpdateFileButtonClick = (index: any) => {
		setEditingIndex(index)
		addImageInputRef.current?.click()
	}

	const handleAddImage = () => {
		addImageInputRef.current?.click()
	}

	const handleAddImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		try {
			const imageUrl: any = await FileUploadToFGGroup([file], { directory: 'files' })
			const imgUrl = imageUrl.data?.fileURLs[0]
			if (imgUrl) {
				setImageArray((prev) => {
					if (editingIndex !== null) {
						const newArray = [...prev]
						newArray[editingIndex] = imgUrl
						return newArray
					} else {
						return [...prev, imgUrl]
					}
				})
				setEditingIndex(null)
				toast.success('Image uploaded successfully')
			} else {
				toast.error('Failed to retrieve uploaded image URL')
			}
		} catch (err) {
			console.error('Image upload failed:', err)
			toast.error('Image upload failed')
		}
	}

	const handleRemoveImage = (indexToRemove: any) => {
		setImageArray((prev) => prev.filter((_, idx) => idx !== indexToRemove))
	}

	// ===== Submit =====
	const handleAddButtonClick = async () => {
		try {
			setIsSubmitting(true)
			const payload: any = {
				display_image: imageArray,
				name: formData.name,
				price: formData.price,
				original_price: formData.original_price,
				discount_percentage: formData.discount_percentage,
				description: formData.description,
				short_description: formData.short_description,
				categories: selectedData.categories._id,
				fabric: selectedData.fabric._id,
				sub_categories: selectedData.subCategories._id,
				tags: formData.tags,
				variants: formData.variants,
			}

			await AddProduct(payload)
			toast.success('Product Added Successfully')

			// reset
			setFormData({
				name: '',
				price: '',
				display_image: '',
				original_price: '',
				discount_percentage: '',
				description: '',
				short_description: '',
				stock: '',
				color_name: '',
				color_code: '',
				tags: [],
				selectedFile: null,
				variants: [],
			})
			setSelectedData({
				categories: { name: '', _id: '' },
				fabric: { name: '', _id: '' },
				subCategories: { name: '', _id: '' },
			})
			setImageArray([])
			setIsSubmitting(false)
		} catch (error: any) {
			toast.error(error.message)
			setIsSubmitting(false)
			console.error(error)
		}
	}

	return (
		<>
			<PageTitle breadcrumbs={[]}>Product Details</PageTitle>
			<div className='row'>
				<div className='col-12 mt-3'>
					<div className='card py-10'>
						<div className='card-body'>
							<div className='row'>
								{/* Product Images */}
								<h1 className='mb-4'>Product Images:</h1>
								{imageArray.length > 0 ? (
									imageArray.map((img, index) => (
										<div
											className='col-md-2 mb-5 text-center'
											key={index}>
											<div style={{ position: 'relative' }}>
												<img
													src={`https://files.threestyle.in/${img}`}
													alt={`Uploaded ${index}`}
													style={{ borderRadius: '10px', width: '95%' }}
												/>
												<button
													type='button'
													className='mt-5 px-2 py-1 mb-2 btn btn-success'
													onClick={() => handleUpdateFileButtonClick(index)}>
													Change Image
												</button>
												<button
													type='button'
													className='btn btn-danger btn-sm'
													style={{
														position: 'absolute',
														top: '5px',
														right: '10px',
														padding: '8px',
														fontSize: '12px',
													}}
													onClick={() => handleRemoveImage(index)}>
													<FontAwesomeIcon
														icon={faTrash}
														className='fs-3'
													/>
												</button>
											</div>
										</div>
									))
								) : (
									<div className='col-md-2 mb-5 text-center'>
										<img
											alt='Photos'
											src={formData.display_image || '/media/logos/fwg-logo.png'}
											style={{ borderRadius: '10px', width: '95%' }}
										/>
									</div>
								)}
								<div className='col-md-12 mb-7 ms-8'>
									<TableButton
										action='add'
										onClick={handleAddImage}
										text='Add Image'
										showIcon={false}
									/>
									<input
										type='file'
										accept='image/*'
										ref={addImageInputRef}
										className='d-none'
										onChange={handleAddImageChange}
									/>
								</div>

								{/* Variants Section */}
								<h1 className='mb-4'>Variants</h1>
								{formData.variants.map((variant, vIndex) => (
									<div
										key={vIndex}
										className='border rounded p-4 mb-5'>
										<div className='d-flex justify-content-between align-items-center mb-3'>
											<h5>Variant {vIndex + 1}</h5>
											<button
												type='button'
												className='btn btn-danger btn-sm'
												onClick={() => handleRemoveVariant(vIndex)}>
												Remove Variant
											</button>
										</div>

										{/* Variant Images */}
										<div className='row'>
											<h6 className='mb-3'>Variant Images:</h6>
											{variant.images?.length > 0 ? (
												variant.images.map((img: string, index: number) => (
													<div
														className='col-md-2 mb-5 text-center'
														key={index}>
														<div style={{ position: 'relative' }}>
															<img
																src={`https://files.threestyle.in/${img}`}
																alt={`Variant ${vIndex} preview ${index}`}
																style={{ borderRadius: '10px', width: '95%' }}
															/>
															<button
																type='button'
																className='btn btn-danger btn-sm'
																style={{
																	position: 'absolute',
																	top: '5px',
																	right: '10px',
																	padding: '8px',
																	fontSize: '12px',
																}}
																onClick={() => handleRemoveVariantImage(vIndex, index)}>
																<FontAwesomeIcon
																	icon={faTrash}
																	className='fs-3'
																/>
															</button>
														</div>
													</div>
												))
											) : (
												<div className='col-md-2 mb-5 text-center'>
													<img
														alt='Photos'
														src={'/media/logos/fwg-logo.png'}
														style={{ borderRadius: '10px', width: '95%' }}
													/>
												</div>
											)}

											<div className='col-md-12 mb-7 ms-8'>
												<TableButton
													action='add'
													onClick={() => handleAddVariantImage(vIndex)}
													text='Add Variant Image'
													showIcon={false}
												/>
												<input
													type='file'
													accept='image/*'
													ref={(el) => (variantFileInputs.current[vIndex] = el)}
													className='d-none'
													onChange={(e) => handleVariantImageChange(vIndex, e)}
												/>
											</div>
										</div>

										{/* Variant Fields */}
										<div className='row'>
											<div className='col-md-4 fv-row'>
												<InputField
													placeholder='Enter Stock'
													type='number'
													name='stock'
													htmlFor='stock'
													label='Stock'
													value={variant.stock}
													onChange={(e: any) =>
														handleVariantChange(vIndex, 'stock', e.target.value)
													}
												/>
											</div>
											<div className='col-md-4 fv-row'>
												<InputField
													placeholder='Enter Color Name'
													type='text'
													name='color_name'
													htmlFor='color_name'
													label='Color Name'
													value={variant.color_name}
													onChange={(e: any) =>
														handleVariantChange(vIndex, 'color_name', e.target.value)
													}
												/>
											</div>
											<div className='col-md-4 fv-row'>
												<InputField
													placeholder='Enter Color Code'
													type='text'
													name='color_code'
													htmlFor='color_code'
													label='Color Code'
													value={variant.color_code}
													onChange={(e: any) =>
														handleVariantChange(vIndex, 'color_code', e.target.value)
													}
												/>
											</div>
										</div>
									</div>
								))}
								<div className='mb-5'>
									<TableButton
										action='add'
										text='Add Variant'
										showIcon={false}
										onClick={handleAddVariant}
									/>
								</div>

								{/* Product Details */}
								<h1 className='mb-4'>Product Details:</h1>
								<div className='col-md-12'>
									<div className='row justify-content-end'>
										<div className='col-12'>
											<div className='row'>
												<div className='col-md-4 fv-row mb-7'>
													<InputField
														placeholder='Enter Product Name'
														type='text'
														className='fv-row'
														name='name'
														label='Product Name'
														htmlFor='name'
														value={formData.name}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<InputField
														placeholder='Enter Price'
														type='number'
														className='fv-row'
														name='price'
														label='Price'
														htmlFor='price'
														value={formData.price}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<InputField
														placeholder='Enter Original Price'
														type='number'
														className='fv-row'
														name='original_price'
														label='Original Price'
														htmlFor='original_price'
														value={formData.original_price}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<InputField
														placeholder='Enter Discount Percentage'
														type='number'
														className='fv-row'
														name='discount_percentage'
														label='Discount Percentage'
														htmlFor='discount_percentage'
														value={formData.discount_percentage}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<SelectFieldManual
														className='fv-row'
														label='Categories'
														name='categories'
														value={selectedData.categories._id}
														onChange={handleSelectChange}
														htmlFor='categories'
														marginRemove={true}
														options={categoriesData.map((data: any) => ({
															value: data._id,
															name: data.name,
														}))}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<SelectFieldManual
														className='fv-row mb-7'
														label='Fabric'
														name='fabric'
														value={selectedData.fabric._id}
														onChange={handleSelectChange}
														htmlFor='fabric'
														marginRemove={true}
														options={fabricData.map((data: any) => ({
															value: data._id,
															name: data.name,
														}))}
													/>
												</div>
												<div className='col-md-4 fv-row mb-7'>
													<SelectFieldManual
														className='fv-row'
														label='Sub Categories'
														name='sub_categories'
														value={selectedData.subCategories._id}
														onChange={handleSelectChange}
														htmlFor='sub_categories'
														marginRemove={true}
														options={subCategoriesData.map((data: any) => ({
															value: data._id,
															name: data.name,
														}))}
													/>
												</div>
												<div className='col-md-8 fv-row mb-7'>
													<label
														htmlFor='tags'
														className={`fw-bold fs-6 mb-md-5 mb-2`}>
														Tags
													</label>
													<TagsInput
														value={formData.tags}
														onChange={(newTags: any) =>
															setFormData((prevData) => ({ ...prevData, tags: newTags }))
														}
														name='tags'
														placeHolder='Enter Tags'
													/>
												</div>
												<div className='col-md-12 fv-row mb-7'>
													<InputField
														placeholder='Enter Short Description'
														type='text'
														className='fv-row'
														name='short_description'
														label='Short Description'
														htmlFor='short_description'
														value={formData.short_description}
														onChange={handleInputChange}
													/>
												</div>
												<div className='col-md-12 fv-row mb-7'>
													<label
														htmlFor='description'
														className='fw-bold fs-6 mb-2'>
														Description
													</label>
													<ReactQuill
														id='description'
														value={formData.description}
														onChange={(value: any) =>
															setFormData((prevData) => ({
																...prevData,
																description: value,
															}))
														}
														placeholder='Enter Description...'
														theme='snow'
														style={{ height: '200px', marginBottom: '20px' }}
													/>
												</div>
											</div>
										</div>
										<div className='col-md-2 fv-row mb-7 mt-3'>
											<TableButton
												action='add'
												onClick={handleAddButtonClick}
												text={isSubmitting ? 'Please wait, Adding Product...' : 'Add Product'}
												showIcon={false}
												disabled={isSubmitting}
												className={`btn-block mb-4 w-100 ${isSubmitting ? 'disabled' : ''}`}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export { AddProducts }
