import styles from '@/styles/components/Breadcrumb.module.css'
import Link from "next/link";
import React from 'react';

interface BreadcrumbItem {
	path: string
	label: string
	isCurrentPage?: boolean
}

interface BreadcrumbProps {
	items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<nav aria-label="fil d'ariane">
			<ol>
				{items.map((item, index) => (
					<React.Fragment key={item.path}>
						{(item.label !== 'company') &&
							<li className={styles.text}>
								{item.isCurrentPage ? (
									<span>{item.label}</span>
									) : (
										<Link href={item.path}>
										<span>{item.label}</span>
									</Link>
								)}
								{index !== items.length - 1 && <span className={styles.arrow}>{' > '}</span>}
							</li>
						}
					</React.Fragment>
				))}
			</ol>
		</nav>
	)
}
