'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const moodTrendData = [
  { week: 'ส.1', avgMood: 3.2 },
  { week: 'ส.2', avgMood: 3.5 },
  { week: 'ส.3', avgMood: 2.9 },
  { week: 'ส.4', avgMood: 3.8 },
  { week: 'ส.5', avgMood: 4.0 },
  { week: 'ส.6', avgMood: 3.6 },
  { week: 'ส.7', avgMood: 3.9 },
  { week: 'ส.8', avgMood: 4.2 },
];

const assessmentData = [
  { name: 'ปกติ', count: 42, color: '#22c55e' },
  { name: 'ระดับน้อย', count: 28, color: '#eab308' },
  { name: 'ระดับปานกลาง', count: 18, color: '#f97316' },
  { name: 'ระดับสูง', count: 8, color: '#ef4444' },
];

const stressFactorData = [
  { factor: 'งาน', count: 65 },
  { factor: 'ความสัมพันธ์', count: 40 },
  { factor: 'การนอนหลับ', count: 55 },
  { factor: 'การเงิน', count: 30 },
  { factor: 'สุขภาพ', count: 25 },
  { factor: 'ครอบครัว', count: 35 },
];

const stats = [
  { label: 'การเช็คอินทั้งหมด', value: '1,284', change: '+12%', positive: true },
  { label: 'ผู้ใช้งานใหม่เดือนนี้', value: '96', change: '+8%', positive: true },
  { label: 'คะแนนอารมณ์เฉลี่ย', value: '3.7/5', change: '+0.3', positive: true },
  { label: 'การนัดหมาย', value: '24', change: '-2%', positive: false },
];

export default function HRDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">แดชบอร์ด HR</h1>
          <p className="text-gray-500 text-sm">ข้อมูลสุขภาพจิตรวมขององค์กร — ทุกข้อมูลถูกทำให้ไม่สามารถระบุตัวตนได้</p>
        </div>

        {/* Anonymization Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="font-semibold text-blue-800 text-sm">ข้อมูลที่แสดงผ่านการทำให้ไม่ระบุตัวตนแล้ว</p>
            <p className="text-blue-600 text-xs mt-1">
              ข้อมูลทั้งหมดเป็นการรวบรวมเชิงสถิติ ไม่สามารถติดตามไปยังพนักงานรายบุคคลได้
              ข้อมูลจะแสดงเมื่อมีผู้ตอบมากกว่า 5 คนเท่านั้น
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6">
              <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className={`text-xs font-medium mt-1 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change} จากเดือนที่แล้ว
              </p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mood Trend */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">แนวโน้มอารมณ์เฉลี่ยรายสัปดาห์</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis domain={[1, 5]} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => [value.toFixed(1), 'คะแนนเฉลี่ย']}
                />
                <Line
                  type="monotone"
                  dataKey="avgMood"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stress Factors */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">ปัจจัยที่ส่งผลต่อสุขภาพจิต</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stressFactorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="factor" tick={{ fontSize: 12 }} width={80} />
                <Tooltip formatter={(value: number) => [value, 'ครั้ง']} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Assessment Distribution */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">ผลการประเมินสุขภาพจิต</h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={assessmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {assessmentData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [value, 'คน']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {assessmentData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-gray-600">{item.name}</span>
                    <span className="text-xs font-semibold text-gray-800 ml-auto">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">คำแนะนำสำหรับ HR</h2>
            <div className="space-y-3">
              {[
                { icon: '🧘', text: 'จัดกิจกรรม Mindfulness หรือ Yoga สัปดาห์ละครั้ง', priority: 'สูง' },
                { icon: '💼', text: 'ทบทวนนโยบาย Work-Life Balance', priority: 'สูง' },
                { icon: '😴', text: 'รณรงค์การนอนหลับที่มีคุณภาพ', priority: 'กลาง' },
                { icon: '🤝', text: 'จัดอบรม Mental Health Awareness', priority: 'กลาง' },
              ].map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <span className="text-xl">{rec.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{rec.text}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      rec.priority === 'สูง'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pb-4">
          ข้อมูลอัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
          {' '}• ข้อมูลทั้งหมดผ่านกระบวนการทำให้ไม่ระบุตัวตน
        </p>
      </div>
    </div>
  );
}
