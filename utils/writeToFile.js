import fs from 'node:fs/promises'
import path from 'node:path'

export async function writeToFile(data) {
    const dataWithTimestamp = `${new Date().toISOString()} - amount paid: $${JSON.parse(data).amount}, gold purchased: ${JSON.parse(data).ounce} at price: $${JSON.parse(data).price}\n`
    try {
        await fs.appendFile(("investmentsPortfolio.txt") , dataWithTimestamp )
    }
    catch (error) {
        console.error('Error writing to file:', error)
        throw new Error(`Failed to write to file: ${error.message}`)
    }
}