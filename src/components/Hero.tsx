import { ArrowLeft, Sparkles, CalendarHeart } from 'lucide-react';

const heroBg =
  'https://images.pexels.com/photos/33442715/pexels-photo-33442715.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="صحراء السعودية"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mountain-900/70 via-mountain-900/50 to-mountain-900/80" />
        <div className="absolute inset-0 bg-gradient-to-l from-saudi-900/40 via-transparent to-sea-900/40" />
      </div>

      {/* Decorative floating orbs */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-saudi-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-sea-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 section-container text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
          <CalendarHeart className="w-4 h-4 text-sand-300" />
          <span className="text-sm font-semibold text-sand-100">
            مشروع تقني بمناسبة اليوم الوطني السعودي
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up">
          اكتشف طبيعة السعودية
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-l from-sand-300 via-sand-200 to-sea-300">
            بالذكاء الاصطناعي
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-sand-100/90 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          هل يستطيع الذكاء الاصطناعي أن يتعرف على طبيعة المملكة؟
        </p>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          يجمع هذا المشروع بين الذكاء الاصطناعي والرؤية الحاسوبية والبيئات الطبيعية
          في المملكة العربية السعودية، ليأخذك في رحلة تفاعلية تكتشف فيها كيف تتعلم
          الآلة التمييز بين النخيل والصحراء والجبال والبحر.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => scrollTo('classifier')}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-mountain-900 bg-gradient-to-l from-sand-300 to-sand-200 shadow-2xl shadow-sand-500/30 hover:shadow-sand-400/50 hover:-translate-y-1 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            جرّب الذكاء الاصطناعي
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            كيف يعمل المشروع؟
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
