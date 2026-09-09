import { useRef, useState, useCallback } from 'react';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  Sparkles,
  RotateCcw,
  Loader2,
  Cpu,
  AlertCircle,
  CheckCircle2,
  Gauge,
} from 'lucide-react';
import { natureCategories } from '@/data/natureData';

type ClassifierStatus = 'idle' | 'camera' | 'image' | 'analyzing' | 'result' | 'no-model';

type PredictionResult = {
  label: string;
  emoji: string;
  confidence: number;
  description: string;
  facts: string[];
};

export default function AIClassifier() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<ClassifierStatus>('idle');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ------------------------------------------------------------------ */
  /*  Future TensorFlow.js / Teachable Machine integration point        */
  /* ------------------------------------------------------------------ */
  //
  //  1. Add <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"> in index.html
  //  2. Add <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image"> in index.html
  //  3. Place the exported model files under  public/model/
  //         - model.json
  //         - weights.bin
  //         - metadata.json
  //
  //  Then uncomment the loader below and call it from handleAnalyze().
  //
  //  async function loadModel() {
  //    const URL = '/model/';
  //    const model = await window.tmImage.load(URL + 'model.json', URL + 'metadata.json');
  //    return model;
  //  }
  //
  //  async function predict(model, imageEl) {
  //    const prediction = await model.predict(imageEl);
  //    const top = prediction
  //      .map((p, i) => ({ ...p, category: natureCategories[i] }))
  //      .sort((a, b) => b.probability - a.probability)[0];
  //    return {
  //      label: top.category.name,
  //      emoji: top.category.emoji,
  //      confidence: Math.round(top.probability * 100),
  //      description: top.category.fullDescription,
  //      facts: top.category.facts,
  //    };
  //  }
  /* ------------------------------------------------------------------ */

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      setPreviewSrc(null);
      setResult(null);
      setStatus('camera');
      // Attach stream in next tick
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch {
      setError('تعذّر الوصول إلى الكاميرا. تأكد من السماح بالأذونات.');
      setStatus('idle');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewSrc(ev.target?.result as string);
      setResult(null);
      setStatus('image');
    };
    reader.readAsDataURL(file);
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    setPreviewSrc(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
    setStatus('image');
  };

  const handleAnalyze = async () => {
    // Model not yet integrated — show the "ready to connect" state.
    setStatus('analyzing');
    setResult(null);
    // Simulate brief processing delay for UX feedback only (no fake prediction)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('no-model');
  };

  const handleReset = () => {
    stopCamera();
    setPreviewSrc(null);
    setResult(null);
    setError(null);
    setStatus('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section
      id="classifier"
      className="py-24 bg-gradient-to-b from-white via-saudi-50/30 to-sand-50 relative overflow-hidden"
    >
      <div className="absolute top-20 left-0 w-80 h-80 bg-sea-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-saudi-100 rounded-full blur-3xl opacity-40" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-saudi-100 text-saudi-700 text-sm font-bold mb-4">
            <Cpu className="w-4 h-4" />
            جرّب الذكاء الاصطناعي
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mountain-800 mb-4">
            صف طبيعة السعودية للذكاء الاصطناعي
          </h2>
          <p className="text-lg text-mountain-500 max-w-2xl mx-auto">
            التقط صورة أو ارفعها، ثم دع النموذج يحللها ويخبرك بالبيئة التي يراها
          </p>
        </div>

        {/* Main card */}
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-mountain-100 overflow-hidden">
          {/* Card header */}
          <div className="px-6 py-5 bg-gradient-to-l from-mountain-800 to-mountain-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sand-300" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">مصنّف البيئات الطبيعية</h3>
                <p className="text-xs text-sand-200">نخلة • صحراء • جبال • بحر</p>
              </div>
            </div>
            {status !== 'idle' && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                إعادة
              </button>
            )}
          </div>

          {/* Preview area */}
          <div className="p-6 sm:p-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-mountain-50 border-2 border-dashed border-mountain-200 flex items-center justify-center">
              {/* Idle state */}
              {status === 'idle' && (
                <div className="text-center px-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-saudi-100 to-sea-100 flex items-center justify-center mb-4">
                    <ImageIcon className="w-10 h-10 text-saudi-400" />
                  </div>
                  <p className="text-mountain-400 font-semibold mb-1">لا توجد صورة بعد</p>
                  <p className="text-sm text-mountain-300">شغّل الكاميرا أو ارفع صورة للبدء</p>
                </div>
              )}

              {/* Camera live */}
              {status === 'camera' && (
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 ring-4 ring-inset ring-saudi-400/60 rounded-2xl pointer-events-none" />
                  <button
                    onClick={captureFrame}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-saudi-600 shadow-lg hover:bg-saudi-700 transition-all"
                  >
                    <Camera className="w-5 h-5" />
                    التقاط الصورة
                  </button>
                </>
              )}

              {/* Image preview */}
              {(status === 'image' || status === 'analyzing' || status === 'no-model' || status === 'result') && previewSrc && (
                <img src={previewSrc} alt="معاينة" className="absolute inset-0 w-full h-full object-cover" />
              )}

              {/* Analyzing overlay */}
              {status === 'analyzing' && (
                <div className="absolute inset-0 bg-mountain-900/60 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-sand-300 animate-spin mb-4" />
                  <p className="text-white font-bold text-lg">جارٍ تحليل الصورة...</p>
                  <p className="text-white/60 text-sm mt-1">يقوم النموذج بمعالجة الميزات البصرية</p>
                </div>
              )}

              {/* No-model state */}
              {status === 'no-model' && (
                <div className="absolute inset-0 bg-gradient-to-br from-mountain-900/90 to-saudi-900/90 backdrop-blur-sm flex flex-col items-center justify-center px-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-sand-300/20 flex items-center justify-center mb-4">
                    <Cpu className="w-8 h-8 text-sand-300" />
                  </div>
                  <p className="text-white font-bold text-xl mb-2">نموذج الذكاء الاصطناعي جاهز للتوصيل</p>
                  <p className="text-white/60 text-sm max-w-md leading-relaxed">
                    سيتم ربط نموذج TensorFlow.js / Teachable Machine المدرب على صور البيئات
                    السعودية لاحقًا. بمجرد التوصيل، ستظهر هنا نتيجة التصنيف ونسبة الثقة.
                  </p>
                  <div className="mt-5 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20">
                    <AlertCircle className="w-4 h-4 text-sand-300" />
                    <code className="text-xs text-sand-200 font-mono" dir="ltr">/model/model.json</code>
                  </div>
                </div>
              )}

              {/* Result overlay */}
              {status === 'result' && result && (
                <div className="absolute inset-0 bg-gradient-to-br from-mountain-900/90 to-saudi-900/90 backdrop-blur-sm flex flex-col items-center justify-center px-6 text-center">
                  <div className="text-5xl mb-3">{result.emoji}</div>
                  <p className="text-sand-300 text-sm font-semibold mb-1">النتيجة</p>
                  <p className="text-white font-display text-3xl font-extrabold mb-3">{result.label}</p>
                  <div className="w-full max-w-xs">
                    <div className="flex items-center justify-between text-white/70 text-sm mb-1.5">
                      <span className="flex items-center gap-1">
                        <Gauge className="w-4 h-4" />
                        درجة الثقة
                      </span>
                      <span className="font-bold text-sand-300">{result.confidence}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-saudi-400 to-sand-300 transition-all duration-1000"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              {status === 'idle' && (
                <>
                  <button onClick={startCamera} className="btn-primary flex-1 w-full sm:w-auto">
                    <Camera className="w-5 h-5" />
                    تشغيل الكاميرا
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary flex-1 w-full sm:w-auto"
                  >
                    <Upload className="w-5 h-5" />
                    رفع صورة
                  </button>
                </>
              )}

              {(status === 'image') && (
                <button onClick={handleAnalyze} className="btn-primary w-full">
                  <Sparkles className="w-5 h-5" />
                  حلّل الصورة
                </button>
              )}

              {status === 'no-model' && (
                <button onClick={handleReset} className="btn-secondary w-full">
                  <RotateCcw className="w-5 h-5" />
                  محاولة أخرى
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Result details */}
            {status === 'result' && result && (
              <div className="mt-6 animate-fade-in-up">
                <div className="flex items-start gap-3 p-5 rounded-2xl bg-saudi-50 border border-saudi-100">
                  <CheckCircle2 className="w-6 h-6 text-saudi-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-mountain-700 leading-relaxed mb-3">{result.description}</p>
                    <ul className="space-y-1.5">
                      {result.facts.map((fact, i) => (
                        <li key={i} className="text-sm text-mountain-500 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-saudi-400 mt-2 flex-shrink-0" />
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button onClick={handleReset} className="btn-secondary w-full mt-4">
                  <RotateCcw className="w-5 h-5" />
                  تحليل صورة أخرى
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info note */}
        <p className="text-center text-sm text-mountain-400 mt-6 max-w-xl mx-auto">
          يعتمد هذا القسم على نموذج تصنيف صور تم تدريبه على بيئات سعودية. سيتم تفعيل
          النموذج فور توصيله بالموقع.
        </p>
      </div>
    </section>
  );
}
