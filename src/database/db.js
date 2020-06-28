// importando a dependencia do sqlite3

//o verbose é usado para retornar msgs
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operacoes no db
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizando o objeto db para as operacoes
/*db.serialize(() => {
    //criando tabelas
      db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    
    //Inserir dados
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
                "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",    
                "Papersider",
                "Guilherme Gemballa, Jardim América",
                "Nº 260",
                "Santa Cantarina",
                "Rio do Sul", 
                "Papéis e Papelão"
    ] 

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastro eftuado")
        console.log(this)
    }
    
    db.run(query, values, afterInsertData)

    //consultar dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log(rows)
    })

    //Deletar um dado
    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Dado deletado")
    }) 


}) */
