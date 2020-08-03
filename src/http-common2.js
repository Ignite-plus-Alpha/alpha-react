import axios from 'axios'


//profile services
export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {"content-type":"application/json"}
});