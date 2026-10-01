import React, { useState } from 'react';
import {
  X,
  Send,
  Heart,
  RotateCcw,
  Bold,
  Italic,
  Quote,
  List,
  Calendar,
  Sparkles,
  BookOpen,
  Star,
  Share2,
} from 'lucide-react';
import { Book, Review } from '../types';
import { USER_PROFILE } from '../data/mockData';
import { LiriaLogo } from './LiriaLogo';

interface ReviewModalProps {
  book: Book;
  onClose: () => void;
  onSubmitReview: (newReview: Partial<Review>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ book, onClose, onSubmitReview }) => {
  const [rating, setRating] = useState<number>(5);
  const [isFavorite, setIsFavorite] = useState<boolean>(book.isFavorite ?? true);
  const [willReread, setWillReread] = useState<boolean>(book.willReread ?? false);
  const [reviewTitle, setReviewTitle] = useState<string>(
    book.id === 'evelyn-hugo' ? 'Uma obra-prima inesquecível sobre a ambição' : ''
  );
  const [reviewBody, setReviewBody] = useState<string>(
    book.id === 'evelyn-hugo'
      ? 'Evelyn Hugo não é apenas uma personagem, é uma força da natureza. A construção das nuances entre a persona pública reluzente e a vulnerabilidade privada nos bastidores de Hollywood é simplesmente magistral. Terminei com o coração acelerado e os olhos marejados.'
      : ''
  );
  const [hasSpoiler, setHasSpoiler] = useState<boolean>(false);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([
    '😭 Chorei',
    '✨ Plot twist incrível',
    '❤️ Romance emocionante',
    '🎭 Personagens complexos',
  ]);
  const [startDate, setStartDate] = useState<string>(book.startDate || '10/05/2025');
  const [finishDate, setFinishDate] = useState<string>(book.finishDate || '18/05/2025');

  const ratingDescriptions: Record<number, string> = {
    1: 'Ruim (1.0 / 5.0)',
    2: 'Razoável (2.0 / 5.0)',
    3: 'Bom (3.0 / 5.0)',
    4: 'Muito bom! (4.0 / 5.0)',
    5: 'Incrível! (5.0 / 5.0)',
  };

  const moodsList = [
    '😭 Chorei',
    '✨ Plot twist incrível',
    '⚡ Leitura rápida',
    '❤️ Romance emocionante',
    '🎭 Personagens complexos',
    '🕯️ Confortável',
    '🧠 Reflexivo',
    '🌙 Sombrio & Tenso',
  ];

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const wordCount = reviewBody.trim() ? reviewBody.trim().split(/\s+/).length : 0;

  const handlePublish = () => {
    onSubmitReview({
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookCover: book.coverUrl,
      authorName: USER_PROFILE.name,
      authorUsername: USER_PROFILE.username,
      authorAvatar: USER_PROFILE.avatar,
      rating,
      content: reviewBody,
      quote: reviewTitle,
      hasSpoiler,
      spoilerChapter: hasSpoiler ? 'CONTÉM SPOILERS' : undefined,
      tags: selectedMoods,
    });
    onClose();
  };

  const applyFormatting = (tag: string) => {
    if (tag === 'bold') {
      setReviewBody((prev) => prev + ' **texto em destaque**');
    } else if (tag === 'italic') {
      setReviewBody((prev) => prev + ' *itálico*');
    } else if (tag === 'quote') {
      setReviewBody((prev) => prev + '\n> "Citação inspiradora"');
    } else if (tag === 'list') {
      setReviewBody((prev) => prev + '\n• Ponto 1\n• Ponto 2');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF4F4] text-[#2D141E]">
      {/* Top sticky action bar */}
      <div className="sticky top-0 z-30 bg-[#FAF4F4]/95 backdrop-blur-md border-b border-[#F4DEE5] px-4 py-3 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7A5B66] hover:text-[#931548] p-1 active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
          <span>Cancelar</span>
        </button>

        <span className="font-serif font-bold text-base text-[#34111E]">Registrar Leitura</span>

        <button
          onClick={handlePublish}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#931548] hover:bg-[#7A0E39] text-white text-xs sm:text-sm font-semibold shadow-xs active:scale-95 transition-all"
        >
          <span>Publicar</span>
          <Send className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>

      <div className="px-4 py-5 space-y-6 max-w-lg mx-auto pb-20">
        {/* 1. Book Summary Header Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#F4DEE5] shadow-xs flex items-center gap-4">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-16 h-22 object-cover rounded-xl shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1">
            <span className="text-[11px] font-semibold text-[#931548] bg-[#FFF0F4] px-2 py-0.5 rounded-md inline-block mb-1">
              📖 Lendo • 100%
            </span>
            <h2 className="font-serif font-bold text-base text-[#34111E] line-clamp-1">
              {book.title}
            </h2>
            <p className="text-xs text-[#7A5B66]">
              {book.author} • {book.totalPages} páginas
            </p>
          </div>
        </div>

        {/* 2. Rating Section */}
        <div className="bg-white rounded-3xl p-6 border border-[#F4DEE5] shadow-xs text-center space-y-3">
          <span className="text-[10px] font-bold tracking-wider text-[#A11B4C] uppercase block">
            Sua Avaliação
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#34111E]">
            Qual a sua nota para esta história?
          </h3>

          {/* Interactive stars */}
          <div className="flex items-center justify-center gap-2 pt-1 pb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                aria-label={`Nota ${s}`}
                className="p-1 hover:scale-125 active:scale-95 transition-transform"
              >
                <Star
                  className={`w-9 h-9 ${
                    s <= rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200 fill-neutral-100'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Rating label badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFE7EE] text-[#931548] text-xs font-bold border border-[#F5CAD8]">
            {ratingDescriptions[rating]}
          </div>

          {/* Favorite & Re-read toggles */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F8EAEF]">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`py-2.5 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                isFavorite
                  ? 'bg-[#FFF0F4] border-[#EAA0B8] text-[#931548]'
                  : 'bg-white border-[#F4DEE5] text-[#7A5B66]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#931548]' : ''}`} />
              <span>Favorito</span>
            </button>

            <button
              onClick={() => setWillReread(!willReread)}
              className={`py-2.5 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                willReread
                  ? 'bg-[#FFF0F4] border-[#EAA0B8] text-[#931548]'
                  : 'bg-white border-[#F4DEE5] text-[#7A5B66]'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Vou Reler</span>
            </button>
          </div>
        </div>

        {/* 3. Review Editor Section */}
        <div className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-[#A11B4C] uppercase">
              Escrever Resenha
            </span>
            <span className="text-xs text-[#9A7A85] tabular-nums">{wordCount} palavras</span>
          </div>

          {/* Title / Quote Lead */}
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder="Título impactante ou citação marcante..."
            className="w-full text-base sm:text-lg font-serif font-bold text-[#34111E] placeholder:text-[#BAA0AB] border-b border-[#F4DEE5] pb-2 focus:outline-none focus:border-[#931548]"
          />

          {/* Formatting Bar */}
          <div className="flex items-center justify-between p-1.5 bg-[#FFF0F4] rounded-2xl border border-[#F6DCE4] text-xs">
            <div className="flex items-center gap-1 text-[#8E1644]">
              <button
                type="button"
                onClick={() => applyFormatting('bold')}
                className="p-1.5 rounded-lg hover:bg-white active:scale-95"
                title="Negrito"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('italic')}
                className="p-1.5 rounded-lg hover:bg-white active:scale-95"
                title="Itálico"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('quote')}
                className="p-1.5 rounded-lg hover:bg-white active:scale-95"
                title="Citação"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('list')}
                className="p-1.5 rounded-lg hover:bg-white active:scale-95"
                title="Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[10px] text-[#A15873] font-medium pr-2">
              Toque para estilizar
            </span>
          </div>

          {/* Text Area */}
          <textarea
            rows={6}
            value={reviewBody}
            onChange={(e) => setReviewBody(e.target.value)}
            placeholder="Escreva suas impressões sobre o desenvolvimento dos personagens, a trama e o que sentiu ao virar a última página..."
            className="w-full text-xs sm:text-sm text-[#34111E] leading-relaxed placeholder:text-[#BAA0AB] focus:outline-none resize-none p-1"
          />
        </div>

        {/* 4. Spoilers Toggle & Mood Chips */}
        <div className="bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-xs space-y-4">
          {/* Spoiler toggle */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F8EAEF]">
            <div>
              <span className="text-xs font-bold text-[#34111E] flex items-center gap-1.5">
                🚫 Contém Spoilers?
              </span>
              <p className="text-[11px] text-[#7A5B66] max-w-[260px]">
                Ocultará trechos cruciais para quem ainda não concluiu este livro.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setHasSpoiler(!hasSpoiler)}
              className={`w-12 h-7 rounded-full p-1 transition-colors relative ${
                hasSpoiler ? 'bg-[#931548]' : 'bg-[#E8CAD4]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  hasSpoiler ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Mood and feelings chips */}
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[#A11B4C] uppercase block mb-2.5">
              Humor e Sensações da Leitura
            </span>
            <div className="flex flex-wrap gap-2">
              {moodsList.map((mood) => {
                const isSelected = selectedMoods.includes(mood);
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => toggleMood(mood)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#FFD9E5] text-[#8E1644] border border-[#F6B6CA] font-semibold'
                        : 'bg-[#FFF7F9] text-[#7A5B66] border border-[#F4DEE5] hover:bg-[#FFEBF1]'
                    }`}
                  >
                    {mood}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates of Reading */}
          <div className="pt-2">
            <span className="text-[10px] font-bold tracking-wider text-[#A11B4C] uppercase block mb-2">
              Datas de Leitura
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#931548] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#7A5B66] block">Início</span>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-xs font-bold text-[#34111E] bg-transparent focus:outline-none w-full"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFF6F8] border border-[#F6DEE5] flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#931548] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#7A5B66] block">Término</span>
                  <input
                    type="text"
                    value={finishDate}
                    onChange={(e) => setFinishDate(e.target.value)}
                    className="text-xs font-bold text-[#34111E] bg-transparent focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Líria Ethos Card */}
        <div className="p-4 rounded-3xl bg-[#FFF2F6] border border-[#F6D5E0] flex items-start gap-3 text-xs text-[#5E142B] leading-relaxed">
          <div className="mt-0.5 shrink-0 text-[#931548]">
            <LiriaLogo size={18} showText={false} />
          </div>
          <p>
            No Líria, valorizamos impressões sinceras, respeito às interpretações alheias e a partilha
            de afetos através da literatura.
          </p>
        </div>
      </div>
    </div>
  );
};
