import { sendResponse } from "../sendResponse.js"
import { writeToFile } from "../utils/writeToFile.js"

export async function handlePostRequest(req, res) {
    console.log("Handling POST request for:", req.url);
    if (req.url === '/api/invest') {
        let body = ''
        for await (const chunk of req) {
            body += chunk
        }
    
        try {
            sendResponse(res , 200 ,"application/json" , JSON.stringify({ message: `Investment of $${JSON.parse(body).amount} received successfully!` } ))
            // return JSON.parse(body)
            await writeToFile(body)
        }
        catch (error) {
            console.error('Error parsing JSON:', error)
            throw new Error(`Invalid JSON format: ${error.message}`)
        }
    }
} 