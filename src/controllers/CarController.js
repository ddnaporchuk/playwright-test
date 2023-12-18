import BaseController from "./BaseController";

export default class CarController extends BaseController {
    #CREATE_CAR_PATH = '/cars'
    #GET_USER_CARS_PATH = '/cars'
    #GET_CAR_BRANDS_PATH = '/cars/brands'
    #GET_CAR_BRANDS_BY_ID_PATH = '/cars/brands/#'
    #GET_CAR_MODELS_PATH = '/cars/models'
    #GET_MODELS_BY_ID_PATH = '/cars/models/#'
    #GET_USER_CAR_BY_ID_PATH = '/cars/#'
    #UPDATE_EXIST_CAR_BY_ID_PATH = '/cars/#'
    #DELETE_CARS_PATH = '/cars/#'

    constructor(options){
        super(options)
    }

    async getCarBrands(){
        return this._client.get(this.#GET_CAR_BRANDS_PATH)
    }

    async getCarBrandId(id){
        return this._client.get(this.#GET_CAR_BRANDS_BY_ID_PATH.replace('#', id))
    }

    async getCarModels(){
        return this._client.get(this.#GET_CAR_MODELS_PATH)
    }

    async getModelById(id){
        return this._client.get(this.#GET_MODELS_BY_ID_PATH.replace('#', id))
    }

    async getUserCars(){
        return this._client.get(this.#GET_USER_CARS_PATH)
    }

    async createNewCar(createCarRequestBody){
        return this._client.post(this.#CREATE_CAR_PATH, createCarRequestBody)
    }

    async getUserCarById(id){
        return this._client.get(this.#GET_USER_CAR_BY_ID_PATH.replace('#', id))
    }

    async updateUserCar(id, updateCarBody){
        return this._client.put(this.#UPDATE_EXIST_CAR_BY_ID_PATH.replace('#', id), updateCarBody)
    }

    async deleteCar(id){
        return this._client.delete(this.#DELETE_CARS_PATH.replace('#', id))
    }
}

