const canvas = document.querySelector('#expenseChart').getContext('2d');

let userData;
/* let dataAmts = [];
fetch('data.json')
  .then(blob => blob.json())
  .then(res => (userData = res))
  .then(data =>
    data.forEach(arg => {
      dataAmts.push(arg.amount);
    })
  );
 */
let dataAmts = [];
const getData = async function () {
  return fetch('data.json')
    .then(blob => blob.json())
    .then(res => (userData = res))
    .then(data => data.map(arg => arg.amount));
};

const makeChart = async function () {
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      datasets: [
        {
          label: '',
          data: await getData(),
          backgroundColor: [
            'hsl(10, 79%, 65%)',
            'hsl(10, 79%, 65%)',
            'hsl(186, 34%, 60%)',
            'hsl(10, 79%, 65%)',
            'hsl(10, 79%, 65%)',
            'hsl(10, 79%, 65%)',
            'hsl(10, 79%, 65%)',
          ],
          hoverBackgroundColor: [
            'hsl(10, 79%, 75%)',
            'hsl(10, 79%, 75%)',
            'hsl(186, 34%,70%)',
            'hsl(10, 79%, 75%)',
            'hsl(10, 79%, 75%)',
            'hsl(10, 79%, 75%)',
            'hsl(10, 79%, 75%)',
          ],
          borderSkipped: '',
          borderWidth: 0,
          borderRadius: 3,
          color: ['hsl(28, 10%, 53%)'],
        },
      ],
    },
    options: {
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0]
          ? 'pointer'
          : 'default';
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          display: false,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          drawOnChartArea: false,
        },
      },
      plugins: {
        legend: {
          labels: {
            boxWidth: 0,
            boxHeight: 20,
          },
        },
        tooltip: {
          backgroundColor: 'hsl(25, 47%, 15%)',
          yAlign: 'bottom',
          xAlign: 'center',
          caretSize: 0,
          displayColors: false,
          caretPadding: 8,
          bodyFont: {
            family: "'DM Sans', sans-serif",
          },
          callbacks: {
            title: () => {},
            label: context => {
              return '$' + context.formattedValue;
            },
          },
        },
      },
    },
  });
};
const myChart = makeChart();
