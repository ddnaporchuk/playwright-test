import { CookieJar } from "tough-cookie";
import { config } from "../../config/config";
import AuthController from "../controllers/AuthController";
import CarController from "../controllers/CarController";
import UserController from "../controllers/UserController"

export default class APIClient {
    constructor(options) {
        this.auth = new AuthController(options)
        this.cars = new CarController(options)
        this.user = new UserController(options)
    }

    static async authenticate(options = {baseURL: config.apiURL}, userData){
        const jar = new CookieJar()
        const params = { ...options, cookies: jar }
        const authController = new AuthController(params)
        await authController.signIn(userData)
        return new APIClient(params)
    }
}