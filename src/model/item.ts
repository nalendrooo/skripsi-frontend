interface IDataItem {
    id: number;
    title: string;
    code: string;
    brand: string;
    location: string;
    supplier: string;
    stock: number;
    price: number;
    description: string;
    createdAt: string; // atau Date jika kamu ingin otomatis parsing ke objek Date
    updatedAt: string; // atau Date jika kamu ingin otomatis parsing ke objek Date
    unit: string;
    category: string;
}

export interface IResItemModel {
    data: {
        data: IDataItem[]
    }
}

export interface IBodyCreateItemModel {
    title: string;
    code: string;
    brand?: string;
    location?: string;
    supplier?: string;
    stock?: number;
    description?: string;
    unitId?: number;
    typeId?: number;
}
export interface IBodyCreateItemRestockModel {
    news?: string;
    amount: number;
    description?: string;
    itemId?: number;
}
export interface IBodyCreateItemBalanceModel {
    news?: string; // ⬅️ bukan optional lagi
    amount: number;
    description?: string;
    itemId: number;
}


interface IItemDetail {
    brand: string
    category: string
    unit: string
    title: string
    code: string
    supplier: string
    location: string
}

interface IUserInfo {
    division: string
    name: string
    telephone: string
}
export interface IDataItemIn {
    admin: string
    amount: number
    createdAt: string // atau bisa pakai Date kalau langsung di-convert
    description: string
    news: boolean
    item: IItemDetail
}

export interface IDataItemBalance {
    operator: string
    amount: number
    createdAt: string // ISO date string, bisa dikonversi ke Date jika perlu
    initialStock: number
    finalStock: number
    description: string | null
    item: IItemDetail
    news: boolean

}
export interface IDataItemOut {
    operator: string
    amount: number
    createdAt: string // ISO date string
    item: IItemDetail
    news: boolean
    user: IUserInfo

}

export interface IResItemRestockModel {
    data: {
        data: IDataItemIn[]
    }
}

export interface IResItemOutModel {
    data: {
        data: IDataItemOut[]
    }
}

export interface IResItemBalanceModel {
    data: {
        data: IDataItemBalance[]
    }
}