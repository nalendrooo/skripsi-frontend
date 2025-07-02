export interface IBodyTitleModel {
    title: string
}

export interface IResTitleModel {
    data: {
        data: IDataTitle[]
    }
}

export interface IDataTitle {
    id: number
    title: string
    createdAt: string // atau Date jika ingin diparse
    updatedAt: string // atau Date jika ingin diparse
    _count?: {
        items?: number
    }
}