const Knex = require('knex');
const morgan = require('morgan');
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const knexConfig = require('./../config/knexfile');
const path = require('path');
// const registerApi = require('./routes/index');
const { Model } = require('objection');

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

const server = express();


server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(router);
server.set('json spaces', 2);

// Register API route 
server.use('/api', require('./routes/index'));

server.use(express.static(path.join(__dirname, './../client', 'build'))); 

server.use('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
});


// Error handling. The `ValidationError` instances thrown by objection.js have a `statusCode`
// property that is sent as the status code of the response.
//
// NOTE: This is not a good error handler, this is the simplest one. See the error handing
//       recipe for a better handler: http://vincit.github.io/objection.js/#error-handling
// server.use((err, req, res, next) => {
//   if (err) {
//     res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
//   } else {
//     next();
//   }
// });

// const server = server.listen(8641, () => {
//   console.log('Example server listening at port %s', server.address().port);
// });

module.exports = server;