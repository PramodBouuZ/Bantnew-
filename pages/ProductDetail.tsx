
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
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Solution Not Found</h1>
        <p className="text-slate-500 mb-8">The specific enterprise requirement you're looking for doesn't exist.</p>
        <Link to="/products" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold">Back to Marketplace</Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(
    p => p.category === product.category && p.slug !== product.slug
  );

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": product.vendorName
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": "154"
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  // Gallery handler
  const gallery = product.images?.length ? product.images : [product.image];

  return (
    <div className="pt-32 pb-20 px-4">
      <JsonLd data={productSchema} />
      
      <div className="max-w-7xl mx-auto">
        <nav className="flex mb-10 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span className="mx-3 opacity-30">/</span>
          <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <span className="mx-3 opacity-30">/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="glass rounded-[48px] overflow-hidden p-6 shadow-2xl shadow-indigo-500/5 relative group">
             <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-slate-100 relative">
               <img 
                 src={mainImage} 
                 alt={product.name} 
                 className="w-full h-full object-cover transition-transform duration-1000"
               />
               <div className="absolute top-8 left-8 bg-amber-400 text-slate-900 px-5 py-2 rounded-full font-black text-xs shadow-lg">
                 ★ {product.rating} Verified Score
               </div>
             </div>
             
             <div className="grid grid-cols-4 gap-4 mt-6">
                {gallery.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setMainImage(img)}
                    className={`aspect-square rounded-2xl bg-slate-50 overflow-hidden border transition-all cursor-pointer ${mainImage === img ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-100 hover:border-indigo-200'}`}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className={`w-full h-full object-cover transition-opacity ${mainImage === img ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`} />
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {product.vendorName}
                  <span className="text-amber-500 font-bold">★ {product.vendorRating}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-6">
                {product.name}
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                {product.shortDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-[10px] uppercase font-black text-slate-400 mb-2 tracking-widest">Base Price</p>
                <p className="text-4xl font-black text-indigo-600">{product.price}</p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[32px] text-white shadow-xl shadow-slate-900/20">
                <p className="text-[10px] uppercase font-black text-slate-400 mb-2 tracking-widest">Model</p>
                <p className="text-xl font-bold capitalize">{product.pricingType}</p>
                <p className="text-[10px] text-slate-500 font-bold mt-1">GST Extra</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900">Enterprise Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-slate-700 font-bold text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/lead-wizard" className="flex-1 px-12 py-5 bg-indigo-600 text-white rounded-full font-black shadow-2xl shadow-indigo-600/30 text-center hover:scale-105 active:scale-95 transition-all text-lg">
                Book Consultation
              </Link>
              <button className="flex-1 px-12 py-5 glass border-slate-200 text-slate-900 rounded-full font-black hover:bg-white transition-all text-lg">
                View Datasheet
              </button>
            </div>
            
            <div className="p-8 bg-amber-50 rounded-[40px] border border-amber-100/50 flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04l-.596.892a1.923 1.923 0 00.303 2.52l2.39 2.39a1.923 1.923 0 002.52.303l.892-.596A11.955 11.955 0 0112 11.056a11.955 11.955 0 018.618-3.04l.596-.892a1.923 1.923 0 00-.303-2.52l-2.39-2.39a1.923 1.923 0 00-2.52-.303l-.892.596z"></path></svg>
               </div>
               <div>
                  <h4 className="font-black text-slate-900 text-lg mb-1">BANT Verified Solution</h4>
                  <p className="text-sm text-slate-500 font-medium">This vendor has cleared our strict 4-step lead-matching audit for Indian MSMEs.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-32 max-w-4xl border-t border-slate-100 pt-20">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Enterprise Overview</h2>
          <div className="prose prose-slate prose-xl max-w-none text-slate-600 leading-relaxed font-medium">
            <p className="mb-8">{product.description}</p>
            <p className="mb-8">At BantConfirm, we bridge the gap between complex enterprise needs and top-tier vendors. When you invest in {product.name}, you are selecting a solution that has been audited for scalability, support, and business compliance.</p>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-40">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 block">Marketplace Recommendations</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Similar Enterprise Solutions</h2>
              </div>
              <div className="flex items-center gap-4">
                <Link 
                  to="/products" 
                  state={{ category: product.category }}
                  className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100"
                >
                  View All in {product.category}
                </Link>
                <div className="flex gap-3">
                  <button onClick={scrollLeft} className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:border-indigo-600 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button onClick={scrollRight} className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:border-indigo-600 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </div>

            <div 
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x"
            >
              {relatedProducts.map(item => (
                <Link 
                  key={item.id} 
                  to={`/products/${item.slug}`}
                  className="min-w-[340px] md:min-w-[420px] snap-start snap-always glass rounded-[48px] overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-slate-100"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-indigo-600 shadow-xl">
                      {item.price}
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                    <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 leading-relaxed">{item.shortDescription}</p>
                    <div className="flex items-center justify-between mt-auto">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.category}</span>
                       <span className="text-indigo-600 font-black group-hover:translate-x-2 transition-transform">Explore Solution →</span>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* View More Card at the end of carousel */}
              <Link 
                to="/products" 
                state={{ category: product.category }}
                className="min-w-[340px] md:min-w-[420px] snap-start snap-always rounded-[48px] border-2 border-dashed border-indigo-100 flex flex-col items-center justify-center p-10 group hover:border-indigo-400 transition-all hover:bg-indigo-50/30"
              >
                <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">View All</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">In {product.category}</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
