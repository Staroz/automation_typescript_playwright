import { test, expect } from '@playwright/test';
import Login from './page/loginPage.page';
import messages from './utils/messages';

let login:Login;
const email = process.env.EMAIL!;
const password = process.env.PW!;
const invalidEmail = process.env.INVALID_EMAIL!;
const invalidPw = process.env.INVALID_PW!;

test.describe('Test of Login Trello', () => {

  test.beforeEach(async({ page })=>{
      login = new Login(page);
  });

  test('Logging in Trello with a username and password valid ', async () => {
    await login.loginPage(email, password);
    await expect(login.page).toHaveURL('');
  });

  test('logging in Trello with a username invalid', async () => {
    await login.loginInvalidEmail(invalidEmail, invalidPw);
    await expect(login.errorMessage).toContainText(messages.errorMessageLogin);
  });

  test('Logging in Trello with a username valid and password invalid', async () => {
    await login.loginPage(email, invalidPw);
    await expect(login.errorMessageAtlassian).toContainText(messages.errorMessageLogin);
  });
});

