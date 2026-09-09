import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'about', label: 'كيف يعمل' },
  { id: 'classifier', label: 'الذكاء الاصطناعي' },
  { id: 'categories', label: 'البيئات الطبيعية' },
  { id: 'learn', label: 'كيف تعلّمنا' },
  { id: 'national', label: 'اليوم الوطني' },
  { id: 'quiz', label: 'الاختبار' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-md py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saudi-500 to-sea-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <span className={`block font-display font-extrabold text-lg leading-tight ${scrolled ? 'text-mountain-800' : 'text-white'}`}>
              طبيعة السعودية
            </span>
            <span className={`block text-xs leading-tight ${scrolled ? 'text-saudi-600' : 'text-sand-200'}`}>
              بالذكاء الاصطناعي
            </span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-saudi-50 hover:text-saudi-600 ${
                scrolled ? 'text-mountain-700' : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-mountain-700' : 'text-white'}`}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="section-container py-4 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-lg mt-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-3 rounded-xl text-right text-sm font-semibold text-mountain-700 hover:bg-saudi-50 hover:text-saudi-600 transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
