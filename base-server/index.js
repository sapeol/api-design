const http = require('http')

const server = http.createServer((req, res)=> {
 if(req.method == "GET" && req.url == "/"){
    console.log("hello from the server")
    res.end()
 }

})

server.listen(3000, ()=>{
    console.log("listening on 3000")
})