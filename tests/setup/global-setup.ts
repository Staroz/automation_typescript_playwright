import { chromium, expect, FullConfig } from '@playwright/test';
import Login from '../page/loginPage-page';
import url from '../utils/url';


async function globalSetup(config: FullConfig) {
  const email = process.env.EMAIL!;
  const password = process.env.PW!;

  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext(); 
  const page = await context.newPage();
  const login = new Login(page);
  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(baseURL)
    await login.loginPage(email, password);
    await page.waitForURL(baseURL)
    await expect(page).toHaveURL(url.boards);
    await page.context().storageState({ path: storageState as string });
    await context.tracing.stop({
          path: './test-results/setup-trace.zip',
          });
    await browser.close();
  } catch (error) {
    await context.tracing.stop({
          path: './test-results/failed-setup-trace.zip',
          });
    await browser.close();
    throw error;
  }
}

export default globalSetup;

