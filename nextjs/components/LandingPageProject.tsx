import axiosInstance from "@/utils/axiosInstance"
import styles from "@/styles/components/LandingPageProject.module.css"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import FarmingKind, { ProductionKindType } from "./projects/FarmingKind"

interface LandingPageProjectProps {
	className?: string
	project: Project
	dragging: boolean
}

interface Project {
	id: string
	name: string
	production: string
	city: string
	district: string
	districtNumber: number
	acres: number
	acresGoal: number
	profilePicture: string
	pictures: string[]
}

export default function LandingPageProject({ className='', dragging=false, project }: LandingPageProjectProps) {
	const router = useRouter()
	const protocol: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_PROTOCOL
	const domain: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_DOMAIN_NAME
	const port: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_PORT
	const imageUrl = `${protocol}://${domain}:${port}/images/${project.profilePicture}`
	console.log("image url: ", imageUrl)
	const urlProject = `/projects/${project.id}`
	const [image, setImage] = useState<string>('')
	useEffect(() => {
		async function fetchImage() {
			try {
				const response = await axiosInstance.get(imageUrl, {
					responseType: 'blob'
				})
				console.log("response: ", response)
				const blobUrl = URL.createObjectURL(response.data)
				setImage(blobUrl)
			} catch (error) {
				console.log('Error fetching image:', error)
				console.error('Error fetching image:', error)
			}
		}
		fetchImage()
	}, [imageUrl])

	function handleCick(event: React.MouseEvent) {
		if (!dragging) {
			router.push(urlProject)
		}
	}

	return (<>
		<div className={className}>
			{/* <Link href={dragging ? '' : urlProject}> */}
				<div className={styles.project} onClick={handleCick}>
					<div className={styles.imageContainer}>
						<Image
							src={image}
							alt="deux agriculteurs en train de planter un arbuste"
							width={310}
							height={300}
							className={styles.projectImage}
							/>
						<FarmingKind className={styles.farmingKind} imageWidth={18} imageHeight={18} kind={project.production as keyof typeof ProductionKindType}/>
					</div>
					<div className={styles.projectText}>
						<h1>{`Le projet de ${project.name}`}</h1>
						{/* <h2>soutenu par <span>Haigo</span></h2> */}
						<h3>{`${project.district}, (${project.districtNumber})`}</h3>
					</div>
				</div>
			{/* </Link>	 */}
		</div>
	</>)
}