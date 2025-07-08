import { API_ENDPOINTS } from "@/core/app";
import { axiosWithBearer } from "@/core/axios";
import { IBodyTitleModel, IResTitleModel } from "@/model/_global";
import { IBodyCreateUserModel, IBodyLoginModel, IResTopUserModel, IResUserModel } from "@/model/user";
import axios from "axios";

const userService = {
    create: ({
        body
    }: {
        body: IBodyCreateUserModel
    }) =>
        axiosWithBearer
            .post(API_ENDPOINTS.user, body)
            .then((res) => res.data),
    update: ({
        body,
        id
    }: {
        body: IBodyCreateUserModel
        id: number
    }) =>
        axiosWithBearer
            .put(API_ENDPOINTS.user + `/${id}`, body)
            .then((res) => res.data),
    login: ({
        body
    }: {
        body: IBodyLoginModel
    }) =>
        axios
            .post(API_ENDPOINTS.login + '/login', body, {
                withCredentials: true
            })

            .then((res) => res.data),
    logout: () =>
        axios
            .delete(API_ENDPOINTS.login + '/logout', {
                withCredentials: true
            })

            .then((res) => res.data),
    get: (params?: Record<string, any>) =>
        axiosWithBearer
            .get<IResUserModel>(API_ENDPOINTS.user, {
                params
            })
            .then((res) => res.data.data),
    getTop: () =>
        axiosWithBearer
            .get<IResTopUserModel>(API_ENDPOINTS.user + '/top', )
            .then((res) => res.data.data),

};

export default userService;