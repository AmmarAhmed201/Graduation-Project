const {Stations} = require('../models/stations-model');
const {Lines} = require('../models/lines-model');

let name="";
let lineView= [];
 let locStation = async(req, res) => {
  console.log("Entered backend")
  console.log(name);

  let station= new Stations({
  coordinates:req.body.location
    });
  
  console.log(station);

  const stations= await Stations.findOne({location:req.body.location});
  if(!stations) return res.status(404).send('the customer with the given name was not found');
  name=stations.name;
  console.log(name);






  const avaLines= await Lines.find({stations:name});
   if(!avaLines) return res.status(404).send('no lines at this location');
  
  const len=avaLines.length;
  for (i=0;i<len;i++){
     lineView[i] = [avaLines[i].id,avaLines[i].cost];
  }  
  res.send(lineView);
    };


    module.exports.locStation=locStation  ;
    // module.exports.avlines= avLines ;

   