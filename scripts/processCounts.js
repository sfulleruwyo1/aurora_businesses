import fs from 'fs';


//read in file.
fs.readFile('../data/city_council_wards.json', 'utf8', (err, geojson)=>{
    if (err) throw error;

    //
    fs.readFile('../data/retail_businesses.json', 'utf8', (err, geojson2)=> {
        if (err) throw error;
        joinData(geojson, geojson2);
    })
});

function joinData(geojson, geojson2){

}