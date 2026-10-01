import React, { useState } from 'react';
import { Search, X, BookOpen, Star, ArrowRight } from 'lucide-react';
import { Book } from '../types';

interface SearchModalProps {
  books: Book[];
  onClose: () => void;
  onSelectBook: (book: Book) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ books, onClose, onSelectBook }) => {
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      )
    : books.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 p-3 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 pb-2 border-b border-[#F6DEE5]">
          <Search className="w-5 h-5 text-[#931548]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar livros, autores, gêneros..."
            className="flex-1 text-sm sm:text-base text-[#34111E] placeholder:text-[#A78A94] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#876774] hover:bg-[#FDF0F4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <span className="text-[11px] font-semibold text-[#8E1644] uppercase tracking-wider block mb-1">
            {query.trim() ? `Resultados (${results.length})` : 'Sugestões de Leitura'}
          </span>

          {results.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#876774]">
              Nenhum livro encontrado para "{query}".
            </div>
          ) : (
            results.map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  onSelectBook(book);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF8FA] border border-[#F6DEE5] hover:bg-[#FFF0F4] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-10 h-14 object-cover rounded-lg shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#34111E] line-clamp-1">
                      {book.title}
                    </h4>
                    <p className="text-xs text-[#7A5B66]">{book.author}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-[#8E1644]">
                      <span>{book.genres.join(' · ')}</span>
                      <span>•</span>
                      <span>★ {book.rating || 4.5}</span>
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#931548]" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
