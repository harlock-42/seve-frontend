import styles from '@/styles/components/company/visitFarm/VisitFarm.module.css'
import background from '@/public/images/visit-farm-picture.jpg'
import Image from 'next/image'

interface VisitFarmProps {
    className?: string
}

export default function VisitFarm({ className }: VisitFarmProps) {
    return (<div className={`${styles.mainContainer} ${className}`}>
        <Image
            src={background}
            alt="Image de fond presentant des gens discutant dehors autour d'une table"
            className={styles.backgroundImage}
            />
        <div className={styles.textContainer}>
            <h1>Créez vos souvenirs en visitant la ferme </h1>
        </div>
    </div>)
}