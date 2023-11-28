import { test } from "../../src/fixtures/test.fixture.js"
import { expect } from "@playwright/test"
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js"
import { VALID_BRAND_MODELS } from "../../src/data/dict/models.js"

test.describe('API tests', ()=>{
    
    test('Should create a new car', async ({userAPIClient}) => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            carBrandId: brandId,
            carModelId: modelId,
            mileage: 122
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })

        const body = await response.json()
        await expect(response, "Positive response should be returned").toBeOK()
        expect(response.status(), "Status code should be 201").toEqual(201)
        expect(body.status).toBe("ok")
        expect(body.data, "Car should be created with data from request").toMatchObject(requestBody)
    })

    test('Should return error message not found model', async ({userAPIClient}) => {
        const requestBody = {
            carBrandId: 1,
            carModelId: 19,
            mileage: -1
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })

        const body = await response.json()
        console.log(body)
        expect(response.status(), "400 response should be 404").toEqual(404)
        await expect(body.status).toBe("error")
        expect(body, "should return error message").toEqual("Model not found")
    })
    test('Should return error message about invalid car brand', async ({userAPIClient}) => {
        const requestBody = {
            carBrandId: "string",
            carModelId: 2,
            mileage: 1
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })

        const body = await response.json()
        console.log(body)
        expect(response.status(), "400 response should be returned").toEqual(400)
        await expect(body.status).toBe("error")
        expect(body, "should return error message").toEqual("Invalid car brand type")
    })
})