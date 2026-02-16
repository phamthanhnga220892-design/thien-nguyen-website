import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    badge?: string;
    backgroundImage?: string;
    className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    badge,
    backgroundImage,
    className
}) => {
    return (
        <div className={`relative overflow-hidden ${className || 'py-32 md:py-48'}`}>
            {/* Background */}
            {backgroundImage ? (
                <>
                    <div className="absolute inset-0 z-0">
                        <img
                            src={backgroundImage}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-lapis-900/60 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#fffdfa] via-transparent to-lapis-900/20"></div>
                    </div>
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-lapis-50 via-white to-amber-50"></div>
            )}

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {badge && (
                    <div className="inline-flex items-center px-5 py-2 rounded-full bg-amber-400 text-amber-950 text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-xl shadow-amber-200">
                        {badge}
                    </div>
                )}
                <h1 className={`text-5xl md:text-7xl font-bold mb-6 font-display ${backgroundImage ? 'text-white drop-shadow-xl' : 'text-lapis-900'
                    }`}>
                    {title}
                </h1>
                {description && (
                    <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${backgroundImage ? 'text-white drop-shadow-lg font-medium' : 'text-gray-600'
                        }`}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
