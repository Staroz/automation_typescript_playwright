import { type Locator, type Page } from '@playwright/test';

class Login {
        readonly page: Page
        readonly pageLoad : any
        readonly homeLoginBtn : Locator
        readonly emailInput : Locator
        readonly continueBtn : Locator
        readonly passwordInput : Locator
        readonly loginButton : Locator
        readonly errorMessage : Locator
        readonly errorMessageAtlassian: Locator
        readonly invalidPasswordInput: Locator
    
    constructor (page:Page){
        this.page = page;
        this.pageLoad = page.goto('');
        this.homeLoginBtn = page.locator('[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]');
        this.emailInput = page.locator('#user');
        this.continueBtn = page.locator('#login');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-submit');
        this.invalidPasswordInput = page.getByPlaceholder('Enter password')
        // assertion locators
        this.errorMessage = page.locator('#password-error');
        this.errorMessageAtlassian= page.getByTestId('form-error--content');
    };

    async fillEmail(email:string){
        await this.pageLoad;
        await this.homeLoginBtn.click();
        await this.emailInput.fill(email);
        await this.continueBtn.click();
    };

    async fillPassword(password:string) {
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    };

    async loginPage(email:string, password:string){
        await this.fillEmail(email);
        await this.fillPassword(password);
    };

    async loginInvalidEmail(email:string, password:string){
        await this.fillEmail(email);
        await this.invalidPasswordInput.fill(password);
        await this.continueBtn.click();
    };
}
export default Login;

