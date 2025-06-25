import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";
import { IBodyCreateItemModel, IResItemModel, IResItemOutModel } from "@/model/item";

const itemOutService = {
    // create: ({
    //     body
    // }: {
    //     body: IBodyCreateItemModel
    // }) =>
    //     axiosWithBearer
    //         .post(API_ENDPOINTS.item, body)
    //         .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResItemOutModel>(API_ENDPOINTS.itemOut, {
                params
            })
            .then((res) => res.data.data),

};

export default itemOutService;