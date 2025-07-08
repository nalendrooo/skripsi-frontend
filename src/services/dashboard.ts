import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResCartDashboardModel, IResDashboardModel, IResTitleModel } from "@/model/_global";

const dashboardService = {
    // create: ({
    //     body
    // }: {
    //     body: IBodyTitleModel
    // }) =>
    //     axiosWithBearer
    //         .post(API_ENDPOINTS.division, body)
    //         .then((res) => res.data),
    // update: ({
    //     body,
    //     id
    // }: {
    //     body: IBodyTitleModel
    //     id: number
    // }) =>
    //     axiosWithBearer
    //         .patch(API_ENDPOINTS.division + `/${id}`, body)
    //         .then((res) => res.data),
    get: () =>
        axiosWithBearer
            .get<IResDashboardModel>(API_ENDPOINTS.dashboard,)
            .then((res) => res.data.data),
    getCart: () =>
        axiosWithBearer
            .get<IResCartDashboardModel>(API_ENDPOINTS.dashboard + '/cart',)
            .then((res) => res.data.data),

};

export default dashboardService;