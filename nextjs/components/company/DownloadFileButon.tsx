import styles from '@/styles/components/company/DownloadFileButton.module.css'
import greenDownload from '@/public/icons/green-download.png'
import Image from 'next/image'
import axiosInstance from '@/utils/axiosInstance'
import backendUrl from '@/utils/backendUrl'

interface DownloadFileButton {
    className?: string
    url: string
    name: string
    accessToken: string | null
}

export default function DownloadFileButton({url, name, className, accessToken}: DownloadFileButton) {
    
    async function downloadFile() {
        try {
            const response = await axiosInstance.request({
                method: 'GET',
                url,
                headers: {
                    Cookie: `accessToken=${accessToken}`
                },
                responseType: 'blob'
            })
            const newBlob = new Blob([response.data], {
                type: 'application/pdf'
            })
            const downloadUrl = window.URL.createObjectURL(newBlob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.setAttribute('download', name)
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error(error)
        }
    }

    return (<div className={className}>
        <button className={styles.button} onClick={downloadFile}>
            <p>{name}</p>
            <Image
                src={greenDownload}
                width={17}
                height={17}
                alt=''
                />
        </button>
    </div>)
}