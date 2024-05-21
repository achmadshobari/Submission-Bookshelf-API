const http = require('http');



const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html'); 
    
    const {url,method} = request;

    if(url==='/'){
        if (method === "GET"){
            response.statusCode = 200;
            response.end(`<h1>Request ini menggunakan method: ${method} untuk mengakses halaman homepage</h1>`);
        }else{
            response.statusCode = 400;
            response.end(`<h1> Halaman tidak dapat diakses dengan ${method} request</h1>`)
        }        
    }

    if(url==='/about'){

        if (method === "GET"){
            response.statusCode = 200;
            response.end(`<h1>Request ini menggunakan method ${method} untuk mengakses halaman about</h1>`);
        
        } else if (method === "POST"){
            let body=[];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
    
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.statusCode = 200;
                response.end(`<h1> Hai, ${name}!, selamat datang di halaman about</h1>`)
    
            });
    
        }else{
            response.statusCode = 400;
            response.end(`<h1> Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }

    } else{
        response.statusCode = 400;
        response.end(JSON.stringify({
            message : 'Halaman tidak ditemukan',
        }));
    }
    

};


const server = http.createServer(requestListener);

const port = 9000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server berjalan pada http://${host}:${port}`)
});