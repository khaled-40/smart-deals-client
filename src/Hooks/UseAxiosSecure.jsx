import axios from "axios";
import useAuth from "./UseAuth";
import { useEffect } from "react";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user } = useAuth();
    // request interceptor
    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use((config) => {
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
        }
    }, [user])
    return instance
}

export default useAxiosSecure;