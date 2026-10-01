import React, { useState } from 'react';
import { X, Search, Plus, BookPlus, Sparkles, Check } from 'lucide-react';
import { Book, ShelfType } from '../types';
import { COVERS } from '../data/mockData';

interface AddBookModalProps {
  onClose: () => void;
  onAddBook: (newBook: Book) => void;
}

export const AddBookModal: React.FC<AddBookModalProps> = ({ onClose, onAddBook }) => {
  const [tab, setTab] = useState<'catalog' | 'custom'>('catalog');
  const [search, setSearch] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalPages, setTotalPages] = useState<number>(320);
  const [shelf, setShelf] = useState<ShelfType>('quero-ler');
  const [genre, setGenre] = useState('Ficção');

  const catalogSuggestions: Omit<Book, 'id'>[] = [
    {
      title: 'Tudo é Rio',
      author: 'Carla Madeira',
      coverUrl: COVERS.evelynHugo,
      publisher: 'Record',
      year: 2021,
      totalPages: 210,
      currentPage: 0,
      synopsis: 'A história do casal Dalva e Venâncio e o desfecho arrebatador de suas vidas.',
      genres: ['Ficção', 'Romance', 'Nacional'],
      shelf: 'quero-ler',
      rating: 4.8,
    },
    {
      title: 'A Redoma de Vidro',
      author: 'Sylvia Plath',
      coverUrl: COVERS.pacienteSilenciosa,
      publisher: 'Globo Livros',
      year: 1963,
      totalPages: 288,
      currentPage: 0,
      synopsis: 'O clássico romance autobiográfico sobre a juventude e conflitos de Esther Greenwood.',
      genres: ['Clássicos', 'Drama'],
      shelf: 'quero-ler',
      rating: 4.6,
    },
    {
      title: 'Torto Arado',
      author: 'Itamar Vieira Junior',
      coverUrl: COVERS.circe,
      publisher: 'Todavia',
      year: 2019,
      totalPages: 264,
      currentPage: 0,
      synopsis: 'Uma saga emocionante de terra, afeto e ancestralidade no sertão baiano.',
      genres: ['Ficção', 'Nacional'],
      shelf: 'quero-ler',
      rating: 4.9,
    },
    {
      title: 'Klara e o Sol',
      author: 'Kazuo Ishiguro',
      coverUrl: COVERS.bibliotecaMeiaNoite,
      publisher: 'Companhia das Letras',
      year: 2021,
      totalPages: 336,
      currentPage: 0,
      synopsis: 'Uma obra primorosa sobre o amor, a humanidade e a inteligência artificial.',
      genres: ['Ficção Científica', 'Drama'],
      shelf: 'quero-ler',
      rating: 4.4,
    },
  ];

  const filteredCatalog = catalogSuggestions.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCatalogBook = (item: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...item,
      id: `book-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      shelf,
      currentPage: shelf === 'lidos' ? item.totalPages : 0,
    };
    onAddBook(newBook);
    onClose();
  };

  const handleAddCustomBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      coverUrl: COVERS.evelynHugo,
      totalPages: Number(totalPages) || 300,
      currentPage: shelf === 'lidos' ? Number(totalPages) || 300 : 0,
      synopsis: 'Adicionado manualmente à estante Líria.',
      genres: [genre],
      shelf,
      rating: 5,
    };
    onAddBook(newBook);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 border border-[#F4DEE5] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F7E6EC]">
          <div className="flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-[#931548]" />
            <h3 className="font-serif font-bold text-lg text-[#34111E]">Adicionar à Estante</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#876774] hover:bg-[#FDF0F4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Shelf Selector */}
        <div>
          <label className="text-xs font-semibold text-[#7A5B66] block mb-1.5">
            Adicionar à qual estante?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'quero-ler', label: 'Quero Ler' },
              { id: 'lendo', label: 'Lendo Agora' },
              { id: 'lidos', label: 'Já Lido' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setShelf(s.id as ShelfType)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                  shelf === s.id
                    ? 'bg-[#931548] text-white border-[#931548] shadow-xs'
                    : 'bg-white text-[#7A5B66] border-[#F4DEE5] hover:bg-[#FFF5F8]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab switch: Catalog vs Custom */}
        <div className="flex items-center gap-2 p-1 bg-[#F5E2E8] rounded-2xl text-xs font-medium">
          <button
            onClick={() => setTab('catalog')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              tab === 'catalog' ? 'bg-white text-[#931548] font-bold shadow-xs' : 'text-[#7A5B66]'
            }`}
          >
            Sugestões & Catálogo
          </button>
          <button
            onClick={() => setTab('custom')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              tab === 'custom' ? 'bg-white text-[#931548] font-bold shadow-xs' : 'text-[#7A5B66]'
            }`}
          >
            Cadastrar Manualmente
          </button>
        </div>

        {tab === 'catalog' ? (
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A7A85]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar nos livros populares..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#FFF8FA] border border-[#F4DEE5] text-xs text-[#34111E] focus:outline-none focus:ring-2 focus:ring-[#931548]/30"
              />
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {filteredCatalog.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF8FA] border border-[#F6DEE5] hover:bg-[#FFF0F4] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-10 h-14 object-cover rounded-lg shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#34111E] line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#7A5B66]">{item.author}</p>
                      <span className="text-[10px] text-[#931548]">{item.totalPages} páginas</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddCatalogBook(item)}
                    className="p-2 rounded-xl bg-[#931548] text-white hover:bg-[#780D37] active:scale-95 transition-all text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleAddCustomBook} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#7A5B66] block mb-1">Título do Livro</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Dom Casmurro"
                className="w-full text-xs text-[#34111E] p-2.5 rounded-2xl border border-[#F4DEE5] bg-[#FFF8FA] focus:outline-none focus:ring-2 focus:ring-[#931548]/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#7A5B66] block mb-1">Autor(a)</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ex: Machado de Assis"
                className="w-full text-xs text-[#34111E] p-2.5 rounded-2xl border border-[#F4DEE5] bg-[#FFF8FA] focus:outline-none focus:ring-2 focus:ring-[#931548]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#7A5B66] block mb-1">Total de Páginas</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={totalPages}
                  onChange={(e) => setTotalPages(Number(e.target.value))}
                  className="w-full text-xs text-[#34111E] p-2.5 rounded-2xl border border-[#F4DEE5] bg-[#FFF8FA] focus:outline-none focus:ring-2 focus:ring-[#931548]/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#7A5B66] block mb-1">Gênero</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full text-xs text-[#34111E] p-2.5 rounded-2xl border border-[#F4DEE5] bg-[#FFF8FA] focus:outline-none"
                >
                  <option value="Romance">Romance</option>
                  <option value="Ficção">Ficção</option>
                  <option value="Clássicos">Clássicos</option>
                  <option value="Suspense">Suspense</option>
                  <option value="Fantasia">Fantasia</option>
                  <option value="Poesia">Poesia</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-2xl bg-[#931548] text-white text-xs font-semibold hover:bg-[#7D0E3B] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              Salvar na Estante
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
