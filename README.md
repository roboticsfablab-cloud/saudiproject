# saudiproject

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-zxu867ov)

## نموذج تصنيف الصور (TensorFlow.js)

يعمل مصنّف البيئات في `src/components/AIClassifier.tsx` بالكامل داخل المتصفح — لا تُرسل أي صورة إلى خادم.

- **ملفات النموذج:** `public/model/` (`model.json`, `weights.bin`, `metadata.json`) — مُصدَّرة من Teachable Machine.
- **منطق التحميل والتنبؤ:** `src/lib/classifier.ts`.
- **المعالجة المسبقة:** اقتصاص مربّع من المنتصف ← تحجيم إلى مقاس مدخل النموذج ← تطبيع إلى المدى `[-1, 1]` (نفس ما يفعله Teachable Machine داخليًا).
- **حدّ الثقة:** `CONFIDENCE_THRESHOLD` في `src/lib/classifier.ts` (حاليًا 60%). تحت هذا الحد يعرض الموقع «لم أتعرّف على هذه البيئة» بدل تخمين خاطئ.

### تحديث النموذج

استبدل الملفات الثلاثة في `public/model/` بالتصدير الجديد. يقرأ الموقع الأصناف من `metadata.json` تلقائيًا، فلا حاجة لتعديل الكود عند إضافة أصناف جديدة — فقط تأكد أن كل تسمية موجودة في `LABEL_ALIASES` داخل `src/lib/classifier.ts` لتُربط ببطاقة المحتوى المناسبة في `src/data/natureData.ts`.

> مكتبة `@tensorflow/tfjs` تُحمَّل عبر `import()` ديناميكي، فلا يُنزّلها الزائر إلا عند فتح الكاميرا أو رفع صورة.
