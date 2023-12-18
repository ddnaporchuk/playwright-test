import { expect, test } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";
import { CreateCarModel } from "../../../src/models/cars/CreateCarModel.js";

test.describe.only("POST cars", ()=>{
    let client
    let carId

    test.beforeAll(async ()=>{
        client = await APIClient.authenticate({
            "email": USERS.DEN_LOGIN.email,
            "password": USERS.DEN_LOGIN.password,
            "remember": false
        })
    })
    
    test.afterAll(async () => {
        await client.cars.deleteCar(carId)
    })

    test('Should create a new car with valid data', async ()=>{
        const carModel = new CreateCarModel({carBrandId:1, carModelId:1, mileage:100})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === carModel.carBrandId)
        const model = VALID_BRAND_MODELS[brand.id].data.find((model)=> model.id === carModel.carModelId)
        const response = await client.cars.createNewCar(carModel)
        carId = response.data.data.id
       
        const expectedBody = {
            ...carModel,
            initialMileage: carModel.mileage,
            id: expect.any(Number),
            carCreatedAt: expect.any(String),
            updatedMileageAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }
        
        
        expect(response.status, "Status code should be 201").toEqual(201)
        expect(response.data.status, "Success response should be returned").toBe("ok")
        expect(response.data.data, 'Car should created').toEqual(expectedBody)
    })

    test('Should return error message with wrong model', async ()=>{
        const carModel = new CreateCarModel({carBrandId:1, carModelId:9, mileage:150})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === carModel.carBrandId)
        const model = VALID_BRAND_MODELS[brand.id].data.find((model)=> model.id === carModel.carModelId)
        const response = await client.cars.createNewCar(carModel)
        
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Return error message model not found").toEqual('Model not found')
    })
})