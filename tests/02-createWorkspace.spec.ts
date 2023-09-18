import { test, expect } from '@playwright/test';
import CreateWorkspace from './page/workspace-page';
import UserPage from './page/user-page';
import WorkspaceSettings from './page/workspace-settings-page';
import messages from './utils/messages';
import url from './utils/url';
import variables from './utils/variables';

let createWorkspace: CreateWorkspace,
    userPage : UserPage, 
    workspaceSettings: WorkspaceSettings

test.beforeEach(async({ page })=>{
    createWorkspace = new CreateWorkspace(page);
    userPage = new UserPage(page);
    workspaceSettings = new WorkspaceSettings(page);
});

test.describe('Tests of UI (Workspaces)', ()=>{

    test( 'Create a new workspace', async ({page}) => {
        await page.goto(url.boards);
        await userPage.openCreateWorkspace();
        await createWorkspace.createWorkspace(variables.workspaceName);
        await expect(workspaceSettings.workspaceName).toHaveText(variables.workspaceName);
    });

    test.afterEach(async ({page})=>{
        // delete a Workspace and logout
        createWorkspace = new CreateWorkspace(page);
        userPage = new UserPage(page);
        workspaceSettings = new WorkspaceSettings(page);

        await page.goto(url.boards);
        await userPage.openSettingsWorkspace(variables.workspaceName);
        await workspaceSettings.deleteWorkspace(variables.workspaceName);
        await expect(userPage.actionAlert).toHaveText(messages.alertMessage);

        await userPage.logout();
        await expect(page).toHaveURL(url.home);
    })   
});



