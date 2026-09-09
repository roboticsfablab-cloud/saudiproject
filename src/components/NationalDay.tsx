import { Sparkles, Heart } from 'lucide-react';

const nationalBg =
  'https://images.pexels.com/photos/10961006/pexels-photo-10961006.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function NationalDay() {
  return (
    <section id="national" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={nationalBg} alt="جبال السعودية" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-saudi-900/85 via-mountain-900/75 to-mountain-900/85" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-saudi-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sea-500/15 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-sand-300" />
            <span className="text-sm font-semibold text-sand-100">اليوم الوطني السعودي</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
            وطننا...
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-sand-300 to-sea-300">
              تنوّع يصنع المستقبل
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10">
            تمتد أرض المملكة من رمال الصحراء الذهبية إلى قمم الجبال الشامخة، ومن واحات
            النخيل الباسقة إلى شواطئ البحر الأزرق. تنوّعٌ طبيعيٌّ غنيٌّ يستحق أن نكتشفه
            ونحافظ عليه، ويأتي الذكاء الاصطناعي ليكون أداةً نحو فهم أعمق لطبيعة وطننا
            وحمايتها لأجيالٍ قادمة.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12">
            <div className="text-center">
              <div className="font-display text-3xl sm:text-5xl font-extrabold text-sand-300 mb-1">
                +3M
              </div>
              <div className="text-sm text-white/60">نخلة في الأحساء</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-5xl font-extrabold text-sea-300 mb-1">
                1800
              </div>
              <div className="text-sm text-white/60">كم ساحل البحر الأحمر</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-5xl font-extrabold text-saudi-300 mb-1">
                3000
              </div>
              <div className="text-sm text-white/60">متر أعلى قمة جبل</div>
            </div>
          </div>

          {/* Heart badge */}
          <div className="mt-12 inline-flex items-center gap-2 text-sand-200/80">
            <Heart className="w-4 h-4 fill-saudi-400 text-saudi-400" />
            <span className="text-sm">صنع بحبٍّ لوطننا</span>
          </div>
        </div>
      </div>
    </section>
  );
}
