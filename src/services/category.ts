import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyCategoryModel, IResCategoryModel } from "@/model/category";

const categoryService = {
    create: ({
        body
    }: {
        body: IBodyCategoryModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.category, body)
            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResCategoryModel>(API_ENDPOINTS.category, {
                params
            })
            .then((res) => res.data.data),

};

export default categoryService;