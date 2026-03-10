'use client';

import { useState } from 'react';

const moods = [
  { emoji: '😄', label: 'ดีมาก', value: 5, color: 'bg-green-100 border-green-400' },
  { emoji: '😊', label: 'ดี', value: 4, color: 'bg-lime-100 border-lime-400' },
  { emoji: '😐', label: 'เฉย ๆ', value: 3, color: 'bg-yellow-100 border-yellow-400' },
  { emoji: '😔', label: 'ไม่ดี', value: 2, color: 'bg-orange-100 border-orange-400' },
  { emoji: '😞', label: 'แย่มาก', value: 1, color: 'bg-red-100 border-red-400' },
];

const factors = [
  'งานหนัก', 'ความสัมพันธ์', 'สุขภาพ', 'การเงิน',
  'ครอบครัว', 'เพื่อนร่วมงาน', 'เป้าหมาย', 'การพักผ่อน',
];

export default function MoodCheckin() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFactor = (factor: string) => {
    setSelectedFactors((prev) =>
      prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]
    );
  };

  const handleSubmit = () => {
    if (selectedMood === null) return;
    setSubmitted(true);
  };

  if (submitted) {
    const mood = moods.find((m) => m.value === selectedMood);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-8 pb-16">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="text-6xl mb-4">{mood?.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">บันทึกเรียบร้อย! ✅</h2>
          <p className="text-gray-600 mb-4">
            ขอบคุณที่บันทึกอารมณ์วันนี้ ข้อมูลของคุณถูกเก็บอย่างปลอดภัยและไม่ระบุตัวตน
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-green-800 text-sm">
            🔒 ข้อมูลถูกทำให้ไม่ระบุตัวตนแล้ว HR จะเห็นเฉพาะข้อมูลรวมเท่านั้น
          </div>
          {(selectedMood ?? 0) <= 2 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-blue-800 text-sm">
              💙 หากคุณรู้สึกไม่ดี ลองพิจารณา{' '}
              <a href="/consultation" className="underline font-medium">
                ปรึกษาผู้เชี่ยวชาญ
              </a>
            </div>
          )}
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedMood(null);
              setSelectedFactors([]);
              setNote('');
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            บันทึกใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">บันทึกอารมณ์ประจำวัน</h1>
          <p className="text-gray-500">วันนี้คุณรู้สึกอย่างไร?</p>
        </div>

        {/* Mood Selection */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">เลือกอารมณ์</h2>
          <div className="flex justify-between gap-2">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex-1 flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                  selectedMood === mood.value
                    ? `${mood.color} scale-105 shadow-md`
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs text-gray-600 mt-1">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Factors */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            ปัจจัยที่ส่งผล <span className="text-sm font-normal text-gray-400">(เลือกได้หลายข้อ)</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {factors.map((factor) => (
              <button
                key={factor}
                onClick={() => toggleFactor(factor)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  selectedFactors.includes(factor)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {factor}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            บันทึกเพิ่มเติม <span className="text-sm font-normal text-gray-400">(ไม่บังคับ)</span>
          </h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="อยากเล่าอะไรเพิ่มเติมไหม? (จะถูกทำให้ไม่ระบุตัวตนก่อนบันทึก)"
            className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            rows={3}
          />
        </div>

        {/* Privacy notice */}
        <div className="flex items-start gap-2 text-xs text-gray-500 mb-6 px-2">
          <span className="text-green-600 mt-0.5">🔒</span>
          <span>
            ข้อมูลทั้งหมดถูกเก็บรักษาอย่างปลอดภัย ไม่มีการระบุตัวตน HR จะเห็นเฉพาะข้อมูลรวมเท่านั้น
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          บันทึกอารมณ์
        </button>
      </div>
    </div>
  );
}
