import React from 'react';
import { X, TrendingUp, BookOpen, Clock, Award, Star } from 'lucide-react';
import { MONTHLY_STATS_DATA } from '../data/mockData';

interface AnnualReportModalProps {
  onClose: () => void;
}

export const AnnualReportModal: React.FC<AnnualReportModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F7E6EC]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#931548]" />
            <h3 className="font-serif font-bold text-base text-[#34111E]">Relatório Anual 2024</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#876774] hover:bg-[#FDF0F4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big metrics cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] text-center">
            <span className="text-2xl font-serif font-bold text-[#34111E]">28</span>
            <span className="text-[11px] text-[#7A5B66] block">Livros Lidos (78% da meta)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] text-center">
            <span className="text-2xl font-serif font-bold text-[#34111E]">9.510</span>
            <span className="text-[11px] text-[#7A5B66] block">Páginas Percorridas</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2.5 text-xs text-[#4A2D37]">
          <div className="p-3 rounded-2xl bg-[#FFF8FA] border border-[#F6DEE5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-white text-[#931548] shadow-xs">
                <Star className="w-4 h-4 fill-current text-amber-500" />
              </span>
              <div>
                <span className="font-semibold block text-[#34111E]">Livro Mais Bem Avaliado</span>
                <span className="text-[11px] text-[#7A5B66]">Os Sete Maridos de Evelyn Hugo (5.0 ★)</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF8FA] border border-[#F6DEE5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-white text-[#931548] shadow-xs">
                <Clock className="w-4 h-4 text-[#931548]" />
              </span>
              <div>
                <span className="font-semibold block text-[#34111E]">Leitura Mais Rápida</span>
                <span className="text-[11px] text-[#7A5B66]">Torto Arado (concluído em 3 dias)</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF8FA] border border-[#F6DEE5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-white text-[#931548] shadow-xs">
                <Award className="w-4 h-4 text-[#931548]" />
              </span>
              <div>
                <span className="font-semibold block text-[#34111E]">Gênero Predileto</span>
                <span className="text-[11px] text-[#7A5B66]">Ficção & Romance Contemporâneo (62%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly table overview */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-[#A11B4C] uppercase tracking-wider block">
            Evolução Mês a Mês
          </span>
          <div className="divide-y divide-[#F8EAEF] border border-[#F6DEE5] rounded-2xl overflow-hidden bg-white text-xs">
            {MONTHLY_STATS_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 px-3">
                <span className={`font-medium ${item.isRecord ? 'text-[#8E1644] font-bold' : ''}`}>
                  {item.month} {item.isRecord && '(Recorde 🏆)'}
                </span>
                <div className="flex items-center gap-3 tabular-nums text-[#7A5B66]">
                  <span>{item.booksCount} livros</span>
                  <span>{item.pagesCount} pág</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
