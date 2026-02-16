import Link from 'next/link';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

interface ProjectCardProps {
    id: string | number;
    title: string;
    description: string;
    image?: string;
    raised?: string;
    goal?: string;
    status: string;
    featured?: boolean;
    createdAt?: string;
}

const ProjectCard = ({
    id,
    title,
    description,
    image,
    raised,
    goal,
    status,
    featured = false,
    createdAt = new Date().toISOString()
}: ProjectCardProps) => {
    const isCompleted = status === 'Đã hoàn thành';
    const large = featured;


    // Use provided image or fallback to placeholder
    const thumbnailUrl = image || `https://picsum.photos/seed/project${id}/800/600`;

    // Extract first sentence for link text
    const getFirstSentence = (text: string) => {
        if (!text) return 'Xem chi tiết chương trình';
        const match = text.match(/^.*?[.!?](\s|$)/);
        return match ? match[0].trim() : text;
    };

    const linkText = getFirstSentence(description);

    if (large) {
        // Large horizontal card for featured projects
        return (
            <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-lapis-200/50 transition-all duration-500 flex flex-col md:flex-row h-full border border-amber-50">
                <div className="relative overflow-hidden md:w-1/2 aspect-video">
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg ${isCompleted ? 'bg-white/90 text-gray-500' : 'bg-amber-400/90 text-amber-950'
                        }`}>
                        {isCompleted ? 'Hữu Duyên Hoàn Thành' : 'Đang Gieo Hạt'}
                    </div>
                </div>

                <div className="p-10 flex flex-col flex-grow md:w-1/2 justify-center">
                    <div className="flex items-center text-lapis-400 text-xs mb-4 font-bold tracking-widest uppercase">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(createdAt).toLocaleDateString('vi-VN')}
                    </div>


                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight font-display text-lapis-900 group-hover:text-lapis-600 transition-colors line-clamp-2" title={title}>
                        {title}
                    </h3>

                    <p className="text-gray-500 text-sm mb-8 flex-grow line-clamp-3 leading-relaxed">
                        {description}
                    </p>

                    {raised && goal && (
                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-lapis-600">{raised} VNĐ</span>
                                <span className="text-gray-500">Mục tiêu: {goal} VNĐ</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-lapis-500 to-lapis-600 h-2 rounded-full transition-all"
                                    style={{ width: `${(parseInt(raised.replace(/,/g, '')) / parseInt(goal.replace(/,/g, ''))) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <Link
                        href={`/du-an/${id}`}
                        className="inline-flex items-center text-lapis-600 font-bold text-sm hover:text-amber-600 transition-colors group/link"
                    >
                        <Sparkles className="h-4 w-4 mr-2 text-amber-400 flex-shrink-0" />
                        <span className="line-clamp-1">{linkText}</span>
                        <ChevronRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform flex-shrink-0" />
                    </Link>
                </div>
            </div>
        );
    }

    // Small vertical card for support projects
    return (
        <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-lapis-200/50 transition-all duration-500 flex flex-col border border-amber-50">
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg ${isCompleted ? 'bg-white/90 text-gray-500' : 'bg-amber-400/90 text-amber-950'
                    }`}>
                    {isCompleted ? 'Hữu Duyên Hoàn Thành' : 'Đang Gieo Hạt'}
                </div>
            </div>

            <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center text-lapis-400 text-xs mb-4 font-bold tracking-widest uppercase">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(createdAt).toLocaleDateString('vi-VN')}
                </div>


                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight font-display text-lapis-900 group-hover:text-lapis-600 transition-colors line-clamp-2 min-h-[3.5rem]" title={title}>
                    {title}
                </h3>

                <p className="text-gray-500 text-sm mb-8 flex-grow line-clamp-3 leading-relaxed">
                    {description}
                </p>

                <Link
                    href={`/du-an/${id}`}
                    className="inline-flex items-center text-lapis-600 font-bold text-sm hover:text-amber-600 transition-colors group/link"
                >
                    <Sparkles className="h-4 w-4 mr-2 text-amber-400 flex-shrink-0" />
                    <span className="line-clamp-1">{linkText}</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
