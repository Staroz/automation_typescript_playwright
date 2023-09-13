import { test, expect } from '@playwright/test';
import variables from './utils/variables';
import  Api from './API/api';

let api:Api;

test.describe('Api testing in Trello', ()=> {
    test.beforeEach(async ({request}) => {
        api = new Api(request)
    })
    test.afterEach(async ()=>{
        // delete board and workspace with API
        const responseWorkspace = await api.deleteWorkspaceApi(variables.workspaceName, variables.boardName);
        expect(responseWorkspace.status()).toBe(200);
    });
    
    test( 'Create a workspace', async () => {
        const response = await api.createWorkspaceApi(variables.workspaceName);
        expect(response.status()).toEqual(200)
    });

    test( 'Create a board', async () => {
        const response = await api.createBoardApi(variables.workspaceName, variables.boardName);
        expect(response.status()).toEqual(200)
    });
    test( 'Create a lists', async () => {
        const response = await api.createListApi(variables.workspaceName, variables.boardName, variables.listNameArray);
        expect(response.status()).toEqual(200)
    });
    test( 'Create a cards', async () => {
        const response = await api.createCardsApi(variables.workspaceName, variables.boardName, variables.listNameArray, variables.cardsNameArray);
        expect(response.status()).toEqual(200)
    });
});

