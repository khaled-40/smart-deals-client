import axios from "axios";
import useAuth from "./UseAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user,signOutUser } = useAuth();
    const navigate = useNavigate();
    // request interceptor
    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use((config) => {
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        })

        // response interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, err => {
            console.log('err after response', err.status);
            const status = err.status;
            if (status === 401 || status === 403) {
                signOutUser()
                .then(() => {
                    navigate('/register')
                })
            }
        })
        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    }, [user,signOutUser, navigate])
    return instance
}

export default useAxiosSecure;