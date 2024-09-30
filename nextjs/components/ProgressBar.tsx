import styles from '@/styles/components/ProgressBar.module.css'
import Link from 'next/link'


interface ProgressBarProps {
	className?: string
	value: number
	total: number
}

export default function ProgressBar({ className, value, total }: ProgressBarProps) {
	if (value > total) {
		value = total
	}
	const percentage: number = Math.round(value / total * 100)
	const style: React.CSSProperties = {
		'--percentage': `${percentage}%`,
		animationDuration: `calc(${percentage} * 2s / 100)`
	} as React.CSSProperties

	const animationDuration = percentage * 2 / 100

	return (<>
		<div className={className}>
			<div className={styles.container}>
				<div className={styles.staticBar}>
					<div
						className={`${styles.dynamicBar} ${styles.animatedBar}`}
						style={style}
						/>
				</div>
				<div className={styles.data}>
					{/* <p>Objectif {total} hectares</p> */}
					<p
						className={styles.percentageAnimation}
						>
						{percentage}%
					</p>
				</div>
			</div>

		</div>
	</>)
}