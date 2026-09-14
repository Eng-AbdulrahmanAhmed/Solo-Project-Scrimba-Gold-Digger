import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from "./sendResponse.js"
import { getContentType }  from './getContentType.js'

const PORT = 8000
const __dirname = import.meta.dirname
console.log("Current directory:", __dirname)
const publicDir = path.join(__dirname, 'public')
console.log("Public directory:", publicDir)
const indexPath = path.join(publicDir, 'index.html')
console.log("Index path:", indexPath)
const notFoundPath = path.join(publicDir, '404.html')
console.log("Not found path:", notFoundPath)

console.log("Starting server on port " + PORT)

const server = http.createServer(async (req, res) => {
    console.log(`request received for: *${req.url}*`)
    try {
        const filePath = path.join(
                publicDir,
                req.url === '/' ? 'index.html' : req.url
            )
        if (!req.url.startsWith('/api') ) {
             
            let ext = path.extname(filePath)
            let file = await fs.readFile(filePath)
            let type = getContentType(ext)
            console.log("extension of the file being sent:", ext)
            console.log("content type of the file being sent:", type)
            sendResponse(res, 200, type, file)
            // return 
        }
        else if(req.url.startsWith('/api') && req.method === 'POST') {
           
            sendResponse(res , 404 ,type , file)
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