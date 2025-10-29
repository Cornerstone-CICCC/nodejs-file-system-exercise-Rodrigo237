"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Check the README.md file for instructions to the exercise
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = http_1.default.createServer((request, response) => {
    //image
    if (request.url === "/view-image" && request.method === "GET") {
        const imagePath = path_1.default.join(__dirname, 'images', 'veryhappydog.jpg');
        if (!fs_1.default.existsSync(imagePath)) {
            console.error(`Image not found at path: ${imagePath}`);
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end("Image not found");
            return;
        }
        fs_1.default.readFile(imagePath, (err, data) => {
            if (err) {
                console.error(`Error reading image: ${err.message}`);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error loading image");
                return;
            }
            response.writeHead(200, { 'Content-Type': 'image/jpeg' });
            response.end(data);
        });
        return;
    }
    // Error/404
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end('Page not found');
});
const PORT = 3060;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
