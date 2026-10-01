import React from 'react';
import { X, Heart, BookOpen, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';
import { Book, ShelfType } from '../types';

interface BookOptionsModalProps {
  book: Book;
  onClose: () => void;
  onUpdateShelf: (bookId: string, shelf: ShelfType) => void;
  onToggleFavorite: (bookId: string) => void;
  onOpenUpdatePage: (book: Book) => void;
  onOpenReview: (book: Book) => void;
  onRemoveBook: (bookId: string) => void;
}

export const BookOptionsModal: React.FC<BookOptionsModalProps> = ({
  book,
  onClose,
  onUpdateShelf,
  onToggleFavorite,
  onOpenUpdatePage,
  onOpenReview,
  onRemoveBook,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 border border-[#F4DEE5] shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F7E6EC]">
          <div>
            <h3 className="font-serif font-bold text-base text-[#34111E] line-clamp-1">
              {book.title}
            </h3>
            <p className="text-xs text-[#7A5B66]">{book.author}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#876774] hover:bg-[#FDF0F4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Shelf Change */}
        <div>
          <span className="text-[10px] font-bold text-[#A11B4C] uppercase tracking-wider block mb-2">
            Mover para Estante
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'lendo', label: 'Lendo Agora' },
              { id: 'lidos', label: 'Já Lido' },
              { id: 'quero-ler', label: 'Quero Ler' },
              { id: 'abandonados', label: 'Abandonado' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onUpdateShelf(book.id, s.id as ShelfType);
                  onClose();
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                  book.shelf === s.id
                    ? 'bg-[#FFF0F4] text-[#931548] border-[#931548]'
                    : 'bg-[#FFF8FA] text-[#7A5B66] border-[#F6DEE5] hover:bg-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-1.5 pt-1 border-t border-[#F8EAEF]">
          <button
            onClick={() => {
              onToggleFavorite(book.id);
              onClose();
            }}
            className="w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 text-[#34111E] hover:bg-[#FFF0F4] transition-colors"
          >
            <Heart className={`w-4 h-4 ${book.isFavorite ? 'fill-[#931548] text-[#931548]' : 'text-[#7A5B66]'}`} />
            <span>{book.isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenUpdatePage(book);
            }}
            className="w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 text-[#34111E] hover:bg-[#FFF0F4] transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#7A5B66]" />
            <span>Atualizar Páginas Lidas</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenReview(book);
            }}
            className="w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 text-[#34111E] hover:bg-[#FFF0F4] transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-[#7A5B66]" />
            <span>Escrever Resenha / Registrar</span>
          </button>

          <button
            onClick={() => {
              onRemoveBook(book.id);
              onClose();
            }}
            className="w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remover da Estante</span>
          </button>
        </div>
      </div>
    </div>
  );
};
