import Link from 'next/link';

const CTASection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-lapis-600 to-lapis-400 rounded-[3.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-lapis-300/50">
                <div className="absolute top-0 right-0 -mr-32 -mt-32 h-96 w-96 bg-amber-300/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 -ml-32 -mb-32 h-96 w-96 bg-white/10 rounded-full blur-[100px]"></div>

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 font-display">Gieo Mầm Hạnh Phúc</h2>
                    <p className="text-lapis-50 mb-12 max-w-2xl mx-auto text-lg md:text-2xl font-light leading-relaxed">
                        Dù một hạt cát hay một viên gạch, mọi sự trợ duyên của quý vị đều góp phần xây dựng một thế giới tràn đầy ánh sáng.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/ung-ho" className="px-12 py-5 bg-amber-400 hover:bg-white text-amber-950 hover:text-lapis-600 font-bold rounded-full transition-all hover:scale-105 shadow-xl text-lg">
                            Phát Tâm Công Đức
                        </Link>
                        <Link href="/bao-cao" className="px-12 py-5 bg-transparent border-2 border-white/40 hover:bg-white/10 text-white font-bold rounded-full transition-all text-lg">
                            Minh Bạch Tài Chính
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
