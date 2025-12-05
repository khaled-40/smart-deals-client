import axios from "axios"


const axiosInstance = axios.create({
    baseURL: 'https://smart-deals-server-kappa-ten.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;