import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";
import { IBodyCreateItemModel, IResItemModel } from "@/model/item";

const itemService = {
    create: ({
        body
    }: {
        body: IBodyCreateItemModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.item, body)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResItemModel>(API_ENDPOINTS.item, {
                params
            })
            .then((res) => res.data.data),

};

export default itemService;