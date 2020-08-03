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


