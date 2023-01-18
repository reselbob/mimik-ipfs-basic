'use strict';
import { expect } from 'chai';
import {describe, it} from 'mocha';
import { faker } from '@faker-js/faker';
import * as Client from '../ipfs/ipfs-client.js';
import {logger} from '../logger.js';


describe('API Tests: ', () => {

    after(async () => {
        await Client.destroy();
    });

    it('Can save text once', async () =>{
        const adj = faker.word.adjective();
        const filePath = `reselbob_${adj}.txt`;
        const fileContent = adj;
        const cid = await Client.addStringData(filePath,fileContent);
        const result = await Client.getData(cid);
        expect(result).to.eq(adj);
    }).timeout(2000)

    it('Can save text twice', async () =>{
        const adj = faker.word.adjective();
        const filePath = `reselbob_${adj}.txt`;
        const fileContent = adj;
        const cid = await Client.addStringData(filePath,fileContent);
        const result = await Client.getData(cid);
        expect(result).to.eq(adj);
    }).timeout(2000)
});
