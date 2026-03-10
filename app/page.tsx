import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: '😊',
      title: 'บันทึกอารมณ์ประจำวัน',
      description: 'ติดตามสภาพจิตใจของคุณด้วยการเช็คอินแบบ Emoji ง่าย ๆ ทุกวัน',
      href: '/mood-checkin',
      color: 'bg-yellow-50 border-yellow-200',
      btnColor: 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900',
    },
    {
      icon: '📋',
      title: 'ประเมินสุขภาพจิต',
      description: 'ทำแบบประเมินสั้น ๆ เพื่อรับผลและคำแนะนำเบื้องต้นทันที',
      href: '/self-assessment',
      color: 'bg-blue-50 border-blue-200',
      btnColor: 'bg-blue-500 hover:bg-blue-600 text-white',
    },
    {
      icon: '💬',
      title: 'ปรึกษานักจิตวิทยา',
      description: 'พูดคุยหรือจองนัดกับนักจิตวิทยาโดยไม่เปิดเผยตัวตน',
      href: '/consultation',
      color: 'bg-green-50 border-green-200',
      btnColor: 'bg-green-500 hover:bg-green-600 text-white',
    },
    {
      icon: '📊',
      title: 'แดชบอร์ด HR',
      description: 'ภาพรวมสุขภาพจิตขององค์กรแบบรวม — ไม่ระบุตัวบุคคล',
      href: '/hr-dashboard',
      color: 'bg-purple-50 border-purple-200',
      btnColor: 'bg-purple-500 hover:bg-purple-600 text-white',
    },
  ];

  const steps = [
    { step: '1', title: 'เข้าสู่แพลตฟอร์ม', desc: 'ไม่ต้องลงทะเบียน ไม่เก็บข้อมูลส่วนตัว' },
    { step: '2', title: 'เลือกบริการที่ต้องการ', desc: 'บันทึกอารมณ์ ประเมินตนเอง หรือปรึกษา' },
    { step: '3', title: 'รับการดูแล', desc: 'รับผลและคำแนะนำที่เหมาะสมทันที' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            แพลตฟอร์มดูแลสุขภาพจิต
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            ปลอดภัย ไม่เปิดเผยตัวตน พร้อมดูแลคุณ
          </p>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-8">
            เราเชื่อว่าสุขภาพจิตที่ดีคือรากฐานของความสำเร็จ
            แพลตฟอร์มนี้ช่วยให้คุณดูแลสุขภาพจิตได้อย่างสะดวก ปลอดภัย และเป็นส่วนตัว
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mood-checkin"
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition"
            >
              เริ่มบันทึกอารมณ์วันนี้
            </Link>
            <Link
              href="/self-assessment"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-700 transition"
            >
              ประเมินสุขภาพจิต
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Badge */}
      <section className="bg-green-50 border-b border-green-200 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-green-700 text-sm font-medium">
          <span className="flex items-center gap-2">🔒 ไม่เก็บข้อมูลส่วนตัว</span>
          <span className="flex items-center gap-2">👤 ไม่ระบุตัวตน</span>
          <span className="flex items-center gap-2">🛡️ ข้อมูลเข้ารหัสทั้งหมด</span>
          <span className="flex items-center gap-2">❌ ไม่แชร์ให้บุคคลที่สาม</span>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            บริการของเรา
          </h2>
          <p className="text-center text-gray-500 mb-12">
            เลือกบริการที่เหมาะกับความต้องการของคุณ
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.href}
                className={`border-2 rounded-2xl p-6 flex flex-col items-center text-center ${feature.color}`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-1">{feature.description}</p>
                <Link
                  href={feature.href}
                  className={`w-full py-2 px-4 rounded-full text-sm font-semibold transition ${feature.btnColor}`}
                >
                  เข้าใช้งาน →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            วิธีการใช้งาน
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {steps.map((item) => (
              <div key={item.step} className="flex-1 text-center">
                <div className="w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-8 px-4">
        <p className="text-sm">
          © 2024 แพลตฟอร์มสุขภาพจิต • ข้อมูลทั้งหมดเป็นความลับและไม่ระบุตัวตน
        </p>
      </footer>
    </div>
  );
}
