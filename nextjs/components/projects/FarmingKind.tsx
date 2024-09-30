import styles from '@/styles/components/project/farmimgKind.module.css'
import Image, { StaticImageData } from 'next/image'
import carrot from '@/public/icons/productionKind/carott.png'

export enum ProductionKindType {
    maraichage = '/icons/productionKind/carott.png',
    vigne = '/icons/productionKind/green-vyneyard-icon.png',
    élevage = '/icons/productionKind/green-livestock-icon.png'
}

interface FarmingKindProps {
    kind: keyof typeof ProductionKindType
    className?: string
    imageWidth?: number
    imageHeight?: number
}

export default function FarmingKind({ className='', imageWidth=-1, imageHeight=-1, kind }: FarmingKindProps ) {
    const imagePath = ProductionKindType[kind]
    let width = 48
    let height = 49
    if (imageWidth >= 0) {
        width = imageWidth
    }
    if (imageHeight >= 0) {
        height = imageHeight
    }
    const image: StaticImageData = {
        src: imagePath,
        width,
        height
    }
    const kindString: string = kind
    return (
        <div className={className}>
            <Image
                src={image}
                alt=''
                />
            <p className={styles.kind}>{kind.charAt(0).toUpperCase() + kind.slice(1)}</p>
        </div>
    )
}