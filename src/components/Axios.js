import axios from "axios";
// import Cookie from "js-cookie";

// console.log(process.env.REACT_APP_DOMAIN)

const instance = axios.create({
    baseURL:process.env.REACT_APP_DOMAIN,
    headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
})

export default instance;