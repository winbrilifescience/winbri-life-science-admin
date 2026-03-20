import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { AddAdminUser } from '../pages/winbri-life-science/admin-user/add-admin-user'
import { AdminProfileView } from '../pages/winbri-life-science/admin-user/admin-profile-view'
import AdminUserList from '../pages/winbri-life-science/admin-user/admin-user-list'
import { EditAdminUser } from '../pages/winbri-life-science/admin-user/edit-admin-user'
import { DashboardWrapper } from '../pages/winbri-life-science/dashboard/DashboardWrapper'
import CreateInvoiceWINBRI from '../pages/winbri-life-science/invoice/create-invoice'
import TotalSalesList from '../pages/winbri-life-science/invoice/total-sales'
import UpdateInvoiceWINBRI from '../pages/winbri-life-science/invoice/update-invoice'
import UserFitnessCourses from '../pages/winbri-life-science/users/fitness-course/fitness'
import { FitnessView } from '../pages/winbri-life-science/users/fitness-course/fitness-view'
import AddUserForm from '../pages/winbri-life-science/users/users/add-user'
import Users from '../pages/winbri-life-science/users/users/users'
import { UserView } from '../pages/winbri-life-science/users/users/view-user'
import ProductList from '../pages/winbri-life-science/product/gomzi-list'
import { AddProducts } from '../pages/winbri-life-science/product/add-product'
import { EditProduct } from '../pages/winbri-life-science/product/edit-product'
import VariantProductList from '../pages/winbri-life-science/product/variant-product-list'
import ServiceList from '../pages/winbri-life-science/service/service-list'
import { ServiceListView } from '../pages/winbri-life-science/service/service-list-view'
import { ServiceListEdit } from '../pages/winbri-life-science/service/edit-service'

const WinbriPrivateRoutes = () => {
	const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

	return (
		<Routes>
			<Route element={<MasterLayout />}>
				{/* <Route path='dashboard' element={<DashboardWrapper />} /> */}
				<Route
					path='users/view-user'
					element={<UserView />}
				/>
				<Route
					path='users/add-user'
					element={<AddUserForm />}
				/>

				{/*  */}
				<Route
					path='/scholarship-result/UserDetails'
					element={<UserView />}
				/>
				<Route
					path='/users'
					element={<Users />}
				/>
				<Route
					path='/diet-prefrence'
					element={<UserFitnessCourses />}
				/>
				<Route
					path='/fitness-view'
					element={<FitnessView />}
				/>
				<Route
					path='admin-user'
					element={<AdminUserList />}
				/>
				<Route
					path='admin-user-edit'
					element={<EditAdminUser />}
				/>
				<Route
					path='admin-user-add'
					element={<AddAdminUser />}
				/>
				<Route
					path='admin-user/admin-profile'
					element={<AdminProfileView />}
				/>

				{/* Invoice  */}
				<Route
					path='/invoice/create'
					element={<CreateInvoiceWINBRI />}
				/>
				<Route
					path='/invoice/update'
					element={<UpdateInvoiceWINBRI />}
				/>
				<Route
					path='/invoice/list'
					element={<TotalSalesList />}
				/>
				<Route
					path='/product'
					element={<ProductList />}
				/>
				<Route
					path='/product-add'
					element={<AddProducts />}
				/>
				<Route
					path='product-edit'
					element={<EditProduct />}
				/>
				<Route
					path='/product/variant-list'
					element={<VariantProductList />}
				/>

				<Route
					path='service'
					element={<ServiceList />}
				/>
				<Route
					path='service-view'
					element={<ServiceListView />}
				/>
				<Route
					path='service-edit'
					element={<ServiceListEdit />}
				/>

				{/* Lazy Modules */}
				<Route
					path='admin-user'
					element={
						<SuspensedView>
							<UsersPage />
						</SuspensedView>
					}
				/>

				{/* route */}
				<Route
					path='dashboard'
					element={<DashboardWrapper />}
				/>
				{/* Page Not Found */}
				<Route
					path='*'
					element={<Navigate to='/error/404' />}
				/>
			</Route>
		</Routes>
	)
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
	const baseColor = getCSSVariableValue('--bs-primary')
	TopBarProgress.config({
		barColors: {
			'0': baseColor,
		},
		barThickness: 1,
		shadowBlur: 5,
	})
	return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { WinbriPrivateRoutes }
