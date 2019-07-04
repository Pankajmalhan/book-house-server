import express = require('express');
import bodyParser = require('body-parser');
import graphqlHTTP = require('express-graphql');
import ncSchema from "../schema";
import config = require('config');
import mongoose = require('mongoose');
// Create a new express application instance
const app: express.Application = express();
const mongooseServer: String = config.get('database.mongoDB.host');

app.use(bodyParser.json())

app.get('/', function (req, res) {
    console.log(config.get('mongoDB.user'))
    res.send('Hello World !');
});

app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true
}));
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