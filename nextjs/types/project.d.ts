import { ContractType } from "./contract"

export interface ProjectType {
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
	locationPicture: string
	steps: string[]
	coast: number
	moneyRaised: number
	carbonDyoxid?: number
	treeNumber: number
	treeNumberGoal: number
	treeTypeNumber: number
	treeTypes: string[]
	message?: string
	farmerWishes?: string
	parcelDescription?: string
	contracts: ContractType[]
}