import { test, expect } from '@playwright/test';
import CreateWorkspace from './page/createWorkspace.page';
import UserPage from './page/user.page';
import WorkspacePage from './page/workspace.page';
import messages from './utils/messages';
import url from './utils/url';
import variables from './utils/variables';

let createWorkspace: CreateWorkspace,
    userPage : UserPage, 
    workspacePage: WorkspacePage

test.beforeEach(async({ page })=>{
    createWorkspace = new CreateWorkspace(page);
    userPage = new UserPage(page);
    workspacePage = new WorkspacePage(page);
});

test.describe('Tests of UI (Workspaces)', ()=>{

    test( 'Create a new workspace', async ({page}) => {
        await page.goto(url.boards);
        await userPage.openCreateWorkspace();
        await createWorkspace.createWorkspace(variables.workspaceName);
        await expect(workspacePage.workspaceName).toHaveText(variables.workspaceName);
    });

    test.afterEach(async ({page})=>{
        // delete a Workspace with UI and logout
        await page.goto(url.boards);
        await userPage.openSettingsWorkspace(variables.workspaceName);
        await workspacePage.deleteWorkspace(variables.workspaceName);
        await expect(userPage.actionAlert).toHaveText(messages.alertMessage);

        await userPage.logout();
        await expect(page).toHaveURL(url.home);
    })   
});



