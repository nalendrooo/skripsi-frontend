import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";

const categoryService = {
    create: ({
        body
    }: {
        body: IBodyTitleModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.category, body)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResTitleModel>(API_ENDPOINTS.category, {
                params
            })
            .then((res) => res.data.data),

};

export default categoryService;