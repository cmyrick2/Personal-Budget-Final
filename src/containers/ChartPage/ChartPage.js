import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';


function ChartPage() {
  const dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [],
      }
    ],
    labels: []
  };

  function createPieChart() {
    var ctx = document.getElementById("pieChart").getContext("2d");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: dataSource
    });
  }

  function createBarChart() {
    var ctx = document.getElementById("barChart").getContext("2d");
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: dataSource
    });
  }

  function createRadarChart() {
    var ctx = document.getElementById("radarChart").getContext("2d");
    var myRadarChart = new Chart(ctx, {
      type: 'radar',
      data: dataSource
    });
  }

  function getExpense() {
    axios.get('http://localhost:3000/budget')
    .then(function (res) {
      console.log(res.data);
      for (var i = 0; i < res.data.myBudget.length; i++) {
        dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
        dataSource.labels[i] = res.data.myBudget[i].title;
      }
      createPieChart();
      createBarChart();
      createRadarChart();
    });
  }
  getExpense();
  return (
    <div className="chartpage">
        <div className="pie">
          <div className="text-box">
            <h1>Pie Chart</h1>
            <p>
              <canvas id="myPieChart" width="400" height="400"></canvas>
            </p>
          </div>
        </div>
        <div className="bar">
        <div className="text-box">
            <h1>Bar Chart</h1>
            <p>
              <canvas id="myBarChart" width="400" height="400"></canvas>
            </p>
          </div>
        </div>
        <div className="line">
        <div className="text-box">
            <h1>Radar Chart</h1>
            <p>
              <canvas id="myRadarChart" width="400" height="400"></canvas>
            </p>
          </div>
        </div>
    </div>
  );
}

export default ChartPage;