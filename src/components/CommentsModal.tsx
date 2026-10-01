import React, { useState } from 'react';
import { X, Send, Heart, MessageSquare } from 'lucide-react';
import { USER_PROFILE } from '../data/mockData';

export interface CommentItem {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  text: string;
  timeAgo: string;
  likesCount: number;
  isLiked?: boolean;
}

interface CommentsModalProps {
  postTitle: string;
  onClose: () => void;
  initialComments?: CommentItem[];
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  postTitle,
  onClose,
  initialComments = [],
}) => {
  const [comments, setComments] = useState<CommentItem[]>(() => {
    if (initialComments.length > 0) return initialComments;
    return [
      {
        id: 'c-1',
        authorName: 'Camila Rocha',
        authorUsername: '@camilalendo',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        text: 'Concordo em cada palavra! Essa cena me destruiu emocionalmente.',
        timeAgo: 'há 1h',
        likesCount: 8,
        isLiked: false,
      },
      {
        id: 'c-2',
        authorName: 'Rodrigo Paiva',
        authorUsername: '@rodrigo.books',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        text: 'A escrita é primorosa, uma das melhores leituras do meu ano com certeza.',
        timeAgo: 'há 35 min',
        likesCount: 3,
        isLiked: true,
      },
    ];
  });

  const [newComment, setNewComment] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added: CommentItem = {
      id: `c-${Date.now()}`,
      authorName: USER_PROFILE.name,
      authorUsername: USER_PROFILE.username,
      authorAvatar: USER_PROFILE.avatar,
      text: newComment.trim(),
      timeAgo: 'agora mesmo',
      likesCount: 0,
      isLiked: false,
    };

    setComments((prev) => [...prev, added]);
    setNewComment('');
  };

  const toggleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likesCount: isLiked ? c.likesCount + 1 : c.likesCount - 1,
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 border border-[#F4DEE5] shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F7E6EC]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#931548]" />
            <div>
              <h3 className="font-serif font-bold text-base text-[#34111E]">Comentários</h3>
              <p className="text-[11px] text-[#7A5B66] truncate max-w-[240px]">{postTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#876774] hover:bg-[#FDF0F4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-2xl bg-[#FFF8FA] border border-[#F6DEE5] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={c.authorAvatar}
                    alt={c.authorName}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#FCE3EB]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#34111E]">{c.authorName}</span>
                    <span className="text-[10px] text-[#9A7A85] ml-1.5">{c.timeAgo}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(c.id)}
                  className={`flex items-center gap-1 text-[11px] active:scale-95 transition-transform ${
                    c.isLiked ? 'text-[#931548] font-bold' : 'text-[#876774]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${c.isLiked ? 'fill-[#931548]' : ''}`} />
                  <span className="tabular-nums">{c.likesCount}</span>
                </button>
              </div>

              <p className="text-xs text-[#4A2D37] leading-relaxed pl-9">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-[#F8EAEF]">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Deixe sua impressão literária..."
            className="flex-1 text-xs text-[#34111E] p-2.5 px-3.5 rounded-2xl border border-[#F4DEE5] bg-[#FFF8FA] focus:outline-none focus:ring-2 focus:ring-[#931548]/30"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="p-2.5 rounded-2xl bg-[#931548] text-white hover:bg-[#7D0E3B] disabled:opacity-40 active:scale-95 transition-all shadow-xs"
          >
            <Send className="w-4 h-4 fill-current" />
          </button>
        </form>
      </div>
    </div>
  );
};
