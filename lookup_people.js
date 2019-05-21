const pg = require('pg');
const settings = require('./settings'); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


const name = process.argv[2];

client.connect((err) => {
  if(err){
    return console.error('Connection error: ', err);
  }

  client.query('SELECT * FROM famous_people WHERE first_name = $1', [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log('Searching ... ')
    let num = result.rows.length;
    let personArr = result.rows;

    console.log(`Found ${num} person(s) by the name '${name}:'`);

    personArr.forEach(function(elm, index){
      console.log(`- ${index + 1} ${elm.first_name} ${elm.last_name}, born '${elm.birthdate.toISOString().substr(0, 10)}'`)
    })
    // console.log(result.rows); //output: 1
    client.end();
  });
});