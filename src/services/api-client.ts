import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "4796c4b4decf4e63a1e8c6b08fb3fe39"
    }
})
