'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const moods = [
  { emoji: '😄', label: 'ดีมาก', value: 5, color: 'border-green-400 bg-green-50' },
  { emoji: '🙂', label: 'ดี', value: 4, color: 'border-blue-400 bg-blue-50' },
  { emoji: '😐', label: 'เฉย ๆ', value: 3, color: 'border-yellow-400 bg-yellow-50' },
  { emoji: '😔', label: 'ไม่ค่อยดี', value: 2, color: 'border-orange-400 bg-orange-50' },
  { emoji: '😢', label: 'แย่', value: 1, color: 'border-red-400 bg-red-50' },
];

const factors = [
  'งาน / โปรเจกต์',
  'ความสัมพันธ์',
  'สุขภาพร่างกาย',
  'ครอบครัว',
  'การเงิน',
  'การนอนหลับ',
  'สังคม',
  'อื่น ๆ',
];

export default function MoodCheckinPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const today = format(new Date(), 'EEEE d MMMM yyyy', { locale: th });

  const toggleFactor = (factor: string) => {
    setSelectedFactors((prev) =>
      prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]
    );
  };

  const handleSubmit = () => {
    if (selectedMood === null) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setSelectedFactors([]);
    setNote('');
    setSubmitted(false);
  };

  if (submitted) {
    const mood = moods.find((m) => m.value === selectedMood);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-6xl mb-4">{mood?.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">บันทึกเรียบร้อย!</h2>
          <p className="text-gray-500 mb-2">
            วันนี้คุณรู้สึก <span className="font-semibold text-gray-700">{mood?.label}</span>
          </p>
          {selectedFactors.length > 0 && (
            <p className="text-sm text-gray-400 mb-6">
              ปัจจัย: {selectedFactors.join(', ')}
            </p>
          )}
          <p className="text-xs text-green-600 mb-8">
            🔒 ข้อมูลนี้เป็นส่วนตัวและไม่สามารถระบุตัวตนได้
          </p>
          <button
            onClick={handleReset}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            บันทึกใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">บันทึกอารมณ์ประจำวัน</h1>
          <p className="text-gray-500">{today}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">วันนี้คุณรู้สึกอย่างไร?</h2>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition ${
                  selectedMood === mood.value
                    ? mood.color + ' border-opacity-100 scale-105 shadow'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs text-gray-600 font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            มีปัจจัยอะไรที่ส่งผลวันนี้? <span className="text-sm font-normal text-gray-400">(ไม่บังคับ)</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {factors.map((factor) => (
              <button
                key={factor}
                onClick={() => toggleFactor(factor)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  selectedFactors.includes(factor)
                    ? 'bg-blue-100 border-blue-400 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {factor}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            อยากเขียนอะไรเพิ่มเติม? <span className="text-sm font-normal text-gray-400">(ไม่บังคับ)</span>
          </h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="เขียนระบาย หรือบันทึกความรู้สึกของคุณ..."
            rows={4}
            className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400 mb-4">
            🔒 ข้อมูลทั้งหมดเป็นความลับและไม่สามารถระบุตัวตนได้
          </p>
          <button
            onClick={handleSubmit}
            disabled={selectedMood === null}
            className="bg-blue-600 text-white px-10 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            บันทึกอารมณ์
          </button>
        </div>
      </div>
    </div>
  );
}
