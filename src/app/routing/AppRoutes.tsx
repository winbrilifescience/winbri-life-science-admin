import { FC, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { AuthPage, Logout } from '../modules/auth'
import { MasterAuthPage } from '../pages/master/auth/AuthPage'
import { WinbriPrivateRoutes } from './WinbriPrivateRoutes'
import { MasterPrivateRoutes } from './MasterPrivateRoutes'
const { PUBLIC_URL } = process.env

const AppRoutes: FC = () => {
	const [winbriToken, setWinbriToken] = useState<string | null>(null)
	const [masterToken, setMasterToken] = useState<string | null>(null)
	const [adminType, setAdminType] = useState<string | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	useEffect(() => {
		const winbri_life_science_Token = localStorage.getItem('auth_winbri_life_science')
		const master_Token = localStorage.getItem('auth_winbri_life_science')
		const admin_Type = localStorage.getItem('admin')

		setWinbriToken(winbri_life_science_Token)
		setMasterToken(master_Token)
		setAdminType(admin_Type)

		// Check if the auth_winbri_life_science token is available
		if (winbri_life_science_Token) {
			setIsAuthenticated(true)
		}
	}, [])

	const getDefaultRoute = () => {	
		if (adminType === 'Master' && masterToken) return '/master/service'
		if (adminType === 'Admin' && winbriToken) return '/winbri-life-science/service'
		if (winbriToken) return '/winbri-life-science/service'
		return '/error/404'
	}

	useEffect(() => {
		redirectDashboard()
		redirectLoginToUrl()
	}, [])

	const redirectLoginToUrl = () => {
		const adminType = localStorage.getItem('admin_type')
		const admin: any = localStorage.getItem('admin')

		// if (admin) {
		// 	localStorage.removeItem('admin')
		// }
		
		const currentUrl = window.location.pathname
		
		const isLoginPage = currentUrl.includes('login')
		
		if (!admin && !isLoginPage) {
			localStorage.setItem('searchedURL', currentUrl)
		}
		
	}
	
	const redirectDashboard = () => {
		const adminType = localStorage.getItem('admin_type')
		const admin = localStorage.getItem('admin')
		
		const currentUrl = window.location.pathname
		
		const extractedText = currentUrl.split('/')[1]
		
		const isLoginPage = currentUrl.includes('login')
		const masterAdminLogin = localStorage.getItem('winbri_master')
		
		const searchedURL: any = localStorage.getItem('searchedURL')
		if (admin && searchedURL) {
			window.location.href = searchedURL
			localStorage.removeItem('searchedURL')
		}

		if (admin && !isLoginPage) {
			if (
				extractedText === 'winbri-life-science' &&
				admin !== 'Admin'
			) {
				localStorage.setItem('admin', 'Admin')
				window.location.href = currentUrl
			}
			if (
				extractedText === 'master' &&
				admin !== 'Master' &&
				masterAdminLogin === 'main_master'
			) {
				localStorage.setItem('admin', 'Master')
				window.location.href = currentUrl
			} else if(extractedText === 'master' && masterAdminLogin !== 'main_master') {
				window.location.href = '/winbri-life-science/service'
			}
			if (currentUrl == '/master/login' && adminType) {
				return (window.location.href = '/master/service')
			}
			if (currentUrl == '/login' && adminType && admin !== 'Admin') {
				return (window.location.href = '/winbri-life-science/service')
			}
		}
	}

	return (
		<BrowserRouter basename={PUBLIC_URL}>
			<Routes>
				<Route element={<App />}>
					<Route
						path='logout'
						element={<Logout />}
					/>
					{isAuthenticated ? (
						<>
							{winbriToken && adminType === 'Admin' ? (
								<>
									<Route
										path='/winbri-life-science/*'
										element={<WinbriPrivateRoutes />}
									/>
									<Route
										index
										element={<Navigate to='/winbri-life-science/service' />}
									/>
								</>
							) : null}
							{masterToken && adminType === 'Master' ? (
								<>
									<Route
										path='/master/*'
										element={<MasterPrivateRoutes />}
									/>
									<Route
										path='/winbri-life-science/*'
										element={<WinbriPrivateRoutes />}
									/>
									<Route
										index
										element={<Navigate to='/master/service' />}
									/>
								</>
							) : null}
							{
							winbriToken ? (
								<Route
									path='/master/*'
									element={<MasterPrivateRoutes />}
								/>
							) : null}
							<Route
								path='*'
								element={<Navigate to={getDefaultRoute()} />}
							/>
						</>
					) : (
						<>
							<Route
								path='login/*'
								element={<AuthPage />}
							/>
							<Route
								path='*'
								element={<Navigate to='/login' />}
							/>
							<Route
								path='master/login/*'
								element={<MasterAuthPage />}
							/>
							<Route
								path='*'
								element={<Navigate to='/master/login' />}
							/>
						</>
					)}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export { AppRoutes }
