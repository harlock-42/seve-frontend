import styles from '@/styles/components/project/Project.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import tree from '@/public/icons/green-tree.svg'
import greenTree from '@/public/icons/darker-green-tree.svg'
import ProgressBar from '../ProgressBar'
import Link from 'next/link'
import axiosInstance from '@/utils/axiosInstance'
import { ProjectType } from '@/types'

interface ProjectProps {
	className?: string
	data: ProjectType
}

export default function Project({ className, data }: ProjectProps) {
	const displayTree = data.acres >= data.acresGoal ? tree : greenTree
	const imageDescription: string = `Image de profile de ${data.name}`
	const [treeNumber, setTreeNumber] = useState<number>(0)
	
	const protocol: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_PROTOCOL
	const domain: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_DOMAIN_NAME
	const port: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_PORT
	const urlImage = `${protocol}://${domain}:${port}/images/${data.profilePicture}`
	const projectPath: string = `/projects/${data.id}`
	const [image, setImage] = useState<string>('')
	useEffect(() => {
		async function fetchImage() {
			try {
				const response = await axiosInstance.get(urlImage, {
					responseType: 'blob'
				})
				const blobUrl = URL.createObjectURL(response.data)
				setImage(blobUrl)
			} catch (error) {
				console.error('Error fetching image:', error)
			}
		}
		fetchImage()
	}, [urlImage])
	
	useEffect(() => {
		const amount: number = data.contracts.reduce((total, contract) => total + contract.amount, 0)
		setTreeNumber(Math.round(data.treeNumberGoal * (amount / data.coast)))
	}, [])
	return (<>
		<div className={className}>
			<div className={styles.globalContainer}>
				<div className={styles.imageContainer}>
					<Image
						src={image}
						alt={imageDescription}
						className={styles.image}
						width={384}
						height={224}
						/>
					<div className={styles.placesInfo}>
						<p>{`${data.city}, ${data.district} (${data.districtNumber})`}</p>
					</div>
				</div>
				<div className={`${styles.containerData} ${data.acres >= data.acresGoal ? styles.green : ''}`}>
					<h1>{data.name}</h1>
					<div className={styles.dataGoalContainer}>
						<div className={styles.acres}>
							<Image
								src={displayTree}
								alt="Icon of a green tree"
								/>
							<div className={styles.acresData}>
								<p>{data.treeNumberGoal}</p>
								<p>arbres</p>
							</div>
						</div>
						<div>
							<p>{`${data.coast} €`}</p>
						</div>
					</div>
					<ProgressBar className={styles.progressBar} value={treeNumber} total={data.treeNumberGoal} />
					<Link href={projectPath}>
						<div className={styles.button}>
							<p>Voir le projet</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
		</>)
}