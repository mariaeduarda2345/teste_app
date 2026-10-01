import React, { useState } from 'react';
import { Search, Bell, X, Check, BookOpen, Heart, MessageSquare } from 'lucide-react';
import { LiriaLogo } from './LiriaLogo';
import { USER_PROFILE } from '../data/mockData';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenProfile,
  unreadCount = 3,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      text: 'Clara Mendes curtiu sua resenha de "Os Sete Maridos de Evelyn Hugo"',
      time: 'há 10 min',
      unread: true,
    },
    {
      id: 2,
      type: 'comment',
      text: 'Lucas Silva comentou: "Concordo totalmente com o final do capítulo!"',
      time: 'há 1 hora',
      unread: true,
    },
    {
      id: 3,
      type: 'goal',
      text: 'Meta anual: você está 2 livros à frente do seu ritmo esperado!',
      time: 'ontem',
      unread: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const currentUnread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF4F4]/95 backdrop-blur-md border-b border-[#F4DEE5] px-4 py-3 flex items-center justify-between transition-colors">
      {/* Brand Zone */}
      <LiriaLogo />

      {/* Action Zone: Search, Notification Bell, User Avatar */}
      <div className="flex items-center gap-2 relative">
        {/* Search button */}
        <button
          onClick={onOpenSearch}
          aria-label="Buscar livros ou leitores"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#7A3E53] hover:text-[#931548] hover:bg-[#F8E2E9] active:scale-95 transition-all"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificações"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#7A3E53] hover:text-[#931548] hover:bg-[#F8E2E9] active:scale-95 transition-all relative"
          >
            <Bell className="w-5 h-5" />
            {currentUnread > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C2185B] ring-2 ring-[#FAF4F4]" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 max-w-[90vw] bg-white rounded-2xl shadow-xl border border-[#F4DEE5] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F9ECF0]">
                <span className="font-serif font-semibold text-[#3B1522] text-base">
                  Notificações
                </span>
                <div className="flex items-center gap-2">
                  {currentUnread > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-[#931548] hover:underline font-medium"
                    >
                      Marcar lidas
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-full text-[#7A5B66] hover:bg-[#FDF0F4]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl text-xs flex gap-2.5 items-start transition-colors ${
                      item.unread ? 'bg-[#FFF2F6] text-[#2F131D]' : 'bg-[#FAFAFA] text-[#69535B]'
                    }`}
                  >
                    <div className="mt-0.5 p-1 rounded-full bg-white shadow-xs shrink-0 text-[#931548]">
                      {item.type === 'like' && <Heart className="w-3.5 h-3.5 fill-current" />}
                      {item.type === 'comment' && <MessageSquare className="w-3.5 h-3.5" />}
                      {item.type === 'goal' && <BookOpen className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1">
                      <p className="leading-snug">{item.text}</p>
                      <span className="text-[10px] text-[#9A7A85] mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <button
          onClick={onOpenProfile}
          aria-label="Meu Perfil"
          className="relative w-10 h-10 rounded-full p-0.5 ring-2 ring-[#EAA0B8] hover:ring-[#A11B4C] active:scale-95 transition-all overflow-hidden"
        >
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.name}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1.5 ring-white" />
        </button>
      </div>
    </header>
  );
};
