import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Flame,
  Heart,
  Smartphone,
  Monitor,
  Bookmark,
  MessageSquare,
  Star,
  Quote,
} from 'lucide-react';
import { Book, Review } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface ProfileScreenProps {
  books: Book[];
  userReviews: Review[];
  savedQuotes: { quote: string; bookTitle: string }[];
  onSelectBook: (book: Book) => void;
  isMobileFrameMode: boolean;
  onToggleMobileFrame: () => void;
  onOpenStreakModal: () => void;
  onOpenAnnualReport: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  books,
  userReviews,
  savedQuotes,
  onSelectBook,
  isMobileFrameMode,
  onToggleMobileFrame,
  onOpenStreakModal,
  onOpenAnnualReport,
}) => {
  const [profileTab, setProfileTab] = useState<'favoritos' | 'resenhas' | 'citacoes'>('favoritos');

  const readBooks = books.filter((b) => b.shelf === 'lidos');
  const favoriteBooks = books.filter((b) => b.isFavorite);

  const badges = [
    { title: 'Chama Viva', desc: '14 dias consecutivos de leitura', icon: '🔥' },
    { title: 'Devoradora de Páginas', desc: '+40.000 páginas catalogadas', icon: '📚' },
    { title: 'Crítica Refinada', desc: 'Mais de 15 resenhas publicadas', icon: '✍️' },
    { title: 'Fã de Evelyn Hugo', desc: 'Nota 5.0 com louvor registrada', icon: '👑' },
  ];

  return (
    <div className="pb-28 pt-4 px-4 space-y-6">
      {/* 1. Profile Header Card */}
      <section className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <img
                src={USER_PROFILE.avatar}
                alt={USER_PROFILE.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-[#FADBE5] shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif font-bold text-[#34111E]">{USER_PROFILE.name}</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FFD7E4] text-[#8C1544]">
                  Leitora Pro
                </span>
              </div>
              <p className="text-xs text-[#876774] font-medium">{USER_PROFILE.username}</p>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-[#931548]">
                <button
                  onClick={onOpenStreakModal}
                  className="flex items-center gap-1 font-semibold hover:underline cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {USER_PROFILE.readingStreakDays} dias de streak
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onToggleMobileFrame}
            title="Alternar modo de moldura móvel"
            className="p-2 rounded-2xl border border-[#F4DEE5] text-[#876774] hover:bg-[#FFF0F4] hover:text-[#931548] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            {isMobileFrameMode ? (
              <>
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Modo Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Modo Celular</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-[#4A2D37] leading-relaxed pt-1 border-t border-[#F9EDF1]">
          {USER_PROFILE.bio}
        </p>

        {/* Stats 4-grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          <div className="p-3 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] text-center">
            <span className="text-lg font-serif font-bold text-[#34111E] tabular-nums block">
              {books.length}
            </span>
            <span className="text-[10px] text-[#7A5B66]">Na Estante</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] text-center">
            <span className="text-lg font-serif font-bold text-[#34111E] tabular-nums block">
              {readBooks.length}
            </span>
            <span className="text-[10px] text-[#7A5B66]">Lidos</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] text-center">
            <span className="text-lg font-serif font-bold text-[#34111E] tabular-nums block">
              42.5k
            </span>
            <span className="text-[10px] text-[#7A5B66]">Páginas</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] text-center">
            <span className="text-lg font-serif font-bold text-[#34111E] tabular-nums block">
              {favoriteBooks.length}
            </span>
            <span className="text-[10px] text-[#7A5B66]">Favoritos</span>
          </div>
        </div>
      </section>

      {/* 2. Literary Badges */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#931548]" />
          <h2 className="text-lg font-serif font-bold text-[#34111E]">Conquistas Literárias</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {badges.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-3.5 border border-[#F4DEE5] shadow-xs flex items-center gap-3"
            >
              <span className="text-2xl shrink-0 p-2 bg-[#FFF4F7] rounded-xl border border-[#F6DEE5]">
                {b.icon}
              </span>
              <div>
                <h3 className="font-serif font-bold text-xs text-[#34111E] leading-tight">
                  {b.title}
                </h3>
                <p className="text-[10px] text-[#7A5B66] leading-tight mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Reading Goal Banner */}
      <section
        onClick={onOpenAnnualReport}
        className="bg-gradient-to-br from-[#931548] to-[#6A0C32] rounded-3xl p-5 text-white shadow-md space-y-3 cursor-pointer hover:shadow-lg transition-all"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFC4D6]">
              Meta Anual 2025 · Toque para ver relatório
            </span>
            <h3 className="font-serif font-bold text-xl">18 de 30 livros concluídos</h3>
          </div>
          <span className="text-2xl font-bold font-serif tabular-nums">60%</span>
        </div>

        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: '60%' }} />
        </div>

        <div className="flex items-center justify-between text-xs text-[#FFD6E3] pt-1">
          <span>Você está no ritmo perfeito para superar sua meta!</span>
          <span className="font-semibold underline">Ver análise →</span>
        </div>
      </section>

      {/* 4. Profile Tabs: Favoritos / Resenhas / Citações */}
      <section className="space-y-4">
        <div className="flex items-center p-1 bg-[#F5E2E8] rounded-2xl text-xs font-medium">
          <button
            onClick={() => setProfileTab('favoritos')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              profileTab === 'favoritos'
                ? 'bg-white text-[#931548] font-bold shadow-xs'
                : 'text-[#7A5B66]'
            }`}
          >
            Favoritos ({favoriteBooks.length})
          </button>
          <button
            onClick={() => setProfileTab('resenhas')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              profileTab === 'resenhas'
                ? 'bg-white text-[#931548] font-bold shadow-xs'
                : 'text-[#7A5B66]'
            }`}
          >
            Minhas Resenhas ({userReviews.length})
          </button>
          <button
            onClick={() => setProfileTab('citacoes')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              profileTab === 'citacoes'
                ? 'bg-white text-[#931548] font-bold shadow-xs'
                : 'text-[#7A5B66]'
            }`}
          >
            Citações ({savedQuotes.length})
          </button>
        </div>

        {/* Tab 1: Favoritos */}
        {profileTab === 'favoritos' && (
          <div className="grid grid-cols-3 gap-3">
            {favoriteBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="bg-white rounded-2xl p-2.5 border border-[#F4DEE5] shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover rounded-xl shadow-xs mb-1.5"
                  referrerPolicy="no-referrer"
                />
                <h4 className="font-serif font-bold text-xs text-[#34111E] line-clamp-1">
                  {book.title}
                </h4>
                <p className="text-[10px] text-[#7A5B66] truncate">{book.author}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Minhas Resenhas */}
        {profileTab === 'resenhas' && (
          <div className="space-y-3">
            {userReviews.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#7A5B66] bg-white rounded-3xl border border-[#F4DEE5]">
                Você ainda não publicou nenhuma resenha. Use o botão <strong>+ Novo Registro</strong>{' '}
                para compartilhar suas leituras!
              </div>
            ) : (
              userReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-4 border border-[#F4DEE5] shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#34111E]">
                      {rev.bookTitle}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-200 fill-neutral-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {rev.quote && (
                    <p className="font-serif italic text-xs text-[#8E1644] bg-[#FFF2F5] p-2 rounded-xl">
                      "{rev.quote}"
                    </p>
                  )}
                  <p className="text-xs text-[#4A2D37] leading-relaxed">{rev.content}</p>
                  <span className="text-[10px] text-[#9A7A85] block">{rev.timeAgo}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Citações Salvas */}
        {profileTab === 'citacoes' && (
          <div className="space-y-3">
            {savedQuotes.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#7A5B66] bg-white rounded-3xl border border-[#F4DEE5]">
                Nenhuma citação salva ainda. Salve citações marcantes tocando no ícone de marcador!
              </div>
            ) : (
              savedQuotes.map((sq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-3xl bg-white border border-[#F4DEE5] shadow-xs space-y-2"
                >
                  <p className="font-serif italic text-sm text-[#5C142A] leading-relaxed">
                    "{sq.quote}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#7A5B66] pt-1 border-t border-[#F8EAEF]">
                    <span className="font-semibold text-[#34111E]">{sq.bookTitle}</span>
                    <Bookmark className="w-3.5 h-3.5 fill-[#931548] text-[#931548]" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};
