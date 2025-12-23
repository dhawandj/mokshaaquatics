
import React, { useState } from 'react';
import { identifyFish } from '../services/geminiService';

const FishID: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const res = await identifyFish(base64Data);
      setResult(res || "Could not identify this species. Try a clearer photo.");
    } catch (error) {
      setResult("Error identifying image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Fish Species ID</h2>
        <p className="text-slate-500">Snap a photo of any fish to identify it instantly.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-6">
        <div className="relative aspect-video bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-200">
          {image ? (
            <>
              <img src={image} alt="Preview" className="w-full h-full object-contain" />
              <button 
                onClick={() => { setImage(null); setResult(null); }}
                className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </>
          ) : (
            <label className="cursor-pointer flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-camera text-2xl"></i>
              </div>
              <span className="text-slate-400 font-medium">Upload or Take Photo</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          )}
        </div>

        {image && !result && (
          <button
            onClick={handleIdentify}
            disabled={loading}
            className="w-full py-4 accent-gradient text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 active:scale-95 transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-notch animate-spin"></i> Analyzing...
              </span>
            ) : "Identify Species"}
          </button>
        )}

        {result && (
          <div className="animate-fade-in space-y-4">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-circle-check"></i> Analysis Result
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
            </div>
            <button
              onClick={() => { setImage(null); setResult(null); }}
              className="w-full py-3 text-slate-500 font-semibold border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              Identify Another
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
            <i className="fa-solid fa-dna"></i>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Visual Match</h4>
            <p className="text-slate-500 text-[10px]">High accuracy patterns recognition.</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
            <i className="fa-solid fa-kit-medical"></i>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Health Insights</h4>
            <p className="text-slate-500 text-[10px]">Identifies common stress markers.</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-start gap-3">
          <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center shrink-0">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Plant Compatible</h4>
            <p className="text-slate-500 text-[10px]">Checks for herbivore behaviors.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishID;
