
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-slate-800">
          ₹{product.price.toLocaleString('en-IN')}
        </div>
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-white text-blue-600 font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <span className="text-[10px] uppercase tracking-wider font-bold text-blue-500 mb-1 block">
          {product.category}
        </span>
        <h3 className="font-bold text-slate-800 text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;