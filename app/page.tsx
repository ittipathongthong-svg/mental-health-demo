'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🌱</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            แพลตฟอร์มดูแลสุขภาพจิต
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            เราดูแลคุณ — อย่างปลอดภัย เป็นส่วนตัว และไม่มีการระบุตัวตน
          </p>
          <p className="text-blue-200 mb-10 max-w-2xl mx-auto">
            สุขภาพจิตที่ดีเป็นรากฐานของความสำเร็จ เราพร้อมสนับสนุนคุณ
            ทุกขั้นตอน ด้วยเครื่องมือที่ออกแบบมาเพื่อความเป็นส่วนตัว
            และความปลอดภัยทางจิตใจ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mood-checkin"
              className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              เริ่มต้นตรวจสอบอารมณ์
            </Link>
            <Link
              href="/self-assessment"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              ประเมินตนเอง
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Banner */}
      <section className="bg-green-50 border-y border-green-200 py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-green-800">
          <span className="text-2xl">🔒</span>
          <p className="text-sm md:text-base font-medium">
            ข้อมูลทั้งหมดถูกทำให้ไม่ระบุตัวตน — HR จะเห็นเฉพาะข้อมูลรวม
            ไม่มีใครรู้ว่าคุณเป็นใคร
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            บริการของเรา
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/mood-checkin" className="block group">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-yellow-100">
                <div className="text-4xl mb-4">😊</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">
                  บันทึกอารมณ์ประจำวัน
                </h3>
                <p className="text-gray-600 text-sm">
                  ติดตามอารมณ์และความรู้สึกของคุณทุกวัน เพื่อเข้าใจตนเองมากขึ้น
                </p>
              </div>
            </Link>

            <Link href="/self-assessment" className="block group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-blue-100">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">
                  ประเมินสุขภาพจิต
                </h3>
                <p className="text-gray-600 text-sm">
                  แบบทดสอบมาตรฐานเพื่อประเมินระดับความเครียดและสุขภาพจิต
                </p>
              </div>
            </Link>

            <Link href="/consultation" className="block group">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-green-100">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">
                  ปรึกษาแบบไม่ระบุชื่อ
                </h3>
                <p className="text-gray-600 text-sm">
                  พูดคุยกับผู้เชี่ยวชาญหรือนัดหมายล่วงหน้า อย่างปลอดภัย
                </p>
              </div>
            </Link>

            <Link href="/hr-dashboard" className="block group">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-purple-100">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">
                  แดชบอร์ด HR
                </h3>
                <p className="text-gray-600 text-sm">
                  ข้อมูลรวมเพื่อวางแผนสนับสนุนพนักงาน โดยไม่ระบุตัวตน
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ทำงานอย่างไร?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">บันทึกอารมณ์</h3>
              <p className="text-gray-600 text-sm">
                บันทึกอารมณ์ประจำวันหรือทำแบบประเมินตนเอง
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">ข้อมูลถูกปกป้อง</h3>
              <p className="text-gray-600 text-sm">
                ข้อมูลถูกทำให้ไม่ระบุตัวตนก่อนถึง HR
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">ได้รับการสนับสนุน</h3>
              <p className="text-gray-600 text-sm">
                HR วางแผนสนับสนุนทั้งทีมโดยใช้ข้อมูลรวม
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-4 text-center">
        <p className="text-sm">
          © 2024 Mental Health Wellness Platform | ข้อมูลทั้งหมดถูกเก็บรักษาอย่างปลอดภัย
        </p>
        <p className="text-xs mt-2">
          🔒 ไม่มีการระบุตัวตนบุคคล | ข้อมูลรวมเท่านั้น
        </p>
      </footer>
    </div>
  );
}
