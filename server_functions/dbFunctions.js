const sqlite3 = require('sqlite3').verbose();


const runQuery_v2=(query, params)=>{
    return new Promise( (resolve, reject)=>{
        //todo optimise so that a new db connection is not created for each query
        let db = new sqlite3.Database(`${__dirname}/../db/geodatabase.db`, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                reject(err);
            }
        });
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
        db.close();
    });

}


const getObjectsFromDb=(startString)=>{
    //no startString given should return null
    if(!startString){
        return Promise.resolve(null);
    }

    //no need to query database if startString is less than 2 characters
    if(startString.length<2){
        return Promise.resolve(null);
    }

    //NOTE: no need to convert startString to lowercase as like query resolves this.
    let query = `SELECT geonameid, name, asciiname, latitude, longitude FROM geonames
           WHERE asciiname like ? or name like ?
           ORDER BY name;`;
    return runQuery_v2(query, [startString+'%', startString+'%']);
}

module.exports = {runQuery_v2, getObjectsFromDb}
