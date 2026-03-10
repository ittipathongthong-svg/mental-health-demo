'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
  { week: 'สัปดาห์ 1', average: 3.2 },
  { week: 'สัปดาห์ 2', average: 2.8 },
  { week: 'สัปดาห์ 3', average: 3.5 },
  { week: 'สัปดาห์ 4', average: 3.1 },
  { week: 'สัปดาห์ 5', average: 3.8 },
  { week: 'สัปดาห์ 6', average: 4.0 },
];

const moodDistributionData = [
  { mood: '😄 ดีมาก', count: 38 },
  { mood: '😊 ดี', count: 52 },
  { mood: '😐 เฉย ๆ', count: 45 },
  { mood: '😔 ไม่ดี', count: 28 },
  { mood: '😞 แย่มาก', count: 12 },
];

const stressFactorData = [
  { factor: 'งานหนัก', count: 65 },
  { factor: 'ความสัมพันธ์', count: 42 },
  { factor: 'การเงิน', count: 38 },
  { factor: 'สุขภาพ', count: 29 },
  { factor: 'ครอบครัว', count: 35 },
  { factor: 'การพักผ่อน', count: 48 },
];

const assessmentData = [
  { name: 'ดีมาก 🟢', value: 30, color: '#22c55e' },
  { name: 'พอใช้ได้ 🟡', value: 40, color: '#eab308' },
  { name: 'ควรดูแล 🟠', value: 22, color: '#f97316' },
  { name: 'ต้องการช่วยเหลือ 🔴', value: 8, color: '#ef4444' },
];

const consultationData = [
  { month: 'ต.ค.', sessions: 12 },
  { month: 'พ.ย.', sessions: 18 },
  { month: 'ธ.ค.', sessions: 15 },
  { month: 'ม.ค.', sessions: 22 },
  { month: 'ก.พ.', sessions: 28 },
  { month: 'มี.ค.', sessions: 24 },
];

const summaryCards = [
  { label: 'ผู้ใช้งานเดือนนี้', value: '175', icon: '👥', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700' },
  { label: 'คะแนนอารมณ์เฉลี่ย', value: '3.4/5', icon: '😊', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-700' },
  { label: 'การปรึกษาเดือนนี้', value: '24', icon: '💬', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
  { label: 'ต้องการการสนับสนุน', value: '8%', icon: '🔴', color: 'bg-red-50 border-red-200', textColor: 'text-red-700' },
];

export default function HRDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">แดชบอร์ด HR</h1>
          <p className="text-gray-500">ข้อมูลรวมด้านสุขภาพจิตพนักงาน — ไม่มีการระบุตัวตนบุคคล</p>
        </div>

        {/* Anonymization Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="font-semibold text-blue-800 mb-1">ข้อมูลนี้ถูกปกป้องอย่างเต็มที่</p>
            <p className="text-sm text-blue-700">
              ข้อมูลทั้งหมดในแดชบอร์ดนี้เป็นข้อมูลรวมเท่านั้น ไม่สามารถระบุตัวตนพนักงานแต่ละคนได้
              เพื่อรักษาความเป็นส่วนตัวและสร้างความไว้วางใจในองค์กร
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card) => (
            <div key={card.label} className={`rounded-2xl border p-5 ${card.color}`}>
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className={`text-2xl font-bold ${card.textColor} mb-1`}>{card.value}</div>
              <div className="text-sm text-gray-600">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Mood Trend */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📈 แนวโน้มอารมณ์รายสัปดาห์</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis domain={[1, 5]} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: number) => [`${value}/5`, 'คะแนนเฉลี่ย']}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Assessment Distribution */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 ผลการประเมินตนเอง</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={assessmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                  labelLine={false}
                >
                  {assessmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'สัดส่วน']} />
                <Legend
                  formatter={(value) => <span style={{ fontSize: '12px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Stress Factors */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ ปัจจัยที่ส่งผลต่ออารมณ์</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stressFactorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="factor" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip formatter={(value: number) => [value, 'จำนวนครั้ง']} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Consultation Trend */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">💬 จำนวนการปรึกษารายเดือน</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={consultationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: number) => [value, 'จำนวนครั้ง']} />
                <Bar dataKey="sessions" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">😊 การกระจายของอารมณ์รายเดือน</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={moodDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mood" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => [value, 'จำนวนคน']} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">💡 ข้อแนะนำสำหรับ HR</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
              <span className="text-red-500 mt-0.5">🔴</span>
              <div>
                <p className="text-sm font-semibold text-red-800">ต้องการดำเนินการเร่งด่วน</p>
                <p className="text-sm text-red-700">8% ของพนักงานอยู่ในระดับที่ต้องการความช่วยเหลือ ควรเพิ่มช่องทางการปรึกษาและสร้างสภาพแวดล้อมที่ปลอดภัย</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
              <span className="text-yellow-500 mt-0.5">🟡</span>
              <div>
                <p className="text-sm font-semibold text-yellow-800">ปัจจัยหลักที่ต้องแก้ไข</p>
                <p className="text-sm text-yellow-700">ภาระงานหนักเป็นปัจจัยอันดับ 1 ที่ส่งผล พิจารณาการปรับการจัดการงานหรือเพิ่มทรัพยากร</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
              <span className="text-green-500 mt-0.5">🟢</span>
              <div>
                <p className="text-sm font-semibold text-green-800">แนวโน้มที่ดี</p>
                <p className="text-sm text-green-700">คะแนนอารมณ์เฉลี่ยดีขึ้นในช่วง 6 สัปดาห์ที่ผ่านมา และจำนวนการปรึกษาเพิ่มขึ้น แสดงถึงความไว้วางใจที่เพิ่มขึ้น</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
