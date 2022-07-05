export const data = {
   labels: ['2013', '2014', '2014', '2015', '2016', '2017'],
   datasets: [{
      label: '# of Votes',
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: false
   }]
};

export const options = {
   scales: {
      yAxes: [{
         ticks: {
            beginAtZero: true
         },
         gridLines: {
            color: 'rgba(204, 204, 204,0.1)'
         }
      }],
      xAxes: [{
         gridLines: {
            color: 'rgba(204, 204, 204,0.1)'
         }
      }]
   },
   legend: {
      display: false
   },
   elements: {
      point: {
         radius: 0
      }
   }
}

export const tokenBalanceChartData = {
   labels: ['2013', '2014', '2015', '2016', '2017'],
   datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: true, // 3: no fill
   }]
};

export const areaData = {
   labels: ['2013', '2014', '2015', '2016', '2017'],
   datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: true, // 3: no fill
   }]
};

export const areaData2 = {
   labels: ['2013', '2014', '2015', '2016', '2017'],
   datasets: [{
      label: '# of Votes',
      data: [14, 2, 13, 4, 9, 3],
      backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: true, // 3: no fill
   }]
};

export const areaOptions = {
   plugins: {
      filler: {
         propagate: true
      }
   },
   scales: {
      yAxes: [{
         gridLines: {
            color: 'rgba(204, 204, 204,0.1)'
         }
      }],
      xAxes: [{
         gridLines: {
            color: 'rgba(204, 204, 204,0.1)'
         }
      }]
   }
}

export const doughnutPieData = {
   labels: ['N.America','S.America','C.America','Europa','Asia', 'Africa','Oceania'],
   datasets: [{
      backgroundColor: [
         'rgba(255, 99, 132, 0.5)',
         'rgba(54, 162, 235, 0.5)',
         'rgba(255, 206, 86, 0.5)',
         'rgba(75, 192, 192, 0.5)',
         'rgba(153, 102, 255, 0.5)',
         'rgba(255, 159, 64, 0.5)'
      ],
      borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
      ],
   }],
};

export const PolarAreaData = {
   labels: [
      'Red',
      'Green',
      'Yellow',
      'Grey',
      'Blue'
   ],
   datasets: [{
      label: 'My First Dataset',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
         'rgb(255, 99, 132)',
         'rgb(75, 192, 192)',
         'rgb(255, 205, 86)',
         'rgb(201, 203, 207)',
         'rgb(54, 162, 235)'
      ]
   }]
};

export const doughnutPieOptions = {
   responsive: true,
   animation: {
      animateScale: true,
      animateRotate: true
   }
};


export const PolarAreaOptions = {
   responsive: true,
   animation: {
      animateScale: true,
      animateRotate: true
   }
};