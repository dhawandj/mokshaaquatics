
import React, { useState } from 'react';
import { generateTankConcept } from '../services/geminiService';

const TankGenerator: React.FC = () => {
  const [style, setStyle] = useState('Iwagumi Japanese style with lush green grass and large volcanic rocks');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const styles = [
    { name: 'Iwagumi', prompt: 'Japanese Iwagumi style with minimalist rocks and hairgrass carpet' },
    { name: 'Dutch Style', prompt: 'Lush Dutch planted style with vibrant red and green stems and terraced layout' },
    { name: 'Blackwater', prompt: 'Amazonian blackwater biotope with tannins, driftwood, and floating plants' },
    { name: 'Saltwater Reef', prompt: 'Vibrant coral reef tank with glowing anemones and colorful marine life' },
    { name: 'Minimalist', prompt: 'Modern minimalist nano tank with white sand and a single branchy spiderwood' },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setImage(null);
    try {
      const imgUrl = await generateTankConcept(style);
      setImage(imgUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Virtual Tank Designer</h2>
        <p className="text-slate-500">Visualize your dream aquarium layout before you build it.</p>
      </div>

      <div className="bg-white rounded-[32px] p-2 md:p-4 shadow-xl border border-slate-100">
        <div className="flex flex-col md:flex-row gap-4 h-full">
          <div className="md:w-1/3 p-4 space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-tight">Select a Style</label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map(s => (
                  <button
                    key={s.name}
                    onClick={() => setStyle(s.prompt)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      style === s.prompt 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block uppercase tracking-tight">Custom Vision</label>
              <textarea
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                placeholder="Describe your ideal tank..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 accent-gradient text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 active:scale-95 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-wand-magic-sparkles animate-pulse"></i> Visualizing...
                </span>
              ) : "Generate Concept"}
            </button>
          </div>

          <div className="md:w-2/3 min-h-[300px] md:min-h-0 bg-slate-900 rounded-[24px] overflow-hidden flex items-center justify-center relative">
            {loading ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-12 bg-blue-500 rounded-full animate-[bounce_1s_infinite_0s]"></div>
                  <div className="w-3 h-12 bg-blue-400 rounded-full animate-[bounce_1s_infinite_0.1s]"></div>
                  <div className="w-3 h-12 bg-blue-300 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
                </div>
                <p className="text-blue-200 text-xs font-medium animate-pulse">Drafting your masterpiece...</p>
              </div>
            ) : image ? (
              <img src={image} alt="Generated Tank" className="w-full h-full object-cover animate-fade-in" />
            ) : (
              <div className="text-center p-8">
                <i className="fa-solid fa-image text-slate-700 text-5xl mb-4 opacity-20"></i>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Your high-definition visualization will appear here.</p>
              </div>
            )}
            
            {image && !loading && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-colors">
                  <i className="fa-solid fa-download"></i>
                </button>
                <button className="bg-white text-slate-800 px-4 py-2 rounded-full font-bold text-sm shadow-xl">
                  Shop Setup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankGenerator;
