import { test, expect } from '@playwright/test';
import UserPage from './page/user.page';
import url from './utils/url';
import variables from './utils/variables';
import Api from './API/api';
import BoardPage from './page/board.page';

let userPage : UserPage, 
    api:Api,
    boardPage:BoardPage;

test.beforeEach(async({ page, request })=>{
    userPage = new UserPage(page);
    api = new Api(request);
    boardPage = new BoardPage(page);
    
    const response = await api.createListApi(variables.workspaceName, variables.boardName, variables.listNameArray);
    expect(response.status()).toBe(200);
});

test.describe('Moving a list', ()=>{

    test( 'Moving Backlog list instead  Done list', async ({page}) => {
        await page.goto(url.boards);
        await userPage.openBoard(variables.boardName);
        await boardPage.moveList(variables.listNameArray[2], variables.listNameArray[0])
        await expect(boardPage.listBlock.nth(variables.listNameArray.indexOf(variables.listNameArray[2])))
                .toContainText(variables.listNameArray[2]);
    });

    test.afterEach(async ()=>{
        // delete board and Workspace
        const response = await api.deleteWorkspaceApi(variables.workspaceName, variables.boardName);
        expect(response.status()).toBe(200);
    })   
});



