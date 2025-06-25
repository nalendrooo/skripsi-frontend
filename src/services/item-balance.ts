import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";
import { IBodyCreateItemBalanceModel, IBodyCreateItemModel, IResItemBalanceModel, IResItemModel, IResItemOutModel } from "@/model/item";

const itemBalanceService = {
    create: ({
        body
    }: {
        body: IBodyCreateItemBalanceModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.itemBalance, body)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResItemBalanceModel>(API_ENDPOINTS.itemBalance, {
                params
            })
            .then((res) => res.data.data),

};

export default itemBalanceService;