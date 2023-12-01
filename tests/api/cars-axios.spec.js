import axios from "axios"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"
import { test } from "../../src/fixtures/test.fixture.js"
import { expect } from "@playwright/test"
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js"
import { VALID_BRAND_MODELS } from "../../src/data/dict/models.js"
import {config} from "../../config/config.js"
import {USERS} from "../../src/data/dict/users.js"

test.describe('API tests', ()=>{
    let client

    test.beforeAll(async () => {
        const jar = new CookieJar();
        client = wrapper(axios.create({
        baseURL: config.apiURL,
        jar,
        validateStatus: status => {
            return status < 501
        }
        })
    )

        await client.post('/auth/signin', {
            "email": USERS.DEN_LOGIN.email,
            "password": USERS.DEN_LOGIN.password,
            "remember": false
        })
    })
    
    test('Should create a new car', async () => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            carBrandId: brandId,
            carModelId: modelId,
            mileage: 122
        }

        const response = await client.post('/cars', requestBody)

        expect(response.status, "Status code should be 201").toEqual(201)
        expect(response.data.status).toBe("ok")
        expect(response.data.data, "Car should be created with data from request").toMatchObject(requestBody)
    })

    test('Should return error message not found model', async () => {
        const requestBody = {
            carBrandId: 1,
            carModelId: 19,
            mileage: 0
        }
        
        const badRequest = {
            "status": "error",
            "message": "Model not found"
          }

        const response = await client.post('/cars', requestBody)

        expect(response.status, "404 response should be 404").toEqual(404)
        expect(response.data, "should return error message").toMatchObject(badRequest)
    })

    test('Should return error message about invalid car brand', async () => {
        const requestBody = {
            carBrandId: "string",
            carModelId: 2,
            mileage: 1
        }

        const badRequest = {
            "status": "error",
            "message": "Invalid car brand type"
          }

          const response = await client.post('/cars', requestBody)

        expect(response.status, "400 response should be returned").toEqual(400)
        expect(response.data, "should return error message").toMatchObject(badRequest)
    })
})