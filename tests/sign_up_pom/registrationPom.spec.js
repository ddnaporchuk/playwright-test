import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../src/welcomePage/WelcomePage.js";
import {faker} from "@faker-js/faker";

test.describe("Welcome page @smoke", ()=>{
    let page
    let welcomePage
    let signUpPopup

    test.beforeAll(async ({browser})=>{
       const context = await browser.newContext({
                viewport: {
                    width: 1920,
                    height: 1080
                }
       })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Sign up is success', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'Password9',
            repasswordInput: 'Password9'
        }

            signUpPopup = await welcomePage.openSignupPopup()
            await signUpPopup.registrationUser(signUpData)
    });
});

test.describe('Sign up, negative tests  @regression', () => {
    let page
    let welcomePage
    let signUpPopup

    test.beforeAll(async ({browser}) => {
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    });
    
    test.beforeEach(async () => {
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Create user with invalid first name', async({page}) => {
       const signUpData = {
        name: 'test2symbolsinvalidtest',
        lastName: faker.person.lastName(),
        email: 'aqa' + faker.internet.email(),
        password: 'Password9',
        rePassword: 'Password9'
       };

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillForm(signUpData)
        await expect(signUpPopup.errorMessage).toContainText('Name has to be from 2 to 20 characters long');
        await expect(signUpPopup.errorMessage).toContainText('Name is invalid');
        await expect(signUpPopup.errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
    });

    test('Create user with invalid last name', async({page}) => {
        const signUpData = {
        name: faker.person.firstName(),
        lastName: '',
        email: 'aqa' + faker.internet.email(),
        password: 'Password9',
        rePassword: 'Password9'
        };

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillForm(signUpData)
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible();
        await expect(signUpPopup.errorMessage).toContainText('Last name required');
        await expect(signUpPopup.errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)') 
        
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled()
    });

    test('Create user with invalid e-mail', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'test.com',
            password: 'Password9',
            rePassword: 'Password9',
        }

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillForm(signUpData)
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible();
        await expect(signUpPopup.errorMessage).toContainText('Email is incorrect');
        await expect(signUpPopup.errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)')

        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled();
    });

    test('Create user with invalid password', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'test',
            rePassword: 'Password9'
        };

        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillForm(signUpData)
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible();
        await expect(signUpPopup.errorMessage).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(signUpPopup.errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)')

        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled();
    });

    test('Create user with invalid re-enter password', async ({page}) => {
        const signUpData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: 'aqa' + faker.internet.email(),
            password: 'Password9',
            rePassword: ''
        };
        
        signUpPopup = await welcomePage.openSignupPopup()
        await signUpPopup.fillForm(signUpData)
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible();
        await expect(signUpPopup.errorMessage).toContainText('Passwords do not match');
        await expect(signUpPopup.errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)');
        
        await expect(signUpPopup.registerButton, "Register button should be disabled").toBeDisabled();
    });
});