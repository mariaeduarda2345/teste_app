import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  ChevronDown,
  BookOpen,
  Sparkles,
  MessageSquare,
  Bookmark,
  Check,
  Star,
  PenSquare,
} from 'lucide-react';
import { Book, Review, ShelfType } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface BookDetailModalProps {
  book: Book;
  communityReviews: Review[];
  onBack: () => void;
  onOpenWriteReview: (book: Book) => void;
  onUpdateShelf: (bookId: string, shelf: ShelfType) => void;
  onUpdateUserRating: (bookId: string, rating: number) => void;
  onToggleFavoriteBook: (bookId: string) => void;
  onOpenShare: (title: string, subtitle?: string, quote?: string) => void;
  onOpenComments: (title: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  communityReviews,
  onBack,
  onOpenWriteReview,
  onUpdateShelf,
  onUpdateUserRating,
  onToggleFavoriteBook,
  onOpenShare,
  onOpenComments,
}) => {
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [activeReviewsTab, setActiveReviewsTab] = useState<'curtidas' | 'recentes' | 'amigos'>('curtidas');
  const [shelfDropdownOpen, setShelfDropdownOpen] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState<ShelfType>(book.shelf);
  const [userRating, setUserRating] = useState<number>(book.userRating || 5);
  const [starFilter, setStarFilter] = useState<number | null>(null);

  // Reviews state for liking
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    return communityReviews.filter((r) => r.bookId === book.id || book.id === 'evelyn-hugo');
  });

  const ratingLabels: Record<number, string> = {
    1: 'Não gostei (1/5)',
    2: 'Razoável (2/5)',
    3: 'Bom (3/5)',
    4: 'Muito bom! (4/5)',
    5: 'Obra-prima inesquecível! (5/5)',
  };

  const shelfLabels: Record<ShelfType, string> = {
    lidos: 'Já Lido',
    lendo: 'Lendo Atualmente',
    'quero-ler': 'Quero Ler',
    favoritos: 'Favorito',
    abandonados: 'Abandonado',
  };

  const handleSelectShelf = (shelf: ShelfType) => {
    setSelectedShelf(shelf);
    onUpdateShelf(book.id, shelf);
    setShelfDropdownOpen(false);
  };

  const handleRatingClick = (r: number) => {
    setUserRating(r);
    onUpdateUserRating(book.id, r);
  };

  const toggleReviewLike = (id: string) => {
    setReviewsList((prev) =>
      prev.map((rev) => {
        if (rev.id === id) {
          const isLiked = !rev.isLiked;
          return {
            ...rev,
            isLiked,
            likesCount: isLiked ? rev.likesCount + 1 : rev.likesCount - 1,
          };
        }
        return rev;
      })
    );
  };

  // Filter & sort reviews
  let displayedReviews = [...reviewsList];
  if (starFilter !== null) {
    displayedReviews = displayedReviews.filter((r) => r.rating === starFilter);
  }

  if (activeReviewsTab === 'curtidas') {
    displayedReviews.sort((a, b) => b.likesCount - a.likesCount);
  } else if (activeReviewsTab === 'recentes') {
    // preserve default or reverse
  } else if (activeReviewsTab === 'amigos') {
    displayedReviews = displayedReviews.filter((r) => r.authorUsername.includes('clara') || r.authorUsername.includes('gabriel'));
  }

  return (
    <div className="min-h-screen bg-[#FAF4F4] text-[#2D141E] pb-24">
      {/* 1. Header Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF4F4]/95 backdrop-blur-md border-b border-[#F4DEE5] px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#7A3E53] hover:text-[#931548] p-1 rounded-full active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif font-bold text-base text-[#34111E]">Detalhes Do Livro</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenShare(book.title, book.author, book.highlightQuote)}
            title="Compartilhar livro"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#7A3E53] hover:bg-[#FCE6EE] cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#ECC3D1]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="px-4 pt-4 space-y-6 max-w-lg mx-auto">
        {/* Top Badges: Destaque da Semana & Favorite */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF5C8A] to-[#E91E63] text-white text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            Destaque da Semana
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavoriteBook(book.id)}
              title="Favoritar livro"
              className={`w-10 h-10 rounded-full flex items-center justify-center border border-[#F4DEE5] bg-white shadow-xs transition-all active:scale-95 cursor-pointer ${
                book.isFavorite ? 'text-[#931548] border-[#E89CB5]' : 'text-[#876774]'
              }`}
            >
              <Heart className={`w-5 h-5 ${book.isFavorite ? 'fill-[#931548]' : ''}`} />
            </button>
            <button
              onClick={() => onOpenShare(book.title, book.author, book.highlightQuote)}
              title="Enviar para amigo"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#F4DEE5] bg-white shadow-xs text-[#876774] active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Book Cover Presentation (Soft 3D card with ribbon) */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative group">
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-[#E8A5BB]/40 rounded-3xl blur-2xl transform -translate-y-2 scale-95" />

            <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Ribbon Bookmark */}
              <div className="absolute top-0 right-5 w-5 h-10 bg-gradient-to-b from-[#E91E63] to-[#880E4F] rounded-b-md shadow-md flex items-end justify-center pb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              </div>
            </div>
          </div>

          {/* Book Title & Author */}
          <div className="text-center mt-5 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#34111E] tracking-tight leading-tight max-w-sm">
              {book.title}
            </h1>
            <p className="text-sm font-semibold text-[#8E1644]">{book.author}</p>

            {/* Publishing details inline badges */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#7A5B66]">
              <span className="px-2.5 py-1 rounded-full bg-[#FFF0F4] border border-[#F6DCE4] text-[#8E1644] font-medium">
                {book.publisher || 'Editora Paralela'}
              </span>
              <span>•</span>
              <span className="px-2.5 py-1 rounded-full bg-[#FFF0F4] border border-[#F6DCE4] text-[#8E1644] font-medium">
                {book.year || '2019'}
              </span>
              <span>•</span>
              <span className="px-2.5 py-1 rounded-full bg-[#FFF0F4] border border-[#F6DCE4] text-[#8E1644] font-medium flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {book.totalPages} págs
              </span>
            </div>
          </div>
        </div>

        {/* 3. Community Rating Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs flex items-center gap-6">
          {/* Big Score Box */}
          <div className="text-center shrink-0 pr-4 border-r border-[#F7E6EB]">
            <span className="text-3xl font-serif font-bold text-[#34111E] block leading-none">
              {book.rating || 4.8}
            </span>
            <div className="flex items-center justify-center gap-0.5 text-amber-500 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-[#876774] block whitespace-nowrap">
              {book.ratingCount?.toLocaleString('pt-BR') || '28.430'} avaliações
            </span>
          </div>

          {/* Breakdown bars with interactive star filter */}
          <div className="flex-1 space-y-1 text-[11px] text-[#876774]">
            {[
              { stars: 5, pct: 82 },
              { stars: 4, pct: 12 },
              { stars: 3, pct: 4 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 1 },
            ].map((row) => (
              <button
                key={row.stars}
                onClick={() => setStarFilter(starFilter === row.stars ? null : row.stars)}
                className={`w-full flex items-center gap-2 p-0.5 rounded-md text-left transition-colors cursor-pointer ${
                  starFilter === row.stars ? 'bg-[#FFF0F4] font-bold text-[#931548]' : 'hover:bg-[#FAFAFA]'
                }`}
              >
                <span className="w-2 font-medium">{row.stars}</span>
                <div className="h-1.5 flex-1 bg-[#FCE8EF] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      row.stars === 5 ? 'bg-[#931548]' : 'bg-[#E59AB3]'
                    }`}
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-7 text-right tabular-nums text-[10px]">{row.pct}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Status na sua Estante & Personal Rating */}
        <div className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-4">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[#A11B4C] uppercase block mb-2">
              Status na sua estante
            </span>

            {/* Dropdown button */}
            <div className="relative">
              <button
                onClick={() => setShelfDropdownOpen(!shelfDropdownOpen)}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#931548] text-white font-semibold text-sm flex items-center justify-between shadow-xs active:scale-[0.99] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{shelfLabels[selectedShelf]}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${shelfDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {shelfDropdownOpen && (
                <div className="absolute top-14 left-0 right-0 z-20 bg-white rounded-2xl shadow-xl border border-[#F4DEE5] p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  {(['lidos', 'lendo', 'quero-ler', 'abandonados'] as ShelfType[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleSelectShelf(st)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedShelf === st
                          ? 'bg-[#FFF0F4] text-[#931548]'
                          : 'text-[#34111E] hover:bg-[#FAFAFA]'
                      }`}
                    >
                      <span>{shelfLabels[st]}</span>
                      {selectedShelf === st && <Check className="w-4 h-4 text-[#931548]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sua Avaliação Pessoal */}
          <div className="pt-2 text-center border-t border-[#F9EDF1]">
            <span className="text-xs font-semibold text-[#8E1644] block mb-2">
              Sua Avaliação Pessoal
            </span>

            <div className="flex items-center justify-center gap-2 text-amber-500 my-1">
              {[1, 2, 3, 4, 5].map((starVal) => (
                <button
                  key={starVal}
                  onClick={() => handleRatingClick(starVal)}
                  aria-label={`Avaliar com ${starVal} estrelas`}
                  className="p-1 hover:scale-125 active:scale-95 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      starVal <= userRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-200 fill-neutral-100'
                    }`}
                  />
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-[#8E1644] block mt-1">
              {ratingLabels[userRating]}
            </span>
          </div>
        </div>

        {/* 5. Sinopse */}
        <div className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#34111E] font-serif font-bold text-base">
            <BookOpen className="w-4 h-4 text-[#931548]" />
            <h3>Sinopse</h3>
          </div>

          <p
            className={`text-xs sm:text-sm text-[#4A2D37] leading-relaxed transition-all ${
              !synopsisExpanded ? 'line-clamp-3' : ''
            }`}
          >
            {book.synopsis}
          </p>

          <button
            onClick={() => setSynopsisExpanded(!synopsisExpanded)}
            className="text-xs font-semibold text-[#931548] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
          >
            {synopsisExpanded ? 'Ler menos ⌃' : 'Ler mais ⌵'}
          </button>
        </div>

        {/* 6. Resenhas da Comunidade */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#34111E]">Resenhas da Comunidade</h3>
              <p className="text-[11px] text-[#7A5B66]">Leituras e anotações dos membros de Líria</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFE7EE] text-[#931548]">
              {reviewsList.length + 1418} críticas
            </span>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F5E2E8] rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveReviewsTab('curtidas')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeReviewsTab === 'curtidas'
                  ? 'bg-white text-[#931548] font-bold shadow-xs'
                  : 'text-[#7A5B66]'
              }`}
            >
              Mais curtidas
            </button>
            <button
              onClick={() => setActiveReviewsTab('recentes')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeReviewsTab === 'recentes'
                  ? 'bg-white text-[#931548] font-bold shadow-xs'
                  : 'text-[#7A5B66]'
              }`}
            >
              Recentes
            </button>
            <button
              onClick={() => setActiveReviewsTab('amigos')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeReviewsTab === 'amigos'
                  ? 'bg-white text-[#931548] font-bold shadow-xs'
                  : 'text-[#7A5B66]'
              }`}
            >
              Amigos (14)
            </button>
          </div>

          {starFilter !== null && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#FFF0F4] text-xs text-[#931548]">
              <span>Filtrando por resenhas de {starFilter} estrelas</span>
              <button onClick={() => setStarFilter(null)} className="font-bold underline">
                Limpar filtro
              </button>
            </div>
          )}

          {/* Reviews list */}
          <div className="space-y-4 pt-1">
            {displayedReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-3"
              >
                {/* Reviewer Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FCE3EB]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#34111E]">
                          {rev.authorName}
                        </span>
                        {rev.badge && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF5C8A] to-[#C2185B] text-white">
                            {rev.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#7A5B66]">{rev.timeAgo}</p>
                    </div>
                  </div>

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

                {/* Highlighted Quote Box */}
                {rev.quote && (
                  <div className="p-3.5 rounded-2xl bg-[#FFF2F5] border-l-4 border-[#931548] text-[#5C142A]">
                    <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                      "{rev.quote}"
                    </p>
                  </div>
                )}

                {/* Content */}
                <p className="text-xs sm:text-sm text-[#4A2D37] leading-relaxed">{rev.content}</p>

                {/* Footer counters */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F8EAEF] text-xs text-[#7A5B66]">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleReviewLike(rev.id)}
                      className={`flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer ${
                        rev.isLiked ? 'text-[#931548] font-bold' : ''
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          rev.isLiked ? 'fill-[#931548] text-[#931548]' : 'text-[#876774]'
                        }`}
                      />
                      <span className="tabular-nums font-medium">{rev.likesCount}</span>
                    </button>
                    <button
                      onClick={() => onOpenComments(`Resenha de ${rev.authorName}`)}
                      className="flex items-center gap-1.5 hover:text-[#931548] cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="tabular-nums font-medium">{rev.commentsCount}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenShare(book.title, `Resenha de ${rev.authorName}`, rev.quote)}
                    title="Compartilhar resenha"
                    className="hover:text-[#931548] cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Write Review Action Bar (From Image 1) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F2DEE4] p-3 px-4 max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E91E63]" />
          <span className="text-xs sm:text-sm font-medium text-[#34111E]">O que você achou?</span>
        </div>

        <button
          onClick={() => onOpenWriteReview(book)}
          className="py-2.5 px-5 rounded-2xl bg-[#931548] hover:bg-[#780D37] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md shadow-[#931548]/20 active:scale-95 transition-all cursor-pointer"
        >
          <PenSquare className="w-4 h-4" />
          <span>Escrever Resenha</span>
        </button>
      </div>
    </div>
  );
};
