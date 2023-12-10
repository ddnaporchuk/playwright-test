import {test as base, request} from "@playwright/test"
import {GaragePage} from "../garagePage/GaragePage.js";
import {STORAGE_STATE_USER_PATH} from "../data/storageState.js";
import ProfilePage from "../profilePage/ProfilePage.js"
import { CookieJar } from "tough-cookie";
import AuthController from "../controllers/AuthController.js";
import { USERS } from "../data/dict/users.js";
import CarController from "../controllers/CarController.js";
import UserController from "../controllers/UserController.js";
import { faker } from '@faker-js/faker';


export const test = base.extend({
    userGaragePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()
            
        await use(garagePage)

        await ctx.close()
    },
    userProfilePage: async ({ browser }, use) => {
        const ctx = await browser.newContext({
          storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const profilePage = new ProfilePage(page)
        await profilePage.navigate()
    
        await use(profilePage)
    
        ctx.close()
      },
      userAPIClient: async ({}, use) => {
        const ctx = await request.newContext({
          storageState: STORAGE_STATE_USER_PATH
        })
    
        await use(ctx)
    
        await ctx.dispose()
      },

      client: async ({page}, use)=>{
        const cookie = new CookieJar()
        const options = {
            baseUrl: config.apiURL,
            cookies: cookie
        }
        const authController = new AuthController(options)
        await authController.signIn({
            email: USERS.DEN_LOGIN.email,
            password: USERS.DEN_LOGIN.password,
        })
        await use({
            cars: new CarController(options),
            auth: authController
        })
      },

      clientWithUser: async ({page}, use) => {
        async function getClient(userData){
          const cookie = new CookieJar()
          const options = {
            baseUrl: config.apiURL,
            cookie: cookie
          }
          const authController = new AuthController(options)
          await authController.signIn(userData)

          return{
            cars: new CarController(options),
            auth: authController
          }
        }
        await use(getClient)
      },
      
      clientWithNewUser: async ({page}, use)=>{
        const userData = {
            "name": faker.person.firstName({ length: 5 }),
            "lastName": faker.person.lastName({ length: 5 }),
            "email": 'aqa' + faker.internet.email(),
            "password": "Password9",
            "repeatPassword": "Password9"
        }

        console.log(userData.email)
        const cookie = new CookieJar()
        const options = {
            baseUrl: config.apiURL,
            cookies: cookie
        }
        const authController = new AuthController(options)
        const userController = new UserController(options)
        await authController.signUp(userData)
        await authController.signIn({
            email: userData.email,
            password: userData.password,
        })
        await use({
            cars: new CarController(options),
            auth: authController,
            users: userController
        })

        await userController.deleteCurrentUser()
      }
})