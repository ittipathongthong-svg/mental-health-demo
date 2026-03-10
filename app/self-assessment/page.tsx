'use client';

import { useState } from 'react';

const questions = [
  {
    id: 1,
    text: 'ในช่วง 2 สัปดาห์ที่ผ่านมา คุณรู้สึกหดหู่ ซึมเศร้า หรือไม่มีความหวังบ่อยแค่ไหน?',
  },
  {
    id: 2,
    text: 'คุณรู้สึกไม่อยากทำสิ่งที่เคยชอบ หรือทำแล้วไม่มีความสุขบ่อยแค่ไหน?',
  },
  {
    id: 3,
    text: 'คุณมีปัญหาเรื่องการนอนหลับ (นอนไม่หลับหรือหลับมากเกินไป) บ่อยแค่ไหน?',
  },
  {
    id: 4,
    text: 'คุณรู้สึกเหนื่อยล้า หรือไม่มีพลังงานบ่อยแค่ไหน?',
  },
  {
    id: 5,
    text: 'คุณรู้สึกกังวล ตึงเครียด หรือประสาทอ่อนไหวบ่อยแค่ไหน?',
  },
  {
    id: 6,
    text: 'คุณมีสมาธิในการทำงานหรืออ่านหนังสือได้ยากบ่อยแค่ไหน?',
  },
  {
    id: 7,
    text: 'คุณรู้สึกว่าตนเองไม่มีคุณค่าหรือรู้สึกผิดโดยไม่มีเหตุผลบ่อยแค่ไหน?',
  },
  {
    id: 8,
    text: 'คุณรู้สึกว่างาน/กิจกรรมในชีวิตประจำวันของคุณได้รับผลกระทบจากความรู้สึกเหล่านี้บ่อยแค่ไหน?',
  },
];

const options = [
  { label: 'ไม่เลย', value: 0 },
  { label: 'บางวัน', value: 1 },
  { label: 'มากกว่าครึ่งของเวลา', value: 2 },
  { label: 'เกือบทุกวัน', value: 3 },
];

function getResult(score: number) {
  if (score <= 4) {
    return {
      level: 'ปกติ',
      color: 'text-green-700 bg-green-50 border-green-200',
      icon: '😊',
      desc: 'สุขภาพจิตของคุณอยู่ในเกณฑ์ปกติ ดูแลตนเองต่อไปนะคะ',
      advice: 'พักผ่อนให้เพียงพอ ออกกำลังกายสม่ำเสมอ และใช้เวลากับคนที่คุณรัก',
    };
  } else if (score <= 9) {
    return {
      level: 'ระดับน้อย',
      color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      icon: '🤔',
      desc: 'คุณอาจมีความเครียดหรือความวิตกกังวลในระดับน้อย',
      advice: 'ลองฝึกการหายใจลึก ๆ ทำกิจกรรมที่ชอบ และพูดคุยกับคนที่ไว้ใจ',
    };
  } else if (score <= 14) {
    return {
      level: 'ระดับปานกลาง',
      color: 'text-orange-700 bg-orange-50 border-orange-200',
      icon: '😔',
      desc: 'คุณอาจต้องการการดูแลเพิ่มเติม',
      advice: 'แนะนำให้ปรึกษานักจิตวิทยาหรือผู้เชี่ยวชาญด้านสุขภาพจิต',
    };
  } else {
    return {
      level: 'ระดับสูง',
      color: 'text-red-700 bg-red-50 border-red-200',
      icon: '😢',
      desc: 'คุณควรได้รับการดูแลจากผู้เชี่ยวชาญโดยเร็ว',
      advice: 'กรุณาติดต่อผู้เชี่ยวชาญด้านสุขภาพจิต หรือโทร 1323 สายด่วนสุขภาพจิต',
    };
  }
}

export default function SelfAssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      setTimeout(() => setFinished(true), 300);
    }
  };

  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const result = getResult(totalScore);
  const progress = ((currentQ + (finished ? 1 : 0)) / questions.length) * 100;

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-6xl mb-4">{result.icon}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">ผลการประเมิน</h2>
          <div className={`inline-block border-2 rounded-xl px-6 py-3 mb-4 ${result.color}`}>
            <span className="text-xl font-bold">{result.level}</span>
            <span className="text-sm ml-2">(คะแนน: {totalScore}/{questions.length * 3})</span>
          </div>
          <p className="text-gray-700 mb-4">{result.desc}</p>
          <p className="text-gray-500 text-sm mb-8 bg-gray-50 rounded-xl p-4">{result.advice}</p>
          <p className="text-xs text-gray-400 mb-6">
            * ผลการประเมินนี้ไม่ใช่การวินิจฉัยทางการแพทย์ หากมีความกังวล กรุณาพบแพทย์หรือนักจิตวิทยา
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setAnswers({});
                setCurrentQ(0);
                setFinished(false);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-sm"
            >
              ทำใหม่
            </button>
            <a
              href="/consultation"
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition text-sm"
            >
              ปรึกษาผู้เชี่ยวชาญ
            </a>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ประเมินสุขภาพจิตเบื้องต้น</h1>
          <p className="text-gray-500 text-sm">ตอบคำถาม {questions.length} ข้อ รับผลทันที — ไม่เก็บข้อมูลส่วนตัว</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>ข้อ {currentQ + 1} จาก {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <p className="text-lg font-medium text-gray-800 mb-8">{question.text}</p>
          <div className="grid grid-cols-1 gap-3">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(question.id, opt.value)}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 font-medium transition ${
                  answers[question.id] === opt.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="text-gray-400 text-sm hover:text-gray-600 disabled:opacity-30"
          >
            ← ย้อนกลับ
          </button>
          <p className="text-xs text-gray-400">🔒 ข้อมูลทั้งหมดเป็นความลับ</p>
        </div>
      </div>
    </div>
  );
}
