import React, { useState } from 'react';
import { X, Check, BookOpen, Clock, PenLine } from 'lucide-react';
import { Book } from '../types';

interface UpdateProgressModalProps {
  book: Book;
  onClose: () => void;
  onSaveProgress: (bookId: string, newPage: number, note?: string) => void;
}

export const UpdateProgressModal: React.FC<UpdateProgressModalProps> = ({
  book,
  onClose,
  onSaveProgress,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(book.currentPage);
  const [note, setNote] = useState<string>(book.diaryNote || '');

  const percent = Math.min(100, Math.round((currentPage / book.totalPages) * 100));
  const pagesLeft = Math.max(0, book.totalPages - currentPage);

  const handleSave = () => {
    onSaveProgress(book.id, currentPage, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 border border-[#F4DEE5] shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F7E6EC]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#931548]" />
            <h3 className="font-serif font-bold text-lg text-[#34111E]">Atualizar Progresso</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#876774] hover:bg-[#FDF0F4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book snippet */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5]">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-12 h-16 object-cover rounded-lg shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="font-serif font-bold text-sm text-[#34111E] line-clamp-1">
              {book.title}
            </h4>
            <p className="text-xs text-[#7A5B66]">{book.author}</p>
            <span className="text-[11px] font-medium text-[#931548]">
              {book.totalPages} páginas no total
            </span>
          </div>
        </div>

        {/* Page Slider & Direct Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A5B66]">Página Atual</span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min={0}
                max={book.totalPages}
                value={currentPage}
                onChange={(e) =>
                  setCurrentPage(Math.min(book.totalPages, Math.max(0, Number(e.target.value))))
                }
                className="w-20 text-center font-bold text-lg text-[#931548] py-1 px-2 rounded-xl border border-[#F4DEE5] bg-[#FFF8FA] focus:outline-none focus:ring-2 focus:ring-[#931548]/30"
              />
              <span className="text-xs text-[#7A5B66]">/ {book.totalPages}</span>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={book.totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="w-full accent-[#931548] cursor-pointer"
          />

          <div className="flex items-center justify-between text-xs text-[#7A5B66] pt-1">
            <span>{percent}% concluído</span>
            <span>{pagesLeft} páginas restantes</span>
          </div>
        </div>

        {/* Quick diary / note */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#7A5B66] flex items-center gap-1">
            <PenLine className="w-3.5 h-3.5 text-[#931548]" />
            Anotação rápida (opcional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex: Diário: Cap. 18 finalizado, que reviravolta!"
            className="w-full text-xs text-[#34111E] p-3 rounded-2xl border border-[#F4DEE5] bg-[#FFF8FA] placeholder:text-[#BAA0AB] focus:outline-none focus:ring-2 focus:ring-[#931548]/30"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl border border-[#F4DEE5] text-[#7A5B66] text-xs font-semibold hover:bg-[#FAFAFA] active:scale-95"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#931548] hover:bg-[#7D0E3B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            Salvar Leitura
          </button>
        </div>
      </div>
    </div>
  );
};
