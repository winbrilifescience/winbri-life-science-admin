/* eslint-disable react/jsx-no-target-blank */
import {
	faBook,
	faCartArrowDown,
	faCartShopping,
	faChartLine,
	faCoins,
	faDumbbell,
	faFileInvoice,
	faFileMedical,
	faHeart,
	faHome,
	faJar,
	faTags,
	faUser,
	faUserCog,
	faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { AsideMenuItem } from '../AsideMenuItem'
import { AsideMenuItemWithSub } from '../AsideMenuItemWithSub'

export function WinbriAsideMenuItems() {
	return (
		<>
			{/* <AsideMenuItem
				to='/winbri-life-science/dashboard'
				Icon={faHome}
				title='Dashboard'
			/>
			<AsideMenuItem
				to='admin-user'
				Icon={faUserCog}
				title='Admin User'
			/>
			<AsideMenuItem
				to='contact-inquiry/contact'
				Icon={faUser}
				title='Contact Inquery'
			/> */}
			{/* Invoice start*/}
			{/* <AsideMenuItemWithSub
				to=''
				title='Invoice'
				Icon={faFileInvoice}>
				<AsideMenuItem
					to='invoice/create'
					title='Create Invoice'
					hasBullet={true}
				/>
				<AsideMenuItem
					to='invoice/list'
					title='Invoice List'
					hasBullet={true}
				/>
			</AsideMenuItemWithSub> */}
			{/* Invoice End*/}

			{/* Users start*/}
			{/* <AsideMenuItemWithSub
				to=''
				title='Users'
				Icon={faUsers}>
				<AsideMenuItem
					to='users'
					title='All Users'
					hasBullet={true}
				/>
			</AsideMenuItemWithSub> */}
			{/* Users End*/}
			
			{/* <AsideMenuItem
				to='product'
				title='All Products'
				Icon={faJar}
			/> */}
			<AsideMenuItem
				to='service'
				title='Service'
				Icon={faFileMedical}
			/>
		</>
	)
}
