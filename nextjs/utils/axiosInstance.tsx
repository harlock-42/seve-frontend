import axios, { AxiosRequestConfig, AxiosError, AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios"

// const apiSecret: string | undefined = process.env.NEXT_PUBLIC_API_SECRET
const apiSecret: string | undefined = "ngDmUKoPG8KpO/09KPIaKPM+NTdzAsgGp0Z/GYkf5UIjwiwdCjcq8Gs8L2XbXGun+FrD4pCBpJQje4WjtMaLjw=="

if (!apiSecret) {
	throw new Error('API_SECRET not found in environment variables.')
}

const axiosInstance: AxiosInstance = axios.create({
	withCredentials: true
})

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig<any>) => {
		config.headers['X-API-SECRET'] = apiSecret
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

export default axiosInstance