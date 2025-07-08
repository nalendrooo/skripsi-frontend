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

export interface IResDashboardModel {
    data: {
        item: number;
        itemOut: number;
        itemRestock: number;
        user: number;
    }
}
export interface IResCartDashboardModel {
    data: {
        name: string;
        itemIn: number;
        itemOut: number;
    }[]
}