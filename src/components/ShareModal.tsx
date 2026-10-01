import React, { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles, MessageCircle, Instagram } from 'lucide-react';
import { LiriaLogo } from './LiriaLogo';

interface ShareModalProps {
  title: string;
  subtitle?: string;
  quote?: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  title,
  subtitle,
  quote,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F7E6EC]">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#931548]" />
            <h3 className="font-serif font-bold text-base text-[#34111E]">Compartilhar</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#876774] hover:bg-[#FDF0F4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Share Card Preview */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF5F8] via-[#FFF0F4] to-[#FCE6EE] border border-[#F6DCE4] space-y-2.5 text-center shadow-xs">
          <LiriaLogo size={18} showText={true} className="justify-center" />
          {quote ? (
            <p className="font-serif italic text-sm text-[#5C142A] leading-relaxed py-1">
              "{quote}"
            </p>
          ) : (
            <h4 className="font-serif font-bold text-sm text-[#34111E]">{title}</h4>
          )}
          <p className="text-[11px] text-[#8E1644] font-medium">{subtitle || title}</p>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 rounded-2xl bg-[#FFF0F4] border border-[#F6DCE4] text-[#931548] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#FCE6EE] active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Link copiado para a área de transferência!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Link Direto</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-2xl bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#25D366]/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-2xl bg-[#E1306C]/10 text-[#C13584] border border-[#E1306C]/30 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#E1306C]/20 active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              <span>Story</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
