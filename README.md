# Aurora Businesses
Aurora businesses by city council ward

## Data Sources
[City of Aurora, CO GIS Open Data Portal](http://data-auroraco.opendata.arcgis.com/)

## Scripts and Data transformation
Convert shapefiles to WGS-84 and to GeoJSON, filter fields and export as a geojson
```
mapshaper Businesses_-_Retail_Trade.shp -proj wgs84 -filter-fields Business_A,Business_N,NAICS_Sect -o format=geojson ../data/retail_businesses.json

mapshaper City_Council_Wards.shp -proj wgs84 -o format=geojson ../data/city_council_wards.json
```

### Extract colors from carto colors
```Javascript
import fs from 'fs';
import chalk from 'chalk';

console.log(chalk.green('Start process'));

//read in file
fs.readFile('data/cartocolors.json', (err, data) => {
    if (err) throw error;

    console.log(chalk.green('data loaded'));

    extractData(JSON.parse(data));
});

function extractData(data) {
    //create new object
    let outputData = {'BluYl': data['BluYl']};

    console.log(chalk.green('Data extracted'), outputData);

    writeOutFile(outputData);

}


function writeOutFile(outputData) {
    //write file
    fs.writeFileSync('data/bluYlColors.json', JSON.stringify(outputData), 'utf-8', function (err){
        if(err) throw error;

        console.log(chalk.blue('data/bluYlColors.json written to file'));
    });
}
```

### Point in Polygon Analysis
Calculate total retail businesses per city council ward
```
mapshaper city_council_wards.json -join retail_businesses.json calc='count = count()' fields=count -o format=geojson ../data/city_council_wards_joined.json
```