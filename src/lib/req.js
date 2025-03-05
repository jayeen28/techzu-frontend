import axios from "axios"

export default function req({ method = 'GET', uri, data, signal }) {
    return axios({
        method,
        url: `${process.env.REACT_APP_BACKEND_URL}${uri}`,
        withCredentials: true,
        data,
        signal,
    });
}