const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/banco.db';

const hostname = '127.0.0.3';
const port = 3034;
const app = express();

/* Servidor aplicação */

app.use(express.static("../frontend/"));
/* Definição dos endpoints */

app.use(express.json());
app.use((request, response, next) => {
    next();
})

// Retorna todos registros (é o R do CRUD - Read)
app.get('/animal', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM animal';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o bancoato
});

// Insere um registro (é o C do CRUD - Create)
app.post('/', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO animal (patas, asas, cor, mamifero) VALUES ('" + req.body.patas + "', '" + req.body.asas + "', '" + req.body.cor + "', '" + req.body.mamifero + "')";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
    res.end();

});



app.listen(port, hostname, () => {
    console.log(`Page server running at http://${hostname}:${port}/`);
  });