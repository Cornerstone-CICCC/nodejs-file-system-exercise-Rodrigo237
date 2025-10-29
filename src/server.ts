// Check the README.md file for instructions to the exercise
import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'
import dotenv from 'dotenv'
dotenv.config()


const server = http.createServer((request:http.IncomingMessage,
    response: http.ServerResponse) =>{
    

    //image
    if (request.url === "/view-image" && request.method === "GET") {
        const imagePath = path.join(__dirname, 'images', 'veryhappydog.jpg');
        
        if (!fs.existsSync(imagePath)) {
            console.error(`Image not found at path: ${imagePath}`);
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end("Image not found");
            return;
        }

        fs.readFile(imagePath, (err, data) => {
            if (err) {
                console.error(`Error reading image: ${err.message}`);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error loading image");
                return;
            }
            response.writeHead(200, {'Content-Type': 'image/jpeg'});
            response.end(data);
        });
        return;
    }
    // Error/404
    response.writeHead(404, { "Content-Type": "text/plain" })
    response.end('Page not found')

})

const PORT = 3060

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})