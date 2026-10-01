import React, { useState } from 'react';
import {
  BookOpen,
  Flame,
  ChevronRight,
  PenLine,
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  Eye,
  EyeOff,
  Plus,
  Users,
  Sparkles,
} from 'lucide-react';
import { Book, Review, ReadingChallenge } from '../types';

interface HomeScreenProps {
  readingChallenge: ReadingChallenge;
  currentBook: Book;
  reviews: Review[];
  onSelectBook: (book: Book) => void;
  onOpenLogModal: (book?: Book) => void;
  onOpenUpdatePageModal: (book: Book) => void;
  onViewAllReading: () => void;
  onOpenStreakModal: () => void;
  onOpenComments: (title: string) => void;
  onOpenShare: (title: string, subtitle?: string, quote?: string) => void;
  onBookmarkQuote: (quote: string, bookTitle: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  readingChallenge,
  currentBook,
  reviews,
  onSelectBook,
  onOpenLogModal,
  onOpenUpdatePageModal,
  onViewAllReading,
  onOpenStreakModal,
  onOpenComments,
  onOpenShare,
  onBookmarkQuote,
}) => {
  const [feedFilter, setFeedFilter] = useState<'recentes' | 'clubes'>('recentes');
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});
  const [feedReviews, setFeedReviews] = useState<Review[]>(reviews);

  const toggleSpoiler = (id: string) => {
    setRevealedSpoilers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleLike = (id: string) => {
    setFeedReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const isLiked = !r.isLiked;
          return {
            ...r,
            isLiked,
            likesCount: isLiked ? r.likesCount + 1 : r.likesCount - 1,
          };
        }
        return r;
      })
    );
  };

  const toggleBookmark = (review: Review) => {
    setFeedReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
    if (review.quote) {
      onBookmarkQuote(review.quote, review.bookTitle);
    }
  };

  const handleReactionClick = (reviewId: string, emojiIndex: number) => {
    setFeedReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId && r.reactions) {
          const updatedReactions = r.reactions.map((rx, idx) =>
            idx === emojiIndex ? { ...rx, count: rx.count + 1 } : rx
          );
          return { ...r, reactions: updatedReactions };
        }
        return r;
      })
    );
  };

  const readingPercentage = Math.round((currentBook.currentPage / currentBook.totalPages) * 100);

  const clubDiscussions = [
    {
      id: 'club-1',
      clubName: 'Clube Café & Literatura',
      book: 'Circe — Madeline Miller',
      authorName: 'Juliana Pires',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timeAgo: 'há 45 min',
      topic: 'Capítulo 14: A transformação de Scylla',
      body: 'Meninas, o que vocês acharam da motivação da Circe ao criar o monstro? Ciúme ou busca cega por validação?',
      repliesCount: 19,
      likesCount: 42,
    },
    {
      id: 'club-2',
      clubName: 'Sociedade dos Mistérios',
      book: 'A Paciente Silenciosa — Alex Michaelides',
      authorName: 'Mateus Castro',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      timeAgo: 'há 3 horas',
      topic: 'Teoria da Conspiração: Quem é Theo de verdade?',
      body: 'Reuni 4 pistas deixadas no diário de Alicia que apontam para uma contradição cronológica nas consultas...',
      repliesCount: 31,
      likesCount: 68,
    },
  ];

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      {/* 1. Header Greeting & Streak */}
      <section className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#A11B4C] uppercase block">
            Terça-feira, 24 de Outubro
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#34111E] tracking-tight mt-0.5">
            Bom dia, Helena
          </h1>
        </div>

        {/* Streak Counter - Clickable! */}
        <button
          onClick={onOpenStreakModal}
          title="Ver detalhes da sua sequência de leitura"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#FFE7EE] to-[#FFD5E2] rounded-full border border-[#F4BED0] shadow-xs text-[#8B1441] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Flame className="w-4 h-4 fill-[#C92A63] text-[#C92A63]" />
          <span className="text-xs font-bold tabular-nums">14 dias</span>
        </button>
      </section>

      {/* 2. Reading Challenge 2025 Card */}
      <section className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F4] border border-[#F7D3DF] flex items-center justify-center text-[#931548]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#34111E]">
                Desafio Literário {readingChallenge.year}
              </h2>
              <p className="text-xs text-[#7A5B66]">
                <strong className="text-[#34111E] font-semibold">{readingChallenge.completed}</strong> de{' '}
                {readingChallenge.total} livros concluídos
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFEBF1] text-[#931548] border border-[#F5CAD8]">
            +{readingChallenge.aheadBy} à frente
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 w-full bg-[#FCE8EF] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C2185B] to-[#880E4F] rounded-full transition-all duration-500"
              style={{ width: `${readingChallenge.percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-2 text-[#7A5B66]">
            <span>{readingChallenge.percentage}% do objetivo alcançado</span>
            <button
              onClick={() => onOpenUpdatePageModal(currentBook)}
              className="font-medium text-[#931548] hover:underline flex items-center gap-1 active:scale-95 transition-all"
            >
              <PenLine className="w-3.5 h-3.5" />
              Atualizar página
            </button>
          </div>
        </div>
      </section>

      {/* 3. Lendo Agora Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-[#34111E]">Lendo Agora</h2>
          <button
            onClick={onViewAllReading}
            className="text-xs font-semibold text-[#8B1441] hover:text-[#5F0829] flex items-center gap-0.5"
          >
            Ver todos (2)
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          onClick={() => onSelectBook(currentBook)}
          className="bg-white rounded-3xl p-4 border border-[#F4DEE5] shadow-xs hover:shadow-md transition-shadow cursor-pointer flex gap-4"
        >
          {/* Book cover with percentage pill */}
          <div className="relative w-24 sm:w-28 h-36 shrink-0 rounded-xl overflow-hidden shadow-md">
            <img
              src={currentBook.coverUrl}
              alt={currentBook.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#8E1644]/90 backdrop-blur-xs text-white text-[11px] font-bold">
              {readingPercentage}%
            </span>
          </div>

          {/* Book Info & Action */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <span className="text-[11px] font-medium text-[#A11B4C] bg-[#FFF0F4] px-2 py-0.5 rounded-md inline-block mb-1">
                {currentBook.genres[0]}
              </span>
              <h3 className="font-serif font-bold text-[#34111E] text-base sm:text-lg line-clamp-1 leading-snug">
                {currentBook.title}
              </h3>
              <p className="text-xs text-[#7A5B66]">{currentBook.author}</p>

              <div className="mt-2.5 flex items-center justify-between text-xs text-[#7A5B66]">
                <span>
                  Pág. {currentBook.currentPage} de {currentBook.totalPages}
                </span>
                {currentBook.estimatedTimeLeft && (
                  <span className="text-[11px] text-[#A11B4C] font-medium">
                    {currentBook.estimatedTimeLeft}
                  </span>
                )}
              </div>

              {/* Mini progress bar */}
              <div className="h-1.5 w-full bg-[#FCE8EF] rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-[#A11B4C] rounded-full"
                  style={{ width: `${readingPercentage}%` }}
                />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLogModal(currentBook);
              }}
              className="mt-3 w-full py-2.5 px-3 rounded-2xl bg-[#931548] hover:bg-[#7D0E3B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Registrar Leitura de Hoje
            </button>
          </div>
        </div>
      </section>

      {/* 4. Atividade de Amigos Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-[#34111E]">Atividade de Amigos</h2>
            <span className="w-2 h-2 rounded-full bg-[#931548]" />
          </div>

          {/* Filter segment control */}
          <div className="flex items-center p-1 bg-[#F5E2E8] rounded-xl text-xs font-medium">
            <button
              onClick={() => setFeedFilter('recentes')}
              className={`px-3 py-1 rounded-lg transition-all ${
                feedFilter === 'recentes'
                  ? 'bg-white text-[#931548] shadow-xs font-semibold'
                  : 'text-[#7A5B66] hover:text-[#34111E]'
              }`}
            >
              Recentes
            </button>
            <button
              onClick={() => setFeedFilter('clubes')}
              className={`px-3 py-1 rounded-lg transition-all ${
                feedFilter === 'clubes'
                  ? 'bg-white text-[#931548] shadow-xs font-semibold'
                  : 'text-[#7A5B66] hover:text-[#34111E]'
              }`}
            >
              Clubes
            </button>
          </div>
        </div>

        {/* Feed Posts or Clubs view */}
        {feedFilter === 'clubes' ? (
          <div className="space-y-4">
            {clubDiscussions.map((club) => (
              <article
                key={club.id}
                className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-[#FFF0F4] text-[#931548]">
                      <Users className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#34111E]">{club.clubName}</span>
                      <span className="text-[10px] text-[#8E1644] block font-medium">{club.book}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#9A7A85]">{club.timeAgo}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FFF8FA] border border-[#F6DEE5] space-y-1">
                  <h4 className="font-serif font-bold text-sm text-[#34111E]">{club.topic}</h4>
                  <p className="text-xs text-[#4A2D37] leading-relaxed">{club.body}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F8EAEF] text-xs text-[#7A5B66]">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onOpenComments(club.topic)}
                      className="flex items-center gap-1.5 hover:text-[#931548]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{club.repliesCount} respostas</span>
                    </button>
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-[#931548]" />
                      <span>{club.likesCount}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenComments(club.topic)}
                    className="text-xs font-semibold text-[#931548] hover:underline"
                  >
                    Entrar no debate →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {feedReviews.map((review) => {
              const isSpoilerHidden = review.hasSpoiler && !revealedSpoilers[review.id];

              return (
                <article
                  key={review.id}
                  className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-3.5 transition-shadow hover:shadow-sm"
                >
                  {/* Author row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.authorAvatar}
                        alt={review.authorName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FCE3EB]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#34111E]">
                            {review.authorName}
                          </span>
                          {review.badge && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FFD7E4] text-[#8C1544]">
                              {review.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#7A5B66]">
                          {review.type === 'progress'
                            ? review.progressText
                            : `Concluiu leitura • ${review.timeAgo}`}
                        </p>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    {review.rating > 0 && (
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < review.rating ? 'text-amber-500' : 'text-neutral-200'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Book Reference Card */}
                  {review.bookTitle && review.type !== 'progress' && (
                    <div
                      onClick={() => {
                        onSelectBook({
                          id: review.bookId,
                          title: review.bookTitle,
                          author: review.bookAuthor,
                          coverUrl: review.bookCover,
                          totalPages: 360,
                          currentPage: 360,
                          genres: ['Romance', 'Ficção'],
                          shelf: 'lidos',
                          synopsis: review.content,
                        });
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] cursor-pointer hover:bg-[#FCECEF] transition-colors"
                    >
                      <img
                        src={review.bookCover}
                        alt={review.bookTitle}
                        className="w-9 h-13 object-cover rounded-md shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-[#34111E]">{review.bookTitle}</h4>
                        <p className="text-[11px] text-[#7A5B66]">{review.bookAuthor}</p>
                        {review.rating === 5 && (
                          <span className="text-[10px] text-[#931548] font-medium block mt-0.5">
                            Nota 5.0 com louvor
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Highlighted Quote Box */}
                  {review.quote && (
                    <div className="p-3.5 rounded-2xl bg-[#FFF2F5] border-l-4 border-[#931548] text-[#5C142A]">
                      <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                        "{review.quote}"
                      </p>
                    </div>
                  )}

                  {/* Spoiler Banner */}
                  {review.hasSpoiler && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF0F4] border border-[#F9CAD7] text-xs">
                      <span className="text-[#931548] font-semibold flex items-center gap-1.5">
                        <EyeOff className="w-3.5 h-3.5" />
                        {review.spoilerChapter || 'Contém Spoilers'}
                      </span>
                      <button
                        onClick={() => toggleSpoiler(review.id)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#F2CAD6] text-[#931548] font-medium hover:bg-[#FFF8FA] active:scale-95 transition-all text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {revealedSpoilers[review.id] ? (
                          <>
                            <EyeOff className="w-3 h-3" /> Ocultar
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" /> Revelar
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Review Body Text */}
                  <p
                    className={`text-xs sm:text-sm text-[#4A2D37] leading-relaxed transition-all ${
                      isSpoilerHidden ? 'filter blur-sm select-none opacity-60' : ''
                    }`}
                  >
                    {review.content}
                  </p>

                  {/* Reactions Bar */}
                  {review.reactions && (
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        {review.reactions.map((reaction, i) => (
                          <button
                            key={i}
                            onClick={() => handleReactionClick(review.id, i)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF2F6] border border-[#F6D2DD] text-xs hover:scale-105 active:scale-95 transition-transform"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-[10px] font-semibold text-[#8E1644]">
                              {reaction.count}
                            </span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => onOpenComments(review.bookTitle)}
                        className="text-xs text-[#931548] font-medium hover:underline cursor-pointer"
                      >
                        Responder
                      </button>
                    </div>
                  )}

                  {/* Interaction Footer Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F8EAEF] text-xs text-[#7A5B66]">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(review.id)}
                        className={`flex items-center gap-1.5 hover:text-[#931548] active:scale-95 transition-transform cursor-pointer ${
                          review.isLiked ? 'text-[#931548] font-semibold' : ''
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${review.isLiked ? 'fill-current text-[#931548]' : ''}`}
                        />
                        <span>{review.likesCount}</span>
                      </button>

                      <button
                        onClick={() => onOpenComments(review.bookTitle)}
                        className="flex items-center gap-1.5 hover:text-[#931548] cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{review.commentsCount}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmark(review)}
                        title="Salvar citação"
                        className={`p-1.5 rounded-full hover:bg-[#FDF0F4] cursor-pointer transition-colors ${
                          review.isBookmarked ? 'text-[#931548]' : ''
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${review.isBookmarked ? 'fill-current' : ''}`}
                        />
                      </button>
                      <button
                        onClick={() =>
                          onOpenShare(
                            review.bookTitle,
                            `Resenha por ${review.authorName}`,
                            review.quote
                          )
                        }
                        title="Compartilhar"
                        className="p-1.5 rounded-full hover:bg-[#FDF0F4] cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Floating Action Button: + Novo Registro */}
      <div className="fixed bottom-20 right-4 sm:right-8 z-30">
        <button
          onClick={() => onOpenLogModal()}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#931548] to-[#730D35] hover:from-[#A81B53] hover:to-[#84103F] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-[#931548]/30 active:scale-95 transition-transform cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Novo Registro</span>
        </button>
      </div>
    </div>
  );
};
