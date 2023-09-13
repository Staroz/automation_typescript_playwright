import { test, expect, defineConfig} from '@playwright/test';
import Login from './page/loginPage-page';
import messages from './utils/messages';
import variables from './utils/variables';


let login:Login;
const email = process.env.EMAIL!;
const password = process.env.PW!;

test.beforeEach(async({ page, context })=>{
  login = new Login(page);
  await context.clearCookies();
});

test.describe('Test of Login Trello', () => {

  test('Logging in Trello with a username and password valid ', async ({ page }) => {
    
    await page.goto('');
    await login.loginPage(email, password);
    await expect(login.page).toHaveURL('');
  });

  test('logging in Trello with a username invalid', async ({ page }) => {
    await page.goto('');
    await login.loginInvalidEmail(variables.login.invalidEmail, variables.login.invalidPassword);
    await expect(login.errorMessage).toContainText(messages.errorMessageLogin);
  });

  test('Logging in Trello with a username valid and password invalid', async ({ page }) => {
    await page.goto('');
    await login.loginPage(email, variables.login.invalidPassword);
    await expect(login.errorMessageAtlassian).toContainText(messages.errorMessageLogin);
  });
});

