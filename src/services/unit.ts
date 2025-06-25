import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";

const unitService = {
    create: ({
        body
    }: {
        body: IBodyTitleModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.unit, body)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResTitleModel>(API_ENDPOINTS.unit, {
                params
            })
            .then((res) => res.data.data),

};

export default unitService;