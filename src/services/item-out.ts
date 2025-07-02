import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";
import { IBodyCreateItemBalanceModel, IBodyCreateItemModel, IResItemModel, IResItemOutModel } from "@/model/item";

const itemOutService = {
    create: ({
        body
    }: {
        body: IBodyCreateItemBalanceModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.itemOut, body)
            .then((res) => res.data),
    delete: ({
        id
    }: {
        id: number
    }) =>
        axiosWithBearer
            .delete(API_ENDPOINTS.itemOut + `/${id}`)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResItemOutModel>(API_ENDPOINTS.itemOut, {
                params
            })
            .then((res) => res.data.data),

};

export default itemOutService;