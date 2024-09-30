import { CompanyType } from "../company"

export interface TokenType {
    id: string
    value: string
    createdAt: Date
    company: CompanyType
}