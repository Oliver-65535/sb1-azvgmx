// State management
const state = {
    metrics: {
        loading: false,
        error: null,
        data: null
    },
    logs: {
        loading: false,
        error: null,
        data: []
    }
};

// Chart configuration
let metricsChart;
const chartConfig = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'CPU Usage',
                borderColor: '#4299e1',
                data: [],
                fill: false
            },
            {
                label: 'Memory Usage',
                borderColor: '#48bb78',
                data: [],
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Usage %'
                },
                min: 0,
                max: 100
            }
        }
    }
};

// UI Updates
function updateUI() {
    updateMetricsUI();
    updateLogsUI();
}

function updateMetricsUI() {
    const { loading, error, data } = state.metrics;
    const metricsSection = document.querySelector('.metrics');
    const chartCanvas = document.getElementById('metricsChart');

    if (loading) {
        metricsSection.innerHTML = '<div class="loading">Loading metrics...</div>';
        return;
    }

    if (error) {
        metricsSection.innerHTML = `
            <div class="error-message">
                Failed to load metrics
                <button onclick="retryMetrics()">Retry</button>
            </div>
        `;
        return;
    }

    if (data) {
        document.getElementById('cpuUsage').textContent = `${data.cpu?.usage?.toFixed(1) || 0}%`;
        document.getElementById('memoryUsage').textContent = `${data.memory?.usage?.toFixed(1) || 0}%`;
        document.getElementById('uptime').textContent = formatUptime(data.uptime || 0);
        updateChart(data);
    }
}

function updateLogsUI() {
    const { loading, error, data } = state.logs;
    const container = document.getElementById('logsContainer');

    if (loading) {
        container.innerHTML = '<div class="loading">Loading logs...</div>';
        return;
    }

    if (error) {
        container.innerHTML = `
            <div class="error-message">
                Failed to load logs
                <button onclick="retryLogs()">Retry</button>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    data.forEach(addLogEntry);
}

// Initialize chart
function initChart() {
    const ctx = document.getElementById('metricsChart').getContext('2d');
    metricsChart = new Chart(ctx, chartConfig);
}

// Format timestamp
function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleTimeString();
}

// Format uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
}

// Update chart
function updateChart(metrics) {
    if (!metricsChart) return;

    const timestamp = formatTimestamp(metrics.timestamp);
    chartConfig.data.labels.push(timestamp);
    chartConfig.data.datasets[0].data.push(metrics.cpu?.usage || 0);
    chartConfig.data.datasets[1].data.push(metrics.memory?.usage || 0);

    if (chartConfig.data.labels.length > 20) {
        chartConfig.data.labels.shift();
        chartConfig.data.datasets.forEach(dataset => dataset.data.shift());
    }

    metricsChart.update();
}

// Add log entry to display
function addLogEntry(log) {
    const container = document.getElementById('logsContainer');
    const entry = document.createElement('div');
    entry.className = `log-entry ${log.level}`;
    entry.innerHTML = `
        <span class="log-timestamp">${new Date(log.timestamp).toLocaleString()}</span>
        <strong>${log.level.toUpperCase()}</strong>: ${log.message}
    `;
    container.appendChild(entry);
    container.scrollTop = container.scrollHeight;
}

// API calls
async function fetchWithTimeout(resource, options = {}) {
    const timeout = options.timeout || 5000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

async function fetchMetrics() {
    state.metrics.loading = true;
    state.metrics.error = null;
    updateUI();

    try {
      const url = new URL('/api/monitoring/metrics', window.location.origin);
        const response = await fetchWithTimeout(url);
        state.metrics.data = await response.json();
    } catch (error) {
        console.error('Failed to fetch metrics:', error);
        state.metrics.error = error;
    } finally {
        state.metrics.loading = false;
        updateUI();
    }
}

async function fetchLogs(level = '') {
    state.logs.loading = true;
    state.logs.error = null;
    updateUI();

    try {
        const url = new URL('/api/logs', window.location.origin);
        if (level) url.searchParams.append('level', level);
        const response = await fetchWithTimeout(url);
        state.logs.data = await response.json();
    } catch (error) {
        console.error('Failed to fetch logs:', error);
        state.logs.error = error;
    } finally {
        state.logs.loading = false;
        updateUI();
    }
}

// Retry functions
function retryMetrics() {
    fetchMetrics();
}

function retryLogs() {
    fetchLogs(document.getElementById('logLevel').value);
}

// Clear logs
async function clearLogs() {
    try {
        await fetchWithTimeout('/api/logs/clear', { method: 'POST' });
        state.logs.data = [];
        updateUI();
    } catch (error) {
        console.error('Failed to clear logs:', error);
        alert('Failed to clear logs. Please try again.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    
    // Initial data fetch
    fetchMetrics();
    fetchLogs();

    // Set up event listeners
    document.getElementById('logLevel').addEventListener('change', (e) => {
        fetchLogs(e.target.value);
    });

    // Poll for updates
    setInterval(fetchMetrics, 10000);
    setInterval(() => fetchLogs(document.getElementById('logLevel').value), 5000);
});