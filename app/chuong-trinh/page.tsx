import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import ProjectsList from '@/components/ProjectsList';
import ProgramHero from '@/components/ProgramHero';

import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

async function getProjects() {
    try {
        await dbConnect();
        const projects = await Project.find({})
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    // Collect all images from projects (thumbnail + images array) and shuffle to pick 5 random ones
    const allImages = projects
        .flatMap((p: any) => [p.thumbnail, ...(p.images || [])])
        .filter((img: string) => img && typeof img === 'string' && img.length > 0);

    // Fisher-Yates shuffle
    const shuffledImages = [...allImages];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }

    const heroImages = shuffledImages.slice(0, 5);

    return (
        <div className="min-h-screen bg-[#fffdfa]">
            {/* Header section with slideshow */}
            <ProgramHero images={heroImages} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <Breadcrumb items={[{ label: 'Chương trình', href: '/chuong-trinh' }]} />
            </div>

            <ProjectsList initialProjects={projects} />
        </div>
    );
}
