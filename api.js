var  Db = require('./controllers/dbDepartement');
var  departement = require('./models/departement');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
  });
   
   
  router.route('/departements').get((request, response) => {
    Db.getDepts((rows) => {
      response.json(rows);
    });
    // Db.getDepartements().then((data) => {
    //   response.json(data[0]);
    // })
  })
  
  router.route('/departements/:id').get((request, response) => {
    Db.getDepartement(request.params.id).then((data) => {
      response.json(data[0]);
    })
  })
  
  router.route('/departements').post((request, response) => {
    let  dep= { ...request.body }
    Db.addDepartement(dep).then(data  => {
      response.status(201).json(data);
    })
  })
    
  
var  port = process.env.PORT || 8090;
app.listen(port);
console.log('API is runnning at ' + port);
//Db.getDepts().then(result=>{console.log(result)});
