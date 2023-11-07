import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

test.beforeEach('Open page', async ({page}) =>{
    await page.goto('/');
});

test.describe('Sign up, positive tests', () => {
    test('User registration', async({page}) => {
        const firstName = faker.person.firstName({ length: 5 });
        const lastName = faker.person.lastName({ length: 5 });
        const email = 'aqa' + faker.internet.email();
        const password = 'Password9';
        
        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
        
        await signUpButton.click();

        const popup = page.locator('div.modal-dialog');
        await expect(popup, "Registration popup should be visible").toBeVisible();

        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('.btn-primary');

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await emailInput.fill(email);
        await passwordInput.fill(password);
        await repeatPasswordInput.fill(password);
        await expect(registerButton, "Register button should be visible").toBeVisible();
        await expect(registerButton, "Register button should be enabled").toBeEnabled();
        
        await registerButton.click();

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');

        
    });
});


test.describe('Sign up, negative tests', () => {
   test("Create user with invalid first name", async ({ page }) => {
        const firstName = 'test2symbolsinvalidtest'; 
        const lastName = faker.person.lastName();
        const email = 'aqa' + faker.internet.email();
        const password = 'Password9';
            
        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
                
        await signUpButton.click();
            
        const popup = page.locator('div.modal-dialog');
        await expect(popup, "Registration popup should be visible").toBeVisible();
            
        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('.btn-primary');

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await emailInput.fill(email);
        await passwordInput.fill(password);
        await repeatPasswordInput.fill(password);
        await expect(registerButton, "Register button should be visible").toBeVisible();

        
        const errorMessage = popup.locator('.invalid-feedback');
        await expect(errorMessage, "Error message should be visible").toBeVisible();
        await expect(errorMessage).toContainText('Name is invalid');
        await expect(errorMessage).toContainText('Name has to be from 2 to 20 characters long');
        await expect(errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)')

        await expect(registerButton, "Register button should be disabled").toBeDisabled();
    });
    
    test('Create user with invalid last name', async ({page}) => {
         const firstName = faker.person.firstName(); 
         const lastName = '';
         const email = 'aqa' + faker.internet.email();
         const password = 'Password9';

         const signUpButton = page.locator('button.hero-descriptor_btn');
         await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
         await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
                 
         await signUpButton.click();
             
         const popup = page.locator('div.modal-dialog');
         await expect(popup, "Registration popup should be visible").toBeVisible();
             
         const firstNameInput = popup.locator('input#signupName');
         const lastNameInput = popup.locator('input#signupLastName');
         const emailInput = popup.locator('input#signupEmail');
         const passwordInput = popup.locator('input#signupPassword');
         const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
         const registerButton = popup.locator('.btn-primary');
 
         await firstNameInput.fill(firstName);
         await lastNameInput.fill(lastName);
         await emailInput.fill(email);
         await passwordInput.fill(password);
         await repeatPasswordInput.fill(password);
         await expect(registerButton, "Register button should be visible").toBeVisible();
 
         
         const errorMessage = popup.locator('.invalid-feedback');
         await expect(errorMessage, "Error message should be visible").toBeVisible();
         await expect(errorMessage).toContainText('Last name required');
         await expect(errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)')
 
         await expect(registerButton, "Register button should be disabled").toBeDisabled();
    });

    test('Create user with invalid e-mail', async ({page}) => {
        const firstName = faker.person.firstName(); 
        const lastName = faker.person.lastName();
        const email = 'test.com';
        const password = 'Password9';

        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
                
        await signUpButton.click();
            
        const popup = page.locator('div.modal-dialog');
        await expect(popup, "Registration popup should be visible").toBeVisible();
            
        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('.btn-primary');

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await emailInput.fill(email);
        await passwordInput.fill(password);
        await repeatPasswordInput.fill(password);
        await expect(registerButton, "Register button should be visible").toBeVisible();

        
        const errorMessage = popup.locator('.invalid-feedback');
        await expect(errorMessage, "Error message should be visible").toBeVisible();
        await expect(errorMessage).toContainText('Email is incorrect');
        await expect(errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)')

        await expect(registerButton, "Register button should be disabled").toBeDisabled();
   });

   test('Create user with invalid password', async ({page}) => {
         const firstName = faker.person.firstName(); 
         const lastName = faker.person.lastName();
         const email = 'aqa' + faker.internet.email();
         const password = 'test';

         const signUpButton = page.locator('button.hero-descriptor_btn');
         await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
         await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
                 
         await signUpButton.click();
             
         const popup = page.locator('div.modal-dialog');
         await expect(popup, "Registration popup should be visible").toBeVisible();
             
         const firstNameInput = popup.locator('input#signupName');
         const lastNameInput = popup.locator('input#signupLastName');
         const emailInput = popup.locator('input#signupEmail');
         const passwordInput = popup.locator('input#signupPassword');
         const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
         const registerButton = popup.locator('.btn-primary');
 
         await firstNameInput.fill(firstName);
         await lastNameInput.fill(lastName);
         await emailInput.fill(email);
         await passwordInput.fill(password);
         await repeatPasswordInput.fill(password);
         await expect(registerButton, "Register button should be visible").toBeVisible();
 
         
         const errorMessage = popup.locator('.invalid-feedback');
         await expect(errorMessage, "Error message should be visible").toBeVisible();
         await expect(errorMessage).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
         await expect(errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)')
 
         await expect(registerButton, "Register button should be disabled").toBeDisabled();
    });

    test('Create user with invalid re-enter password', async ({page}) => {
        const firstName = faker.person.firstName(); 
        const lastName = faker.person.lastName();
        const email = 'aqa' + faker.internet.email();
        const password = 'Password9';

        const signUpButton = page.locator('button.hero-descriptor_btn');
        await expect(signUpButton, "Sign Up button should be visible").toBeVisible();
        await expect(signUpButton, "Sign Up button should be enabled").toBeEnabled();
                
        await signUpButton.click();
            
        const popup = page.locator('div.modal-dialog');
        await expect(popup, "Registration popup should be visible").toBeVisible();
            
        const firstNameInput = popup.locator('input#signupName');
        const lastNameInput = popup.locator('input#signupLastName');
        const emailInput = popup.locator('input#signupEmail');
        const passwordInput = popup.locator('input#signupPassword');
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword');
        const registerButton = popup.locator('.btn-primary');

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await emailInput.fill(email);
        await passwordInput.fill(password);
        await repeatPasswordInput.fill('testW235');
        await expect(registerButton, "Register button should be visible").toBeVisible();
       
        await emailInput.click();

        const errorMessage = popup.locator('.invalid-feedback');
        await expect(errorMessage, "Error message should be visible").toBeVisible();
        await expect(errorMessage).toContainText('Passwords do not match');
        await expect(errorMessage, "Border color should be red").toHaveCSS('color', 'rgb(220, 53, 69)');
        
        await expect(registerButton, "Register button should be disabled").toBeDisabled();
   });

});


