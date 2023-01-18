import * as IPFS from 'ipfs-core'
import all from 'it-all'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import {logger} from '../logger.js';
const node = await IPFS.create()
const version = await node.version()

logger.info(`Starting IPFS version ${version}`)

export const  addStringData = async(filePath, fileContent) => {
    logger.info(`Adding filePath ${filePath} with fileContent ${fileContent}`)
    const file = await node.add({
        path: filePath,
        content: uint8ArrayFromString(fileContent)
    })

    logger.info(`Added file: ${file.cid.toString()}`)
    const data = uint8ArrayConcat(await all(node.cat(file.cid)))
    logger.info(`Converted file contents: ${uint8ArrayToString(data)}` )

    return file.cid
}

export const  addUint8ArrayData = async(filePath, uint8Array) => {
    logger.info(`Adding filePath ${filePath} with fileContent ${fileContent}`)
    const file = await node.add({
        path: filePath,
        content: uint8Array
    })

    logger.info('Added uint8Array:', file.path, file.cid.toString())
    const data = uint8ArrayConcat(await all(node.cat(file.cid)))
    logger.info('Added uint8Array contents:', uint8ArrayToString(data))

    return file.cid;
}

export const  getData = async(hash) => {
    logger.info(`Getting iterator for ${hash}`);
    const items = await node.cat(hash)
    let data = '';
    logger.info(`Iterating on ${hash}`);
    for await (const item of items) {
        data = Buffer.from(item).toString()
        logger.info(data)
    }
    return data;
}

export const destroy = async () => {
    logger.info("Starting Stop");
    await node.stop();
    logger.info("Stopped");
    logger.info(`Killing process ${process.pid}`);
    process.kill(process.pid);
}

//module.exports = {addStringData, addUint8ArrayData, getData}
