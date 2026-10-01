import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  Users,
  BookOpen,
  Star,
  ChevronRight,
  Bookmark,
  Check,
} from 'lucide-react';
import { Book } from '../types';
import { COVERS } from '../data/mockData';

interface ExploreScreenProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onBookmarkQuote: (quote: string, bookTitle: string) => void;
  onOpenClubChat: (clubName: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  books,
  onSelectBook,
  onBookmarkQuote,
  onOpenClubChat,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [joinedClubs, setJoinedClubs] = useState<Record<string, boolean>>({
    'Clube Café & Literatura': true,
  });
  const [savedQuotes, setSavedQuotes] = useState<Record<string, boolean>>({});

  const categories = ['Todos', 'Em Alta', 'Romance', 'Ficção', 'Suspense', 'Poesia', 'Clubes'];

  const trendingQuotes = [
    {
      id: 'q-1',
      book: 'Os Sete Maridos de Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      quote: 'Eles são só maridos. A Evelyn Hugo sou eu.',
    },
    {
      id: 'q-2',
      book: 'A Biblioteca da Meia-Noite',
      author: 'Matt Haig',
      quote: 'Entre a vida e a morte há uma biblioteca. E as prateleiras não têm fim.',
    },
    {
      id: 'q-3',
      book: 'Orgulho e Preconceito',
      author: 'Jane Austen',
      quote: 'Você enfeitiçou meu corpo e minha alma, e eu amo... amo você.',
    },
  ];

  const clubs = [
    {
      id: 'c-1',
      name: 'Clube Café & Literatura',
      members: '3.420 leitoras',
      currentBook: 'Circe — Madeline Miller',
      avatar: '☕',
      badge: 'Leitura Coletiva em Andamento',
    },
    {
      id: 'c-2',
      name: 'Sociedade dos Mistérios',
      members: '1.890 membros',
      currentBook: 'A Paciente Silenciosa',
      avatar: '🔍',
      badge: 'Debate Capítulo 20',
    },
    {
      id: 'c-3',
      name: 'Jardim dos Clássicos',
      members: '920 membros',
      currentBook: 'Orgulho e Preconceito',
      avatar: '🌿',
      badge: 'Debate Geral Aberto',
    },
  ];

  const toggleClubJoin = (clubName: string) => {
    setJoinedClubs((prev) => ({
      ...prev,
      [clubName]: !prev[clubName],
    }));
  };

  const toggleQuoteSave = (id: string, quote: string, book: string) => {
    setSavedQuotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    onBookmarkQuote(quote, book);
  };

  // Filter books based on category and search
  const filteredBooks = books.filter((b) => {
    if (selectedCategory !== 'Todos' && selectedCategory !== 'Em Alta' && selectedCategory !== 'Clubes') {
      if (!b.genres.includes(selectedCategory)) return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      {/* 1. Header & Search */}
      <div>
        <span className="text-[11px] font-semibold tracking-wider text-[#A11B4C] uppercase block">
          Descubra Novas Histórias
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#34111E] tracking-tight mt-0.5">
          Explorar o Universo Líria
        </h1>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A7A85]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título, autor, citação ou clube..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#F4DEE5] text-xs sm:text-sm text-[#34111E] placeholder:text-[#A78A94] focus:outline-none focus:ring-2 focus:ring-[#931548]/30 shadow-xs"
        />
      </div>

      {/* 2. Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#931548] text-white font-semibold shadow-xs'
                : 'bg-white border border-[#F4DEE5] text-[#7A5B66] hover:bg-[#FFF5F8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Featured Banner: Livro do Mês */}
      <div
        onClick={() => {
          const evelyn = books.find((b) => b.id === 'evelyn-hugo') || books[0];
          onSelectBook(evelyn);
        }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#931548] via-[#750D36] to-[#500723] text-white p-5 shadow-lg cursor-pointer hover:shadow-xl transition-all"
      >
        <div className="relative z-10 flex gap-4 items-center">
          <img
            src={COVERS.evelynHugo}
            alt="Evelyn Hugo"
            className="w-20 h-28 object-cover rounded-xl shadow-md border border-white/20 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[#FFD6E3]">
              <Sparkles className="w-3 h-3" />
              Livro Mais Lido da Semana
            </span>
            <h3 className="font-serif font-bold text-lg leading-snug">
              Os Sete Maridos de Evelyn Hugo
            </h3>
            <p className="text-xs text-[#F8CBD9]">Taylor Jenkins Reid</p>
            <div className="flex items-center gap-1 text-amber-300 text-xs pt-1">
              <span>★ 4.8</span>
              <span className="text-white/60 text-[10px]">· Mais de 28k avaliações</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Trending Books Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#931548]" />
            <h2 className="text-lg font-serif font-bold text-[#34111E]">Destaques da Comunidade</h2>
          </div>
          <span className="text-xs text-[#8E1644] font-semibold">{filteredBooks.length} livros</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredBooks.slice(0, 6).map((book) => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="bg-white rounded-3xl p-3 border border-[#F4DEE5] shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xs mb-2">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#931548] text-[10px] font-bold shadow-xs">
                  ★ {book.rating || 4.5}
                </span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#34111E] line-clamp-1">
                  {book.title}
                </h4>
                <p className="text-[11px] text-[#7A5B66] truncate">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Citações Marcantes */}
      <div className="space-y-3">
        <h2 className="text-lg font-serif font-bold text-[#34111E]">Citações Favoritas</h2>
        <div className="space-y-3">
          {trendingQuotes.map((tq) => (
            <div
              key={tq.id}
              className="p-4 rounded-3xl bg-white border border-[#F4DEE5] shadow-xs space-y-2"
            >
              <p className="font-serif italic text-sm text-[#5C142A] leading-relaxed">
                "{tq.quote}"
              </p>
              <div className="flex items-center justify-between text-xs text-[#7A5B66] pt-1 border-t border-[#F8EAEF]">
                <span>
                  <strong className="text-[#34111E]">{tq.book}</strong> · {tq.author}
                </span>
                <button
                  onClick={() => toggleQuoteSave(tq.id, tq.quote, tq.book)}
                  title="Salvar citação"
                  className="p-1 rounded-full hover:bg-[#FFF0F4] cursor-pointer"
                >
                  <Bookmark
                    className={`w-4 h-4 transition-colors ${
                      savedQuotes[tq.id] ? 'fill-[#931548] text-[#931548]' : 'text-[#9A7A85]'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Clubes Literários Ativos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#931548]" />
            <h2 className="text-lg font-serif font-bold text-[#34111E]">Clubes de Leitura</h2>
          </div>
          <span className="text-xs text-[#8E1644] font-semibold">{clubs.length} clubes ativos</span>
        </div>

        <div className="space-y-3">
          {clubs.map((club) => {
            const isMember = joinedClubs[club.name];
            return (
              <div
                key={club.id}
                className="bg-white rounded-3xl p-4 border border-[#F4DEE5] shadow-xs flex items-center justify-between gap-3"
              >
                <div
                  onClick={() => onOpenClubChat(club.name)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <span className="w-12 h-12 rounded-2xl bg-[#FFF0F4] border border-[#F6DCE4] text-xl flex items-center justify-center shrink-0">
                    {club.avatar}
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#34111E]">{club.name}</h4>
                    <p className="text-xs text-[#7A5B66]">
                      {club.currentBook} · {club.members}
                    </p>
                    <span className="text-[10px] font-semibold text-[#931548] block mt-0.5">
                      {club.badge}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleClubJoin(club.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer ${
                    isMember
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-[#FFF0F4] text-[#931548] hover:bg-[#FDE4ED]'
                  }`}
                >
                  {isMember ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Participando
                    </span>
                  ) : (
                    'Participar'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
