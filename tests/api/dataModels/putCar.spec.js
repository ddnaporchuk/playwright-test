import { expect, test } from "@playwright/test";
import { EXAMPLE_CARS } from "../fixtures/cars.fixtures.js"
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";
import { CreateCarModel } from "../../../src/models/cars/CreateCarModel.js";
import { UpdateCarModel } from "../../../src/models/cars/UpdateCarModel.js";

test.describe.only("PUT cars", ()=>{
    let client
    let carId
    let cars

    test.beforeAll(async ()=>{
        client = await APIClient.authenticate({
            "email": USERS.DEN_LOGIN.email,
            "password": USERS.DEN_LOGIN.password,
            "remember": false
        })

        const carModel = new CreateCarModel({carBrandId:1, carModelId:1, mileage:99})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === carModel.carBrandId)
        const model = VALID_BRAND_MODELS[brand.id].data.find((model)=> model.id === carModel.carModelId)
        const newCar = await client.cars.createNewCar(carModel)
        carId = newCar.data.data.id
    })
        
    test.afterAll(async ()=>{
            await client.cars.deleteCar(carId)
        })

    test('Should edit a car', async ()=>{
        const updatedCarModel = new UpdateCarModel({carBrandId:2, carModelId:7, mileage: 150})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === updatedCarModel.carBrandId)
        const model = VALID_BRAND_MODELS[brand.id].data.find((model)=> model.id === updatedCarModel.carModelId)
        const response = await client.cars.updateUserCar(carId, updatedCarModel)
        
        const expectedBody = {
            ...updatedCarModel,
            initialMileage: expect.any(Number),
            id: expect.any(Number),
            updatedMileageAt: expect.any(String),
            carCreatedAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }

        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.status, "Status data request should be ok").toBe("ok")
        expect(response.data.data, "Update cars should be returned").toEqual(expectedBody)
    })
})