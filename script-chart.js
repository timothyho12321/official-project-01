// let options = {
//     "chart": {
//         "type": "line",
//         "height": "100%"

//     },
//     "series": [
// {
//     "name":"sightings",
//     "data":[10,30,25,43,32]
// },
// {
// "name":"spacepod",
// "data":[5,15,26,19,20]

// }

//     ],
//     "xaxis":{
// "categories":["Jan", "Feb", "Mar", "Apr", "May"]

//     }


// }


// let chart = new ApexCharts(document.querySelector("#chart"), options);


// chart.render();


async function main() {


    const chartOptions = {
        chart: {
            type: 'line',
            height: '100%'

        },

        series: [

        ],

        noData: {
            text: "Please wait while data loads"
        }

    }


    const chart = new ApexCharts(
        document.querySelector("#chart"), chartOptions


    )

    chart.render();



    //SOURCE FOR TOPSPORTS - https://data.gov.sg/dataset/top-sport-physical-activity-by-sg-residents-overall
    // SOURCE FOR SPORT PARTICIPATION - https://data.gov.sg/dataset/sport-participation-level
    async function loadData() {
        let response = await axios.get("top-sports.csv");

        let json = await csv().fromString(response.data);
        // console.log(json);
        return (json);


    }

    let topSports = await loadData();
    // console.log(topSports);


    function transformData(rawData) {
        let shortlisted = [];
        // console.log(rawData);
        for (let record of rawData) {
            shortlisted.push({
                'x': parseInt(record.annual),
                'y': parseInt(record.walkingoutdoor)


            });
        }
        console.log(shortlisted);
        return shortlisted
    }
    let walkingOutdoorNum = transformData(topSports);

    chart.updateSeries([
        {
            name: "Walking Outdoor",
            data: walkingOutdoorNum

        }

    ])


}
main();

