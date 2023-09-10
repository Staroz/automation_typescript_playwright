import { test, expect } from '@playwright/test';
import UserPage from './page/user.page';
import url from './utils/url';
import variables from './utils/variables';
import Api from './API/api';
import Board from './page/board.page';

let userPage : UserPage, 
    api:Api,
    board:Board;

test.beforeEach(async({ page, request })=>{
    userPage = new UserPage(page);
    api = new Api(request);
    board = new Board(page);
    
    const response = await api.createListApi(variables.workspaceName, variables.boardName, variables.listNameArray);
    expect(response.status()).toBe(200);
});

test.describe('Moving a list', ()=>{

    test( 'Moving Backlog list instead  Done list', async ({page}) => {
        await page.goto(url.boards);
        await userPage.openBoard(variables.boardName);
        await board.moveList(variables.listNameArray[2], variables.listNameArray[0])
        await expect(board.listBlock.nth(variables.listNameArray.indexOf(variables.listNameArray[2])))
                .toContainText(variables.listNameArray[2]);
    });

    test.afterEach(async ({page})=>{
        // delete board and Workspace
        const response = await api.deleteWorkspaceApi(variables.workspaceName, variables.boardName);
        expect(response.status()).toBe(200);
        // logout account 
        await page.goto(url.boards);
        await userPage.logout();
        await expect(page).toHaveURL(url.home);
    })   
});



