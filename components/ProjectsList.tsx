'use client';

import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';

type FilterType = 'all' | 'ongoing' | 'completed';

interface ProjectsListProps {
    initialProjects: any[];
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = initialProjects.filter(p => {
        // Filter by status
        const matchesFilter = filter === 'all' || p.status === filter;

        // Filter by search term (title or description)
        const matchesSearch =
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            {/* Filter and Search Bar */}
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-lapis-100/30 border border-amber-50 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Filter Buttons */}
                <div className="flex items-center space-x-3 overflow-x-auto pb-2 md:pb-0">
                    <Filter className="h-5 w-5 text-lapis-300 mr-2 shrink-0" />
                    {[
                        { label: 'Tất cả', value: 'all' as FilterType },
                        { label: 'Đang triển khai', value: 'ongoing' as FilterType },
                        { label: 'Đã hoàn thành', value: 'completed' as FilterType },
                    ].map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setFilter(btn.value)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === btn.value
                                ? 'bg-lapis-600 text-white shadow-lg shadow-lapis-200'
                                : 'bg-gray-50 text-gray-500 hover:bg-lapis-50'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-lapis-300 group-focus-within:text-lapis-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm chương trình..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-lapis-500 w-full md:w-80 font-medium text-gray-700 outline-none"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProjects.map(project => (
                        <ProjectCard
                            key={project._id}
                            id={project._id}
                            title={project.title}
                            description={project.description}
                            image={project.thumbnail}
                            raised={project.totalDonated?.toString() || '0'}
                            goal={project.targetAmount?.toString()}
                            status={project.status === 'ongoing' ? 'Đang triển khai' : 'Đã hoàn thành'}
                            createdAt={project.createdAt}
                            featured={false}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-lapis-100">
                    <div className="bg-lapis-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="h-8 w-8 text-lapis-300" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg font-display">
                        Chưa tìm thấy chương trình nào phù hợp
                    </p>
                </div>
            )}
        </div>
    );
}
