/**
 * Created by fran on 5/13/15.
 */
var express = require('express');
var app = express();
var request = require('request');

var redis = require('redis'),
    client = redis.createClient();
var proximity = require('geo-proximity').initialize(client);
var baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";

//app.use(express.static(path.join(__dirname, '/../www')));

var API_KEY = "AIzaSyCobKNq9ZrtBIJMYOBUfYnr-vBD--Zili8";

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
    "REV031844355719+1825638-0661028300032932;ID=356612021292984",
    "REV121844374856+1822204-0660511600022032;ID=356612021292984",
    "REV021844374857+1822204-0660511600022032;ID=356612021292984",
    "REV011844374871+1838877-0660742601526232;ID=356612021342417",
    "REV011844374877+1822188-0660511300910332;ID=356612021292984",
    "REV011844374879+1838914-0660747102233832;ID=356612021342417",
    "REV011844374901+1822224-0660509100535732;ID=356612021292984",
    "REV011844374924+1839202-0660753901901232;ID=356612021342417",
    "REV011844374938+1839300-0660748800705232;ID=356612021342417",
    "REV011844374943+1839307-0660748100305932;ID=356612021342417",
    "REV011844374948+1839313-0660747300703232;ID=356612021342417",
    "REV011844374960+1839358-0660746601202532;ID=356612021342417",
    "REV011844374964+1839375-0660745801303932;ID=356612021342417",
    "REV011844374995+1839520-0660735401601332;ID=356612021342417",
    "REV011844375000+1839542-0660736201031932;ID=356612021342417",
    "REV011844375005+1839546-0660738501026432;ID=356612021342417",
    "REV011844375010+1839539-0660740300922032;ID=356612021342417",
    "REV031844375027+1839482-0660743800019932;ID=356612021342417",
    "REV121844375027+1839482-0660743800019932;ID=356612021342417",
    "REV011844375055+1822567-0660570400725832;ID=356612021292984",
    "REV011844375161+1821894-0660657700417832;ID=356612021292984",
    "REV011844375165+1821886-0660657400314232;ID=356612021292984",
    "REV031844375168+1821886-0660657400014232;ID=356612021292984",
    "REV121844375168+1821886-0660657400014232;ID=356612021292984"];
var STOPS = [
    {lat: 18.235253, long: -66.031513, name: "terminal Goyco", id: 1},
    {lat: 18.256513, long: -66.102446, name: "ruta Aguas Buenas", id: 2},
    {lat: 18.256126, long: -65.968022, name: "ruta Gurabo Carr. 181", id: 3},
    {lat: 18.391458, long: -66.074895, name: "ruta Centro Medico", id: 4}
];
var busRouteAssociation = [
    {id: 356612021292984, type: 'Corporacion', route: 'Ruta Aguas Buenas', lic: '12522-01839', licType: 'TC', name: 'Torres Alamo, Pedro', busStop: [1, 2]},
    {id: 356612021334935, type: 'Asociacion', route: 'RUTA DE GURABO', lic: '10-0001-00316', licType: 'TC', name: 'Ortíz Rivera, Jose', busStop: [1, 3]},
    {id: 356612021342417, type: 'Asociacion', route: 'Ruta Centro Medico', lic: '13319-00325', licType: 'TC', name: 'Martinez Arroyo, Juan', busStop: [1, 4]}
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

function parseGeoLocation(data) {
    /*AA: Event index. Range 0-99.
     BBBB: Number of weeks since 00:00 AM January 6, 1980.
     C: Day of week. From 0 to 6 where 0 is Sunday.
     DDDDD: Time of the generated report. Seconds since 00:00 of the current date.
     EEEFFFFF: WGS-84 Latitude. It does include the sign: Positive for north. EEE represents a value in degrees and FFFFF parts of a degree in decimals.
     GGGGHHHHH*/
//    console.log("data = " + data);

    var eventIndex = data.slice(3, 5);
    var weekNumber = data.slice(5, 9);
    var dayOfWeek = data.slice(9, 10);
    var timeOfGeneratedReport = data.slice(10, 15);
    var latitude = data.slice(15, 23);
    var longitude = data.slice(23, 32);
    var velocity = data.slice(32, 35);
    var heading = data.slice(35, 38);
    var ID = data.slice(44, 60);

    /*
     console.log("event = *" + eventIndex + "*");
     console.log("weekNumber = *" + weekNumber + "*");
     console.log("dayOfWeek = *" + dayOfWeek + "*");
     console.log("timeOfGeneratedReport = *" + timeOfGeneratedReport + "*");
     console.log("velocity = *" + velocity + "*");
     console.log("heading = *" + heading + "*");
     console.log("lat = " + latitude + "   -  log = " + longitude);
     console.log("ID = *" + ID + "*");
     */

    return [addLatitudeDecimalPoint(latitude), addLongitudeDecimalPoint(longitude), "Caguas"];
}

function addLatitudeDecimalPoint(coord) {
    var firstPart = coord.slice(0, 3);
    var secondPart = coord.slice(3, 9);
    console.log(firstPart + "." + secondPart);
    return parseFloat(firstPart + "." + secondPart);
}

function addLongitudeDecimalPoint(coord) {
    var firstPart = coord.slice(0, 4);
    var secondPart = coord.slice(4, 9);
    console.log(firstPart + "." + secondPart);
    return parseFloat(firstPart + "." + secondPart);
}

function parseObj(data) {

    var eventIndex = data.slice(3, 5);
    var weekNumber = data.slice(5, 9);
    var dayOfWeek = data.slice(9, 10);
    var timeOfGeneratedReport = data.slice(10, 15);
    var latitude = data.slice(15, 23);
    var longitude = data.slice(23, 32);
    var velocity = data.slice(32, 35);
    var heading = data.slice(35, 38);
    var ID = data.slice(44, 60);

    /*
     console.log("event = *" + eventIndex + "*");
     console.log("weekNumber = *" + weekNumber + "*");
     console.log("dayOfWeek = *" + dayOfWeek + "*");
     console.log("timeOfGeneratedReport = *" + timeOfGeneratedReport + "*");
     console.log("velocity = *" + velocity + "*");
     console.log("heading = *" + heading + "*");
     console.log("lat = " + latitude + "   -  log = " + longitude);
     console.log("ID = *" + ID + "*");
     */
    return {busId: ID, longitude: addLatitudeDecimalPoint(longitude), latitude: addLongitudeDecimalPoint(latitude), velocity: velocity, heading: heading, busStops: getBusStopsAssociatedToBusId(parseInt(ID)), data: data};
}

function getBusStopsAssociatedToBusId(busId) {
    var stopIds;
    for (var idx in busRouteAssociation) {
        var bra = busRouteAssociation[idx];
        if (bra.id == busId) {
            stopIds = bra.busStop;
            break;
        }
    }
    return  stopIds;
}

var server = app.listen(8002, function () {
    console.log('Listening on port %d', server.address().port);
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

app.get('/allStops/', function (req, res) {
    console.info("ID " + req.params.id);
    var header = {'Access-Control-Allow-Origin': '*'};
    res.set(header).status(200).send(STOPS);
});

app.get('/getNearBusInfo/:lat/:log/:busStopId', function (req, res) {
    console.info("ID " + req.params.id);

    var lat = req.params.lat;
    var log = req.params.log;
    var busStopId = req.params.busStopId;

    var list = [];
    for (var idx in rawData) {
        var geoBusObj = parseObj(rawData[idx]);
        list.push(geoBusObj);
    }

    var filteredList = [];
    for (var idx in list) {
        var obj = list[idx];
        for (var idx2 in obj.busStops) {
            var listofBusStops = obj.busStops;
            if (listofBusStops[idx2] == busStopId) {
                filteredList.push(parseGeoLocation(obj.data));
            }
        }
    }

    for (var idx in filteredList) {
        console.log(filteredList[idx]);
    }

//    console.log("last feed = " + filteredList[filteredList.length - 1]);
//    console.log("Original Size = " + list.length);
//    console.log("Size = " + filteredList.length);

    var lastFeed = filteredList[filteredList.length - 1];
    var busStopObj = getBusStop(busStopId);

    console.log(lastFeed);
    var params1 = "origins=" + lat + "," + log + "&destinations=" + lastFeed[0] + "," + lastFeed[1] + "&mode=driving&language=en-EN&transit_mode=bus&units=imperial&key=" + API_KEY;
    var params2 = "origins=" + lat + "," + log + "&destinations=" + busStopObj.lat + "," + busStopObj.long + "&mode=driving&language=en-EN&transit_mode=bus&units=imperial&key=" + API_KEY;
    var urlTohit = baseUrl + params1;

    request(urlTohit, function (error, response, body) {
        var googleResponse = JSON.parse(body);
        console.log(googleResponse);
        console.log(googleResponse.rows[0]);
        var values = googleResponse.rows[0].elements;
        console.log(values[0].distance);
        console.log(values[0].duration);
        var header = {'Access-Control-Allow-Origin': '*'};
        res.set(header).status(200).send({time: values[0].duration.text, distance: values[0].distance.text});
    });

});

function getBusStop(busStopId) {
    var returnedObj;
    for (var idx in STOPS) {
        if (STOPS[idx].id == busStopId) {
            returnedObj = STOPS[idx];
            break;
        }
    }
    return returnedObj;
}

//"https://maps.googleapis.com/maps/api/distancematrix/json?origins=18.2565222,-66.1070666&destinations=18.244883,-66.0854369&mode=driving&language=en-EN&transit_mode=bus&units=imperial&key=AIzaSyCobKNq9ZrtBIJMYOBUfYnr-vBD--Zili8"//