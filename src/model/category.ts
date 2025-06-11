// export interface IRes
export interface IBodyCategoryModel {
    title: string
}

export interface IResCategoryModel {
    data: {
        data: ICategory[]
    }
}

export interface ICategory {
    id: number
    title: string
    createdAt: string // atau Date jika ingin diparse
    updatedAt: string // atau Date jika ingin diparse
}