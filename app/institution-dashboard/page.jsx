"use client"
import { useState, useRef, useEffect } from "react"
import Chart from "chart.js/auto"
import { KeyRound, University, Upload, CheckCircle, AlertTriangle, BarChart } from "lucide-react"

const recentVerifications = [
  { id: "JU2021/CS/1247", status: "success" },
  { id: "JU2021/ME/0894", status: "success" },
  { id: "JU2020/EC/1456", status: "error" },
]

export default function InstitutionDashboard() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [institution, setInstitution] = useState("")
  const [accessKey, setAccessKey] = useState("")
  const institutionChartRef = useRef(null)
  const institutionChartInstance = useRef(null)

  // Initialize chart
  useEffect(() => {
    if (loggedIn && institutionChartRef.current && !institutionChartInstance.current) {
      institutionChartInstance.current = new Chart(institutionChartRef.current, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          datasets: [
            {
              label: "Certificates Issued",
              data: [120, 190, 300, 500, 200, 300, 450, 280, 320],
              backgroundColor: "rgba(20, 184, 166, 0.1)",
              borderColor: "#14B8A6",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
            {
              label: "Verifications",
              data: [80, 150, 280, 480, 180, 290, 420, 260, 300],
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              borderColor: "#F59E0B",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "top" } },
          scales: { y: { beginAtZero: true } },
        },
      })
    }
  }, [loggedIn])

  function handleLogin() {
    if (!institution || !accessKey) return
    setLoggedIn(true)
  }

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <University className="w-7 h-7 text-teal-600" /> Institution Dashboard
        </h2>

        {!loggedIn ? (
          // 🔑 Login Screen
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-teal-600" /> Institution Login
              </h3>

              <div className="mb-4">
                <label
                  htmlFor="institutionSelect"
                  className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-300"
                >
                  Institution
                </label>
                <select
                  id="institutionSelect"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                >
                  <option value="">Select Institution</option>
                  <option value="ranchi">Ranchi University</option>
                  <option value="bit">Birla Institute of Technology</option>
                  <option value="iit">IIT Dhanbad</option>
                  <option value="nit">NIT Jamshedpur</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="accessKey"
                  className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-300"
                >
                  Access Key
                </label>
                <input
                  type="password"
                  id="accessKey"
                  placeholder="Enter institution access key"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg w-full py-3 font-semibold transition"
              >
                Access Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Stats + Recent Verifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Certificate Management */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-teal-600" /> Certificate Management
                </h4>
                <div className="flex justify-between mb-4">
                  <div className="text-2xl font-bold text-teal-600">2,450</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Certificates</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-2xl font-bold text-teal-600">156</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">This Month</div>
                </div>
                <button className="mt-8 w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 rounded-md py-3 font-semibold dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 dark:text-gray-100 transition">
                  Bulk Upload
                </button>
              </div>

              {/* Recent Verifications */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600" /> Recent Verifications
                </h4>
                <div className="flex flex-col gap-3">
                  {recentVerifications.map(({ id, status }) => (
                    <div
                      key={id}
                      className="flex justify-between items-center rounded-md border p-3 dark:border-gray-600"
                    >
                      <span className="font-mono text-sm">{id}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
                          status === "success"
                            ? "bg-teal-100 text-teal-700 border border-teal-600"
                            : "bg-red-100 text-red-700 border border-red-600"
                        }`}
                      >
                        {status === "success" ? (
                          <>
                            <CheckCircle className="w-4 h-4" /> Verified
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4" /> Flagged
                          </>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-teal-600" /> Analytics
              </h4>
              <div className="relative h-80">
                <canvas ref={institutionChartRef} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
