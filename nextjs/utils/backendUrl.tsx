import UrlGenerator from '@/utils/UrlGenerator'

const backendUrl = new UrlGenerator(
    process.env.NEXT_PUBLIC_BACKEND_URL_DOMAIN_NAME || "",
    process.env.NEXT_PUBLIC_BACKEND_URL_PROTOCOL || "",
    process.env.NEXT_PUBLIC_BACKEND_URL_PORT || ""
)

export default backendUrl