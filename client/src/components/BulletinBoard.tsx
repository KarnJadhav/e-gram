import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const news = [
  {
    title: 'Gram Sabha Meeting on 20th August',
    content: 'All villagers are invited to attend the Gram Sabha for new scheme discussions.'
  },
  {
    title: 'Free Health Camp',
    content: 'A free health camp will be organized at the village school on 22nd August.'
  },
  {
    title: 'Scholarship Applications Open',
    content: 'Students can now apply for state scholarships through the portal.'
  },
];

const BulletinBoard: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      boardRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div ref={boardRef} className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl shadow p-6 mb-8 animate-fade-in">
      <h2 className="text-lg font-bold text-yellow-700 mb-2 flex items-center gap-2">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#fbbf24"/><path d="M12 8v4l2 2" stroke="#fff" strokeWidth="2"/></svg>
        Village Bulletin Board
      </h2>
      <ul className="space-y-2">
        {news.map((item, idx) => (
          <li key={idx} className="bg-white rounded-lg p-3 shadow flex flex-col gap-1">
            <span className="font-semibold text-gray-800">{item.title}</span>
            <span className="text-gray-600 text-sm">{item.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulletinBoard;
