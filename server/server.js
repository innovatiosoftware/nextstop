/**
 * Created by fran on 5/13/15.
 */
var express = require('express');
var app = express();

var redis = require('redis'),
    client = redis.createClient();

var proximity = require('geo-proximity').initialize(client);
//var path = require('path');
//var events = require('events');
//    cps = require('cps');

//db = require('node-mysql');

//app.use(express.static(path.join(__dirname, '/../www')));

//var DB = db.DB;
//var BaseRow = db.Row;
//var BaseTable = db.Table;
//
//var dbConfig = {
//    host: 'localhost',
//    user: 'root',
//    password: 'admin',
////    password: 'my2@1*',
//    database: 'techsummit'
//};

var API_KEY = "AIzaSyCobKNq9ZrtBIJMYOBUfYnr-vBD--Zili8";

var STOPS = [{lat: 18.235253, long: -66.031513, name: "terminal Goyco"},
    {lat: 18.256513, long: -66.102446, name: "ruta Aguas Buenas"},
    {lat: 18.256126, long: -65.968022, name: "ruta Gurabo Carr. 181"},
    {lat: 18.391458, long: -66.074895, name: "ruta Centro Medico"}];

//var BUS_LOCATIONS = [
//    {1834074},
//    {},
//    {},
//    {},
//    {}];

var rawData = [
    "REV001844350879+1834074-0660946704420032;ID=356612021342417",
    "REV001844350939+1833177-0660984003520132;ID=356612021342417",
    "REV011844350958+1832991-0660989300717532;ID=356612021342417",
    "REV011844351061+1832331-0660976704018332;ID=356612021342417",
    "REV011844351078+1832066-0660976804016632;ID=356612021342417",
    "REV001844351091+1831862-0660967104415432;ID=356612021342417",
    "REV011844351106+1831649-0660953203713732;ID=356612021342417",
    "REV011844351118+1831551-0660937104011132;ID=356612021342417",
    "REV021844351788+0000000+0000000000000099;ID=356612021342417",
    "REV001844351911+1826595-0660391504916532;ID=356612021342417",
    "REV001844351970+1825708-0660367001916932;ID=356612021342417",
    "REV001844352133+1824430-0660356602217632;ID=356612021342417",
    "REV011844352259+1823983-0660353901819032;ID=356612021342417",
    "REV011844352276+1823914-0660355701417232;ID=356612021342417",
    "REV011844352297+1823780-0660342001612232;ID=356612021342417",
    "REV011844352315+1823773-0660340700409832;ID=356612021342417",
    "REV011844352373+1823723-0660322600615232;ID=356612021342417",
    "REV011844352403+1823648-0660323800620832;ID=356612021342417",
    "REV011844352414+1823591-0660328001520132;ID=356612021342417",
    "REV011844352480+1823492-0660332200717932;ID=356612021342417",
    "REV011844352487+1823477-0660329901110232;ID=356612021342417",
    "REV011844352499+1823463-0660325500808732;ID=356612021342417",
    "REV011844352504+1823463-0660323501210432;ID=356612021342417",
    "REV011844352510+1823456-0660320400905132;ID=356612021342417",
    "REV011844352570+1823512-0660319300531632;ID=356612021342417",
    "REV011844352584+1823527-0660323400531632;ID=356612021342417",
    "REV031844352597+1823527-0660323500131332;ID=356612021342417",
    "REV121844352597+1823527-0660323500131332;ID=356612021342417",
    "REV011844352602+1823526-0660323900317532;ID=356612021342417",
    "REV021844352644+1823526-0660323900017511;ID=356612021342417",
    "REV031844352655+1823526-0660323900017532;ID=356612021342417",
    "REV121844352655+1823526-0660323900017532;ID=356612021342417",
    "REV011844353326+1823555-0660327500302932;ID=356612021342417",
    "REV031844353395+1823512-0660320800019832;ID=356612021334935",
    "REV121844353395+1823512-0660320800019832;ID=356612021334935",
    "REV021844353395+1823512-0660320800019832;ID=356612021334935",
    "REV011844353463+1823469-0660321500927132;ID=356612021334935",
    "REV011844353481+1823489-0660328300424932;ID=356612021334935",
    "REV011844353486+1823481-0660328600415232;ID=356612021334935",
    "REV011844353518+1823454-0660320300605532;ID=356612021334935",
    "REV031844353613+1823497-0660318400001532;ID=356612021334935",
    "REV121844353613+1823497-0660318400001532;ID=356612021334935",
    "REV021844354043+1823489-0660320700000032;ID=356612021292984",
    "REV031844354044+1823489-0660320700000032;ID=356612021292984",
    "REV121844354044+1823489-0660320700000032;ID=356612021292984",
    "REV021844354045+1823489-0660320700000032;ID=356612021292984",
    "REV011844354082+1823487-0660324500319632;ID=356612021292984",
    "REV011844354094+1823492-0660323800310532;ID=356612021292984",
    "REV011844354104+1823493-0660319701003332;ID=356612021292984",
    "REV011844354123+1823537-0660317700432432;ID=356612021292984",
    "REV011844354172+1823574-0660329400729432;ID=356612021292984",
    "REV011844354176+1823577-0660330600623132;ID=356612021292984",
    "REV011844354223+1823458-0660337700526932;ID=356612021292984",
    "REV011844354261+1823454-0660339800332532;ID=356612021292984",
    "REV011844354325+1823499-0660351800527632;ID=356612021292984",
    "REV011844354424+1823583-0660378700725832;ID=356612021292984",
    "REV011844354477+1823457-0660382401425032;ID=356612021292984",
    "REV011844354506+1823459-0660403201530732;ID=356612021292984",
    "REV011844354525+1823532-0660405300431132;ID=356612021292984",
    "REV011844354532+1823533-0660408001125032;ID=356612021292984",
    "REV011844354537+1823523-0660409100517532;ID=356612021292984",
    "REV011844354549+1823516-0660405800313632;ID=356612021292984",
    "REV011844354579+1823476-0660406300322232;ID=356612021292984",
    "REV011844354590+1823465-0660410001427132;ID=356612021292984",
    "REV011844354781+1823548-0660552000331532;ID=356612021292984",
    "REV011844354823+1823572-0660327500522032;ID=356612021342417",
    "REV011844354831+1823560-0660327400417332;ID=356612021342417",
    "REV011844354837+1823555-0660326400315132;ID=356612021342417",
    "REV011844354889+1824277-0660620903028932;ID=356612021292984",
    "REV001844355004+1824775-0660776204629132;ID=356612021292984",
    "REV011844355049+1825184-0660846704531432;ID=356612021292984",
    "REV011844355085+1825527-0660873600313232;ID=356612021292984",
    "REV011844355132+1825672-0660894103129532;ID=356612021292984",
    "REV011844355156+1825670-0660906401224932;ID=356612021292984",
    "REV021844355197+1823555-0660326700022132;ID=356612021342417",
    "REV031844355203+1823555-0660326700022132;ID=356612021342417",
    "REV121844355203+1823555-0660326700022132;ID=356612021342417",
    "REV011844355218+1825537-0660930902028932;ID=356612021292984",
    "REV011844355323+1825651-0660973101524532;ID=356612021292984",
    "REV011844355331+1825620-0660977902026232;ID=356612021292984",
    "REV011844355339+1825605-0660985102022432;ID=356612021292984",
    "REV011844355368+1825505-0661002500828632;ID=356612021292984",
    "REV011844355383+1825529-0661011801732632;ID=356612021292984",
    "REV011844355406+1825645-0661014400630032;ID=356612021292984",
    "REV011844355444+1825662-0661026300535132;ID=356612021292984",
    "REV011844355522+1825753-0661025800634632;ID=356612021292984",
    "REV011844355534+1825756-0661027400927132;ID=356612021292984",
    "REV011844355566+1825755-0661042100422032;ID=356612021292984",
    "REV011844355628+1825641-0661042900715032;ID=356612021292984",
    "REV011844355665+1825628-0661026500706132;ID=356612021292984",
    "REV011844355671+1825636-0661026900624232;ID=356612021292984",
    "REV011844355680+1825636-0661028100331332;ID=356612021292984",
    "REV031844355719+1825638-0661028300032932;ID=356612021292984"
];

/*AABBBBCDDDDDEEEFFFFFGGGGHHHHHIIIJJJKL

AA: Event index. Range 0-99.
BBBB: Number of weeks since 00:00 AM January 6, 1980.
C: Day of week. From 0 to 6 where 0 is Sunday.
DDDDD: Time of the generated report. Seconds since 00:00 of the current date.
EEEFFFFF: WGS-84 Latitude. It does include the sign: Positive for north. EEE represents a value in degrees and FFFFF parts of a degree in decimals.
GGGGHHHHH: WGS-84 Longitude. It does include the sign: Positive for east. GGGG represents a value in degrees and HHHHHparts of a degree in decimals.
III: Vehicle velocity in mph.
JJJ: Vehicle heading, in degrees from North increasing eastwardly.
K: Position fix mode:
0: 2D GPS
1: 3D GPS
2: 2D DGPS
3: 3D DGPS
9: Unknown
L: Age of data used for the report:
    0: Not available
1: Older than 10 seconds
2: Fresh, less than 10 seconds
9: GPS Failure
*/

/*350879 86400*/

function parseGeoLocation(data){
    /*AA: Event index. Range 0-99.
    BBBB: Number of weeks since 00:00 AM January 6, 1980.
    C: Day of week. From 0 to 6 where 0 is Sunday.
    DDDDD: Time of the generated report. Seconds since 00:00 of the current date.
    EEEFFFFF: WGS-84 Latitude. It does include the sign: Positive for north. EEE represents a value in degrees and FFFFF parts of a degree in decimals.
    GGGGHHHHH*/
    console.log("data = " + data);

    var eventIndex = data.slice(3,5);
    var weekNumber = data.slice(5,9);
    var dayOfWeek = data.slice(9,10);
    var timeOfGeneratedReport = data.slice(10,15);
    var latitude = data.slice(15,23);
    var longitude = data.slice(23,32);

    console.log("event = *" + eventIndex + "*");
    console.log("weekNumber = *" + weekNumber + "*");
    console.log("dayOfWeek = *" + dayOfWeek + "*");
    console.log("timeOfGeneratedReport = *" + timeOfGeneratedReport + "*");
    console.log(latitude + "   -  " + longitude);
    return [latitude, longitude, "unknown"];

}

//var returnObj = {price: 1.00, ETA:};

var server = app.listen(8002, function () {
    console.log('Listening on port %d', server.address().port);
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});


app.get('/doTest/:id', function (req, res) {
    console.info("ID " + req.params.id);
    var header = {'Access-Control-Allow-Origin': '*'};
    console.log(rawData);
    parseGeoLocation(rawData[0]);
    res.set(header).status(200).send("Hola francisco esto es solo una test");
});

app.get('/allStops/', function (req, res) {
    console.info("ID " + req.params.id);
    var header = {'Access-Control-Allow-Origin': '*'};
    res.set(header).status(200).send(STOPS);
});

app.get('/getNearBusInfo/', function (req, res) {
    console.info("ID " + req.params.id);
    var header = {'Access-Control-Allow-Origin': '*'};
    res.set(header).status(200).send(STOPS);
});


//app.get('/getAllRefuges/', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//
//    var qry = 'SELECT * FROM REGUFEE WHERE LATITUDE IS NOT NULL AND LONGITUDE IS NOT NULL';
//    var box = new DB(dbConfig);
//    box.connect(function (conn, cb) {
//
//        cps.seq([
//            function (_, cb) {
//                conn.query(qry, cb)
//            },
//            function (res, cb) {
//                response.set(header).status(200).send(res);
//                cb();
//            }
//        ], cb);
//    }, function () {
//        var handleError = function (e) {
//            if (e.stack) {
//                console.log(e.stack);
//            } else {
//                console.log(e);
//            }
//        };
//
//        var start = new Date();
//        return function (err, res) {
//            try {
//                var end = new Date();
//                console.log('time spent: ', end - start);
//                if (err) {
//                    handleError(err);
//                } else {
////                    console.log(res);
//                }
//                box.end();
//            } catch (e) {
//                handleError(e);
//                box.end();
//            }
//        };
//    }());
//});
//
//app.get('/getRefugeById/:id', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//
//    var qry = 'SELECT * FROM REGUFEE WHERE ID = ' + req.params.id;
//    var box = new DB(dbConfig);
//    box.connect(function (conn, cb) {
//
//        cps.seq([
//            function (_, cb) {
//                conn.query(qry, cb)
//            },
//            function (res, cb) {
////                console.log("DATA =" + res);
//
//                response.set(header).status(200).send(res);
//                cb();
//            }
//        ], cb);
//    }, function () {
//        var handleError = function (e) {
//            if (e.stack) {
//                console.log(e.stack);
//            } else {
//                console.log(e);
//            }
//        };
//
//        var start = new Date();
//        return function (err, res) {
//            try {
//                var end = new Date();
//                console.log('time spent: ', end - start);
//                if (err) {
//                    handleError(err);
//                } else {
////                    console.log(res);
//                }
//                box.end();
//            } catch (e) {
//                handleError(e);
//                box.end();
//            }
//        };
//    }());
//});
//
//app.get('/getCommentCategories/', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//
//    var qry = 'SELECT COMMENT_CATEGORY FROM COMMENT_TOKENIZER GROUP BY COMMENT_CATEGORY ORDER BY COMMENT_CATEGORY';
//    var box = new DB(dbConfig);
//    box.connect(function (conn, cb) {
//
//        cps.seq([
//            function (_, cb) {
//                conn.query(qry, cb)
//            },
//            function (res, cb) {
////                console.log("DATA =" + res);
//
//                response.set(header).status(200).send(res);
//                cb();
//            }
//        ], cb);
//    }, function () {
//        var handleError = function (e) {
//            if (e.stack) {
//                console.log(e.stack);
//            } else {
//                console.log(e);
//            }
//        };
//
//        var start = new Date();
//        return function (err, res) {
//            try {
//                var end = new Date();
//                console.log('time spent: ', end - start);
//                if (err) {
//                    handleError(err);
//                } else {
////                    console.log(res);
//                }
//                box.end();
//            } catch (e) {
//                handleError(e);
//                box.end();
//            }
//        };
//    }());
//});
//
//app.get('/getConditionCategories/', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//    var qry = 'SELECT COMMENT_CATEGORY FROM COMMENT_TOKENIZER GROUP BY COMMENT_CATEGORY ORDER BY COMMENT_CATEGORY';
//    var box = new DB(dbConfig);
//    box.connect(function (conn, cb) {
//
//        cps.seq([
//            function (_, cb) {
//                conn.query(qry, cb)
//            },
//            function (res, cb) {
////                console.log("DATA =" + res);
//
//                response.set(header).status(200).send(res);
//                cb();
//            }
//        ], cb);
//    }, function () {
//        var handleError = function (e) {
//            if (e.stack) {
//                console.log(e.stack);
//            } else {
//                console.log(e);
//            }
//        };
//
//        var start = new Date();
//        return function (err, res) {
//            try {
//                var end = new Date();
//                console.log('time spent: ', end - start);
//                if (err) {
//                    handleError(err);
//                } else {
////                    console.log(res);
//                }
//                box.end();
//            } catch (e) {
//                handleError(e);
//                box.end();
//            }
//        };
//    }());
//});
//
//app.get('/getAllMunicipalities/', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//    var qry = 'SELECT MUNICIPIO, COUNT(*) AS TOTAL FROM REGUFEE GROUP BY MUNICIPIO ORDER BY MUNICIPIO';
//    var box = new DB(dbConfig);
//    box.connect(function (conn, cb) {
//
//        cps.seq([
//            function (_, cb) {
//                conn.query(qry, cb)
//            },
//            function (res, cb) {
////                console.log("DATA =" + res);
//
//                response.set(header).status(200).send(res);
//                cb();
//            }
//        ], cb);
//    }, function () {
//        var handleError = function (e) {
//            if (e.stack) {
//                console.log(e.stack);
//            } else {
//                console.log(e);
//            }
//        };
//
//        var start = new Date();
//        return function (err, res) {
//            try {
//                var end = new Date();
//                console.log('time spent: ', end - start);
//                if (err) {
//                    handleError(err);
//                } else {
////                    console.log(res);
//                }
//                box.end();
//            } catch (e) {
//                handleError(e);
//                box.end();
//            }
//        };
//    }());
//});
//
//app.get('/getRefugeByMunicipality/:municipality', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//    var municipality = req.params.municipality;
//    console.log(municipality);
//    var qry = 'SELECT * FROM REGUFEE WHERE MUNICIPIO = \'' + municipality + '\'';
//    var box = new DB(dbConfig);
//    box.connect(function (conn, cb) {
//
//        cps.seq([
//            function (_, cb) {
//                conn.query(qry, cb)
//            },
//            function (res, cb) {
////                console.log("DATA =" + res);
//                response.set(header).status(200).send(res);
//                cb();
//            }
//        ], cb);
//    }, function () {
//        var handleError = function (e) {
//            if (e.stack) {
//                console.log(e.stack);
//            } else {
//                console.log(e);
//            }
//        };
//
//        var start = new Date();
//        return function (err, res) {
//            try {
//                var end = new Date();
//                console.log('time spent: ', end - start);
//                if (err) {
//                    handleError(err);
//                } else {
////                    console.log(res);
//                }
//                box.end();
//            } catch (e) {
//                handleError(e);
//                box.end();
//            }
//        };
//    }());
//});
//
//app.get('/getNearbyRefuges/:lat/:lon', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//    var lat = req.params.lat;
//    var lon = req.params.lon;
//
//    console.log(lat);
//    console.log(lon);
//
//    var qry = 'SELECT *, SQRT(POW(69.1 * (latitude - ' + lat + '), 2) + POW(69.1 * (' + lon + ' - longitude) * COS(latitude / 57.3), 2)) AS distance ' +
//        'FROM REGUFEE ' +
//        'HAVING distance < 3 ' +
//        'ORDER BY distance ';
//    var box = new DB(dbConfig);
//    box.connect(function (conn, cb) {
//
//        cps.seq([
//            function (_, cb) {
//                conn.query(qry, cb)
//            },
//            function (res, cb) {
////                console.log("DATA =" + res);
//                response.set(header).status(200).send(res);
//                cb();
//            }
//        ], cb);
//    }, function () {
//        var handleError = function (e) {
//            if (e.stack) {
//                console.log(e.stack);
//            } else {
//                console.log(e);
//            }
//        };
//
//        var start = new Date();
//        return function (err, res) {
//            try {
//                var end = new Date();
//                console.log('time spent: ', end - start);
//                if (err) {
//                    handleError(err);
//                } else {
////                    console.log(res);
//                }
//                box.end();
//            } catch (e) {
//                handleError(e);
//                box.end();
//            }
//        };
//    }());
//});
//
////LOCAL SERVICES
//app.get('/getAllRefugesLocal/', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//    response.set(header).status(200).send(refuge);
//
//});
//app.get('/getAllMunicipalitiesLocal/', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//    response.set(header).status(200).send(allMunicipalities);
//
//});
//app.get('/getConditionCategories/', function (req, response) {
//    var header = {'Access-Control-Allow-Origin': '*'};
//    response.set(header).status(200).send(allConditionCategories);
//
//});

