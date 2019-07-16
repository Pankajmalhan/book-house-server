import express = require('express');
import bodyParser = require('body-parser');
import graphqlHTTP = require('express-graphql');
import ncSchema from "../schema";
import config = require('config');
import mongoose = require('mongoose');
import pg = require("pg");
import AuthMiddleware from "../middleware/authMiddleware";
import CorsMiddleware from "../middleware/cors";
// Create a new express application instance
const app: express.Application = express();
//MongoDb Connection
const mongooseServer: String = config.get('database.mongoDB.host');

//postgress connection

const pool = new pg.Pool({
    user: config.get('pg.user'),
    host: config.get('database.pg.host'),
    database: config.get('database.pg.databaseName'),
    password: config.get('pg.password'),
    port: config.get('database.pg.port'),
})

//Check for pg cpnnection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        pool.end()
        process.exit(0);
    }
})

import PgQueries from "../database/pg/pgdb";
const pgdb = new PgQueries(pool);

//Add Middlrewares
app.use(bodyParser.json());
app.use(CorsMiddleware);
app.use(AuthMiddleware);

app.get('/', function (req, res) {
    res.send('Hello World !');
});

app.use('/graphql', (req,res)=>{
    graphqlHTTP({
        schema: ncSchema,
        graphiql: true,
        context: {
            pgdb,
            isAuth:req.isAuth,
            userId:req.userId
        }
    })(req,res)
});
mongoose.connect(`${mongooseServer.
    replace("<user>", config.get('mongoDB.user')).
    replace('<password>', config.get('mongoDB.password')).
    replace('<database>', config.get('database.mongoDB.databaseName'))}`, { useNewUrlParser: true })
    .then(() => {
        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    })
    .catch((exp) => {
        console.log(exp)
    })