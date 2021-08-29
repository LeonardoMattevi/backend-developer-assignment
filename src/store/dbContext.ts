var sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
var db = new sqlite3.Database('./database.db');


fs.readFile('./tables.sql', 'utf8' , (errTable: Error, createTablesSql: string) => {    
    fs.readFile('./data.sql', 'utf8' , (errData: Error, datas: string) => {
        if (errTable || errData) {
            throw (errTable || errData);
        }        
        db.serialize(function() {
            // create script
            for(const query of createTablesSql.split(';'))
                db.run(query);

            for(const data of datas.split(';'))
                db.run(data);
        });
    });
});

export { 
    db
};