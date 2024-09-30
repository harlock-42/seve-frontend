import axiosInstance from "@/utils/axiosInstance";
import backendUrl from "@/utils/backendUrl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FetchImageProps {
    imageName: string
    alt: string
    width: number
    height: number
    className?: string
}

export default function FetchImage({ imageName, alt, width, height, className }: FetchImageProps) {
    const [image, setImage] = useState<string>('')
    useEffect(() => {
        async function fetchImage(imageName: string) {
			try {
				const { data } = await axiosInstance.request({
					method: 'GET',
					url: backendUrl.getUrl(`images/
					${imageName}`),
					responseType: 'blob'
				})
				const blobUrl: string = URL.createObjectURL(data)
				return blobUrl
			} catch (error) {
				return ''
			}
		}
        fetchImage(imageName)
            .then((image) => setImage(image))
    }, [])
    return (<>
        <Image
            src={image}
            alt={alt}
            width={width}
            height={height}
            className={className}
            />
    </>)
}