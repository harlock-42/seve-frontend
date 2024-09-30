import styles from '@/styles/components/ProgressBarProject.module.css'
import Link from 'next/link'


interface ProgressBarProps {
	className?: string
	name: string
	value: number
	total: number
	treeNumber: number
	treeNumberGoal: number
}

export default function ProgressBarProject({ className, name, value, total, treeNumber, treeNumberGoal }: ProgressBarProps) {
	if (value > total) {
		value = total
	}
	const percentageWhiteBar: number = Math.round(value / total * 100)
	const percentageGreenBar: number = Math.round(treeNumber / treeNumberGoal * 100)
	const styleWhiteBar: React.CSSProperties = {
		'--percentage': `${percentageWhiteBar}%`,
		animationDuration: `calc(${percentageWhiteBar} * 2s / 100)`
	} as React.CSSProperties
	const styleGreenBar: React.CSSProperties = {
		'--percentage': `${percentageGreenBar}%`,
		animationDuration: `calc(${percentageGreenBar} * 2s / 100)`
	} as React.CSSProperties
	return (<>
		<div className={className}>
			<div className={styles.container}>
                <div className={styles.header}>
                    <h1>{name}</h1>
                    <p>{percentageWhiteBar} %</p>
                </div>
				<div className={styles.staticBar}>
					<div
						className={`${styles.dynamicBar} ${styles.animatedBar}`}
						style={styleWhiteBar}
						/>
					<div
						className={`${styles.dynamicGreenBar} ${styles.animatedGreenBar}`}
						style={styleGreenBar}
						/>
				</div>
				<div className={styles.data}>
					<div className={styles.moneyData}>
						<p className={styles.valueAnimation}>{value} €</p>
						<p
							className={styles.total}
							>
							{total} €
						</p>
					</div>
					<div className={styles.treeData}>
						<p className={styles.valueAnimationTree}>{treeNumber} arbres plantes</p>
							<p
								className={styles.totalTree}
								>
								Objectif {treeNumberGoal} arbres
							</p>
					</div>
				</div>
			</div>

		</div>
	</>)
}