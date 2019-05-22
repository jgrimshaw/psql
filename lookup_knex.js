const knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'development',
        password : 'development',
        database : 'test_db'
    }
});

const firstName = process.argv[2];

knex.select('first_name', 'last_name', 'birthdate')
   .from('famous_people')
   .where('first_name', '=', firstName)
   .asCallback(function(err, rows){
    if (err) return console.error(err);
    console.log('Searching ... ')
    console.log(`Found ${rows.length} person(s) by the name of ${firstName}`)

    rows.forEach(function(elm, index){
      console.log(`- ${index + 1} ${elm.first_name} ${elm.last_name}, born '${elm.birthdate.toISOString().substr(0, 10)}'`)
    })
    knex.destroy();
});
