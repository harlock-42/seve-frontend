import { CompanyType } from "./company"
import { NewsArrType, NewsType } from "./news"
import { PdfFilesType } from "./pdfFiles"
import { ProjectType } from "./project"

export interface ContractType {
    id: string
    amount: number
    project: ProjectType
    company: CompanyType
    pdfFiles: PdfFilesType
    newsArr: NewsType[]
}