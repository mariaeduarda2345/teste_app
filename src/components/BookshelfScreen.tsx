import React, { useState } from 'react';
import {
  Search,
  LayoutGrid,
  List as ListIcon,
  Plus,
  SlidersHorizontal,
  BookOpen,
  CheckCircle2,
  Clock,
  Volume2,
  ChevronRight,
  TrendingUp,
  MoreVertical,
} from 'lucide-react';
import { Book, MonthlyStat, ShelfType } from '../types';
import { USER_PROFILE, MONTHLY_STATS_DATA } from '../data/mockData';

interface BookshelfScreenProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onOpenUpdatePageModal: (book: Book) => void;
  onCompleteBook: (book: Book) => void;
  onOpenAddBookModal: () => void;
  onOpenOptions: (book: Book) => void;
  onOpenAnnualReport: () => void;
}

export const BookshelfScreen: React.FC<BookshelfScreenProps> = ({
  books,
  onSelectBook,
  onOpenUpdatePageModal,
  onCompleteBook,
  onOpenAddBookModal,
  onOpenOptions,
  onOpenAnnualReport,
}) => {
  const [activeShelf, setActiveShelf] = useState<ShelfType>('lendo');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'title'>('recent');
  const [selectedMonth, setSelectedMonth] = useState<MonthlyStat | null>(null);

  const genres = ['Todos', 'Romance', 'Ficção', 'Clássicos', 'Poesia', 'Suspense', 'Mitologia'];

  // Shelf counts
  const countLendo = books.filter((b) => b.shelf === 'lendo').length;
  const countLidos = books.filter((b) => b.shelf === 'lidos').length;
  const countQueroLer = books.filter((b) => b.shelf === 'quero-ler').length;
  const countFavoritos = books.filter((b) => b.isFavorite).length;

  // Filter books based on active shelf, search query, and genre
  let filteredBooks = books.filter((book) => {
    // Shelf filter
    if (activeShelf === 'favoritos') {
      if (!book.isFavorite) return false;
    } else if (book.shelf !== activeShelf) {
      return false;
    }

    // Genre filter
    if (selectedGenre !== 'Todos' && !book.genres.includes(selectedGenre)) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchAuthor = book.author.toLowerCase().includes(q);
      return matchTitle || matchAuthor;
    }

    return true;
  });

  // Sort books
  filteredBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'progress') {
      const pctA = a.currentPage / a.totalPages;
      const pctB = b.currentPage / b.totalPages;
      return pctB - pctA;
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0; // default order
  });

  return (
    <div className="pb-28 pt-4 px-4 space-y-6">
      {/* 1. Profile Header Card */}
      <section className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={USER_PROFILE.avatar}
                alt={USER_PROFILE.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#ECC3D1]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#8E1644] rounded-full ring-2 ring-white" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-[#34111E]">{USER_PROFILE.name}</h1>
              <p className="text-xs text-[#876774] font-medium">{USER_PROFILE.username}</p>
            </div>
          </div>

          <button
            onClick={onOpenAddBookModal}
            title="Adicionar livro"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#876774] hover:bg-[#FDF0F4] hover:text-[#931548] active:scale-95 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Statistics Pills */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-[#FFF5F8] border border-[#F6DCE4] rounded-2xl p-3 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white shadow-xs text-[#931548]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold font-serif text-[#34111E] tabular-nums block leading-tight">
                {books.length}
              </span>
              <span className="text-[11px] text-[#7A5B66]">Livros na Estante</span>
            </div>
          </div>

          <div className="bg-[#FFF5F8] border border-[#F6DCE4] rounded-2xl p-3 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white shadow-xs text-[#931548]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold font-serif text-[#34111E] tabular-nums block leading-tight">
                {books
                  .reduce((acc, curr) => acc + (curr.shelf === 'lidos' ? curr.totalPages : curr.currentPage), 0)
                  .toLocaleString('pt-BR')}
              </span>
              <span className="text-[11px] text-[#7A5B66]">Páginas Lidas</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shelf Category Pills */}
      <section className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'lendo' as ShelfType, label: 'Lendo', count: countLendo },
          { id: 'lidos' as ShelfType, label: 'Lidos', count: countLidos },
          { id: 'quero-ler' as ShelfType, label: 'Quero Ler', count: countQueroLer },
          { id: 'favoritos' as ShelfType, label: 'Favoritos', count: countFavoritos },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveShelf(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeShelf === tab.id
                ? 'bg-[#931548] text-white shadow-sm'
                : 'bg-white text-[#7A5B66] border border-[#F4DEE5] hover:bg-[#FFF5F8]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeShelf === tab.id ? 'bg-white/20 text-white' : 'bg-[#FBE8EE] text-[#931548]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </section>

      {/* 3. Search & Grid/List Controls */}
      <section className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A7A85]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar título ou autor na estante..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#F4DEE5] text-xs sm:text-sm text-[#34111E] placeholder:text-[#A78A94] focus:outline-none focus:ring-2 focus:ring-[#931548]/30"
          />
        </div>

        <div className="flex items-center p-1 bg-white border border-[#F4DEE5] rounded-2xl">
          <button
            onClick={() => setViewMode('grid')}
            title="Visualização em grade"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              viewMode === 'grid' ? 'bg-[#FFF0F4] text-[#931548]' : 'text-[#A78A94]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            title="Visualização em lista"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-[#FFF0F4] text-[#931548]' : 'text-[#A78A94]'
            }`}
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Genre Filter Chips */}
      <section className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedGenre === genre
                ? 'bg-[#931548] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#F4DEE5] text-[#7A5B66] hover:bg-[#FFF5F8]'
            }`}
          >
            {genre}
          </button>
        ))}
      </section>

      {/* 5. Header: Shelf title & Sorting */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-serif font-bold text-[#34111E]">
            {activeShelf === 'lendo'
              ? 'Lendo Atualmente'
              : activeShelf === 'lidos'
              ? 'Livros Lidos'
              : activeShelf === 'quero-ler'
              ? 'Lista de Desejos'
              : 'Favoritos'}
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FFE7EE] text-[#931548]">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'título' : 'títulos'}
          </span>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-transparent text-xs font-semibold text-[#8B1441] focus:outline-none cursor-pointer"
        >
          <option value="recent">Ordenar: Recentes</option>
          <option value="progress">Ordenar: Progresso</option>
          <option value="title">Ordenar: Título (A-Z)</option>
        </select>
      </div>

      {/* 6. Books List / Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-[#F4DEE5] text-center space-y-3">
          <BookOpen className="w-10 h-10 text-[#C48E9F] mx-auto stroke-1" />
          <h3 className="font-serif text-lg font-semibold text-[#34111E]">Nenhum livro encontrado</h3>
          <p className="text-xs text-[#876774] max-w-xs mx-auto">
            Não encontramos livros nesta estante com os filtros selecionados.
          </p>
          <button
            onClick={onOpenAddBookModal}
            className="mt-2 px-4 py-2 rounded-2xl bg-[#FFF0F4] text-[#931548] text-xs font-semibold hover:bg-[#FDE4ED] transition-colors"
          >
            + Adicionar à estante
          </button>
        </div>
      ) : viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredBooks.map((book) => {
            const percent = Math.min(100, Math.round((book.currentPage / book.totalPages) * 100));
            const remainingPages = Math.max(0, book.totalPages - book.currentPage);

            return (
              <article
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="bg-white rounded-3xl p-4 border border-[#F4DEE5] shadow-xs hover:shadow-md transition-shadow cursor-pointer space-y-3"
              >
                <div className="flex gap-4">
                  {/* Cover with percentage tag */}
                  <div className="relative w-20 sm:w-24 h-32 sm:h-36 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#931548]/90 backdrop-blur-xs text-white text-[10px] font-bold">
                      {percent}%
                    </span>
                  </div>

                  {/* Info details */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif font-bold text-base sm:text-lg text-[#34111E] line-clamp-1 leading-snug">
                            {book.title}
                          </h3>
                          <p className="text-xs text-[#7A5B66]">{book.author}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenOptions(book);
                          }}
                          title="Mais opções"
                          className="text-[#9A7A85] hover:text-[#931548] p-1 rounded-full hover:bg-[#FFF0F4] transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Stars / Read duration badge */}
                      <div className="mt-2 flex items-center gap-2">
                        {book.daysReading ? (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FFF0F4] text-[#931548] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Lendo há {book.daysReading} dias
                          </span>
                        ) : (
                          book.rating && (
                            <div className="flex items-center gap-1 text-amber-500 text-xs">
                              <span>★</span>
                              <span className="text-[#34111E] font-bold">{book.rating}</span>
                              <span className="text-[#7A5B66] text-[10px]">
                                {book.shelf === 'lendo' ? '(preliminar)' : ''}
                              </span>
                            </div>
                          )
                        )}
                      </div>

                      {/* Pages breakdown */}
                      <div className="mt-2 flex items-center justify-between text-xs text-[#7A5B66]">
                        <span>
                          Página {book.currentPage} de {book.totalPages}
                        </span>
                        <span className="text-[11px] font-medium text-[#931548]">
                          {percent >= 100
                            ? 'Concluído!'
                            : percent >= 80
                            ? 'Quase lá!'
                            : `${remainingPages} restam`}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1.5 w-full bg-[#FCE8EF] rounded-full overflow-hidden mt-1.5">
                        <div
                          className="h-full bg-[#931548] rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Bottom row actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#FAEDF1] mt-2">
                      <span className="text-[11px] text-[#7A5B66] flex items-center gap-1 truncate max-w-[140px]">
                        {book.format === 'Áudio + Físico' ? (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#931548]" />
                            Áudio + Físico
                          </>
                        ) : book.diaryNote ? (
                          book.diaryNote
                        ) : (
                          'Ritmo regular'
                        )}
                      </span>

                      {percent >= 100 ? (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Lido com louvor
                        </span>
                      ) : percent >= 80 ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCompleteBook(book);
                          }}
                          className="text-xs font-semibold text-[#931548] hover:text-[#6E0A31] flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Concluir livro
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenUpdatePageModal(book);
                          }}
                          className="text-xs font-semibold text-[#931548] hover:text-[#6E0A31] active:scale-95 transition-all cursor-pointer"
                        >
                          + Atualizar pág.
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredBooks.map((book) => {
            const percent = Math.min(100, Math.round((book.currentPage / book.totalPages) * 100));
            return (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="bg-white rounded-3xl p-3 border border-[#F4DEE5] shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xs mb-2">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#931548]/90 text-white text-[10px] font-bold">
                    {percent}%
                  </span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#34111E] line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-[#7A5B66] truncate">{book.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 7. ESTATÍSTICAS 2024 - Ritmo Anual de Leituras */}
      <section className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[#A11B4C] uppercase block">
              Estatísticas 2024
            </span>
            <h3 className="text-lg font-serif font-bold text-[#34111E]">Ritmo Anual de Leituras</h3>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-[#34111E]">28 / 36</span>
            <span className="text-[10px] text-[#931548] font-medium block">Meta anual (78%)</span>
          </div>
        </div>

        {/* Monthly Bar Chart with interactive click */}
        <div className="pt-4 pb-2">
          <div className="flex items-end justify-between gap-2 h-36 px-2">
            {MONTHLY_STATS_DATA.map((item, idx) => {
              const maxHeight = 6;
              const barHeightPct = Math.round((item.booksCount / maxHeight) * 100);
              const isSelected = selectedMonth?.month === item.month;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedMonth(isSelected ? null : item)}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
                >
                  <span className="text-[11px] font-bold text-[#34111E] tabular-nums group-hover:scale-110 transition-transform">
                    {item.booksCount}
                    {item.isProjected && '*'}
                  </span>
                  <div
                    className={`w-full max-w-[28px] rounded-t-xl transition-all duration-300 ${
                      item.isRecord
                        ? 'bg-[#8E1644] shadow-sm'
                        : item.isProjected
                        ? 'bg-[#FCA5C2]'
                        : 'bg-[#F992B1]'
                    } ${isSelected ? 'ring-2 ring-[#931548] scale-105' : ''}`}
                    style={{ height: `${barHeightPct}%` }}
                  />
                  <span
                    className={`text-[10px] font-medium ${
                      item.isRecord ? 'text-[#8E1644] font-bold' : 'text-[#7A5B66]'
                    }`}
                  >
                    {item.shortMonth}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Month info popover on click */}
          {selectedMonth && (
            <div className="mt-3 p-3 rounded-2xl bg-[#FFF2F6] border border-[#F6D5E0] text-xs text-[#5E142B] flex items-center justify-between animate-in fade-in">
              <div>
                <strong>{selectedMonth.month}</strong>: {selectedMonth.booksCount} livros concluídos (
                {selectedMonth.pagesCount} páginas)
              </div>
              <button
                onClick={() => setSelectedMonth(null)}
                className="text-[10px] text-[#931548] font-bold"
              >
                ✕
              </button>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-[#F9E8EE] flex items-center justify-between text-xs text-[#7A5B66]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8E1644]" />
              <span className="text-[11px]">Mês recorde: Maio (6 livros)</span>
            </div>
            <button
              onClick={onOpenAnnualReport}
              className="text-[11px] font-semibold text-[#8E1644] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Ver relatório completo →
            </button>
          </div>
        </div>
      </section>

      {/* 8. Big CTA: + Adicionar Novo Livro à Estante */}
      <button
        onClick={onOpenAddBookModal}
        className="w-full py-4 px-4 rounded-3xl bg-[#931548] hover:bg-[#7E0F3B] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#931548]/20 active:scale-[0.98] transition-all cursor-pointer"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
        <span>Adicionar Novo Livro à Estante</span>
      </button>
    </div>
  );
};
