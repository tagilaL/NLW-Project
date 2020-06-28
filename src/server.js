const express = require("express")
const server = express()

const db = require("./database/db.js")

//configurar pasta public
//deixando a pasta public visível para o server
server.use(express.static("public"))

//habilitar o uso do req.body na aplicacao
server.use(express.urlencoded( { extended: true }) )

//utilizando template engine (uso do nunjucks)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//configurar caminhos da minha aplicação
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    //req.query trabalha com as Query Strings (values do url)
    

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body para pegar o corpo da requisicao
    //inserindo dados no bd
    const query = `
            INSERT INTO places (
                    image,
                    name, 
                    address,
                    address2,
                    state,
                    city,
                    items
                ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.number,
        req.body.state,
        req.body.city,
        req.body.items
    ] 

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastro eftuado")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }
    
    db.run(query, values, afterInsertData)
    
})

server.get("/search", (req, res) => {

    //pegando os dados no banco
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        return res.render("search-results.html", { places: rows , total: total})

    })
    
})

server.listen(3000)