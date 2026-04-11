export const createLineChartConfig = () => {
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
    datasets: [
      {
        label: "Siswa Baru",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0, "rgba(59, 130, 246, 0)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.2)");
          return gradient;
        },
        borderColor: "#3b82f6",
        borderWidth: 3,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#3b82f6",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#3b82f6",
        pointHoverBorderColor: "#ffffff",
        data: [65, 80, 110, 95, 130, 160, 145],
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} siswa baru`,
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: "#e2e8f0",
          drawBorder: false,
        },
        ticks: {
          callback: (value) => value + " siswa",
          color: "#64748b",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 0.8,
        to: 0.4,
        loop: false,
      },
    },
  };

  return { lineChartData, lineChartOptions };
};

export const createPieChartConfig = () => {
  const pieChartData = {
    labels: ["Frontend", "Backend", "Design", "Data Science", "Mobile"],
    datasets: [
      {
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#8b5cf6",
          "#ec4899",
        ],
        borderWidth: 0,
        hoverOffset: 7,
        data: [35, 25, 20, 10, 10],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          color: "#334155",
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} kursus (${percentage}%)`;
          },
        },
      },
    },
    cutout: "65%",
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 800,
    },
  };

  return { pieChartData, pieChartOptions };
};
