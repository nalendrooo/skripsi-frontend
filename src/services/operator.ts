import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyCreateOperatorModel, IResOperatorModel } from "@/model/user";

const operatorService = {
    create: ({
        body
    }: {
        body: IBodyCreateOperatorModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.operator, body)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResOperatorModel>(API_ENDPOINTS.operator, {
                params
            })
            .then((res) => res.data.data),

};

export default operatorService;