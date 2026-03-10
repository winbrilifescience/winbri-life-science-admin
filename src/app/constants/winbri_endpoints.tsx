import { WINBRI_BASE_URL } from './base_URL'

// 🌟----------------- Winbri Life Science -----------------🌟
export const BASE_URL = WINBRI_BASE_URL
const AdminV1Route = `${BASE_URL}/admin/v1`
const PublicV1Route = `${BASE_URL}/public/v1`

// Account
export const Login = `${AdminV1Route}/login`
export const LoginWithEmailOTP = `${AdminV1Route}/login-with-otp`
export const VerifyEmailOTP = `${AdminV1Route}/login-with-otp/verify`
export const CreateAdminAccount = `${AdminV1Route}/create-admin`
export const GetProfile = `${AdminV1Route}/get-profile`
export const UpdateProfile = `${AdminV1Route}/update-profile`
export const ChangePassword = `${AdminV1Route}/change-password`
export const GetUniversalAccessToken = `${AdminV1Route}/get-universal-token`
export const FileUpload = `${AdminV1Route}/file-upload`

// Account/Authenticator [MFA]
const AccountAuthenticatorRoute = `${AdminV1Route}/mfa`

export const AddAuthenticatorSecret = `${AccountAuthenticatorRoute}/authenticator/add-secret`
export const RemoveAuthenticatorSecret = `${AccountAuthenticatorRoute}/authenticator/remove-secret`

// Admin User
const AdminUserRoute = `${AdminV1Route}/admin-user`

export const GetAdminUsers = `${AdminUserRoute}/get-admin`
export const UpdateAdminUsers = `${AdminUserRoute}/update-profile`
export const ResetAdminUserPassword = `${AdminUserRoute}/reset-password`
export const RemoveAdminUser = `${AdminUserRoute}/remove-admin`

// Books
const BookRoute = `${AdminV1Route}/book`

export const CreateBook = `${BookRoute}/create`
export const UpdateBook = `${BookRoute}/update`
export const RemoveBook = `${BookRoute}/remove`
export const GetBooks = `${BookRoute}/get`

// Service
const ServiceRoute = `${AdminV1Route}/service-entry`

export const CreateService = `${ServiceRoute}/add`
export const UpdateService = `${ServiceRoute}/update`
export const GetServices = `${ServiceRoute}/get`
export const RemoveService = `${ServiceRoute}/remove`

// Dashboard
const DashboardRoute = `${AdminV1Route}/dashboard`

export const GeneralDashboardStats = `${DashboardRoute}/get-dashboard`
export const StudentDashboardStats = `${DashboardRoute}/get-student-stats`

// Product
const ProductRoute = `${AdminV1Route}/product`

export const AddProduct = `${ProductRoute}/add`
export const UpdateProduct = `${ProductRoute}/update`
export const GetProduct = `${ProductRoute}/get`
export const SetProductTrackingStatus = `${ProductRoute}/set-tracking-status`

// Product/Product Review
const ProductReviewRoute = `${ProductRoute}/product-review`

export const GetProductReviews = `${ProductReviewRoute}/get`
export const UpdateProductReview = `${ProductReviewRoute}/update`

// Product/Project Feedback
const ProductFeedbackRoute = `${ProductRoute}/feedback`

export const GetProductFeedback = `${AdminV1Route}/feedback/products`
export const UpdateProductFeedback = `${ProductFeedbackRoute}/update`

// Server Cache
const CacheManagerRoute = `${AdminV1Route}/cache-manager`

export const CleanGeneralCache = `${CacheManagerRoute}/general-cache`

// Users
const UserRoutes = `${AdminV1Route}/user`

export const GetUsers = `${UserRoutes}/get`
export const GetStudentUsers = `${UserRoutes}/get-student-user`
export const UpdateUser = `${UserRoutes}/update`
export const LockUnlockUser = `${UserRoutes}/lock`
export const RemoveUser = `${UserRoutes}/remove`
export const CreateUser = `${UserRoutes}/create`
export const SendFCMNotification = `${UserRoutes}/send-fcm-notification`
export const GetUserDietPreference = `${AdminV1Route}/diet-preference/get`

// Invoice
const InvoiceRoute = `${AdminV1Route}/invoice`

export const GetInvoices = `${InvoiceRoute}/get`
export const CreateInvoice = `${InvoiceRoute}/create`
export const UpdateInvoice = `${InvoiceRoute}/update`
export const DeleteInvoice = `${InvoiceRoute}/delete`
export const GetNextInvoiceSequence = `${InvoiceRoute}/get-next-invoice`
export const GetInvoiceStats = `${InvoiceRoute}/stats`

