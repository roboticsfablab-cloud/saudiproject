import { Camera, BrainCircuit, ScanLine, GraduationCap } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    number: '1',
    title: 'التقط صورة',
    description: 'استخدم الكاميرا أو ارفع صورة من جهازك لأي بيئة طبيعية سعودية',
    color: 'from-sand-400 to-sand-600',
  },
  {
    icon: BrainCircuit,
    number: '2',
    title: 'الذكاء الاصطناعي يحلل الصورة',
    description: 'يقوم النموذج بتحليل الصورة واستخراج الميزات البصرية المميزة',
    color: 'from-saudi-400 to-saudi-600',
  },
  {
    icon: ScanLine,
    number: '3',
    title: 'النموذج يتعرف على البيئة',
    description: 'يصنف النموذج الصورة إلى نخلة أو صحراء أو جبال أو بحر',
    color: 'from-sea-400 to-sea-600',
  },
  {
    icon: GraduationCap,
    number: '4',
    title: 'تحصل على النتيجة والمعلومة',
    description: 'تظهر النتيجة مع نسبة الثقة ومعلومات تعليمية عن البيئة المكتشفة',
    color: 'from-mountain-400 to-mountain-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-sand-50 to-white relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saudi-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sea-50 rounded-full blur-3xl opacity-50" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-saudi-100 text-saudi-700 text-sm font-bold mb-4">
            كيف يعمل المشروع؟
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mountain-800 mb-4">
            أربع خطوات بسيطة نحو اكتشاف البيئة
          </h2>
          <p className="text-lg text-mountain-500 max-w-2xl mx-auto">
            من التقاط الصورة إلى الحصول على المعلومة، رحلة تفاعلية يسهل على الجميع فهمها
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-mountain-100"
              >
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-mountain-800 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display text-xl font-bold text-mountain-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-mountain-500 leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -left-3 w-6 h-0.5 bg-mountain-200" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
