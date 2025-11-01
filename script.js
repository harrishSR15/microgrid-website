// Create chart using Chart.js
const ctx = document.getElementById('powerChart').getContext('2d');
const powerData = {
  labels: [],
  datasets: [{
    label: 'Power (W)',
    data: [],
    borderColor: 'rgb(75, 192, 192)',
    fill: false,
    tension: 0.2
  }]
};

const powerChart = new Chart(ctx, {
  type: 'line',
  data: powerData,
  options: {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Time' }
      },
      y: {
        title: { display: true, text: 'Power (W)' }
      }
    }
  }
});

// Function to simulate new readings
function updateReadings() {
  const voltage = (220 + Math.random() * 10).toFixed(2);
  const current = (1 + Math.random()).toFixed(2);
  const power = (voltage * current).toFixed(2);
  const time = new Date().toLocaleTimeString();

  document.getElementById('voltage').textContent = voltage;
  document.getElementById('current').textContent = current;
  document.getElementById('power').textContent = power;
  document.getElementById('timestamp').textContent = time;

  // Update chart
  powerData.labels.push(time);
  powerData.datasets[0].data.push(power);
  if (powerData.labels.length > 10) {
    powerData.labels.shift();
    powerData.datasets[0].data.shift();
  }
  powerChart.update();
}

// Update every 2 seconds
setInterval(updateReadings, 2000);
