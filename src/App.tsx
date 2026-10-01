/**
 * Líria - Estante & Diário Literário
 * Mobile & Web Literary Reading App
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { BookshelfScreen } from './components/BookshelfScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BookDetailModal } from './components/BookDetailModal';
import { ReviewModal } from './components/ReviewModal';
import { UpdateProgressModal } from './components/UpdateProgressModal';
import { AddBookModal } from './components/AddBookModal';
import { SearchModal } from './components/SearchModal';
import { CommentsModal } from './components/CommentsModal';
import { ShareModal } from './components/ShareModal';
import { StreakModal } from './components/StreakModal';
import { AnnualReportModal } from './components/AnnualReportModal';
import { BookOptionsModal } from './components/BookOptionsModal';
import {
  INITIAL_BOOKS,
  INITIAL_REVIEWS,
  READING_CHALLENGE_DATA,
  USER_PROFILE,
} from './data/mockData';
import { Book, Review, ShelfType, ReadingChallenge } from './types';
import { Smartphone, Monitor, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Persistent state with localStorage
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('liria_books');
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('liria_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [readingChallenge, setReadingChallenge] = useState<ReadingChallenge>(() => {
    try {
      const saved = localStorage.getItem('liria_challenge');
      return saved ? JSON.parse(saved) : READING_CHALLENGE_DATA;
    } catch {
      return READING_CHALLENGE_DATA;
    }
  });

  const [savedQuotes, setSavedQuotes] = useState<{ quote: string; bookTitle: string }[]>(() => {
    try {
      const saved = localStorage.getItem('liria_saved_quotes');
      return saved
        ? JSON.parse(saved)
        : [
            {
              quote: 'Eles são só maridos. A Evelyn Hugo sou eu.',
              bookTitle: 'Os Sete Maridos de Evelyn Hugo',
            },
            {
              quote: 'Você enfeitiçou meu corpo e minha alma, e eu amo... amo você.',
              bookTitle: 'Orgulho e Preconceito',
            },
          ];
    } catch {
      return [];
    }
  });

  // Navigation and Modals state
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reviewModalBook, setReviewModalBook] = useState<Book | null>(null);
  const [updateProgressBook, setUpdateProgressBook] = useState<Book | null>(null);
  const [showAddBookModal, setShowAddBookModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [streakModalOpen, setStreakModalOpen] = useState<boolean>(false);
  const [annualReportOpen, setAnnualReportOpen] = useState<boolean>(false);
  const [bookOptionsModalBook, setBookOptionsModalBook] = useState<Book | null>(null);

  const [commentsModal, setCommentsModal] = useState<{
    isOpen: boolean;
    postTitle: string;
  }>({
    isOpen: false,
    postTitle: '',
  });

  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    quote?: string;
  }>({
    isOpen: false,
    title: '',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileFrameMode, setIsMobileFrameMode] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('liria_books', JSON.stringify(books));
    } catch (e) {
      console.error(e);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem('liria_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('liria_challenge', JSON.stringify(readingChallenge));
    } catch (e) {
      console.error(e);
    }
  }, [readingChallenge]);

  useEffect(() => {
    try {
      localStorage.setItem('liria_saved_quotes', JSON.stringify(savedQuotes));
    } catch (e) {
      console.error(e);
    }
  }, [savedQuotes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Currently reading primary book
  const currentReadingBook =
    books.find((b) => b.id === 'biblioteca-meia-noite') ||
    books.find((b) => b.shelf === 'lendo') ||
    books[0];

  // Handlers
  const handleUpdatePage = (bookId: string, newPage: number, note?: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const isDone = newPage >= b.totalPages;
          return {
            ...b,
            currentPage: newPage,
            diaryNote: note || b.diaryNote,
            shelf: isDone ? 'lidos' : b.shelf,
          };
        }
        return b;
      })
    );
    showToast('Progresso de leitura salvo!');
  };

  const handleCompleteBook = (book: Book) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === book.id ? { ...b, currentPage: b.totalPages, shelf: 'lidos' } : b))
    );
    setReadingChallenge((prev) => {
      const nextCompleted = prev.completed + 1;
      return {
        ...prev,
        completed: nextCompleted,
        percentage: Math.min(100, Math.round((nextCompleted / prev.total) * 100)),
      };
    });
    showToast(`Parabéns! Leitura de "${book.title}" concluída com sucesso! 🎉`);
  };

  const handleUpdateShelf = (bookId: string, newShelf: ShelfType) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          return {
            ...b,
            shelf: newShelf,
            currentPage: newShelf === 'lidos' ? b.totalPages : b.currentPage,
          };
        }
        return b;
      })
    );
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, shelf: newShelf } : null));
    }
    showToast('Status atualizado na estante.');
  };

  const handleUpdateUserRating = (bookId: string, rating: number) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, userRating: rating } : b))
    );
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, userRating: rating } : null));
    }
    showToast(`Sua avaliação de ${rating} estrelas foi salva!`);
  };

  const handleToggleFavoriteBook = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const nextFav = !b.isFavorite;
          showToast(nextFav ? 'Adicionado aos seus favoritos ❤️' : 'Removido dos favoritos.');
          return { ...b, isFavorite: nextFav };
        }
        return b;
      })
    );
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleRemoveBook = (bookId: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(null);
    }
    showToast('Livro removido da sua estante.');
  };

  const handleAddBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
    showToast(`"${newBook.title}" foi adicionado com sucesso!`);
  };

  const handlePublishReview = (newReview: Partial<Review>) => {
    const fullReview: Review = {
      id: `rev-${Date.now()}`,
      bookId: newReview.bookId || '',
      bookTitle: newReview.bookTitle || '',
      bookAuthor: newReview.bookAuthor || '',
      bookCover: newReview.bookCover || '',
      authorName: USER_PROFILE.name,
      authorUsername: USER_PROFILE.username,
      authorAvatar: USER_PROFILE.avatar,
      badge: 'Minha Resenha',
      rating: newReview.rating || 5,
      timeAgo: 'agora mesmo',
      quote: newReview.quote,
      content: newReview.content || '',
      likesCount: 1,
      commentsCount: 0,
      isLiked: true,
      hasSpoiler: newReview.hasSpoiler,
      spoilerChapter: newReview.spoilerChapter,
      type: 'review',
      tags: newReview.tags,
    };

    setReviews([fullReview, ...reviews]);
    if (newReview.bookId && newReview.rating) {
      handleUpdateUserRating(newReview.bookId, newReview.rating);
    }
    showToast('Sua resenha foi compartilhada com a comunidade Líria!');
  };

  const handleBookmarkQuote = (quote: string, bookTitle: string) => {
    const exists = savedQuotes.some((sq) => sq.quote === quote);
    if (exists) {
      setSavedQuotes((prev) => prev.filter((sq) => sq.quote !== quote));
      showToast('Citação removida dos salvos.');
    } else {
      setSavedQuotes((prev) => [{ quote, bookTitle }, ...prev]);
      showToast('Citação guardada no seu perfil! 🔖');
    }
  };

  const openShare = (title: string, subtitle?: string, quote?: string) => {
    setShareModal({
      isOpen: true,
      title,
      subtitle,
      quote,
    });
  };

  const openComments = (postTitle: string) => {
    setCommentsModal({
      isOpen: true,
      postTitle,
    });
  };

  const renderCurrentScreen = () => {
    if (selectedBook) {
      return (
        <BookDetailModal
          book={selectedBook}
          communityReviews={reviews}
          onBack={() => setSelectedBook(null)}
          onOpenWriteReview={(b) => setReviewModalBook(b)}
          onUpdateShelf={handleUpdateShelf}
          onUpdateUserRating={handleUpdateUserRating}
          onToggleFavoriteBook={handleToggleFavoriteBook}
          onOpenShare={openShare}
          onOpenComments={openComments}
        />
      );
    }

    switch (currentTab) {
      case 'inicio':
        return (
          <HomeScreen
            readingChallenge={readingChallenge}
            currentBook={currentReadingBook}
            reviews={reviews}
            onSelectBook={(b) => setSelectedBook(b)}
            onOpenLogModal={(b) => setReviewModalBook(b || currentReadingBook)}
            onOpenUpdatePageModal={(b) => setUpdateProgressBook(b)}
            onViewAllReading={() => setCurrentTab('estante')}
            onOpenStreakModal={() => setStreakModalOpen(true)}
            onOpenComments={openComments}
            onOpenShare={openShare}
            onBookmarkQuote={handleBookmarkQuote}
          />
        );
      case 'estante':
        return (
          <BookshelfScreen
            books={books}
            onSelectBook={(b) => setSelectedBook(b)}
            onOpenUpdatePageModal={(b) => setUpdateProgressBook(b)}
            onCompleteBook={handleCompleteBook}
            onOpenAddBookModal={() => setShowAddBookModal(true)}
            onOpenOptions={(b) => setBookOptionsModalBook(b)}
            onOpenAnnualReport={() => setAnnualReportOpen(true)}
          />
        );
      case 'explorar':
        return (
          <ExploreScreen
            books={books}
            onSelectBook={(b) => setSelectedBook(b)}
            onBookmarkQuote={handleBookmarkQuote}
            onOpenClubChat={(name) => openComments(`Debate do ${name}`)}
          />
        );
      case 'perfil':
        return (
          <ProfileScreen
            books={books}
            userReviews={reviews.filter((r) => r.authorUsername === '@marinaleituras')}
            savedQuotes={savedQuotes}
            onSelectBook={(b) => setSelectedBook(b)}
            isMobileFrameMode={isMobileFrameMode}
            onToggleMobileFrame={() => setIsMobileFrameMode(!isMobileFrameMode)}
            onOpenStreakModal={() => setStreakModalOpen(true)}
            onOpenAnnualReport={() => setAnnualReportOpen(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EBEB] flex flex-col items-center justify-start text-[#2D141E] antialiased">
      {/* Top Banner when on desktop to allow framing toggle */}
      <div className="w-full max-w-lg hidden sm:flex items-center justify-between px-4 py-2 text-xs text-[#7A5B66]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#931548]" />
          <span className="font-semibold text-[#8E1644]">Líria App</span>
        </div>
        <button
          onClick={() => setIsMobileFrameMode(!isMobileFrameMode)}
          className="flex items-center gap-1 hover:text-[#931548] font-medium cursor-pointer"
        >
          {isMobileFrameMode ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span>Expandir tela</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Moldura de Celular</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: Mobile phone viewport emulation or fluid responsive */}
      <div
        className={`w-full bg-[#FAF4F4] min-h-screen flex flex-col transition-all relative ${
          isMobileFrameMode
            ? 'max-w-[420px] my-4 rounded-[42px] border-[10px] border-[#2C1820] shadow-2xl overflow-hidden ring-1 ring-black/10'
            : 'max-w-lg shadow-sm'
        }`}
      >
        {/* iPhone Speaker Notch in Frame Mode */}
        {isMobileFrameMode && (
          <div className="w-full h-6 bg-[#2C1820] flex items-center justify-center shrink-0">
            <div className="w-20 h-3.5 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#111] mr-3" />
              <div className="w-10 h-1 bg-[#1a1a1a] rounded-full" />
            </div>
          </div>
        )}

        {/* Global Header (shown when not viewing book detail) */}
        {!selectedBook && (
          <Header
            onOpenSearch={() => setShowSearchModal(true)}
            onOpenProfile={() => setCurrentTab('perfil')}
          />
        )}

        {/* Active Screen Content */}
        <main className="flex-1 w-full relative">{renderCurrentScreen()}</main>

        {/* Global Bottom Navigation Bar (hidden inside detail or review modal) */}
        {!selectedBook && (
          <BottomNav currentTab={currentTab} onChangeTab={(t) => setCurrentTab(t)} />
        )}

        {/* iPhone Home Indicator Bar in Frame Mode */}
        {isMobileFrameMode && (
          <div className="w-full h-5 bg-white/80 flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-[#2C1820]/30 rounded-full" />
          </div>
        )}
      </div>

      {/* Modals & Dialogs */}
      {reviewModalBook && (
        <ReviewModal
          book={reviewModalBook}
          onClose={() => setReviewModalBook(null)}
          onSubmitReview={handlePublishReview}
        />
      )}

      {updateProgressBook && (
        <UpdateProgressModal
          book={updateProgressBook}
          onClose={() => setUpdateProgressBook(null)}
          onSaveProgress={handleUpdatePage}
        />
      )}

      {showAddBookModal && (
        <AddBookModal
          onClose={() => setShowAddBookModal(false)}
          onAddBook={handleAddBook}
        />
      )}

      {showSearchModal && (
        <SearchModal
          books={books}
          onClose={() => setShowSearchModal(false)}
          onSelectBook={(b) => setSelectedBook(b)}
        />
      )}

      {streakModalOpen && (
        <StreakModal
          days={USER_PROFILE.readingStreakDays}
          onClose={() => setStreakModalOpen(false)}
        />
      )}

      {annualReportOpen && (
        <AnnualReportModal onClose={() => setAnnualReportOpen(false)} />
      )}

      {bookOptionsModalBook && (
        <BookOptionsModal
          book={bookOptionsModalBook}
          onClose={() => setBookOptionsModalBook(null)}
          onUpdateShelf={handleUpdateShelf}
          onToggleFavorite={handleToggleFavoriteBook}
          onOpenUpdatePage={(b) => setUpdateProgressBook(b)}
          onOpenReview={(b) => setReviewModalBook(b)}
          onRemoveBook={handleRemoveBook}
        />
      )}

      {commentsModal.isOpen && (
        <CommentsModal
          postTitle={commentsModal.postTitle}
          onClose={() => setCommentsModal({ isOpen: false, postTitle: '' })}
        />
      )}

      {shareModal.isOpen && (
        <ShareModal
          title={shareModal.title}
          subtitle={shareModal.subtitle}
          quote={shareModal.quote}
          onClose={() => setShareModal({ isOpen: false, title: '' })}
        />
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#34111E] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
