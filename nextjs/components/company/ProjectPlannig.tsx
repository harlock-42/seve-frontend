import styles from '@/styles/components/company/ProjectPlanning.module.css'
import React, { createRef, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import circle from '@/public/icons/green-circle.png'

interface ProjectPlanningProps {
    className?: string
}

interface MonthType {
    index: number
    year: number
    month: string
    monthIndex: number
}

export default function ProjectPlanning({ className }: ProjectPlanningProps) {
    const [monthData, setMonthData] = useState<MonthType[] | null>(null)
    const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(-1)
    const [done, setDone] = useState<boolean>(false)
    const monthsContainerRef = useRef<HTMLDivElement>(null)
    const monthRefs = useRef<React.RefObject<HTMLDivElement>[]>([])
    // const posX = useState<number>()

    useEffect(() => {
        let today = new Date()
        const currentMonth: number = today.getMonth()
        const currentYear: number = today.getFullYear()
        fetch('/data/months.json')
        .then((response) => response.json())
        .then(data => {
            setMonthData(data)
            data.map((month: MonthType) => {
                if (month.year === currentYear && month.monthIndex === currentMonth) {
                    setCurrentMonthIndex(month.index)
                }
            })
            monthRefs.current = data.map((_: any, i: number) => {
                return monthRefs.current[i] ?? createRef()
            })
        })
    }, [])

    useEffect(() => {
        if (currentMonthIndex !== -1 && !done) {
            const ref = monthRefs.current
            const container = monthsContainerRef.current
            if (container) {
                const targetItem: HTMLDivElement | null = monthRefs.current[currentMonthIndex - 1]?.current
                if (targetItem) {
                    requestAnimationFrame(() =>  {
                        container.scrollLeft = targetItem.offsetLeft
                    })
                }
            }
            setDone(true)
        }
    }, [currentMonthIndex, monthData])

    useEffect(() => {
        const container: HTMLDivElement | null = monthsContainerRef.current
        let isDown: boolean = false
        let startX: number
        let currentScrollLeft: number = container?.scrollLeft ?? 0
        function handleMouseMove(event: MouseEvent) {
            if (isDown !== true) {
                return
            }
            event.preventDefault()
            
            const x: number = event.pageX - (container?.offsetLeft ?? 0)
            const walkX: number = x - startX
            if (container) {
                container.scrollLeft = currentScrollLeft - walkX
            }
        }
        function handleMousedown(event: MouseEvent) {
            isDown = true
            startX = event.pageX - (container?.offsetLeft ?? 0)
            currentScrollLeft = container?.scrollLeft ?? 0
        }

        function handleMouseUp() {
            isDown = false
        }

        function handleMouseLeave() {
            isDown = false
        }

        function handleScroll() {
            monthRefs.current.forEach((ref, index) => {
            });
          }
        if (container) {
            container.addEventListener('mousemove', handleMouseMove)
            container.addEventListener('mousedown', handleMousedown)
            container.addEventListener('mouseup', handleMouseUp)
            container.addEventListener('mouseleave', handleMouseLeave)
            container.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove)
                container.removeEventListener('mousedown', handleMousedown)
                container.removeEventListener('mouseup', handleMouseUp)
                container.removeEventListener('mouseleave', handleMouseLeave)
                container.addEventListener('scroll', handleScroll)
            }
        }

    }, [monthsContainerRef])
    return (<div className={className}>
        <div className={styles.mainContainer}>
            <button className={styles.leftArrow} onClick={() => {
                if (monthsContainerRef.current) {
                    monthsContainerRef.current.scrollLeft -= 200
                }
            }}>
                <p>{'<'}</p>
            </button>
            <div className={styles.centerContainer} ref={monthsContainerRef}>
                <div className={styles.monthsContainer}>
                    {
                        monthData?.map((container, index) => {
                            let displayYear: boolean = container.monthIndex === 0
                            if (monthRefs.current[index] && monthRefs.current[index].current && monthsContainerRef.current) {
                            }
                            return (<div key={index} ref={monthRefs.current[index]} className={styles.monthContainer}>
                                { displayYear &&
                                    <h1>{container.year}</h1>
                                }
                                <div className={styles.circleContainer}>
                                    <p className={displayYear ? '' : styles.addMargin}>{container.month}</p>
                                    { currentMonthIndex === container.index &&
                                        <Image
                                            src={circle}
                                            alt="icone encerclant le mois en cours"
                                            className={styles.circle}
                                            />
                                    }
                                </div>
                            </div>)
                        })
                    }
                </div>
                <div className={styles.stepsContainer}>
                    <div className={styles.firstStep}>
                        <p>Visite de la ferme</p>
                    </div>
                    <div className={styles.secondStep}>
                        <p>Plantation</p>
                    </div>
                    <div className={styles.thirdStep}>
                        <p>Pousse</p>
                    </div>
                </div>
            </div>
            <button className={styles.rightArrow} onClick={() => {
                if (monthsContainerRef.current) {
                    monthsContainerRef.current.scrollLeft += 200
                }
            }}>
                <p>{'>'}</p>
            </button>
        </div> {/** mainContainerEnd */}
        <div className={styles.informationText}>
            <p>*Ce calendrier est générique pour les projets similaires</p>
        </div>
    </div>)
}