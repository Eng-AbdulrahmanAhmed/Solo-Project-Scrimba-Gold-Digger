export function sendResponse(res, statusCode, type ,payload) {

    res.setHeader('Content-Type', type)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.statusCode = statusCode
    res.end(payload)
}