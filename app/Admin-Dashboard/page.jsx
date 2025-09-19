"use client"
import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { AlertTriangle, ShieldCheck, TrendingUp, TrendingDown, Minus } from "lucide-react"

const fraudPatterns = [
  { type: "Tampered Grades", count: 156, severity: "Medium", trend: "increasing" },
  { type: "Forged Signatures", count: 89, severity: "High", trend: "stable" },
  { type: "Invalid Certificate Numbers", count: 45, severity: "High", trend: "decreasing" },
  { type: "Non-existent Courses", count: 34, severity: "Critical", trend: "stable" },
]

const institutions = [
  { name: "Ranchi University", certificates: 1200, verifications: 1100, frauds: 12 },
  { name: "Birla Institute of Technology", certificates: 900, verifications: 850, frauds: 8 },
  { name: "IIT Dhanbad", certificates: 1500, verifications: 1400, frauds: 5 },
  { name: "NIT Jamshedpur", certificates: 800, verifications: 780, frauds: 3 },
]

export default function AdminDashboard() {
  const fraudChartRef = useRef(null)
  const fraudChartInstance = useRef(null)

  useEffect(() => {
    if (fraudChartRef.current && !fraudChartInstance.current) {
      fraudChartInstance.current = new Chart(fraudChartRef.current, {
        type: "doughnut",
        data: {
          labels: [
            "Verified Certificates",
            "Tampered Grades",
            "Forged Signatures",
            "Invalid Numbers",
            "Non-existent Courses",
          ],
          datasets: [
            {
              data: [15523, 156, 89, 45, 34],
              backgroundColor: ["#14B8A6", "#F59E0B", "#DC2626", "#F87171", "#EAB308"],
              borderWidth: 3,
              borderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
              },
            },
          },
        },
      })
    }
  }, [])

  const trendIcon = (trend) => {
    if (trend === "increasing") return <TrendingUp className="w-4 h-4 text-red-600 inline ml-1" />
    if (trend === "decreasing") return <TrendingDown className="w-4 h-4 text-green-600 inline ml-1" />
    return <Minus className="w-4 h-4 text-gray-500 inline ml-1" />
  }

  const severityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600 text-white"
      case "High":
        return "bg-red-400 text-white"
      case "Medium":
        return "bg-yellow-400 text-black"
      default:
        return "bg-gray-300 text-black"
    }
  }

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-teal-600" /> Admin Dashboard
        </h2>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Verifications", value: "15,847", color: "text-teal-600" },
            { label: "Fraud Detected", value: "324", color: "text-red-600" },
            { label: "Institutions Connected", value: "45", color: "text-teal-600" },
            { label: "Success Rate", value: "97.9%", color: "text-teal-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <div className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Fraud Pattern Analysis */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" /> Fraud Pattern Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {fraudPatterns.map(({ type, count, severity, trend }) => (
              <div
                key={type}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md p-6 hover:shadow-lg transition"
              >
                <h4 className="font-semibold mb-2">{type}</h4>
                <p className="text-3xl font-bold text-red-600 mb-2">{count}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${severityColor(severity)}`}
                >
                  {severity}
                </span>
                <p className="mt-2">
                  <strong>Trend:</strong> {trend.charAt(0).toUpperCase() + trend.slice(1)} {trendIcon(trend)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud Detection Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6 mb-12">
          <h3 className="text-2xl font-semibold mb-6">Fraud Detection Overview</h3>
          <div className="relative h-96">
            <canvas ref={fraudChartRef} />
          </div>
        </div>

        {/* Institution Management Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-6">Institution Management</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-medium border-collapse">
              <thead className="border-b bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-3">Institution</th>
                  <th className="px-6 py-3">Certificates Issued</th>
                  <th className="px-6 py-3">Verifications</th>
                  <th className="px-6 py-3">Fraud Cases</th>
                </tr>
              </thead>
              <tbody>
                {institutions.map(({ name, certificates, verifications, frauds }, i) => (
                  <tr
                    key={name}
                    className={`${
                      i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
                    } border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                  >
                    <td className="px-6 py-4 font-medium">{name}</td>
                    <td className="px-6 py-4">{certificates}</td>
                    <td className="px-6 py-4">{verifications}</td>
                    <td className="px-6 py-4 text-red-600 font-semibold">{frauds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
