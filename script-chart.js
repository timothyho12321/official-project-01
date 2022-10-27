let options = {
    "chart": {
        "type": "line",
        "height": "100%"

    },
    "series": [
{
    "name":"sightings",
    "data":[10,30,25,43,32]
},
{
"name":"spacepod",
"data":[5,15,26,19,20]

}

    ],
    "xaxis":{
"categories":["Jan", "Feb", "Mar", "Apr", "May"]

    }


}


let chart = new ApexCharts(document.querySelector("#chart"), options);


chart.render();