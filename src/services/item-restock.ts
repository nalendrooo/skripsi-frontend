import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";
import { IBodyCreateItemModel, IBodyCreateItemRestockModel, IResItemModel } from "@/model/item";
import { IResItemRestockModel } from "@/model/item";

const itemRestockService = {
    create: ({
        body
    }: {
        body: IBodyCreateItemRestockModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.itemRestock, body)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResItemRestockModel>(API_ENDPOINTS.itemRestock, {
                params
            })
            .then((res) => res.data.data),

};

export default itemRestockService;