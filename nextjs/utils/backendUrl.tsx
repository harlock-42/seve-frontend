import UrlGenerator from '@/utils/UrlGenerator'

const backendUrl = new UrlGenerator(
    process.env.NEXT_PUBLIC_BACKEND_URL_DOMAIN_NAME || ""
)

export default backendUrl