import { PaginationConfigDto } from "src/utils/utils"

export class AddBookMarkDto {
    aid: string
}

export class DeleteBookMarkDto {
    aid: string
}

export class ListBookMarkDto extends PaginationConfigDto {
}
export interface ListBookMarkDtoReturn {
    bmid: string
    aid: string
    bookMarkTime: string
    title: string
}
