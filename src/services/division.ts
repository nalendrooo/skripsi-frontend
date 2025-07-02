import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";

const divisionService = {
    create: ({
        body
    }: {
        body: IBodyTitleModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.division, body)
            .then((res) => res.data),
    update: ({
        body,
        id
    }: {
        body: IBodyTitleModel
        id: number
    }) =>
        axiosWithBearer
            .patch(API_ENDPOINTS.division + `/${id}`, body)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResTitleModel>(API_ENDPOINTS.division, {
                params
            })
            .then((res) => res.data.data),

};

export default divisionService;