import { ContractType } from "./contract"

export interface NewsType {
    id: string
    title: string
    text: string
    picture: string
    date: Date
    contract: ContractType
}

export interface NewsArrType {
    newsArr: NewsType[]
}