$(document).ready(function () {
  // fetching data from OBCSensors
  setInterval(() => {
    $.ajax({
      type: "GET",
      url: "OBCSensors.json",
      success: function (response) {
        response.forEach((data) => {
          $("#batteryTemp_1").html(data["Battery Temperature 1"]);
          $("#batteryTemp_2").html(data["Battery Temperature 2"]);
          $("#batteryTemp_3").html(data["Battery Temperature 3"]);
          $("#batteryTemp_4").html(data["Battery Temperature 4"]);
          $("#boardTemp").html(data["Board Temperature"]);
        });
      },
    });
  }, 100);

  // fetching data from BME280 sensor
  setInterval(() => {
    $.ajax({
      type: "GET",
      url: "BME280.json",
      success: function (result) {
        result.forEach((bme) => {
          $("#ambientTemp").html(bme["Ambient Temperature"]);
          $("#data_humidity").html(bme.Humidity);
          $("#data_pressure").html(bme.pressure);
          $("#data_altitude").html(bme.altitude);
          $("#graphHumidity").html(bme.Humidity.toString().replace(/\%/g, ""));
        });
      },
    });
  }, 100);

  // fetching image from image.json

  // $.ajax({
  //   type: "GET",
  //   url: "image.json",
  //   success: function (res) {
  //     res.forEach((element) => {
  //       $("#image").prepend('<img height="350" src="' + element.path + '" />');
  //     });
  //   },
  // });

  setInterval(() => {
    $.ajax({
      type: "GET",
      url: "image.json",
      success: function (res) {
        res.forEach((element) => {
          $("#addImg").attr("src", element.path);
        });
      },
    });
  }, 100);

  // insert json data automatically for obc sensor
  let Temperature_1 = 5;
  let Temperature_2 = 6;
  let Temperature_3 = 7;
  let Temperature_4 = 8;
  let board_temperature = 4;

  setInterval(() => {
    Temperature_1 = Temperature_1 + 0.01;
    Temperature_2 = Temperature_2 + 1;
    Temperature_3 = Temperature_3 + 4;
    Temperature_4 = Temperature_4 + 7;
    board_temperature = board_temperature + 10;
    $("#temp1").val(Temperature_1.toFixed(2));
    $("#temp2").val(Temperature_2.toFixed(2));
    $("#temp3").val(Temperature_3.toFixed(2));
    $("#temp4").val(Temperature_4.toFixed(2));
    $("#Boardtemp").val(board_temperature.toFixed(2));

    $.ajax({
      type: "post",
      url: "json.php",
      data: {
        BatteryTemperature1: Temperature_1.toFixed(2),
        BatteryTemperature2: Temperature_2.toFixed(2),
        BatteryTemperature3: Temperature_3.toFixed(2),
        BatteryTemperature4: Temperature_4.toFixed(2),
        BoardTemperature: board_temperature.toFixed(2),
        OBC: "OBC",
      },
      success: function (res) {
        if (res == 200) {
        } else {
          console.log(res);
        }
      },
    });
  }, 2000);

  // insert json data automatically for obc sensor
  let ambientTemperature = 17;
  let humidity = 30;
  let pressure = 800;
  let altitude = 0;

  setInterval(() => {
    ambientTemperature = ambientTemperature + 0.01;
    humidity = humidity + 0.01;
    pressure = pressure + 0.01;
    altitude = altitude + 10;
    $("#ambientTemperature").val(ambientTemperature.toFixed(2));
    $("#humidity").val(humidity.toFixed(2));
    $("#pressure").val(pressure.toFixed(2));
    $("#altitude").val(altitude);

    $.ajax({
      type: "post",
      url: "json.php",
      data: {
        ambientTemperature: ambientTemperature.toFixed(2),
        humidity: humidity.toFixed(2),
        pressure: pressure.toFixed(2),
        altitude: altitude,
        BME: "BME",
      },
      success: function (resBME) {
        if (resBME == 200) {
          console.log("Success");
        } else {
          console.log("Failed");
        }
      },
    });
  }, 2000);
});

// code for graph
/*
function chartApex() {
  var options1 = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [0],
    colors: ["#124CD2"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: "#333",
          startAngle: -135,
          endAngle: 135,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            fontSize: "30px",
            show: true,
            formatter: function (humidityValue) {
              return humidityValue + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
    labels: ["Humidity"],
  };
  return options1;
}
setInterval(chartApex, 100);

var chart = new ApexCharts(document.querySelector("#chart1"), chartApex());
chart.render();

var options2 = {
  chart: {
    height: 280,
    type: "radialBar",
  },
  series: [0],
  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      track: {
        background: "#333",
        startAngle: -135,
        endAngle: 135,
      },
      dataLabels: {
        name: {
          show: true,
        },
        value: {
          fontSize: "30px",
          show: true,
          formatter: function (altitudeValue) {
            return altitudeValue + "m";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "butt",
  },
  labels: ["Altitude"],
};

var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();

var options3 = {
  chart: {
    height: 280,
    type: "radialBar",
  },
  series: [0],
  colors: ["#A312D2"],
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: "20px",
          show: true,
          formatter: function (pressureValue) {
            return pressureValue + "kpa";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "butt",
  },
  labels: ["Pressure"],
};

var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
chart3.render();
function updateChart() {
  $.getJSON("BME280.json", function (rez) {
    return rez.json();
  }).then((dat) => {
    dat.forEach((ValElement) => {
      chart.updateSeries([ValElement.Humidity.toString().replace(/\%/g, "")]);
      chart3.updateSeries([
        ValElement.pressure.toString().replace(/\hPa/g, ""),
      ]);
      chart2.updateSeries([ValElement.altitude.toString().replace(/\m/g, "")]);
    });
  });
}

setInterval(updateChart, 200);
*/
