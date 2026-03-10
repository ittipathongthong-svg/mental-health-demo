'use client';

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

type Message = { role: 'user' | 'bot'; text: string; time: string };

const botReplies = [
  'ขอบคุณที่เปิดใจมาพูดคุยกับเรานะคะ 💙 รู้สึกอย่างไรบ้างตอนนี้?',
  'เราฟังอยู่นะคะ ไม่ต้องรีบ เล่าให้ฟังได้เลย',
  'ฟังดูหนักใจนะคะ คุณได้พักผ่อนเพียงพอไหมช่วงนี้?',
  'ขอบคุณที่แบ่งปันนะคะ มีอะไรที่เราช่วยได้บ้างไหม?',
  'เราเข้าใจค่ะ บางครั้งการพูดออกมามันช่วยได้มากเลย',
  'หากคุณต้องการนัดพูดคุยกับนักจิตวิทยา สามารถใช้แท็บ "จองนัดหมาย" ได้เลยนะคะ',
];

function getTime() {
  return format(new Date(), 'HH:mm', { locale: th });
}

export default function ConsultationPage() {
  const botReplyIndexRef = useRef(0);
  const getNextBotReply = () => {
    const reply = botReplies[botReplyIndexRef.current % botReplies.length];
    botReplyIndexRef.current++;
    return reply;
  };

  const [tab, setTab] = useState<'chat' | 'booking'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'สวัสดีค่ะ 👋 ยินดีต้อนรับสู่บริการปรึกษาสุขภาพจิต คุณสามารถพูดคุยกับเราได้อย่างอิสระ ข้อมูลทั้งหมดเป็นความลับ',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [bookingForm, setBookingForm] = useState({
    preferredDate: '',
    preferredTime: '',
    topic: '',
    contactMethod: 'ไม่ระบุ',
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const time = getTime();
    setMessages((prev) => [...prev, { role: 'user', text: input.trim(), time }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: getNextBotReply(), time: getTime() },
      ]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ปรึกษาสุขภาพจิต</h1>
          <p className="text-gray-500 text-sm">ไม่เปิดเผยตัวตน • ปลอดภัย • เป็นส่วนตัว</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl shadow-sm p-1 mb-6">
          <button
            onClick={() => setTab('chat')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
              tab === 'chat' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            💬 แชทปรึกษา
          </button>
          <button
            onClick={() => setTab('booking')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
              tab === 'booking' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📅 จองนัดหมาย
          </button>
        </div>

        {tab === 'chat' && (
          <div className="bg-white rounded-2xl shadow-sm flex flex-col" style={{ height: '500px' }}>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs lg:max-w-sm rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-100 p-4 flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="พิมพ์ข้อความ... (Enter เพื่อส่ง)"
                rows={2}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-40 self-end"
              >
                ส่ง
              </button>
            </div>
          </div>
        )}

        {tab === 'booking' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {bookingSubmitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">จองนัดหมายเรียบร้อย!</h2>
                <p className="text-gray-500 mb-6">ทีมงานจะติดต่อกลับตามช่องทางที่คุณระบุ</p>
                <p className="text-xs text-gray-400 mb-6">🔒 ข้อมูลทั้งหมดเป็นความลับ</p>
                <button
                  onClick={() => setBookingSubmitted(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-sm"
                >
                  จองนัดใหม่
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-6">จองนัดหมายกับนักจิตวิทยา</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันที่ต้องการนัด
                    </label>
                    <input
                      type="date"
                      value={bookingForm.preferredDate}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, preferredDate: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เวลาที่ต้องการ
                    </label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, preferredTime: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="">เลือกเวลา</option>
                      <option>09:00 - 10:00</option>
                      <option>10:00 - 11:00</option>
                      <option>13:00 - 14:00</option>
                      <option>14:00 - 15:00</option>
                      <option>15:00 - 16:00</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หัวข้อที่อยากปรึกษา <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>
                    </label>
                    <textarea
                      value={bookingForm.topic}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, topic: e.target.value })
                      }
                      placeholder="เช่น ความเครียดจากงาน ความสัมพันธ์ ฯลฯ"
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วิธีติดต่อกลับ <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>
                    </label>
                    <select
                      value={bookingForm.contactMethod}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, contactMethod: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option>ไม่ระบุ</option>
                      <option>อีเมล</option>
                      <option>Line</option>
                      <option>โทรศัพท์</option>
                    </select>
                  </div>

                  <p className="text-xs text-gray-400">
                    🔒 ข้อมูลการจองทั้งหมดเป็นความลับและไม่สามารถระบุตัวตนได้
                  </p>

                  <button
                    onClick={() => {
                      if (bookingForm.preferredDate && bookingForm.preferredTime) {
                        setBookingSubmitted(true);
                      }
                    }}
                    disabled={!bookingForm.preferredDate || !bookingForm.preferredTime}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ยืนยันการจองนัด
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
