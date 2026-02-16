import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Sparkles, Heart, ChevronRight, Share2 } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import ProjectCard from '@/components/ProjectCard';
import { notFound } from 'next/navigation';

import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export const dynamic = 'force-dynamic';

async function getProject(id: string) {
    try {
        await dbConnect();
        const project = await Project.findById(id).lean();

        if (!project) return null;
        return JSON.parse(JSON.stringify(project));
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

async function getRelatedProjects(currentId: string, status: string) {
    try {
        await dbConnect();
        const projects = await Project.find({
            _id: { $ne: currentId },
            status: status
        })
            .limit(3)
            .lean();

        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Error fetching related projects:', error);
        return [];
    }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    const relatedProjects = await getRelatedProjects(project._id, project.status);

    const progress = project.targetAmount && project.totalDonated
        ? Math.round((project.totalDonated / project.targetAmount) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-[#fffdfa]">
            <Breadcrumb items={[
                { label: 'Chương trình', href: '/du-an' },
                { label: project.title, href: `/du-an/${project._id}` }
            ]} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Image */}
                <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden mb-12 group">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-8 left-8">
                        <span className={`px-6 py-3 rounded-full text-sm font-bold backdrop-blur-md ${project.status === 'ongoing'
                            ? 'bg-amber-400/90 text-amber-950'
                            : 'bg-gray-700/90 text-white'
                            }`}>
                            {project.status === 'ongoing' ? 'Đang triển khai' : 'Đã hoàn thành'}
                        </span>
                    </div>

                    {/* Share Button */}
                    <button className="absolute top-8 right-8 p-4 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-colors">
                        <Share2 className="h-5 w-5 text-lapis-600" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title and Meta */}
                        <div>
                            <div className="flex items-center text-lapis-400 text-sm mb-4 font-bold tracking-widest uppercase">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(project.createdAt).toLocaleDateString('vi-VN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-lapis-900 mb-6 font-display">
                                {project.title}
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            <div className="prose prose-lg max-w-none">
                                {project.content?.split('\n\n').map((paragraph: string, index: number) => (
                                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                                        {paragraph}
                                    </p>
                                )) || <p className="text-gray-500">Nội dung đang cập nhật...</p>}
                            </div>
                        </div>

                        {/* Image Gallery */}
                        {project.images && project.images.length > 1 && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-lapis-900 font-display">Hình ảnh hoạt động</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {project.images.map((image: string, index: number) => (
                                        <div key={index} className="rounded-[2rem] overflow-hidden aspect-video relative">
                                            <Image
                                                src={image}
                                                alt={`${project.title} - ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Progress Card */}
                        {project.targetAmount && project.totalDonated && (
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-lapis-100/30 border border-amber-50 sticky top-24">
                                <h3 className="text-xl font-bold text-lapis-900 mb-6 font-display">
                                    Tiến độ dự án
                                </h3>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-500 font-semibold">Đã quyên góp</span>
                                            <span className="text-lapis-600 font-bold">{progress}%</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-lapis-500 to-amber-400 rounded-full transition-all duration-1000"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm text-gray-500">Hiện tại</span>
                                        <span className="text-2xl font-bold text-lapis-900">
                                            {(project.totalDonated / 1000000).toFixed(0)}tr
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm text-gray-500">Mục tiêu</span>
                                        <span className="text-lg font-semibold text-gray-600">
                                            {(project.targetAmount / 1000000).toFixed(0)}tr
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/ung-ho"
                                    className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-full shadow-xl shadow-amber-200 transition-all hover:scale-105 active:scale-95"
                                >
                                    Ủng hộ ngay <Heart className="ml-2 h-5 w-5 fill-current" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div className="mt-24">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-lapis-900 font-display mb-2">
                                    Dự án liên quan
                                </h2>
                                <div className="h-1.5 w-32 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
                            </div>
                            <Link
                                href="/chuong-trinh"
                                className="flex items-center text-lapis-600 font-semibold hover:text-lapis-700 transition-colors"
                            >
                                Xem tất cả <ChevronRight className="h-5 w-5 ml-1" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {relatedProjects.map((relatedProject: any) => (
                                <ProjectCard
                                    key={relatedProject._id}
                                    id={relatedProject._id}
                                    title={relatedProject.title}
                                    description={relatedProject.description}
                                    status={relatedProject.status === 'ongoing' ? 'Đang triển khai' : 'Đã hoàn thành'}
                                    createdAt={relatedProject.createdAt}
                                    featured={false}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
