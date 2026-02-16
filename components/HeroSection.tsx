import Link from 'next/link';
import { Heart, Sun } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative h-[650px] md:h-[800px] overflow-hidden flex items-center">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=2000"
                    alt="Nature Healing"
                    className="w-full h-full object-cover"
                />
                {/* Vibrant blue to transparent/white gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-lapis-900/60 via-lapis-800/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#fffdfa] via-transparent to-lapis-900/40"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center px-5 py-2 rounded-full bg-amber-400 text-amber-950 text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-bounce shadow-xl shadow-amber-200">
                        <Sun className="h-4 w-4 mr-2" />
                        Ánh Sáng Của Sự Sẻ Chia
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight font-display text-white drop-shadow-lg italic">
                        Kết <span className="text-amber-300 not-italic">Duyên</span> Lành<br />
                        Trao <span className="text-amber-300 not-italic">Yêu</span> Thương
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl font-light leading-relaxed drop-shadow-md">
                        Cùng Tâm Nga gieo những hạt mầm hạnh phúc, xoa dịu những nỗi đau và thắp sáng hy vọng cho mọi nhà.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="/ung-ho" className="px-12 py-5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-2xl shadow-amber-500/40 transform transition hover:scale-105 active:scale-95 flex items-center justify-center">
                            Phát Tâm Ngay <Heart className="ml-2 h-5 w-5 fill-current" />
                        </Link>
                        <Link href="/du-an" className="px-12 py-5 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-lapis-900 border border-white/50 font-bold rounded-full transition-all flex items-center justify-center">
                            Xem Các Phật Sự
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
