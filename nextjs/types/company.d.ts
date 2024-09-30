import { AddressType } from "./address"
import { ContractType } from "./contract"

export interface CompanyType {
    id: string
    companyName: string
    firstName: string
    lastName: string
    email: string
    vatNumber: string
    createdAt: Date
    address: AddressType
    contracts: ContractType[]
}