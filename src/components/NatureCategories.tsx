import { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { natureCategories, type NatureCategory } from '@/data/natureData';

export default function NatureCategories() {
  const [selected, setSelected] = useState<NatureCategory | null>(null);

  return (
    <section id="categories" className="py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sea-100 text-sea-700 text-sm font-bold mb-4">
            البيئات الطبيعية
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mountain-800 mb-4">
            أربع بيئات تشكّل طبيعة المملكة
          </h2>
          <p className="text-lg text-mountain-500 max-w-2xl mx-auto">
            تعرّف على البيئات الطبيعية التي يدرب عليها نموذج الذكاء الاصطناعي
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {natureCategories.map((cat) => (
            <div
              key={cat.id}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              onClick={() => setSelected(cat)}
            >
              {/* Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mountain-900/90 via-mountain-900/30 to-transparent" />

                {/* Emoji badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">
                  {cat.emoji}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="font-display text-2xl font-extrabold text-white mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-3">
                    {cat.shortDescription}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-sand-200 text-sm font-semibold group-hover:text-white transition-colors">
                    تعرّف أكثر
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mountain-900/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image header */}
            <div className="relative h-56 sm:h-64">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-mountain-900/80 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-5 flex items-center gap-3">
                <span className="text-4xl">{selected.emoji}</span>
                <h3 className="font-display text-3xl font-extrabold text-white">{selected.name}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <p className="text-mountain-600 leading-relaxed text-lg mb-6">
                {selected.fullDescription}
              </p>

              <div className="space-y-3">
                <h4 className="font-display text-sm font-bold text-mountain-400 uppercase tracking-wide">
                  معلومات سريعة
                </h4>
                {selected.facts.map((fact, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-sand-50 border border-sand-100"
                  >
                    <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-${selected.colorClass}-500`} />
                    <p className="text-mountain-600 text-sm leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
