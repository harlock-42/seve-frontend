import styles from '@/styles/components/InBuilding.module.css'
import Image from 'next/image'
import building from '@/public/icons/building.svg'

interface InBuildingProps {
	className?: string
}

export default function InBuilding({ className }: InBuildingProps) {
	return (<>
		<div className={className}>
			<div className={styles.container}>
				<Image
					src={building}
					alt="Icone prevennant des travaux sont en cours"
					className={styles.image}
					/>
				<h1>Oups,<br/>cette page n’est pas disponible pour le moment, notre site se construit peu à peu ...</h1>
			</div>
		</div>
	</>)
}