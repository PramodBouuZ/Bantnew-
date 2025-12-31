
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS as initialProducts } from '../constants';
import JsonLd from '../components/JsonLd';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('marketplaceProducts');
    const productsData = saved ? JSON.parse(saved) : initialProducts;
    setAllProducts(productsData);
    const found = productsData.find((p: Product) => p.slug === slug);
    if (found) {
      setProduct(found);
      setMainImage(found.images?.[0] || found.image);
    } else {
      setProduct(null);
    }
  }, [slug]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Verified B2B Solution | BantConfirm`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', product.shortDescription);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Solution Not Found</h1>
        <p className="text-slate-500 mb-8">The specific enterprise requirement you're looking for doesn't exist.</p>
        <Link to="/products" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold inline-block">Back to Marketplace</Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(
    p => p.category === product.category && p.slug !== product.slug
  );

  const gallery = product.images?.length ? product.images : [product.image];

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <JsonLd data={{ "@context": "https://schema.org/", "@type": "Product", "name": product.name }} />
      
      <div className="max-w-7xl mx-auto">
        <nav className="flex mb-8 md:mb-10 text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span className="mx-2 opacity-30">/</span>
          <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <span className="mx-2 opacity-30">/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div className="glass rounded-[32px] md:rounded-[48px] overflow-hidden p-4 md:p-6 shadow-2xl shadow-indigo-500/5 relative">
             <div className="aspect-[4/3] rounded-[24px] md:rounded-[40px] overflow-hidden bg-slate-100 relative">
               <img src={mainImage} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000" />
               <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-amber-400 text-slate-900 px-3 md:px-5 py-1.5 md:py-2 rounded-full font-black text-[9px] md:text-xs shadow-lg">
                 ★ {product.rating} Verified Score
               </div>
             </div>
             
             <div className="flex gap-3 mt-4 md:mt-6 overflow-x-auto pb-2 scrollbar-hide">
                {gallery.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-slate-50 overflow-hidden border transition-all cursor-pointer ${mainImage === img ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-100 hover:border-indigo-200'}`}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className={`w-full h-full object-cover transition-opacity ${mainImage === img ? 'opacity-100' : 'opacity-60'}`} />
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-8 md:space-y-10">
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 flex-wrap">
                <span className="px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-indigo-50 text-indigo-700 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {product.vendorName}
                  <span className="text-amber-500 font-bold">★ {product.vendorRating}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight md:leading-[1.1] mb-4 md:mb-6">
                {product.name}
              </h1>
              <p className="text-base md:text-xl text-slate-500 leading-relaxed font-medium">
                {product.shortDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-[9px] uppercase font-black text-slate-400 mb-1 tracking-widest">Base Price</p>
                <p className="text-3xl md:text-4xl font-black text-indigo-600">{product.price}</p>
              </div>
              <div className="p-6 md:p-8 bg-slate-900 rounded-[24px] md:rounded-[32px] text-white shadow-xl shadow-slate-900/20">
                <p className="text-[9px] uppercase font-black text-slate-400 mb-1 tracking-widest">Model</p>
                <p className="text-lg md:text-xl font-bold capitalize">{product.pricingType}</p>
                <p className="text-[8px] text-slate-500 font-bold mt-1">GST Extra</p>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-black text-slate-900">Enterprise Features</h3>
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 md:p-5 bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-100 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-slate-700 font-bold text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Link to="/lead-wizard" className="w-full sm:flex-1 px-8 md:px-12 py-5 bg-indigo-600 text-white rounded-full font-black shadow-2xl shadow-indigo-600/30 text-center hover:scale-105 active:scale-95 transition-all text-base md:text-lg uppercase tracking-widest">
                Consult Expert
              </Link>
              <button className="w-full sm:flex-1 px-8 md:px-12 py-5 glass border-slate-200 text-slate-900 rounded-full font-black transition-all text-base md:text-lg uppercase tracking-widest">
                View Specs
              </button>
            </div>
            
            <div className="p-6 md:p-8 bg-amber-50 rounded-[32px] md:rounded-[40px] border border-amber-100/50 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-amber-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04l-.596.892a1.923 1.923 0 00.303 2.52l2.39 2.39a1.923 1.923 0 002.52.303l.892-.596A11.955 11.955 0 0112 11.056a11.955 11.955 0 018.618-3.04l.596-.892a1.923 1.923 0 00-.303-2.52l-2.39-2.39a1.923 1.923 0 00-2.52-.303l-.892.596z"></path></svg>
               </div>
               <div>
                  <h4 className="font-black text-slate-900 text-base md:text-lg mb-1">BANT Verified Solution</h4>
                  <p className="text-xs md:text-sm text-slate-500 font-medium">This vendor has cleared our strict 4-step lead-matching audit.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-32 max-w-4xl border-t border-slate-100 pt-12 md:pt-20">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 md:mb-10 tracking-tight">Enterprise Overview</h2>
          <div className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-600 leading-relaxed font-medium px-2">
            <p className="mb-6 md:mb-8">{product.description}</p>
            <p>Selecting {product.name} ensures you are opting for a solution audited for scalability and Indian business compliance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
