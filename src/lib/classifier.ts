/**
 * Bridge between the Teachable Machine image model in /public/model and the UI.
 *
 * The model is a Keras layers model, so plain @tensorflow/tfjs can load it -
 * we reproduce Teachable Machine's own preprocessing by hand instead of
 * pulling in @teachablemachine/image, whose pinned tfjs 1.x conflicts with the
 * 4.x build Vite bundles:
 *
 *   centre-crop to a square -> resize to the model's input size -> scale to [-1, 1]
 *
 * tfjs and the 2MB of weights are loaded through a dynamic import so visitors
 * who only scroll past the classifier never pay for them.
 */
import type * as TF from '@tensorflow/tfjs';
import { natureCategories, type NatureCategory } from '@/data/natureData';

/** BASE_URL keeps the paths correct if the site is ever served from a subpath. */
const MODEL_BASE = `${import.meta.env.BASE_URL}model/`;

/**
 * Minimum probability before we name an environment.
 *
 * The model was trained on two classes only, so a photo of mountains or the
 * sea still comes back with a winner - softmax always sums to 1. Below this
 * bar we say "not recognised" rather than confidently mislabel the picture.
 */
export const CONFIDENCE_THRESHOLD = 0.6;

export type ClassScore = {
  /** Label exactly as written in metadata.json. */
  label: string;
  /** Matching entry in natureData.ts, or null if the label maps to nothing. */
  category: NatureCategory | null;
  /** Softmax probability, 0..1. */
  probability: number;
};

export type Classification = {
  /** Every class, highest probability first. */
  scores: ClassScore[];
  top: ClassScore;
  /** Whether the top score clears CONFIDENCE_THRESHOLD. */
  confident: boolean;
};

/**
 * Labels are authored in Teachable Machine, categories live in natureData.ts.
 * The aliases cover the classes the current model knows plus the two it does
 * not, so retraining with mountains/sea needs no code change here - just drop
 * the new model.json, weights.bin and metadata.json into public/model/.
 */
const LABEL_ALIASES: Record<string, string> = {
  'palm tree': 'palm',
  'palm trees': 'palm',
  palm: 'palm',
  'نخلة': 'palm',
  'النخيل': 'palm',
  desert: 'desert',
  'الصحراء': 'desert',
  mountain: 'mountains',
  mountains: 'mountains',
  'الجبال': 'mountains',
  sea: 'sea',
  ocean: 'sea',
  'البحر': 'sea',
};

/** Resolves a model label to the site category that carries its Arabic copy. */
export function categoryForLabel(label: string): NatureCategory | null {
  const trimmed = label.trim();
  const id = LABEL_ALIASES[trimmed.toLowerCase()] ?? trimmed.toLowerCase();
  return natureCategories.find((c) => c.id === id || c.name === trimmed) ?? null;
}

type Metadata = { labels: string[]; imageSize?: number };

let metadataPromise: Promise<Metadata> | null = null;

/**
 * Fetches just metadata.json (a few hundred bytes) so the UI can list the
 * classes the model knows without downloading tfjs or the weights.
 */
export function loadMetadata(): Promise<Metadata> {
  if (!metadataPromise) {
    metadataPromise = fetch(`${MODEL_BASE}metadata.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`metadata.json responded ${res.status}`);
        return res.json() as Promise<Metadata>;
      })
      .catch((err) => {
        metadataPromise = null; // don't cache a failure - allow a retry
        throw err;
      });
  }
  return metadataPromise;
}

type LoadedModel = {
  tf: typeof TF;
  model: TF.LayersModel;
  labels: string[];
  inputSize: number;
};

let modelPromise: Promise<LoadedModel> | null = null;

/** Loads tfjs + the model once and reuses it for every later prediction. */
export function loadClassifier(): Promise<LoadedModel> {
  if (!modelPromise) {
    modelPromise = (async () => {
      const [tf, metadata] = await Promise.all([import('@tensorflow/tfjs'), loadMetadata()]);
      const model = await tf.loadLayersModel(`${MODEL_BASE}model.json`);
      // Input shape is [null, size, size, 3]; metadata.imageSize is the fallback.
      const size = model.inputs[0].shape[1];
      return {
        tf,
        model,
        labels: metadata.labels,
        inputSize: typeof size === 'number' ? size : (metadata.imageSize ?? 224),
      };
    })().catch((err) => {
      modelPromise = null;
      throw err;
    });
  }
  return modelPromise;
}

/** Decodes a data/object URL into an image element ready to be drawn. */
function decodeImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not decode the captured image'));
    img.src = src;
  });
}

/** Centre-crops to a square and resizes - the framing Teachable Machine uses. */
function cropToSquare(source: HTMLImageElement, size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context is unavailable');
  const { naturalWidth: w, naturalHeight: h } = source;
  const edge = Math.min(w, h);
  ctx.drawImage(source, (w - edge) / 2, (h - edge) / 2, edge, edge, 0, 0, size, size);
  return canvas;
}

/** Runs the model over a captured frame or uploaded photo. */
export async function classifyImage(src: string): Promise<Classification> {
  const [{ tf, model, labels, inputSize }, image] = await Promise.all([
    loadClassifier(),
    decodeImage(src),
  ]);

  const output = tf.tidy(() => {
    const input = tf.browser
      .fromPixels(cropToSquare(image, inputSize))
      .toFloat()
      .div(127.5)
      .sub(1)
      .expandDims(0);
    return model.predict(input) as TF.Tensor;
  });

  const probabilities = Array.from(await output.data());
  output.dispose();

  const scores = probabilities
    .map((probability, i) => {
      const label = labels[i] ?? `class ${i}`;
      return { label, category: categoryForLabel(label), probability };
    })
    .sort((a, b) => b.probability - a.probability);

  return {
    scores,
    top: scores[0],
    confident: scores[0].probability >= CONFIDENCE_THRESHOLD,
  };
}
