import UrlGenerator from '@/utils/UrlGenerator'

const backendUrl = new UrlGenerator(
    process.env.NEXT_PUBLIC_BACKEND_URL || ""
)

export default backendUrl