const {runQuery_v2, getObjectsFromDb} = require('./dbFunctions')
const _ = require('lodash');

describe("Database query checks",  ()=>{

    it('Sample query with geonameid', () => {

        let query = `SELECT * FROM geonames
           WHERE geonameid=5659
           ORDER BY geonameid;`;
        let expectedResult ={
            geonameid: '5659',
            name: 'Shilliostasha',
            asciiname: 'Shilliostasha',
            alternatenames: '',
            latitude: '34.575',
            longitude: '33.02083',
            feature_class: 'L',
            feature_code: 'LCTY',
            country_code: 'GB',
            cc2: '',
            admin1_code: '05',
            admin2_code: '',
            admin3_code: '',
            admin4_code: '',
            population: '0',
            elevation: '',
            dem: '21',
            timezone: 'Asia/Nicosia',
            modification_date: '2014-10-01'
        }
        return runQuery_v2(query, [])
            .then(result=>{
                expect(result[0]).toEqual(expect.objectContaining(expectedResult));
            })

    });

    it('Returns matches with first letter with a or A', () => {

        let query = `SELECT * FROM geonames
           WHERE name like ?
           ORDER BY name;`;
        let params=['a%'];

        return runQuery_v2(query, params)
            .then(result=>{
                result.forEach(row=>{
                    expect(row.name).toMatch(/[aA].*/);
                })
            })

    });

    it("Returns matches with apostrophe ward's", () => {

        let query = `SELECT * FROM geonames
           WHERE name like ?
           ORDER BY name;`;
        let params=["ward's%"];

        return runQuery_v2(query, params)
            .then(result=>{
                expect(result[0].name.toLowerCase()).toMatch(/ward.*/);

            })
    });

    it("Special characters check", () => {

        let query = `SELECT * FROM geonames
           WHERE name like ?
           ORDER BY name;`;
        let params=["Ágios%"];

        return runQuery_v2(query, params)
            .then(result=>{
                expect(result[0].name).toMatch(/Ágios.*/);

            })
    });

    it("Special characters check2", () => {

        let query = `SELECT * FROM geonames
           WHERE name like ?
           ORDER BY name;`;
        let params=["Órmos%"];

        return runQuery_v2(query, params)
            .then(result=>{
                expect(result[0].name).toMatch(/Órmos.*/);

            })
    });

});

describe('Testing getting correct Objects with a Query', ()=>{
    it('Start String less than 2 characters gives null', ()=>{
        return getObjectsFromDb('a')
            .then(returnObject=>{
                expect(returnObject).toBeNull();
            });
    });
    it('No start string input gives null response', ()=>{
        return getObjectsFromDb()
            .then(returnObject=>{
                expect(returnObject).toBeNull();
            });
    });
    let testCases = ['ha', 'has', 'hast'];
    testCases.forEach(testCase=>{

        it(`Query with ${testCase} only gives places starting with ${testCase}`, ()=>{
            return getObjectsFromDb(testCase)
                .then(returnObject=>{
                    returnObject.forEach(row=>{
                        var pattern = testCase+'.*';
                        var re = new RegExp(pattern, "g");
                        expect(row.name.toLowerCase()).toMatch(re);
                    });
                });
        });
    });

    it('Query with ha gives back Hastings District', ()=>{
        return getObjectsFromDb('ha')
            .then(returnObject=>{
                var containsHastings = _.find(returnObject, (o)=>{ return o.name==='Hastings District';});
                expect(containsHastings.name).toBeTruthy();

            })
    })
    it('Query with pH gives Phrakhtaes (mixed upper lower case)', ()=>{
        return getObjectsFromDb('ph')
            .then(returnObject=>{
                var containsPhrakhtaes = _.find(returnObject, (o)=>{ return o.name==='Phrakhtaes';});
                expect(containsPhrakhtaes.name).toBeTruthy();

            })
    })
    it('Query with special characters Ágios', ()=>{
        return getObjectsFromDb('Ágios')
            .then(returnObject=>{
                var containsSpecialCharacters = _.find(returnObject, (o)=>{ return o.name==='Ágios Vasíleios';});
                expect(containsSpecialCharacters.name).toBeTruthy();

            });
    });
    it('Query with special characters Ward\'s', ()=>{
        return getObjectsFromDb("Ward's")
            .then(returnObject=>{
                var containsSpecialCharacters = _.find(returnObject, (o)=>{ return o.name==='Ward\'s Stone';});
                expect(containsSpecialCharacters.name).toBeTruthy();

            });
    });
})
