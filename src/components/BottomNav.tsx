import React from 'react';
import { BookOpen, Library, Compass, User } from 'lucide-react';

export type TabType = 'inicio' | 'estante' | 'explorar' | 'perfil';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs = [
    { id: 'inicio' as TabType, label: 'Início', icon: BookOpen },
    { id: 'estante' as TabType, label: 'Estante', icon: Library },
    { id: 'explorar' as TabType, label: 'Explorar', icon: Compass },
    { id: 'perfil' as TabType, label: 'Perfil', icon: User },
  ];

  return (
    <nav
      aria-label="Navegação Principal"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F2DEE4] max-w-lg mx-auto"
    >
      <div className="grid grid-cols-4 items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
                isActive ? 'text-[#931548]' : 'text-[#876774] hover:text-[#421A28]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#931548]" />
                )}
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-1 ${
                  isActive ? 'font-semibold text-[#931548]' : 'text-[#876774]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
