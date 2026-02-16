import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import { ShieldCheck, Users, HandHeart, Heart, ChevronRight } from 'lucide-react';

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

export default async function Home() {
  const allProjects = await getProjects();

  // BRD Requirement: 2 featured projects (type=featured)
  const featuredProjects = allProjects
    .filter((p: any) => p.type === 'featured')
    .slice(0, 2);

  // BRD Requirement: Top 4 support projects (type=support, prioritize ongoing)
  const supportProjects = allProjects
    .filter((p: any) => p.type === 'support')
    .sort((a: any, b: any) => {
      // Prioritize ongoing projects
      if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
      if (a.status !== 'ongoing' && b.status === 'ongoing') return 1;
      // Then sort by date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 4);

  return (
    <div className="space-y-24 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Impact Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Phật sự hoàn thành', value: '150+', icon: ShieldCheck, color: 'text-lapis-500', bg: 'bg-lapis-50' },
            { label: 'Hữu duyên thụ hưởng', value: '10k+', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Mạnh thường quân', value: '2.5k+', icon: HandHeart, color: 'text-pink-500', bg: 'bg-pink-50' },
            { label: 'Năm hoạt động', value: '5+', icon: Heart, color: 'text-orange-500', bg: 'bg-orange-50' },
          ].map((stat, idx) => (
            <div key={idx} className={`${stat.bg} p-8 rounded-[2.5rem] shadow-xl shadow-lapis-100/20 text-center flex flex-col items-center border border-white hover:translate-y-[-8px] transition-transform duration-300`}>
              <div className="p-4 rounded-2xl bg-white shadow-sm mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects - BRD: 2 featured projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-lapis-800 mb-3 font-display">Tâm Điểm Yêu Thương</h2>
            <div className="h-1.5 w-32 bg-amber-400 rounded-full mb-4 mx-auto md:mx-0"></div>
            <p className="text-gray-500 max-w-md">Sự trợ duyên của quý vị là nguồn sống cho những dự án này.</p>
          </div>
          <Link href="/du-an" className="text-lapis-600 font-bold flex items-center hover:text-amber-600 transition-colors self-center md:self-end text-lg">
            Tất cả chương trình <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredProjects.map((project: any) => (
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
                featured={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Chưa có dự án tiêu biểu nào
          </div>
        )}
      </section>

      {/* Support Projects - BRD: Top 4 support projects, prioritize ongoing */}
      <section className="bg-gradient-to-b from-amber-50/50 to-white py-24 rounded-[4rem] mx-4 md:mx-8 border border-amber-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-lapis-900 mb-4 font-display">Việc Lành Mỗi Ngày</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg italic">
              "Bàn tay tặng hoa hồng luôn phảng phất hương thơm"
            </p>
          </div>
          {supportProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportProjects.map((project: any) => (
                <ProjectCard
                  key={project._id}
                  id={project._id}
                  title={project.title}
                  description={project.description}
                  image={project.thumbnail}
                  status={project.status === 'ongoing' ? 'Đang triển khai' : 'Đã hoàn thành'}
                  createdAt={project.createdAt}
                  featured={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Chưa có dự án hỗ trợ nào
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
