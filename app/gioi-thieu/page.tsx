import React from 'react';
import { ShieldCheck, Users, HandHeart, Heart, Target, Lightbulb, Award } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Breadcrumb from '@/components/Breadcrumb';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#fffdfa]">
            <PageHeader
                title="Thiện Nguyện Tâm Nga"
                description="Hành trình lan tỏa yêu thương và chia sẻ với cộng đồng"
                backgroundImage="/images/about-header.jpg"
            />

            <Breadcrumb items={[{ label: 'Giới thiệu', href: '/gioi-thieu' }]} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
                {/* Story Section */}
                <div className="max-w-4xl mx-auto mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-lapis-900 font-display mb-4">
                            Câu Chuyện Của Chúng Tôi
                        </h2>
                        <div className="h-1.5 w-32 bg-gradient-to-r from-amber-400 to-transparent rounded-full mx-auto"></div>
                    </div>

                    <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            <strong className="text-lapis-900">Nhóm thiện nguyện Tâm Nga</strong> được khởi nguồn từ một tâm nguyện giản đơn:
                            "Nếu cuộc đời cho ta may mắn hơn một chút, hãy dành phần dư dả ấy để tưới mát cho những mảnh đời còn gian khó."
                            Chính thức hoạt động từ năm 2023, Tâm Nga không chỉ là một tổ chức thiện nguyện, mà là nhịp cầu nối những tấm lòng nhân ái,
                            cùng nhau lan tỏa tinh thần sẻ chia và tìm thấy sự bình an trong việc trao đi.
                        </p>
                        <h3 className="text-2xl font-bold text-lapis-900 font-display mt-8 mb-4">Câu chuyện khởi nguồn</h3>
                        <p>
                            Hành trình của Tâm Nga bắt đầu từ những buổi sáng sớm tại hành lang Bệnh viện K Tam Hiệp.
                            Hình ảnh những bệnh nhân kiên cường chiến đấu với bệnh tật đã thôi thúc chúng tôi trao đi những ổ bánh mì chay ấm nóng đầu tiên.
                            Một bữa sáng thanh đạm, một nụ cười cảm thông – đó là cách Tâm Nga chọn để nói với các "chiến binh K" rằng: Bạn không hề đơn độc.
                        </p>
                    </div>
                </div>

                {/* Mission & Core Values Header - Moved to combine with Core Values section below */}

                {/* Core Values */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-lapis-900 font-display mb-4">
                            Sứ Mệnh & Giá Trị Cốt Lõi
                        </h2>
                        <div className="h-1.5 w-32 bg-gradient-to-r from-amber-400 to-transparent rounded-full mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Heart,
                                title: 'Thấu cảm',
                                description: 'Lắng nghe và sẻ chia với những hoàn cảnh ngặt nghèo bằng tình thương chân thành nhất.'
                            },
                            {
                                icon: Users, // Changed icon to represent connection/spreading
                                title: 'Lan tỏa',
                                description: 'Kết nối cộng đồng để cùng chung tay gieo hạt giống thiện lành, giúp những điều tốt đẹp không ngừng nhân lên.'
                            },
                            {
                                icon: Lightbulb, // Changed icon to represent inner peace/enlightenment
                                title: 'An lạc',
                                description: 'Dưới ánh sáng từ bi của Phật Dược Sư, mong muốn mang tinh thần Phật pháp vào mỗi hành động, giúp mọi người tìm thấy sự tĩnh tại.'
                            }
                        ].map((value, index) => (
                            <div key={index} className="bg-white rounded-[2.5rem] p-8 text-center shadow-lg shadow-lapis-100/30 border border-amber-50 hover:-translate-y-2 transition-transform duration-300">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-lapis-500 to-amber-400 text-white mb-6">
                                    <value.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-lapis-900 mb-3 font-display">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Impact Stats */}
                {/* Projects Section - Những dấu chân yêu thương */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-lapis-900 font-display mb-4">
                            Những Dấu Chân Yêu Thương
                        </h2>
                        <div className="h-1.5 w-32 bg-gradient-to-r from-amber-400 to-transparent rounded-full mx-auto"></div>
                        <p className="text-gray-600 mt-4 text-lg">
                            Các dự án ý nghĩa mà Tâm Nga đã và đang đồng hành
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: HandHeart,
                                title: 'Bữa sáng yêu thương',
                                description: 'Duy trì đều đặn hoạt động phát đồ ăn sáng chay hàng tháng tại Bệnh viện K Tam Hiệp và K Tân Triều.'
                            },
                            {
                                icon: Lightbulb,
                                title: 'Thắp sáng ước mơ',
                                description: 'Tiếp sức cho các em học sinh tiểu học có hoàn cảnh khó khăn tại vùng cao Thanh Hóa, giúp con đường đến trường của các em bớt gập ghềnh.'
                            },
                            {
                                icon: Target, // Using Target for "Points" (Điểm trường)
                                title: 'Điểm trường vùng cao',
                                description: 'Mang hơi ấm và nguồn lực hỗ trợ đến các điểm trường xa xôi tại Hà Giang, nơi điều kiện cơ sở vật chất còn nhiều thiếu thốn.'
                            },
                            {
                                icon: Heart,
                                title: 'Vòng tay ấm áp',
                                description: 'Tổ chức các mùa Tết Trung thu trọn vẹn, đầy ắp tiếng cười cho các em nhỏ mồ côi tại Chùa Thiên Hương.'
                            }
                        ].map((project, index) => (
                            <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start gap-6">
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-lapis-100 text-lapis-600 flex-shrink-0">
                                        <project.icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-lapis-900 mb-2 font-display">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Founder Section */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="bg-white rounded-[3rem] p-12 shadow-xl shadow-lapis-100/30 border border-amber-50">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-lapis-500 to-amber-400 p-1 flex-shrink-0">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                        src="/images/founder.jpg"
                                        alt="Phạm Thanh Nga"
                                        className="w-full h-full object-cover object-center"
                                        loading="eager"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-3xl font-bold text-lapis-900 mb-2 font-display">
                                    Phạm Thị Thanh Nga
                                </h3>
                                <p className="text-amber-600 font-semibold mb-4">Người sáng lập</p>
                                <p className="text-gray-700 leading-relaxed">
                                    "Thiện nguyện không phải là công việc của một cá nhân, mà là sự cộng hưởng của cả cộng đồng.
                                    Tâm Nga luôn trân trọng và biết ơn mọi sự tin tưởng, ủng hộ từ các quý mạnh thường quân và các bạn tình nguyện viên.
                                    Chúng tôi tin rằng, mỗi hành động nhỏ hôm nay sẽ là tiền đề cho những thay đổi lớn lao mai sau.
                                    Hãy cùng Tâm Nga viết tiếp những chương mới cho hành trình nhân ái này, để yêu thương luôn được nối dài và bình an luôn hiện hữu."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
