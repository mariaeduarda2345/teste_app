import React from 'react';
import { X, Flame, Calendar, Award, CheckCircle, Shield } from 'lucide-react';

interface StreakModalProps {
  days: number;
  onClose: () => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({ days, onClose }) => {
  // Calendar days generation for October
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F7E6EC]">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#C92A63] fill-current" />
            <h3 className="font-serif font-bold text-base text-[#34111E]">Seu Ritmo de Leitura</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#876774] hover:bg-[#FDF0F4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Streak Badge */}
        <div className="text-center py-2 space-y-1">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFE7EE] to-[#FFD0DE] mx-auto flex items-center justify-center text-[#C92A63] shadow-md border border-[#F4BED0]">
            <Flame className="w-8 h-8 fill-current" />
          </div>
          <h4 className="font-serif font-bold text-2xl text-[#34111E]">{days} Dias Consecutivos</h4>
          <p className="text-xs text-[#7A5B66]">Você leu pelo menos 15 minutos em cada um desses dias!</p>
        </div>

        {/* Mini Calendar visualization */}
        <div className="bg-[#FFF8FA] p-3.5 rounded-2xl border border-[#F6DEE5] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8E1644]">
            <span>Outubro 2025</span>
            <span className="text-[10px] text-[#7A5B66]">Meta cumprida ✓</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((w, idx) => (
              <span key={idx} className="font-bold text-[#A78A94]">
                {w}
              </span>
            ))}
            {calendarDays.slice(0, 24).map((d) => {
              const isStreak = d >= 11 && d <= 24;
              return (
                <div
                  key={d}
                  className={`h-6 rounded-md flex items-center justify-center transition-colors ${
                    isStreak
                      ? 'bg-[#C92A63] text-white font-bold'
                      : d < 11
                      ? 'bg-[#FFEBF1] text-[#8E1644]'
                      : 'text-[#876774]'
                  }`}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </div>

        {/* Perks */}
        <div className="space-y-2 text-xs text-[#7A5B66]">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF6F8] border border-[#F6DEE5]">
            <Shield className="w-4 h-4 text-[#931548] shrink-0" />
            <span>1 Gelo de Proteção ativo caso não consiga ler amanhã.</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF6F8] border border-[#F6DEE5]">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Próximo marco: <strong>30 dias</strong> (+selo Dourado).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
