import { CookieJar } from "tough-cookie";
import { config } from "../../config/config.js";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";

export default class BaseController {
    constructor({baseURL, cookies} = {baseURL: config.apiURL}) {
        this._baseURL = baseURL
        const jar = cookies ?? new CookieJar()
        this._client = wrapper(axios.create({
            baseURL: this._baseURL,
            jar,
            validateStatus: status => {
                return status < 501
            }
        }))
    }
}