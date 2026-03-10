'use client';

import { useState } from 'react';

const consultationTopics = [
  'ความเครียดจากงาน',
  'ความสัมพันธ์',
  'ความวิตกกังวล',
  'ภาวะซึมเศร้า',
  'การจัดการเวลา',
  'ความสมดุลชีวิต',
  'ปัญหาการนอนหลับ',
  'อื่น ๆ',
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30',
];

type Tab = 'chat' | 'booking';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'สวัสดีครับ/ค่ะ 👋 ยินดีต้อนรับสู่ระบบปรึกษาแบบไม่ระบุชื่อ คุณสามารถพูดคุยได้อย่างปลอดภัย ไม่มีการระบุตัวตน',
    sender: 'bot',
    time: 'ระบบ',
  },
  {
    id: 2,
    text: 'วันนี้คุณอยากพูดคุยเรื่องอะไร? เราพร้อมรับฟังและช่วยเหลือคุณ',
    sender: 'bot',
    time: 'ระบบ',
  },
];

const botResponses = [
  'ขอบคุณที่ไว้ใจเล่าให้ฟังครับ/ค่ะ ฉันเข้าใจว่านี่อาจไม่ใช่เรื่องง่าย',
  'ความรู้สึกของคุณเป็นสิ่งที่สำคัญมาก และคุณไม่ต้องเผชิญสิ่งนี้คนเดียว',
  'ลองบอกฉันเพิ่มเติมได้เลยนะครับ/ค่ะ ฉันพร้อมรับฟัง',
  'นั่นฟังดูยากมากเลย ขอให้รู้ว่าการขอความช่วยเหลือคือความกล้า',
  'หากต้องการพูดคุยกับผู้เชี่ยวชาญโดยตรง คุณสามารถนัดหมายได้ในแท็บ "นัดหมาย"',
];

let botIndex = 0;

export default function Consultation() {
  const [tab, setTab] = useState<Tab>('chat');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingDone, setBookingDone] = useState(false);
  const [preferredFormat, setPreferredFormat] = useState<'online' | 'chat' | ''>('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const now = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { id: Date.now(), text: inputText, sender: 'user', time: now };
    const botMsg: Message = {
      id: Date.now() + 1,
      text: botResponses[botIndex % botResponses.length],
      sender: 'bot',
      time: now,
    };
    botIndex++;
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputText('');
  };

  const handleBooking = () => {
    if (!selectedTopic || !selectedDate || !selectedTime || !preferredFormat) return;
    setBookingDone(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ปรึกษาแบบไม่ระบุชื่อ</h1>
          <p className="text-gray-500 text-sm">พูดคุยอย่างปลอดภัย ไม่มีการระบุตัวตน</p>
        </div>

        {/* Privacy Banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6 flex items-center gap-2 text-green-800 text-sm">
          <span>🔒</span>
          <span>การสนทนาทั้งหมดถูกเข้ารหัสและไม่ระบุตัวตน</span>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm mb-6 p-1">
          <button
            onClick={() => setTab('chat')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              tab === 'chat' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            💬 แชทพูดคุย
          </button>
          <button
            onClick={() => setTab('booking')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              tab === 'booking' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📅 นัดหมาย
          </button>
        </div>

        {tab === 'chat' && (
          <div className="bg-white rounded-2xl shadow-sm flex flex-col" style={{ height: '500px' }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-3 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors"
              >
                ส่ง
              </button>
            </div>
          </div>
        )}

        {tab === 'booking' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {bookingDone ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">นัดหมายเรียบร้อย!</h3>
                <p className="text-gray-600 mb-4">
                  การนัดหมายของคุณได้รับการบันทึกแล้ว คุณจะได้รับการแจ้งเตือนก่อนถึงเวลา
                </p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 text-left mb-6 space-y-2">
                  <p>📋 หัวข้อ: <span className="font-medium">{selectedTopic}</span></p>
                  <p>📅 วันที่: <span className="font-medium">{selectedDate}</span></p>
                  <p>🕐 เวลา: <span className="font-medium">{selectedTime} น.</span></p>
                  <p>💻 รูปแบบ: <span className="font-medium">{preferredFormat === 'online' ? 'วิดีโอคอล' : 'แชท'}</span></p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800 mb-4">
                  🔒 การนัดหมายนี้ไม่ระบุตัวตน ผู้ให้คำปรึกษาจะรู้จักคุณเพียงเลขรหัสเท่านั้น
                </div>
                <button
                  onClick={() => {
                    setBookingDone(false);
                    setSelectedTopic('');
                    setSelectedDate('');
                    setSelectedTime('');
                    setPreferredFormat('');
                  }}
                  className="text-blue-600 underline text-sm"
                >
                  นัดหมายใหม่
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">หัวข้อที่ต้องการปรึกษา</label>
                  <div className="flex flex-wrap gap-2">
                    {consultationTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                          selectedTopic === topic
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">เวลา</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">รูปแบบการปรึกษา</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setPreferredFormat('online')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        preferredFormat === 'online'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      📹 วิดีโอคอล
                    </button>
                    <button
                      onClick={() => setPreferredFormat('chat')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        preferredFormat === 'chat'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      💬 แชทข้อความ
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedTopic || !selectedDate || !selectedTime || !preferredFormat}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ยืนยันการนัดหมาย
                </button>

                <p className="text-center text-xs text-gray-400">
                  🔒 การนัดหมายไม่ระบุตัวตน — รู้จักคุณเพียงเลขรหัสเท่านั้น
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
