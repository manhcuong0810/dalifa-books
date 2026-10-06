"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function HomePage() {
  const [data, setData] = useState({ books: [], settings: {}, categories: [], articles: [] });
  
  useEffect(() => {
    Promise.all([api('products'), api('settings'), api('categories'), api('articles')])
      .then(([books, settings, categories, articles]) => {
        setData({ books, settings, categories, articles });
      });
  }, []);

  const scrollCarousel = (id: string, amount: number) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const goToSlide = (index: number) => {
    const slides = document.querySelectorAll('.slide-item');
    const thumbs = document.querySelectorAll('.thumb-btn');
    slides.forEach((s, i) => {
      if (i === index) {
        s.classList.replace('opacity-0', 'opacity-100');
        s.classList.replace('z-0', 'z-10');
      } else {
        s.classList.replace('opacity-100', 'opacity-0');
        s.classList.replace('z-10', 'z-0');
      }
    });
    thumbs.forEach((t, i) => {
      if (i === index) {
        t.classList.add('ring-2', 'ring-primary');
      } else {
        t.classList.remove('ring-2', 'ring-primary');
      }
    });
  };

  const changeSlide = (direction: number) => {
    // Basic implementation since we removed inline scripts
    const slides = document.querySelectorAll('.slide-item');
    let currentSlide = Array.from(slides).findIndex(s => s.classList.contains('opacity-100'));
    if (currentSlide === -1) currentSlide = 0;
    
    slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
    slides[currentSlide].classList.replace('z-10', 'z-0');
    
    let nextSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[nextSlide].classList.replace('opacity-0', 'opacity-100');
    slides[nextSlide].classList.replace('z-0', 'z-10');
  };

  return (
    <main className="w-full pt-40 bg-background">
      <div className="flex flex-col w-full">
{/*  1. HERO BANNER SLIDER  */}
<section className="relative w-full overflow-hidden bg-surface-container-low">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-6">
{/*  Main Slide Wrapper  */}
<div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-surface-card aspect-[21/9] sm:aspect-[2.6/1]">
{/*  Slide 1 (Active)  */}
<div className="slide-item absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 z-0" id="slide-0">
<img alt="Tết Bính Ngọ - OUTSTRIDE Khác Biệt Ở Bước Đi Alpha Books" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WGvVONj61RXRJl4v9YvaohZ-P_M1MgHnHpxYju-D3xG-NupfKYXkHpIGkrg0STBWoyilZv8R6r_jo7fEqKyH2t5HG8JMA-pepq97L1UsTHnEhVKVKXZX4sFwINa1iMh7P1e0UDIOx-fvoc6bcQ-232soLFpfd0W5PQM1rQ93FeWLLtcBiTJ9T5qHVITsd1UfjyBsvgFSVSFDLzFmgeQFfvD-TqrBFVIbFROrvr9GxAhLGAo0l7KJXvbWk" />
<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent flex items-center p-6 sm:p-10 lg:p-14">
<div className="max-w-lg text-white space-y-3 sm:space-y-4">
<span className="inline-block px-3 py-1 bg-badge-discount text-white font-label-sm text-label-sm uppercase tracking-wider rounded-full shadow-sm">
                Chào Xuân Khởi Sắc
              </span>
<h2 className="font-headline-xl text-headline-xl sm:font-display-lg sm:text-display-lg font-bold text-white drop-shadow leading-tight">
                OUTSTRIDE<br /><span className="text-secondary-fixed">Khác biệt ở bước đi</span>
</h2>
<p className="font-body-md text-body-md text-white/90 line-clamp-2 sm:line-clamp-3">Khai mở tư duy quản trị đột phá và nội lực bản lĩnh chào đón vận hội mới cùng DalifaBooks 2026.</p>
<div className="flex items-center gap-3 pt-2">
<a className="px-5 py-2.5 bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-md hover:bg-secondary-container transition-transform active:scale-95 flex items-center gap-2" href="#banchay">
<span className="">Khám phá ngay</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
<a className="px-5 py-2.5 bg-white/20 backdrop-blur-md text-white font-label-lg text-label-lg rounded-lg hover:bg-white/30 transition-colors" href="#tusach">
                  Xem tủ sách
                </a>
</div>
</div>
</div>
</div>
{/*  Slide 2  */}
<div className="slide-item absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-100 z-10" id="slide-1">
<img alt="Harvard Business Review Vietnam - Ấn phẩm quản trị tinh hoa" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1V5UUvC0Mzg8PG29HVKhVDdcoea75yNGrgEqkCilJq5Ckkg7Se-QwVseavcFTEhUCLiI_GJS3f2VjxR5_MUevQL4KomkXTWRD8-w444kxNrkJwxyYjmImN7xPTR8bhPdgCDbeSFZ7otVXcayJ1FUZ2_j5NDKlcklIV3zb-vq-D-L_Voomb-mQ9phUPrPLh6ChxgPIoXPJ53XRqNEWE-XNYFf4VrUXSzFBgrfiNURSEVwgSX2Ap2YaSrfHg" />
</div>
{/*  Slide 3  */}
<div className="slide-item absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 z-0" id="slide-2">
<img alt="Sách Mới Nổi Bật Alpha Books" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VvqCL_snH2z2UhhoVy1aLVM3peVGxh16l0gndUT73Dl2WL_X2rUluVkJkzvbXmrNdkaWtSuK_r95BOqSaxd3ChUNNbw32U50cY6DtOoenYsw2REPPOGU8ouu72EAtimcAWJMcj2_hw6Z_KxPWJwp1O0xtcX--CQjxsuwy0WYJ-pock3GPzrQwcmghh2LwEMmVNKBguneTN3SMdCCa0NRFYVOCczFAZGuxbNBUtMzlL-o-A2GmhfBrC26s" />
</div>
{/*  Slide 4  */}
<div className="slide-item absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 z-0" id="slide-3">
<img alt="Hợp tác xuất bản trọn gói từ A-Z BIZONE" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WuxPLUyW8gHz_Murt-BKe62s9d9effRoAiZfj4VOdtcQrqWr4eSYX8FvlSRVsEe6ddSLjekydANy_19NprxPDDdTbMAzI9jqzy167IS6n1bHsnwS6Wi0R_i2KzfqfKI9QtmCShfiRsfcBS4MGz_L8h3IRifB-DWWEHRA5tP0w35rM4QI7EMozEY0gpDeXifhC8W_VMJT9ccLdrYr9BnBvd6lBpSb8mINZENu40B0VhbpJmRznk2MGGBw" />
</div>
{/*  Slider Arrow Controls  */}
<button aria-label="Banner trước" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-on-surface flex items-center justify-center shadow-lg transition hover:scale-105" onClick={() => changeSlide(-1)} type="button">
<span className="material-symbols-outlined text-[24px]">chevron_left</span>
</button>
<button aria-label="Banner kế tiếp" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-on-surface flex items-center justify-center shadow-lg transition hover:scale-105" onClick={() => changeSlide(1)} type="button">
<span className="material-symbols-outlined text-[24px]">chevron_right</span>
</button>
</div>
{/*  Slide Thumbnails Navigation  */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
<button className="thumb-btn flex items-center gap-3 p-2.5 rounded-xl bg-surface-card shadow-sm hover:shadow-md transition text-left" onClick={() => goToSlide(0)} type="button">
<div className="w-14 h-9 rounded-md overflow-hidden shrink-0">
<img alt="Xuân Bính Ngọ" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WGvVONj61RXRJl4v9YvaohZ-P_M1MgHnHpxYju-D3xG-NupfKYXkHpIGkrg0STBWoyilZv8R6r_jo7fEqKyH2t5HG8JMA-pepq97L1UsTHnEhVKVKXZX4sFwINa1iMh7P1e0UDIOx-fvoc6bcQ-232soLFpfd0W5PQM1rQ93FeWLLtcBiTJ9T5qHVITsd1UfjyBsvgFSVSFDLzFmgeQFfvD-TqrBFVIbFROrvr9GxAhLGAo0l7KJXvbWk" />
</div>
<div className="min-w-0">
<p className="font-label-md text-label-md font-bold text-on-surface truncate">Xuân Bính Ngọ 2026</p>
<p className="font-body-sm text-body-sm text-text-muted truncate">Outstride khác biệt</p>
</div>
</button>
<button className="thumb-btn flex items-center gap-3 p-2.5 rounded-xl bg-surface-card shadow-sm hover:shadow-md transition text-left ring-2 ring-primary" onClick={() => goToSlide(1)} type="button">
<div className="w-14 h-9 rounded-md overflow-hidden shrink-0">
<img alt="Tủ sách HBR" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1V5UUvC0Mzg8PG29HVKhVDdcoea75yNGrgEqkCilJq5Ckkg7Se-QwVseavcFTEhUCLiI_GJS3f2VjxR5_MUevQL4KomkXTWRD8-w444kxNrkJwxyYjmImN7xPTR8bhPdgCDbeSFZ7otVXcayJ1FUZ2_j5NDKlcklIV3zb-vq-D-L_Voomb-mQ9phUPrPLh6ChxgPIoXPJ53XRqNEWE-XNYFf4VrUXSzFBgrfiNURSEVwgSX2Ap2YaSrfHg" />
</div>
<div className="min-w-0">
<p className="font-label-md text-label-md font-bold text-on-surface truncate">Harvard Business Review</p>
<p className="font-body-sm text-body-sm text-text-muted truncate">Ấn phẩm quản trị cao cấp</p>
</div>
</button>
<button className="thumb-btn flex items-center gap-3 p-2.5 rounded-xl bg-surface-card shadow-sm hover:shadow-md transition text-left" onClick={() => goToSlide(2)} type="button">
<div className="w-14 h-9 rounded-md overflow-hidden shrink-0">
<img alt="Sách Mới Tháng 4" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VvqCL_snH2z2UhhoVy1aLVM3peVGxh16l0gndUT73Dl2WL_X2rUluVkJkzvbXmrNdkaWtSuK_r95BOqSaxd3ChUNNbw32U50cY6DtOoenYsw2REPPOGU8ouu72EAtimcAWJMcj2_hw6Z_KxPWJwp1O0xtcX--CQjxsuwy0WYJ-pock3GPzrQwcmghh2LwEMmVNKBguneTN3SMdCCa0NRFYVOCczFAZGuxbNBUtMzlL-o-A2GmhfBrC26s" />
</div>
<div className="min-w-0">
<p className="font-label-md text-label-md font-bold text-on-surface truncate">Sách Mới Tuyển Chọn</p>
<p className="font-body-sm text-body-sm text-text-muted truncate">Cập nhật xu thế tri thức</p>
</div>
</button>
<button className="thumb-btn flex items-center gap-3 p-2.5 rounded-xl bg-surface-card shadow-sm hover:shadow-md transition text-left" onClick={() => goToSlide(3)} type="button">
<div className="w-14 h-9 rounded-md overflow-hidden shrink-0">
<img alt="Xuất bản Doanh nghiệp" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WuxPLUyW8gHz_Murt-BKe62s9d9effRoAiZfj4VOdtcQrqWr4eSYX8FvlSRVsEe6ddSLjekydANy_19NprxPDDdTbMAzI9jqzy167IS6n1bHsnwS6Wi0R_i2KzfqfKI9QtmCShfiRsfcBS4MGz_L8h3IRifB-DWWEHRA5tP0w35rM4QI7EMozEY0gpDeXifhC8W_VMJT9ccLdrYr9BnBvd6lBpSb8mINZENu40B0VhbpJmRznk2MGGBw" />
</div>
<div className="min-w-0">
<p className="font-label-md text-label-md font-bold text-on-surface truncate">Hợp Tác Xuất Bản</p>
<p className="font-body-sm text-body-sm text-text-muted truncate">BIZONE đồng hành</p>
</div>
</button>
</div>
</div>
</section>
{/*  2. PHẦN GIỚI THIỆU ALPHA BOOKS  */}
<section className="py-12 lg:py-16 bg-surface-canvas overflow-hidden">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
{/*  Visual Column  */}
<div className="lg:col-span-6 relative">
<div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-surface-container-high aspect-[1.1/1]">
<img alt="Không gian READ Station Alpha Books tại Hà Nội" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida/AEtjO1X5C0wmKlfRb2AvSrtMcFAQVl001m1K4i9byiq0S6IBEEvxjX3n8XpL8squbtvQOB1xbohYgCh1CuXDSxXHsOck4RwLN-FPUtQQ-cxgHc0hsrSUM-I7vfdtsvs88XOqdCywxOncsrJtT2hOkg1L1qIevcr8I9RFz5Gq24uLwHP5dUcyfICHrUXWdb2qy_i9SR5r2EGtYzDZ-pzIWWTXOOzq9HVvVnVyizkpQnoVfpvUlAPPLiDgz1H4XHE" />
</div>
{/*  Decorative Badge  */}
<div className="absolute -bottom-4 -right-4 z-20 bg-primary-container text-on-primary p-4 rounded-2xl shadow-xl flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-display-lg text-display-lg font-bold">
              20
            </div>
<div>
<p className="font-label-md text-label-md font-bold uppercase tracking-wider">Năm Kiến Tạo</p>
<p className="font-body-sm text-body-sm opacity-90">Tri thức doanh trí Việt</p>
</div>
</div>
</div>
{/*  Narrative Column  */}
<div className="lg:col-span-6 space-y-4">
<div className="inline-flex items-center gap-2 text-primary font-headline-sm text-headline-sm italic">
<span className="material-symbols-outlined text-[20px]">auto_stories</span>
<span className="">Giới thiệu DalifaBooks!</span>
</div>
<h2 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">CÔNG TY CỔ PHẦN SÁCH DALIFA (DALIFA BOOKS)</h2>
<div className="w-20 h-1 bg-primary-container rounded-full"></div>
<p className="font-body-lg text-body-lg text-on-surface-variant text-justify leading-relaxed">DalifaBooks được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư… với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng trên thế giới.</p>
<p className="font-body-md text-body-md text-text-muted text-justify leading-relaxed">Sau 20 năm hình thành và phát triển, DalifaBooks đã từng bước khẳng định tên tuổi của mình, đặc biệt đối với các thế hệ doanh nhân, nhà quản lý và những người trẻ luôn khát khao xây dựng sự nghiệp thành công.</p>
<div className="pt-2">
<a className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-secondary-container shadow-md hover:shadow-lg transition active:scale-95" href="#">
<span className="">XEM THÊM</span>
<span className="material-symbols-outlined text-[20px]">trending_flat</span>
</a>
</div>
</div>
</div>
</div>
</section>
{/*  3. TOP 100 SẢN PHẨM BÁN CHẠY  */}
<section className="py-12 lg:py-16 bg-surface-subtle" id="banchay">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
{/*  Section Header  */}
<div className="flex items-center justify-between pb-6 mb-4">
<div className="flex items-center gap-3">
<span className="w-3 h-8 bg-primary-container rounded-full"></span>
<h2 className="font-headline-xl text-headline-xl font-bold text-on-surface flex items-center gap-2">
            Top 100 Sản phẩm bán chạy
          </h2>
</div>
<div className="flex items-center gap-2">
<button aria-label="Lùi sách" className="w-10 h-10 rounded-full bg-surface-card hover:bg-surface-container-high text-on-surface flex items-center justify-center shadow transition" onClick={() => scrollCarousel('bestsellers-row', -300)} type="button">
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button aria-label="Tiến sách" className="w-10 h-10 rounded-full bg-surface-card hover:bg-surface-container-high text-on-surface flex items-center justify-center shadow transition" onClick={() => scrollCarousel('bestsellers-row', 300)} type="button">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
{/*  Book Grid / Scrollable Row  */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto scroll-smooth pb-4" id="bestsellers-row">
{data.books && data.books.slice(0, 10).map((book: any, idx: number) => (
  <div key={idx} className="group bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
    <div>
      <div className="relative aspect-[3/4.4] w-full rounded-lg overflow-hidden bg-surface-container-low mb-3">
        {book.discount > 0 && <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-badge-discount text-white font-label-sm text-label-sm font-bold">-{book.discount}%</span>}
        <img alt={book.name || book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={book.image || book.image_url || 'https://via.placeholder.com/150'} />
      </div>
      <p className="font-body-sm text-body-sm text-text-muted truncate">{book.author || 'DalifaBooks'}</p>
      <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
        {book.name || book.title}
      </h3>
    </div>
    <div className="mt-3 pt-2">
      <div className="flex items-center gap-1 text-accent-star mb-1">
        <span className="material-symbols-outlined text-[16px]">star</span>
        <span className="font-label-sm text-label-sm text-on-surface font-bold">5.0</span>
        <span className="font-body-sm text-body-sm text-text-muted">(120)</span>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-price-card text-price-card text-primary font-bold">{book.price ? book.price.toLocaleString() + '₫' : 'Liên hệ'}</span>
        {book.original_price && <span className="font-body-sm text-body-sm text-text-muted line-through">{book.original_price.toLocaleString()}₫</span>}
      </div>
    </div>
  </div>
))}
</div>
</div>
</section>
{/*  4. DOUBLE PROMOTION BANNERS  */}
<section className="py-6 lg:py-8 bg-surface-canvas">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/*  Banner Left: 1000 Tủ sách  */}
<a className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-[2.9/1]" href="#">
<img alt="Chương trình 1000 Tủ Sách - 1000 Cơ Hội Học Tập" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida/AEtjO1Vuzp9FZSx3HRQBeMmCxa4-d_OFWnrT7V6oIPLQr72nYaoxlwLCaf2Wb4iTxWBmP9v1qZd6kq1RTm1wlK4zd-B5IrXe_tu4t6BzevS6w3LugPWop1rbGCPnvCSYZf-vdN6dDXozTpvyWvnNg1JM61oFYDRYpr6DvPslgSa2Gktky2hi-1ats6Z8rCQEkow6CCnMxGIFPFzUnSUVEyi4jGbvWXWUb5_pk_5hUIIkgitYr8xJf0wKPaXDcg" />
<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-5">
<span className="inline-flex items-center gap-1 text-white font-label-md text-label-md font-bold group-hover:translate-x-1 transition-transform">
              Đăng ký tham gia ngay <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</span>
</div>
</a>
{/*  Banner Right: Alpha Cards  */}
<a className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-[2.9/1]" href="#alphacards">
<img alt="Alpha Cards - Deep Mind, Smart Action, Big Success" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida/AEtjO1Xuhnkjpqg2bR-jn28ikfeiuXDkZaf0IV4iTpbmplqbOXt6cPXlNDEFnx2_nZJnpQ3RbluuHaR6A1PuKDsv4PYch0PaOPkjoJWPfBDBDGIjNsDRq84_ZA3XURAuHpk9v_4juhGDHF9SCvzZpvH3nIWjCo6R8zcVReYt8dZM7xNwjfPlI-PNqKP6ThjirNC6Khnt3wPhnEMWXQwU2tVxwfkalUJToguVDQ6WDRhtEAAwm0qGHLQEaR3XrEU" />
<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-5">
<span className="inline-flex items-center gap-1 text-white font-label-md text-label-md font-bold group-hover:translate-x-1 transition-transform">
              Bộ thẻ kiến thức bỏ túi <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</span>
</div>
</a>
</div>
</div>
</section>
{/*  5. SÁCH MỚI PHÁT HÀNH  */}
<section className="py-12 lg:py-16 bg-surface-subtle">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="text-center mb-10">
<h2 className="font-headline-xl text-headline-xl font-bold text-on-surface">Sách mới phát hành</h2>
<div className="flex items-center justify-center gap-2 mt-2 text-primary">
<div className="w-12 h-0.5 bg-primary-container"></div>
<span className="material-symbols-outlined text-[20px]">menu_book</span>
<div className="w-12 h-0.5 bg-primary-container"></div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
{/*  Featured Book 1: NGHÈO  */}
<div className="lg:col-span-6 bg-surface-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
<div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
<div className="sm:col-span-5 relative aspect-[1/1.5] rounded-xl overflow-hidden bg-surface-container-low shadow">
<span className="absolute top-2 left-2 z-10 px-2.5 py-1 bg-badge-discount text-white font-label-sm text-label-sm font-bold rounded">
                MỚI NHẤT
              </span>
<img alt="Bìa sách NGHÈO - Katriona O'Sullivan" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UWJFaBh4OuVymiNb0_RZtS3w_HvEPiiKckiq9WYeEMzGL3iMlW0P2WEnDxEaPjHgQUCyQoyB_PQPMtHhqHlB2jU48ouGTemCYlELwX5flROE9bTTrNi8X1qy0uus2q3jOT8f4hzDH1yZCnJO4h7NCfMTr9aP8zY-l5cU6ZrBD1S4_Hw9_1shGVC500D2ticx0gXRYZOLZztxC8VFtXLJuRJ9uGKeY_g83dFyrHe_uIVwd-fI25gUQa3Q" />
</div>
<div className="sm:col-span-7 space-y-3">
<div className="space-y-1">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Hồi ký xúc động</span>
<h3 className="font-headline-lg text-headline-lg font-bold text-on-surface hover:text-primary transition-colors">
                  NGHÈO
                </h3>
<p className="font-label-md text-label-md text-text-muted">Tác giả: Katriona O’Sullivan</p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg space-y-1 text-on-surface-variant font-body-sm text-body-sm">
<p className=""><strong>Số trang:</strong> 372 trang (Khổ 13x20,5 cm)</p>
<p className=""><strong>Bìa:</strong> Mềm, tay gấp cao cấp | <strong>NXB:</strong> Thế Giới</p>
<p className="line-clamp-3 text-text-muted pt-1">
                  Hồi ký của một tiến sĩ lớn lên ở khu ổ chuột. Katriona O’Sullivan từng lớn lên đầy thông minh, nhiệt huyết và tò màu về thế giới...
                </p>
</div>
<div className="flex items-baseline gap-3">
<span className="font-headline-md text-headline-md font-bold text-primary">169.150₫</span>
<span className="font-body-md text-body-md text-text-muted line-through">199.000₫</span>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">-15%</span>
</div>
<a className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-secondary-container transition" href="#">
<span className="material-symbols-outlined text-[18px]">shopping_cart</span>
<span className="">Đặt sách ngay</span>
</a>
</div>
</div>
</div>
{/*  Featured Book 2: ẢO TƯỞNG LỰA CHỌN  */}
<div className="lg:col-span-6 bg-surface-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
<div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
<div className="sm:col-span-5 relative aspect-[1/1.5] rounded-xl overflow-hidden bg-surface-container-low shadow">
<span className="absolute top-2 left-2 z-10 px-2.5 py-1 bg-badge-discount text-white font-label-sm text-label-sm font-bold rounded">
                TÂM LÝ HÀNH VI
              </span>
<img alt="Bìa sách Ảo Tưởng Lựa Chọn - Richard Shotton" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1Ur-ZRjYr-sq7OtAdUu2UNNickm7xt74SDvecJp4vx2q5LSMHnJtFcKUR93Utv765nI-ztRwxwsPCBKWc82XQY_gSfm1Q7DH3mZJbMY4blaJe5FVkKghaGU0cREHx-ExbEIQlv5y43kcrc8zOgFa4LrmmbI8HeF88I5cjFShHYspY-lYQWpak8Y4hYkYiW2Tuufkoyozh6AVWPjPB6EQfOI6DTpLWsiHaw7G2Q0AQJGyNPOKbVQpz0MH08" />
</div>
<div className="sm:col-span-7 space-y-3">
<div className="space-y-1">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Hành vi mua sắm</span>
<h3 className="font-headline-lg text-headline-lg font-bold text-on-surface hover:text-primary transition-colors">
                  ẢO TƯỞNG LỰA CHỌN
                </h3>
<p className="font-label-md text-label-md text-text-muted">Tác giả: Richard Shotton</p>
</div>
<div className="p-3 bg-surface-container-low rounded-lg space-y-1 text-on-surface-variant font-body-sm text-body-sm">
<p className=""><strong>Số trang:</strong> 272 trang (Khổ 13x20,5 cm)</p>
<p className=""><strong>Bìa:</strong> Mềm, tay gấp | <strong>NXB:</strong> Tri Thức</p>
<p className="line-clamp-3 text-text-muted pt-1">
                  Khoa học hành vi đằng sau các quyết định mua sắm. Khám phá những bẫy tâm lý vô hình giăng sẵn khiến khách hàng chi tiền...
                </p>
</div>
<div className="flex items-baseline gap-3">
<span className="font-headline-md text-headline-md font-bold text-primary">143.650₫</span>
<span className="font-body-md text-body-md text-text-muted line-through">169.000₫</span>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">-15%</span>
</div>
<a className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-secondary-container transition" href="#">
<span className="material-symbols-outlined text-[18px]">shopping_cart</span>
<span className="">Đặt sách ngay</span>
</a>
</div>
</div>
</div>
</div>
{/*  Additional New Releases Row  */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition">
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-3">
<img alt="Lược Sử Lãi Suất" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1U1jpQ2RfXOZKMiQ-ob95ZvTCXicF6kayEvjavqUX09uwyTAM8apjROUiuDk2UjgJv5GgEClTtBF24kOCdzOyhiHrTr9MfYf0hpMl-lTkKAeARTsjkNpAidGidC5rZ86gnfoyH3JYxLCBBHnzZnFJsgK0ibynRW7_-KYXeW_CsmXukh1PXk5C23oHWYaR5o0f-kc60A2fdAZ6ldU8OgnfaET3lR5ZilDFOu6DGOpTkPOJUa0LKjRDbfSzU" />
</div>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-1">Lược Sử Lãi Suất</h4>
<p className="font-body-sm text-body-sm text-text-muted mb-2">Edward Chancellor</p>
<div className="flex items-baseline gap-2">
<span className="font-price-card text-price-card text-primary font-bold">245.650₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">289.000₫</span>
</div>
</div>
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition">
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-3">
<img alt="IGEN - Thế Hệ Smartphone" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WF0oSPqQMoIr7ozdsMkTU0nwZB6EbjNuUOLNfbnv3tfUb0efAtjVZiNA8DjwVcDPl0RsNEMuU0403n7mlJSPFpEgMgzcNI_GPkTctSZRRTRKsnYI795etNbbku9UBY34jalNUai8Wbkr5WIKSuN-q1H7FI_vLhRr4smkpstN-xeLbTfQQnkTMXHOwVpLCZjVgnFyx1K-yXp369srI58yXZL01eKjnKVjhjBhnWwewfUCQn76KX7gw_H8k" />
</div>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-1">IGEN - THẾ HỆ SMARTPHONE</h4>
<p className="font-body-sm text-body-sm text-text-muted mb-2">Jean M. Twenge</p>
<div className="flex items-baseline gap-2">
<span className="font-price-card text-price-card text-primary font-bold">211.650₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">249.000₫</span>
</div>
</div>
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition">
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-3">
<img alt="Điểm Xoay Chuyển" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VbdcVtHDRAjvTAQHGyZxz-HPe_xUwi20ZVw6FnrQNspOf9Ku_JzzSNn8aVsjYid2YFx25JpIvLu_ZJTsBpjLXijXZ3HhyPEfmx5aE2tvdsGriQYkWWdpNnU8BFraJBWO6AAh_WOE_cLlyCZxznVpFq7PiWjwukItMTe3CI3j_AficIarq73KndLGFwR8R_cS9sMWUioI_QuuE5lReDt6hfNYfEP6_mF-JBqDHX3AOHvessrLsQM4VJ9ng" />
</div>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-1">Điểm Xoay Chuyển</h4>
<p className="font-body-sm text-body-sm text-text-muted mb-2">Richard Rumelt</p>
<div className="flex items-baseline gap-2">
<span className="font-price-card text-price-card text-primary font-bold">211.650₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">249.000₫</span>
</div>
</div>
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition">
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-3">
<img alt="Thiết Kế Trải Nghiệm Khách Hàng Thời Đại Số" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WEA4b-IWpbiXR2bFRqjecKg70if61_XC0UvrAIgKRTUmoUY9XG70lYD79qfXvo1zI4Y-v1TF5JJWojmKeAyjO9mSuhxthjxOKjo1sxkslQh6FsKdM8YFPLPCMXQIe5yl6rRYEToL1GZP4c1MKYwLhI6HchzuHfhDoZcEZuMm0WVlhM7sc0EibGLvMNbk_ZYl9T0P64j8FBtsBN5HuWVFMXhGmBV9rIwtZrm_SkaYmqshjAf68vmKwuN2g" />
</div>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-1">Thiết Kế Trải Nghiệm Khách Hàng</h4>
<p className="font-body-sm text-body-sm text-text-muted mb-2">Alan Pennington</p>
<div className="flex items-baseline gap-2">
<span className="font-price-card text-price-card text-primary font-bold">203.150₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">239.000₫</span>
</div>
</div>
</div>
</div>
</section>
{/*  6. SÁCH DÀNH CHO BẠN (COMBO & GỢI Ý)  */}
<section className="py-12 lg:py-16 bg-surface-canvas">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="text-center mb-10">
<h2 className="font-headline-xl text-headline-xl font-bold text-on-surface">Chuyên gia đánh giá về DalifaBooks</h2>
<div className="flex items-center justify-center gap-2 mt-2 text-primary">
<div className="w-12 h-0.5 bg-primary-container"></div>
<span className="material-symbols-outlined text-[20px]">auto_awesome</span>
<div className="w-12 h-0.5 bg-primary-container"></div>
</div>
<p className="font-body-md text-body-md text-text-muted mt-2">Tuyển tập combo tiết kiệm và những tác phẩm đột phá tư duy</p>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
{/*  Item 1: Combo Hạnh Phúc  */}
<div className="group bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
<div>
<div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-3">
<span className="absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded bg-badge-discount text-white font-label-sm text-label-sm font-bold">-20%</span>
<img alt="Combo Hạnh Phúc - Tuyển tập Hồi Ký Chiến Trường và Tù Binh Thương Trường" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida/AEtjO1Xu0S_yUwvXgfaR0Y1aOhD9trUoe1TwKHycRUlIrTtBw3ty79C3A3SoJ0HHmyi8GRFyJTaPYLglge4nOpKhF4OqZLxRpgQKj5q4UWyPMYea6VoMaAVzM_fNi_e56qWiquw0Rx_ljyZx1Hh9qlLV9RCOXY5lQsJGUWA_Feu3uKokp2aJTTvtA37hMwVQ21ZxgWubrW4UoBuOBmbCqFwvVZIuN9-wlnw6imiK1sr42x8LasoYFhZZpqak6ec" />
</div>
<span className="font-label-sm text-label-sm text-primary font-bold uppercase">Combo Đặc Biệt</span>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
              Combo Hạnh Phúc - Từ Sông Bến Hải Đến Dinh Độc Lập
            </h3>
</div>
<div className="mt-4 pt-2">
<div className="flex items-baseline gap-2 mb-3">
<span className="font-price-hero text-price-hero text-primary font-bold">676.800₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">846.000₫</span>
</div>
<button className="w-full py-2 bg-surface-container hover:bg-primary-container hover:text-on-primary text-primary font-label-md text-label-md font-bold rounded-lg transition" type="button">
              Thêm vào giỏ
            </button>
</div>
</div>
{/*  Item 2: Combo Tự Do  */}
<div className="group bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
<div>
<div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-3">
<span className="absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded bg-badge-discount text-white font-label-sm text-label-sm font-bold">-20%</span>
<img alt="Combo Tự Do - Chuyện Của Chúng Tôi" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida/AEtjO1Xdl6cj12kS1U0_EDjuxPxJmRKQQRp2xBaGVOL-YgAw7yWLf0mr755_nzmKAA6xsS_KaB-UMrN6JD6j6HRWyEQ7VfQzVGQ5DZhBOP2anMyfH7S6xUpFRowLhR3oAFeHeIWOdyPq_kDI5Ol5EtMX85zmWI0IHWQO9xT7kPBu03bKJ8hezCObDQo9sUAXl7b3TEg6rMxba2HLecl4bdv4V5qldUUJ1-m26yg6-Tk7eBCeeU65pjRkIlR1qtA" />
</div>
<span className="font-label-sm text-label-sm text-primary font-bold uppercase">Combo Truyền Cảm Hứng</span>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
              Combo Tự Do - Chuyện Của Chúng Tôi + Tù Binh Thương Trường
            </h3>
</div>
<div className="mt-4 pt-2">
<div className="flex items-baseline gap-2 mb-3">
<span className="font-price-hero text-price-hero text-primary font-bold">286.400₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">358.000₫</span>
</div>
<button className="w-full py-2 bg-surface-container hover:bg-primary-container hover:text-on-primary text-primary font-label-md text-label-md font-bold rounded-lg transition" type="button">
              Thêm vào giỏ
            </button>
</div>
</div>
{/*  Item 3: Siêu Dự Báo  */}
<div className="group bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
<div>
<div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-3">
<span className="absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded bg-badge-discount text-white font-label-sm text-label-sm font-bold">-20%</span>
<img alt="Siêu Dự Báo - Superforecasting" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida/AEtjO1XtEadGI12QEZPMz9I2WkApYazDh5GblKze73XG-W9sdSB79bmGPy2U6FSD7sz9mu9ziIs3bHCa2U_sFWnDehSRlIBoww3B6HoHSVFvHZqpC9N3c0xJhOJpuqymE0A3KKtA2voqnzb01GwCViFi6xEGN7XOPRD44SALYT-UV3BxzBuheYpcnYC0_NihzVZPcXkSzZ_cNALgtQlIUpcYqNKj2HclFzw1ij6nyn47oce8CcvYiS9Ixz6asiI" />
</div>
<span className="font-label-sm text-label-sm text-primary font-bold uppercase">Kỹ Năng & Chiến Lược</span>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
              Siêu Dự Báo - Superforecasting: Phương Pháp Trên Tầm Chuyên Gia
            </h3>
</div>
<div className="mt-4 pt-2">
<div className="flex items-baseline gap-2 mb-3">
<span className="font-price-hero text-price-hero text-primary font-bold">175.200₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">219.000₫</span>
</div>
<button className="w-full py-2 bg-surface-container hover:bg-primary-container hover:text-on-primary text-primary font-label-md text-label-md font-bold rounded-lg transition" type="button">
              Thêm vào giỏ
            </button>
</div>
</div>
{/*  Item 4: Chiến Lược Marketing Công Nghệ  */}
<div className="group bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
<div>
<div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-3">
<span className="absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded bg-badge-discount text-white font-label-sm text-label-sm font-bold">-20%</span>
<img alt="Chiến Lược Marketing Cho Thị Trường Công Nghệ" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida/AEtjO1V3Dfrlv0TvVs0y9slMN9KFSWJSv_rCJih9PQl7z9YjYKzj6TPBUZOMAzamom7_kzz2u7wP5yEZuaQRH7QviKOLNV8rtTtDtzd3qlN2RGGZGYbqZGdzBKy8djSllqNZD4o8l__5XJs_D0NOcfyirF8_S_iVA3bhmekSUf86Fcq6OcGHumWVH3VB8omn6KaP7_de2W8F1ZkYe2TgfHLGH00tYvC2Qu1WHUEaIseQEqexlqnZ-LIYm_KFzKM" />
</div>
<span className="font-label-sm text-label-sm text-primary font-bold uppercase">Marketing & Bán Hàng</span>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
              Crossing The Chasm - Vượt Hố Sâu Thị Trường
            </h3>
</div>
<div className="mt-4 pt-2">
<div className="flex items-baseline gap-2 mb-3">
<span className="font-price-hero text-price-hero text-primary font-bold">143.200₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">179.000₫</span>
</div>
<button className="w-full py-2 bg-surface-container hover:bg-primary-container hover:text-on-primary text-primary font-label-md text-label-md font-bold rounded-lg transition" type="button">
              Thêm vào giỏ
            </button>
</div>
</div>
</div>
</div>
</section>
{/*  7. TỦ SÁCH CHUYÊN ĐỀ & ALPHA CARDS  */}
<section className="py-12 lg:py-16 bg-surface-subtle" id="tusach">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="text-center mb-8">
<h2 className="font-headline-xl text-headline-xl font-bold text-on-surface uppercase tracking-wide">TỦ SÁCH</h2>
<div className="flex items-center justify-center gap-2 mt-2 text-primary">
<div className="w-12 h-0.5 bg-primary-container"></div>
<span className="material-symbols-outlined text-[20px]">library_books</span>
<div className="w-12 h-0.5 bg-primary-container"></div>
</div>
</div>
{/*  Categories Pills Tabs  */}
<div className="flex items-center justify-center flex-wrap gap-2 mb-10">
<button className="px-5 py-2 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary-container transition" type="button">
          ALPHA CARDS
        </button>
<button className="px-5 py-2 rounded-full bg-surface-card hover:bg-surface-container text-on-surface-variant font-label-lg text-label-lg transition shadow-sm" type="button">
          Harvard Business Review
        </button>
<button className="px-5 py-2 rounded-full bg-surface-card hover:bg-surface-container text-on-surface-variant font-label-lg text-label-lg transition shadow-sm" type="button">
          Quản trị doanh nghiệp
        </button>
<button className="px-5 py-2 rounded-full bg-surface-card hover:bg-surface-container text-on-surface-variant font-label-lg text-label-lg transition shadow-sm" type="button">
          Tài chính - Đầu tư - Chứng khoán
        </button>
<button className="px-5 py-2 rounded-full bg-surface-card hover:bg-surface-container text-on-surface-variant font-label-lg text-label-lg transition shadow-sm" type="button">
          Công nghệ & Chuyển đổi số
        </button>
<button className="px-5 py-2 rounded-full bg-surface-card hover:bg-surface-container text-on-surface-variant font-label-lg text-label-lg transition shadow-sm" type="button">
          Marketing & Bán hàng
        </button>
<button className="px-5 py-2 rounded-full bg-surface-card hover:bg-surface-container text-on-surface-variant font-label-lg text-label-lg transition shadow-sm" type="button">
          Kỹ năng
        </button>
<button className="px-5 py-2 rounded-full bg-surface-card hover:bg-surface-container text-on-surface-variant font-label-lg text-label-lg transition shadow-sm" type="button">
          Sách điện tử
        </button>
</div>
{/*  Full-width Alpha Cards Promotion Banner Slider 5  */}
<div className="relative w-full rounded-2xl overflow-hidden shadow-lg mb-10 aspect-[3.2/1]">
<img alt="Khám phá trọn bộ thẻ Flashcard Alpha Cards" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1W_pbxI4KilYBOJxdnJdlpgEKel9e7rCIF5L709D7ZS0vq1_fefGFiBGKPZ-VPqf9TQ2RapiZT7IAGlnZHQO7zGWnEdu8G69Rl9vUoLd_sM75ZOf9LbU9ZB5QRAqylBJWOIdtsfWuGqZe0UApLQdJg_TX2mG4FtHNcVRGlVE2sc_-5HwI0nFzyiThm0otRj9slbB13mgxac_9nMTvTkvkxxFSOz_UPuUJUd-LymKaRVYI7xjoFEonFtC9o" />
</div>
{/*  Flashcards Grid  */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-4" id="alphacards">
{/*  Card 1  */}
<div className="bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
<div>
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-2.5">
<img alt="Flashcard Chìa khóa khai vấn" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WEA4b-IWpbiXR2bFRqjecKg70if61_XC0UvrAIgKRTUmoUY9XG70lYD79qfXvo1zI4Y-v1TF5JJWojmKeAyjO9mSuhxthjxOKjo1sxkslQh6FsKdM8YFPLPCMXQIe5yl6rRYEToL1GZP4c1MKYwLhI6HchzuHfhDoZcEZuMm0WVlhM7sc0EibGLvMNbk_ZYl9T0P64j8FBtsBN5HuWVFMXhGmBV9rIwtZrm_SkaYmqshjAf68vmKwuN2g" />
</div>
<p className="font-label-sm text-label-sm text-primary font-bold">COACHING</p>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2">
              Flashcard Chìa Khóa Khai Vấn - 48 Tình Huống Thực Tế
            </h4>
</div>
<div className="mt-3">
<div className="flex items-baseline gap-1.5">
<span className="font-price-card text-price-card text-primary font-bold">152.150₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">179.000₫</span>
</div>
</div>
</div>
{/*  Card 2  */}
<div className="bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
<div>
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-2.5">
<img alt="Flashcard SMART Goal" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1U1jpQ2RfXOZKMiQ-ob95ZvTCXicF6kayEvjavqUX09uwyTAM8apjROUiuDk2UjgJv5GgEClTtBF24kOCdzOyhiHrTr9MfYf0hpMl-lTkKAeARTsjkNpAidGidC5rZ86gnfoyH3JYxLCBBHnzZnFJsgK0ibynRW7_-KYXeW_CsmXukh1PXk5C23oHWYaR5o0f-kc60A2fdAZ6ldU8OgnfaET3lR5ZilDFOu6DGOpTkPOJUa0LKjRDbfSzU" />
</div>
<p className="font-label-sm text-label-sm text-primary font-bold">PRODUCTIVITY</p>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2">
              Flashcard SMART Goal – Thiết Lập Và Theo Dõi Mục Tiêu
            </h4>
</div>
<div className="mt-3">
<div className="flex items-baseline gap-1.5">
<span className="font-price-card text-price-card text-primary font-bold">152.150₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">179.000₫</span>
</div>
</div>
</div>
{/*  Card 3  */}
<div className="bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
<div>
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-2.5">
<img alt="Flashcard Kỹ Năng Bán Hàng" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XV1h1ufivG31SrT43cg7u66BFMZElI8Qk-pRkdrjNtmqJVxAGI4bMqhwFNBW--WkBRCuwaJDfkOHJcpiyMsRJP-VhfIS8-ijmuMJJsIzZLki1WpW6r2iWAZJf5_Af-lB4zm3p8gNXf0hs1w1FLhBJPq-kevyfVbwO0IGio1YmvdnOLXvip4CsFbi7inxlA62hgjIFG88wPTjsd388Pn0J88ckrsUDi42WNFkGQ_PdlajBbTZJrQmdOTpI" />
</div>
<p className="font-label-sm text-label-sm text-primary font-bold">SALES</p>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2">
              Flashcard Kỹ Năng Bán Hàng – 52 Tình Huống Thực Chiến
            </h4>
</div>
<div className="mt-3">
<div className="flex items-baseline gap-1.5">
<span className="font-price-card text-price-card text-primary font-bold">152.150₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">179.000₫</span>
</div>
</div>
</div>
{/*  Card 4  */}
<div className="bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
<div>
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-2.5">
<img alt="Flashcard Kỹ Năng Đọc Nhanh" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WF0oSPqQMoIr7ozdsMkTU0nwZB6EbjNuUOLNfbnv3tfUb0efAtjVZiNA8DjwVcDPl0RsNEMuU0403n7mlJSPFpEgMgzcNI_GPkTctSZRRTRKsnYI795etNbbku9UBY34jalNUai8Wbkr5WIKSuN-q1H7FI_vLhRr4smkpstN-xeLbTfQQnkTMXHOwVpLCZjVgnFyx1K-yXp369srI58yXZL01eKjnKVjhjBhnWwewfUCQn76KX7gw_H8k" />
</div>
<p className="font-label-sm text-label-sm text-primary font-bold">SKILLS</p>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2">
              Flashcard Kỹ Năng Đọc Nhanh – 48+ Mẹo Hiểu Kỹ Từ A-Z
            </h4>
</div>
<div className="mt-3">
<div className="flex items-baseline gap-1.5">
<span className="font-price-card text-price-card text-primary font-bold">152.150₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">179.000₫</span>
</div>
</div>
</div>
{/*  Card 5  */}
<div className="bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
<div>
<div className="aspect-[3/4] rounded-lg bg-surface-container-low overflow-hidden mb-2.5">
<img alt="Flashcard Tư Duy Phản Biện Thông Minh" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VbdcVtHDRAjvTAQHGyZxz-HPe_xUwi20ZVw6FnrQNspOf9Ku_JzzSNn8aVsjYid2YFx25JpIvLu_ZJTsBpjLXijXZ3HhyPEfmx5aE2tvdsGriQYkWWdpNnU8BFraJBWO6AAh_WOE_cLlyCZxznVpFq7PiWjwukItMTe3CI3j_AficIarq73KndLGFwR8R_cS9sMWUioI_QuuE5lReDt6hfNYfEP6_mF-JBqDHX3AOHvessrLsQM4VJ9ng" />
</div>
<p className="font-label-sm text-label-sm text-primary font-bold">THINKING</p>
<h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface line-clamp-2">
              Flashcard Tư Duy Phản Biện Thông Minh - Logic Sắc Bén
            </h4>
</div>
<div className="mt-3">
<div className="flex items-baseline gap-1.5">
<span className="font-price-card text-price-card text-primary font-bold">152.150₫</span>
<span className="font-body-sm text-body-sm text-text-muted line-through">179.000₫</span>
</div>
</div>
</div>
</div>
<div className="text-center mt-10">
<a className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-secondary-container shadow-md transition active:scale-95" href="#">
<span className="">Xem tất cả Alpha Cards</span>
<span className="material-symbols-outlined text-[18px]">east</span>
</a>
</div>
</div>
</section>
{/*  8. DỊCH VỤ TẠI ALPHA BOOKS (BIZONE)  */}
<section className="relative py-16 lg:py-20 text-white overflow-hidden" >
<div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-[2px]"></div>
<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
{/*  Info Column  */}
<div className="lg:col-span-4 space-y-4">
<span className="font-label-md text-label-md uppercase tracking-widest text-secondary-fixed">Giải pháp tổ chức</span>
<h2 className="font-headline-xl text-headline-xl font-extrabold uppercase leading-tight text-white">Dịch vụ<br className="" /><span className="text-secondary-fixed">tại DalifaBooks</span></h2>
<p className="font-body-md text-body-md text-white/80 leading-relaxed text-justify">
            Trong hành trình 20 năm đồng hành với cộng đồng, chúng tôi thấy nhu cầu ngày càng tăng của doanh nghiệp, các nhà quản lý muốn tiếp cận nhanh hơn đến tri thức quản trị cũng như mong muốn phát triển doanh nghiệp của mình thành một tổ chức học tập.
          </p>
<p className="font-body-md text-body-md text-white/90">DalifaBooks ra mắt <strong className="">Trung tâm Tư vấn & Hợp tác xuất bản (BIZONE)</strong> đáp ứng mọi nhu cầu:</p>
<div className="pt-2">
<a className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-secondary-container transition" href="#">
<span className="">Xem Thêm Dịch Vụ</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</div>
</div>
{/*  3 Service Cards  */}
<div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
{/*  Card 1  */}
<div className="bg-surface-card text-on-surface rounded-2xl p-5 shadow-2xl flex flex-col justify-between hover:-translate-y-1 transition duration-300">
<div className="space-y-3">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[28px]">fact_check</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Tư Vấn Chọn Sách</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Tư vấn sách chuẩn xác cho các bộ phận nhân sự, kinh doanh, tài chính phù hợp với chiến lược chuyên sâu từng giai đoạn.
              </p>
</div>
<div className="pt-4 flex items-center text-primary font-label-sm text-label-sm font-bold">
<span className="">Chi tiết</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</div>
</div>
{/*  Card 2  */}
<div className="bg-surface-card text-on-surface rounded-2xl p-5 shadow-2xl flex flex-col justify-between hover:-translate-y-1 transition duration-300">
<div className="space-y-3">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[28px]">corporate_fare</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Tủ Sách Doanh Nghiệp</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Tư vấn kiến tạo không gian thư viện học tập tri thức, truyền cảm hứng văn hóa đọc bền vững cho cán bộ nhân viên.
              </p>
</div>
<div className="pt-4 flex items-center text-primary font-label-sm text-label-sm font-bold">
<span className="">Chi tiết</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</div>
</div>
{/*  Card 3  */}
<div className="bg-surface-card text-on-surface rounded-2xl p-5 shadow-2xl flex flex-col justify-between hover:-translate-y-1 transition duration-300">
<div className="space-y-3">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[28px]">handshake</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Hợp Tác Xuất Bản</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Dịch vụ xuất bản trọn gói, bảo hộ bản quyền, biên dịch, in ấn kỷ yếu thương hiệu và sách tác giả độc quyền.
              </p>
</div>
<div className="pt-4 flex items-center text-primary font-label-sm text-label-sm font-bold">
<span className="">Chi tiết</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  9. CHUYÊN GIA ĐÁNH GIÁ VỀ ALPHA BOOKS (TESTIMONIALS)  */}
<section className="py-12 lg:py-16 bg-surface-canvas">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="text-center mb-10">
<h2 className="font-headline-xl text-headline-xl font-bold text-on-surface">Chuyên gia đánh giá về Dalifa Books</h2>
<div className="flex items-center justify-center gap-2 mt-2 text-primary">
<div className="w-12 h-0.5 bg-primary-container"></div>
<span className="material-symbols-outlined text-[20px]">format_quote</span>
<div className="w-12 h-0.5 bg-primary-container"></div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/*  Testimonial 1  */}
<div className="bg-surface-card rounded-2xl p-6 shadow-md hover:shadow-lg transition relative flex flex-col justify-between">
<div className="flex items-start gap-4">
<div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-primary shrink-0 ring-4 ring-primary-fixed">
<span className="material-symbols-outlined text-[32px]">person</span>
</div>
<div className="space-y-2">
<span className="material-symbols-outlined text-[32px] text-primary/30">format_quote</span>
<p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">DalifaBooks được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư… với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng trên thế giới.</p>
</div>
</div>
<div className="pt-4 mt-4 bg-surface-container-low p-3 rounded-xl">
<p className="font-label-lg text-label-lg font-bold text-primary">Ông Lê Quốc Vinh</p>
<p className="font-body-sm text-body-sm text-text-muted">Chủ tịch HĐQT kiêm TGĐ Le Invest (Holdings) Corporation</p>
</div>
</div>
{/*  Testimonial 2  */}
<div className="bg-surface-card rounded-2xl p-6 shadow-md hover:shadow-lg transition relative flex flex-col justify-between">
<div className="flex items-start gap-4">
<div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-primary shrink-0 ring-4 ring-primary-fixed">
<span className="material-symbols-outlined text-[32px]">person</span>
</div>
<div className="space-y-2">
<span className="material-symbols-outlined text-[32px] text-primary/30">format_quote</span>
<p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">DalifaBooks được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư… với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng trên thế giới.</p>
</div>
</div>
<div className="pt-4 mt-4 bg-surface-container-low p-3 rounded-xl">
<p className="font-label-lg text-label-lg font-bold text-primary">Ông Nguyễn Đình Thành</p>
<p className="font-body-sm text-body-sm text-text-muted">Đồng sáng lập Elite PR School</p>
</div>
</div>
{/*  Testimonial 3  */}
<div className="bg-surface-card rounded-2xl p-6 shadow-md hover:shadow-lg transition relative flex flex-col justify-between">
<div className="flex items-start gap-4">
<div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-primary shrink-0 ring-4 ring-primary-fixed">
<span className="material-symbols-outlined text-[32px]">person</span>
</div>
<div className="space-y-2">
<span className="material-symbols-outlined text-[32px] text-primary/30">format_quote</span>
<p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">DalifaBooks được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư… với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng trên thế giới.</p>
</div>
</div>
<div className="pt-4 mt-4 bg-surface-container-low p-3 rounded-xl">
<p className="font-label-lg text-label-lg font-bold text-primary">Bà Đặng Thanh Vân</p>
<p className="font-body-sm text-body-sm text-text-muted">Founder và Chủ tịch HĐQT Công ty CP Thương hiệu và Quản trị Thanhs</p>
</div>
</div>
{/*  Testimonial 4  */}
<div className="bg-surface-card rounded-2xl p-6 shadow-md hover:shadow-lg transition relative flex flex-col justify-between">
<div className="flex items-start gap-4">
<div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-primary shrink-0 ring-4 ring-primary-fixed">
<span className="material-symbols-outlined text-[32px]">person</span>
</div>
<div className="space-y-2">
<span className="material-symbols-outlined text-[32px] text-primary/30">format_quote</span>
<p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">DalifaBooks được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư… với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng trên thế giới.</p>
</div>
</div>
<div className="pt-4 mt-4 bg-surface-container-low p-3 rounded-xl">
<p className="font-label-lg text-label-lg font-bold text-primary">Ông Lê Quang Vũ</p>
<p className="font-body-sm text-body-sm text-text-muted">CEO Blue C</p>
</div>
</div>
</div>
</div>
</section>
{/*  10. TIN TỨC & SỰ KIỆN  */}
<section className="py-12 lg:py-16 bg-surface-subtle">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
{/*  TIN TỨC  */}
<div>
<div className="flex items-center justify-between pb-4 mb-6">
<div className="flex items-center gap-2">
<span className="w-2.5 h-6 bg-primary-container rounded-full"></span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">TIN TỨC</h2>
</div>
<a className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 font-semibold" href="#">
              Xem tất cả <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
<div className="space-y-4">
{/*  News 1  */}
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4">
<div className="sm:w-36 h-28 rounded-lg overflow-hidden bg-surface-container shrink-0">
<img alt="Dịch giả Nguyễn Tuấn Linh chia sẻ sách iGen" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WF0oSPqQMoIr7ozdsMkTU0nwZB6EbjNuUOLNfbnv3tfUb0efAtjVZiNA8DjwVcDPl0RsNEMuU0403n7mlJSPFpEgMgzcNI_GPkTctSZRRTRKsnYI795etNbbku9UBY34jalNUai8Wbkr5WIKSuN-q1H7FI_vLhRr4smkpstN-xeLbTfQQnkTMXHOwVpLCZjVgnFyx1K-yXp369srI58yXZL01eKjnKVjhjBhnWwewfUCQn76KX7gw_H8k" />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[14px]">calendar_today</span>
<span className="">14/09/2026</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface hover:text-primary transition line-clamp-2">
                  Dịch giả Nguyễn Tuấn Linh chia sẻ về sách "iGen - thế hệ smartphone"
                </h3>
<p className="font-body-sm text-body-sm text-text-muted line-clamp-2">
                  Góc nhìn sâu sắc của dịch giả về tác động của kỷ nguyên số và thói quen hành vi giới trẻ...
                </p>
</div>
</div>
{/*  News 2  */}
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4">
<div className="sm:w-36 h-28 rounded-lg overflow-hidden bg-surface-container shrink-0">
<img alt="Ra mắt chính thức sách Lý Thư Phúc" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1X5C0wmKlfRb2AvSrtMcFAQVl001m1K4i9byiq0S6IBEEvxjX3n8XpL8squbtvQOB1xbohYgCh1CuXDSxXHsOck4RwLN-FPUtQQ-cxgHc0hsrSUM-I7vfdtsvs88XOqdCywxOncsrJtT2hOkg1L1qIevcr8I9RFz5Gq24uLwHP5dUcyfICHrUXWdb2qy_i9SR5r2EGtYzDZ-pzIWWTXOOzq9HVvVnVyizkpQnoVfpvUlAPPLiDgz1H4XHE" />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[14px]">calendar_today</span>
<span className="">25/06/2026</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface hover:text-primary transition line-clamp-2">
                  Ra mắt chính thức cuốn sách: "Lý Thư Phúc – Thời thế tạo nên tôi"
                </h3>
<p className="font-body-sm text-body-sm text-text-muted line-clamp-2">
                  Hợp tác cùng Tasco Auto tại GEELY DAY giới thiệu thiên anh hùng ca ngành công nghiệp ô tô...
                </p>
</div>
</div>
{/*  News 3  */}
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4">
<div className="sm:w-36 h-28 rounded-lg overflow-hidden bg-surface-container shrink-0">
<img alt="Review sách Thay Đổi Tí Hon" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XV1h1ufivG31SrT43cg7u66BFMZElI8Qk-pRkdrjNtmqJVxAGI4bMqhwFNBW--WkBRCuwaJDfkOHJcpiyMsRJP-VhfIS8-ijmuMJJsIzZLki1WpW6r2iWAZJf5_Af-lB4zm3p8gNXf0hs1w1FLhBJPq-kevyfVbwO0IGio1YmvdnOLXvip4CsFbi7inxlA62hgjIFG88wPTjsd388Pn0J88ckrsUDi42WNFkGQ_PdlajBbTZJrQmdOTpI" />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[14px]">calendar_today</span>
<span className="">26/03/2026</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface hover:text-primary transition line-clamp-2">
                  REVIEW SÁCH THAY ĐỔI TÍ HON - GIÀU CÓ BẤT NGỜ
                </h3>
<p className="font-body-sm text-body-sm text-text-muted line-clamp-2">
                  Tự do tài chính bắt đầu từ những thói quen nhỏ nhất mỗi ngày trong đời sống chi tiêu...
                </p>
</div>
</div>
</div>
</div>
{/*  SỰ KIỆN  */}
<div>
<div className="flex items-center justify-between pb-4 mb-6">
<div className="flex items-center gap-2">
<span className="w-2.5 h-6 bg-secondary-container rounded-full"></span>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">SỰ KIỆN</h2>
</div>
<a className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 font-semibold" href="#">
              Xem tất cả <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
<div className="space-y-4">
{/*  Event 1  */}
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4">
<div className="sm:w-36 h-28 rounded-lg overflow-hidden bg-surface-container shrink-0">
<img alt="Điểm chạm tuyệt vời AI & Marketing" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1V3Dfrlv0TvVs0y9slMN9KFSWJSv_rCJih9PQl7z9YjYKzj6TPBUZOMAzamom7_kzz2u7wP5yEZuaQRH7QviKOLNV8rtTtDtzd3qlN2RGGZGYbqZGdzBKy8djSllqNZD4o8l__5XJs_D0NOcfyirF8_S_iVA3bhmekSUf86Fcq6OcGHumWVH3VB8omn6KaP7_de2W8F1ZkYe2TgfHLGH00tYvC2Qu1WHUEaIseQEqexlqnZ-LIYm_KFzKM" />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[14px]">event</span>
<span className="">16/01/2026</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface hover:text-primary transition line-clamp-2">
                  ĐIỂM CHẠM TUYỆT VỜI - KẾT NỐI AI VÀ MARKETING ĐỂ DẪN ĐẦU XU THẾ
                </h3>
<p className="font-body-sm text-body-sm text-text-muted line-clamp-2">
                  Tọa đàm chuyên sâu cùng các chuyên gia hàng đầu về ứng dụng trí tuệ nhân tạo trong tiếp thị số...
                </p>
</div>
</div>
{/*  Event 2  */}
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4">
<div className="sm:w-36 h-28 rounded-lg overflow-hidden bg-surface-container shrink-0">
<img alt="Truy tìm Satoshi - Bí ẩn Bitcoin" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VbdcVtHDRAjvTAQHGyZxz-HPe_xUwi20ZVw6FnrQNspOf9Ku_JzzSNn8aVsjYid2YFx25JpIvLu_ZJTsBpjLXijXZ3HhyPEfmx5aE2tvdsGriQYkWWdpNnU8BFraJBWO6AAh_WOE_cLlyCZxznVpFq7PiWjwukItMTe3CI3j_AficIarq73KndLGFwR8R_cS9sMWUioI_QuuE5lReDt6hfNYfEP6_mF-JBqDHX3AOHvessrLsQM4VJ9ng" />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[14px]">event</span>
<span className="">17/12/2025</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface hover:text-primary transition line-clamp-2">
                  TRUY TÌM SATOSHI - 15 NĂM THEO DẤU CHA ĐẺ BITCOIN
                </h3>
<p className="font-body-sm text-body-sm text-text-muted line-clamp-2">
                  Giải mã bí ẩn lớn nhất kỷ nguyên kinh tế số và công nghệ chuỗi khối...
                </p>
</div>
</div>
{/*  Event 3  */}
<div className="bg-surface-card rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4">
<div className="sm:w-36 h-28 rounded-lg overflow-hidden bg-surface-container shrink-0">
<img alt="Sam Altman - Cuộc chơi AI toàn cầu" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1U1jpQ2RfXOZKMiQ-ob95ZvTCXicF6kayEvjavqUX09uwyTAM8apjROUiuDk2UjgJv5GgEClTtBF24kOCdzOyhiHrTr9MfYf0hpMl-lTkKAeARTsjkNpAidGidC5rZ86gnfoyH3JYxLCBBHnzZnFJsgK0ibynRW7_-KYXeW_CsmXukh1PXk5C23oHWYaR5o0f-kc60A2fdAZ6ldU8OgnfaET3lR5ZilDFOu6DGOpTkPOJUa0LKjRDbfSzU" />
</div>
<div className="space-y-1">
<div className="flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[14px]">event</span>
<span className="">13/12/2025</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface hover:text-primary transition line-clamp-2">
                  Sam Altman - Người kiến tạo cuộc chơi AI toàn cầu
                </h3>
<p className="font-body-sm text-body-sm text-text-muted line-clamp-2">
                  Buổi đối thoại trực tuyến cùng các nhà phân tích chiến lược công nghệ thế giới...
                </p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  FLOATING QUICK ACTION BUTTONS  */}
<aside aria-label="Hỗ trợ nhanh" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
<a className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-2xl hover:scale-110 transition-transform" href="tel:0932329959" title="Gọi Hotline: 0932 329 959">
<span className="material-symbols-outlined text-[24px]">call</span>
</a>
<a className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow-2xl hover:scale-110 transition-transform" href="#" title="Tư vấn sách nhanh">
<span className="material-symbols-outlined text-[24px]">chat</span>
</a>
</aside>
</div>

    </main>
  );
}
