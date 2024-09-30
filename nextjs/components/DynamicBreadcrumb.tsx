import { useRouter } from "next/router";
import Breadcrumb from "./Breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { error } from "console";
import backendUrl from "@/utils/backendUrl";

interface DynamicBreadrumbProps {
	className?: string
}

interface BreadcrumbConfig {
	[key: string]: {
		label: string
		isCurrentPage?: boolean
	}
}

const breadcrumbConfig: BreadcrumbConfig = {
	'/': {
		label: 'Acceuil'
	},
	'/contactUs': {
		label: 'Contact'
	},
	'/ourApproach': {
		label: 'Notre démarche'
	},
	'/agroforestry': {
		label: 'L\'agroforesterie'
	},
	'/projects': {
		label: 'Nos projets'
	},
	'/projects/[id]': {
		label: 'projet'
	},
	'/company': {
		label: 'Mon espace'
	},
	'/resetPassword': {
		label: 'Oublie de mot de passe'
	}
}

export default function DynamicBreadrumb( {className}: DynamicBreadrumbProps ) {
	const router = useRouter()
	const pathname = router.pathname

	const isProjectRoute = router.pathname.includes("/projects/[id]")
	const isCompanyRoute = router.pathname.includes("/company")
	const { id } = router.query
	const projectId = isProjectRoute ? id : null
	const companyId = isCompanyRoute ? id : null
	
	const [projectName, setProjectName] = useState<string | null>(null)
	const [companyName, setCompanyName] = useState<string | null>(null)

	useEffect(() => {
		if (projectId) {
			axiosInstance.request({
				method: "GET",
				url: backendUrl.getUrl('projects/one'),
				params: {
					id: `${projectId}`
				}
			})
				.then((response) => {
					setProjectName(response.data.name)
				})
				.catch((error) => {
					console.error(`Failed to get project: ${projectId}`)
				})
		}
	}, [projectId])

	useEffect(() => {
		if (companyId) {
			axiosInstance.request({
				method: "GET",
				url: backendUrl.getUrl(`companies/${companyId}`)
			})
				.then((response) => {
					setCompanyName(response.data.companyName)
				})
				.catch((error) => {
					console.error(`Failed to get company: ${companyId}`)
				})
		}
	}, [companyId])
	
	const breadcrumbItems = pathname
		.split('/')
		.filter((segment) => segment)
		.map((segment, index, array) => {
			const path = '/' + array.slice(0, index + 1).join('/')
			const config = breadcrumbConfig[path]

			let updatedConfig = config
			if (path === "/projects/[id]" && projectName) {
				updatedConfig = {
					...config,
					label: projectName
				}
			}

			return {
				path,
				label: updatedConfig?.label || segment,
				isCurrentPage: index === array.length - 1
			}
		})
	breadcrumbItems.unshift({
		path: "/",
		label: breadcrumbConfig["/"].label,
		isCurrentPage: pathname === "/",
		});
	return (
		<div className={className}>
			<Breadcrumb items={breadcrumbItems} />
		</div>
	)
}