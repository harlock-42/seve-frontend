import { ProjectType } from "@/types"
import styles from "@/styles/components/project/ProjectsCarousel.module.css"
import { useEffect, useRef, useState } from "react"
import LandingPageProject from "../LandingPageProject"

interface Props {
    projects: ProjectType[]
}

export default function ProjectsCarousel({ projects }: Props) {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState<boolean>(false)
    useEffect(() => {
        if (carouselRef.current) {
            const carousel = carouselRef.current
            let isDown = false
            let startX: number
            let scrollLeft: number
    
            carousel.addEventListener('mousedown', (event) => {
                isDown = true
                setDragging(false)
                carousel.style.cursor = 'grabbing'
                startX = event.pageX - carousel.offsetLeft
                scrollLeft = carousel.scrollLeft
            })

            carousel.addEventListener('mouseleave', () => {
                isDown = false
                carousel.style.cursor = 'grab'
            })

            carousel.addEventListener('mouseup', () => {
                isDown = false
                carousel.style.cursor = 'grab'
                setTimeout(() => setDragging(false), 0)
            })

            carousel.addEventListener('mousemove', (event) => {
                if (isDown !== true) {
                    return
                }
                // setDragging(false)
                event.preventDefault()
                const x = event.pageX - carousel.offsetLeft
                const walk = (x - startX)
                if (Math.abs(walk) > 10) {
                    setDragging(true)
                }
                carousel.scrollLeft = scrollLeft - walk
            })
        }
    }, [])
    return (<>
        <div className={styles.container} ref={carouselRef}>
            {
				projects.map((project, index) => {
				    return (
						<LandingPageProject key={index} project={project} className={styles.item} dragging={dragging} />
					)
				})
			}
        </div>
    </>)
}