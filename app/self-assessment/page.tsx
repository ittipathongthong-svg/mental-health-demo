'use client';

import { useState } from 'react';

const questions = [
  {
    id: 1,
    text: 'ในช่วง 2 สัปดาห์ที่ผ่านมา คุณรู้สึกหดหู่ หมดอาลัย หรือสิ้นหวังบ่อยแค่ไหน?',
    category: 'depression',
  },
  {
    id: 2,
    text: 'คุณมีความสนใจหรือความสุขในการทำกิจกรรมน้อยลงบ่อยแค่ไหน?',
    category: 'depression',
  },
  {
    id: 3,
    text: 'คุณรู้สึกเครียดหรือกังวลมากเกินไปบ่อยแค่ไหน?',
    category: 'anxiety',
  },
  {
    id: 4,
    text: 'คุณนอนไม่หลับ นอนมากเกินไป หรือหยุดทำงานยากบ่อยแค่ไหน?',
    category: 'sleep',
  },
  {
    id: 5,
    text: 'คุณรู้สึกเหนื่อยล้าหรือไม่มีแรงบ่อยแค่ไหน?',
    category: 'energy',
  },
  {
    id: 6,
    text: 'คุณมีปัญหาในการมีสมาธิกับงานหรือกิจกรรมต่าง ๆ บ่อยแค่ไหน?',
    category: 'focus',
  },
  {
    id: 7,
    text: 'คุณรู้สึกว่างานมีแรงกดดันมากเกินไปบ่อยแค่ไหน?',
    category: 'workstress',
  },
  {
    id: 8,
    text: 'คุณรู้สึกสมดุลระหว่างงานและชีวิตส่วนตัวได้ยากบ่อยแค่ไหน?',
    category: 'balance',
  },
];

const options = [
  { label: 'ไม่เลย', value: 0 },
  { label: 'บางครั้ง', value: 1 },
  { label: 'บ่อยครั้ง', value: 2 },
  { label: 'เกือบทุกวัน', value: 3 },
];

function getResult(score: number) {
  const max = questions.length * 3;
  const pct = (score / max) * 100;
  if (pct <= 25) {
    return {
      level: 'ดีมาก',
      color: 'text-green-700',
      bg: 'bg-green-50 border-green-200',
      icon: '🟢',
      message:
        'สุขภาพจิตของคุณอยู่ในระดับดี ดูแลตนเองต่อไปด้วยการพักผ่อนและทำกิจกรรมที่ชอบ',
      advice: 'คงสุขภาพจิตที่ดีด้วยการออกกำลังกาย นอนหลับให้เพียงพอ และเชื่อมต่อกับคนที่รัก',
    };
  } else if (pct <= 50) {
    return {
      level: 'พอใช้ได้',
      color: 'text-yellow-700',
      bg: 'bg-yellow-50 border-yellow-200',
      icon: '🟡',
      message: 'มีสัญญาณบางอย่างที่ควรใส่ใจ ลองปรับสมดุลชีวิตและดูแลตนเองมากขึ้น',
      advice:
        'ลองทำกิจกรรมผ่อนคลาย เช่น การทำสมาธิ การออกกำลังกาย หรือพูดคุยกับเพื่อนที่ไว้ใจ',
    };
  } else if (pct <= 75) {
    return {
      level: 'ควรดูแล',
      color: 'text-orange-700',
      bg: 'bg-orange-50 border-orange-200',
      icon: '🟠',
      message: 'คุณอาจรู้สึกเครียดหรือกดดันในระดับสูง ควรหาความช่วยเหลือหรือพูดคุยกับผู้เชี่ยวชาญ',
      advice:
        'ลองนัดหมายพูดคุยกับนักจิตวิทยาหรือที่ปรึกษา การขอความช่วยเหลือคือความกล้า',
    };
  } else {
    return {
      level: 'ต้องการความช่วยเหลือ',
      color: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
      icon: '🔴',
      message:
        'คุณกำลังเผชิญกับความยากลำบากในระดับสูง การพูดคุยกับผู้เชี่ยวชาญสามารถช่วยได้มาก',
      advice:
        'โปรดติดต่อผู้เชี่ยวชาญด้านสุขภาพจิตโดยเร็ว คุณไม่ต้องเผชิญสิ่งนี้คนเดียว',
    };
  }
}

export default function SelfAssessment() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const questionsPerPage = 4;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const pageQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const pageComplete = pageQuestions.every((q) => answers[q.id] !== undefined);
  const allComplete = questions.every((q) => answers[q.id] !== undefined);

  const handleAnswer = (qId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">{result.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">ผลการประเมิน</h2>
            <p className={`text-xl font-bold mb-4 ${result.color}`}>{result.level}</p>
            <div className={`rounded-xl border p-4 mb-6 text-left ${result.bg}`}>
              <p className="text-sm text-gray-700 mb-3">{result.message}</p>
              <p className="text-sm text-gray-600 font-medium">💡 คำแนะนำ: {result.advice}</p>
            </div>
            {totalScore / (questions.length * 3) > 0.5 && (
              <a
                href="/consultation"
                className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-4"
              >
                💬 ปรึกษาผู้เชี่ยวชาญ
              </a>
            )}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800 mb-6">
              🔒 ผลการประเมินนี้ถูกเก็บรักษาอย่างปลอดภัย ไม่มีการระบุตัวตน
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setCurrentPage(0);
              }}
              className="text-blue-600 underline text-sm"
            >
              ทำแบบประเมินใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ประเมินสุขภาพจิต</h1>
          <p className="text-gray-500">ตอบคำถามอย่างตรงไปตรงมาเพื่อผลลัพธ์ที่แม่นยำ</p>
          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>หน้า {currentPage + 1} / {totalPages}</span>
              <span>ตอบแล้ว {Object.keys(answers).length}/{questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {pageQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl shadow-sm p-6">
              <p className="text-gray-800 font-medium mb-4">{q.text}</p>
              <div className="grid grid-cols-2 gap-2">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(q.id, opt.value)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                      answers[q.id] === opt.value
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
            >
              ← ก่อนหน้า
            </button>
          )}
          {currentPage < totalPages - 1 ? (
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={!pageComplete}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ถัดไป →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allComplete}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ดูผลลัพธ์ ✅
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 คำตอบของคุณปลอดภัยและไม่ระบุตัวตน
        </p>
      </div>
    </div>
  );
}
