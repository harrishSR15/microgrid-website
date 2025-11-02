function loadPreviousDayData() {
  const tbody = document.querySelector("#prevTable tbody");
  tbody.innerHTML = "";

  // Yesterday’s date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toLocaleDateString("en-GB"); // e.g. 01/11/2025

  // Generate 5 fake readings
  for (let i = 0; i < 5; i++) {
    const time = `${8 + i * 2}:00`;
    const voltage = (220 + Math.random() * 10).toFixed(2);
    const current = (1 + Math.random()).toFixed(2);
    const power = (voltage * current).toFixed(2);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${dateStr}</td>
      <td>${time}</td>
      <td>${voltage}</td>
      <td>${current}</td>
      <td>${power}</td>
    `;
    tbody.appendChild(row);
  }
}

// Load data when page opens
loadPreviousDayData();


// Load previous readings once when page starts
loadPreviousDayData();

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
