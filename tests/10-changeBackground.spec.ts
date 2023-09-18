import { test, expect } from '@playwright/test';
import UserPage from "./page/user.page";
import BoardPage from "./page/board.page";
import Api from "./API/api";
import variables from "./utils/variables";
import url from "./utils/url";
import files from './utils/files';

let userPage : UserPage, 
    api:Api,
    boardPage:BoardPage

test.beforeEach(async({ page, request })=>{
    userPage = new UserPage(page);
    api = new Api(request);
    boardPage = new BoardPage(page);
    
    const response = await api.createBoardApi(variables.workspaceName, variables.boardName);
    expect(response.status()).toBe(200);
});

test.describe('Change background of a Board', ()=>{

    test( 'Upload a background file', async ({page}) => {
        await page.goto(url.boards);
        await userPage.openBoard(variables.boardName);
        await boardPage.changeBackground(files.backgroundPath);
        
        const regex = new RegExp(files.backgroundName)
        await expect(boardPage.backgroundIcon.nth(1)).toHaveAttribute('style', regex)
    });

    test.afterEach(async ()=>{
        // Delete board and Workspace
        const response = await api.deleteWorkspaceApi(variables.workspaceName, variables.boardName);
        expect(response.status()).toBe(200);
    })   
});



