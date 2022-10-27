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


    // Add in topsport walkingoutdoor

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

    // chart.updateSeries([
    //     {
    //         name: "Walking Outdoor",
    //         data: walkingOutdoorNum

    //     }

    // ])

    // Add in top sport jogging running
    function transformData2(rawData) {
        let shortlisted = [];
        // console.log(rawData);
        for (let record of rawData) {
            shortlisted.push({
                'x': parseInt(record.annual),
                'y': parseInt(record.joggingrunning)
            });
        }
        console.log(shortlisted);
        return shortlisted;
    }
    let joggingRunning = transformData2(topSports);

    // chart.updateSeries([
    //     {
    //         name: "Walking Outdoor",
    //         data: walkingOutdoorNum

    //     },
    //     {
    //         name: "Jogging-running",
    //         data: joggingRunning

    //     }

    // ])


    // Add in topsport cycling 
    function transformData3(rawData) {
        let shortlisted = [];
        // console.log(rawData);
        for (let record of rawData) {
            shortlisted.push({
                'x': parseInt(record.annual),
                'y': parseInt(record.cycling)
            });
        }
        console.log(shortlisted);
        return shortlisted;
    }
    let cycling = transformData3(topSports);

    chart.updateSeries([
        {
            name: "Walking Outdoor",
            data: walkingOutdoorNum

        },
        {
            name: "Jogging-running",
            data: joggingRunning

        },
        {
            name: "Cycling",
            data: cycling

        }

    ])



    //LOAD CHART FOR PARTICIPATE IN SPORTS


    let chartOptions2 = {
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


    const chart2 = new ApexCharts(
        document.querySelector("#chart-participate"), chartOptions2


    )

    chart2.render();



    async function loadData2() {
        let response = await axios.get("participate-sports.csv");

        let json = await csv().fromString(response.data);
        console.log(json);
        return (json);


    }

    //Add data of regular participate
    let participateSports = await loadData2();
    let regularParticipate = transformData4(participateSports);
    function transformData4(rawData) {
        let shortlisted = [];
        // console.log(rawData);
        for (let record of rawData) {
            shortlisted.push({
                'x': parseInt(record.annual),
                'y': parseInt(record.regular)


            });
        }
        console.log(shortlisted);
        return shortlisted
    }

     //Add data of irregular participate
     let irregularParticipate = transformData5(participateSports);
     function transformData5(rawData) {
         let shortlisted = [];
         // console.log(rawData);
         for (let record of rawData) {
             shortlisted.push({
                 'x': parseInt(record.annual),
                 'y': parseInt(record.irregular)
 
 
             });
         }
         console.log(shortlisted);
         return shortlisted
     }

     //Add data of sedentary
     let sedentary = transformData6(participateSports);
     function transformData6(rawData) {
         let shortlisted = [];
         // console.log(rawData);
         for (let record of rawData) {
             shortlisted.push({
                 'x': parseInt(record.annual),
                 'y': parseInt(record.sedentary)
 
 
             });
         }
         console.log(shortlisted);
         return shortlisted
     }

      //Add data of noparticipate
      let noparticipate = transformData7(participateSports);
      function transformData7(rawData) {
          let shortlisted = [];
          // console.log(rawData);
          for (let record of rawData) {
              shortlisted.push({
                  'x': parseInt(record.annual),
                  'y': parseInt(record.didnotparticipatepastyear)
  
  
              });
          }
          console.log(shortlisted);
          return shortlisted
      }
 




    chart2.updateSeries([
        {
            name: "Regular",
            data: regularParticipate
        },
        {
            name: "Irregular",
            data: irregularParticipate
        },
        {
            name: "Sedentary",
            data: sedentary
        },
        {
            name: "No participation",
            data: noparticipate
        }

    ])

}
main();

