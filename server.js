import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from "./sendResponse.js"
import { getContentType } from './getContentType.js'
import { handlePostRequest } from './handlers/routeHandlers.js'
import { createPdf } from './utils/generatePdf.js'

const PORT = 8000
const __dirname = import.meta.dirname
const publicDir = path.join(__dirname, 'public')
const indexPath = path.join(publicDir, 'index.html')
const notFoundPath = path.join(publicDir, '404.html')

const server = http.createServer(async (req, res) => {
    console.log(`request received for: *${req.url}*`)
    try {
        const filePath = path.join(
            publicDir,
            req.url === '/' ? 'index.html' : req.url
        )
        if (!req.url.startsWith('/api')) {
            let ext = path.extname(filePath)
            let file = await fs.readFile(filePath)
            let type = getContentType(ext)
            sendResponse(res, 200, type, file)
        }
        else if (req.url.startsWith('/api') && req.method === 'POST') {
            await handlePostRequest(req, res)
        }
        else if (req.url.startsWith('/api/download-receipt') && req.method === 'GET') {
            createPdf(req, res)
        }
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            const content = await fs.readFile(path.join(publicDir, '404.html'))
            let ext = path.extname(notFoundPath)
            let file = await fs.readFile(notFoundPath)
            let type = getContentType(ext)

            sendResponse(res, 404, type, file)
        } else {
            sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${error.code}</h1></html>`)
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
