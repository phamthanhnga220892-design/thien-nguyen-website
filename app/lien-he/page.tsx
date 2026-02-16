'use client';

import React from 'react';
import { MapPin, Phone, Facebook, MessageCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Breadcrumb from '@/components/Breadcrumb';
import { contactInfo } from '@/lib/mockData';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#fffdfa]">
            <PageHeader
                badge="Kết Nối Với Chúng Tôi"
                title="Liên Hệ"
                description="Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn"
                className="py-16 md:py-24"
            />

            {/* <Breadcrumb items={[{ label: 'Liên hệ', href: '/lien-he' }]} /> */}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Address */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-lg shadow-lapis-100/30 border border-amber-50 hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-lapis-50 rounded-2xl text-lapis-500 flex-shrink-0">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-lapis-900 mb-2 font-display">Địa chỉ</h3>
                                <p className="text-gray-600">{contactInfo.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-lg shadow-lapis-100/30 border border-amber-50 hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-amber-50 rounded-2xl text-amber-500 flex-shrink-0">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-lapis-900 mb-2 font-display">Điện thoại</h3>
                                <a href="tel:0345119464" className="text-gray-600 hover:text-lapis-600 transition-colors font-bold text-lg">
                                    0345 119 464
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Community */}
                <div className="bg-gradient-to-br from-lapis-600 to-lapis-500 rounded-[2.5rem] p-10 text-white text-center mb-24">
                    <h3 className="text-3xl font-bold mb-4 font-display">Kết nối với cộng đồng</h3>
                    <p className="text-lapis-100 mb-8 max-w-2xl mx-auto">
                        Tham gia nhóm Zalo và theo dõi Fanpage để cập nhật nhanh nhất các hoạt động thiện nguyện của chúng tôi.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="https://zalo.me/g/lcyzac043"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white text-lapis-700 hover:bg-lapis-50 rounded-full transition-all font-bold shadow-lg"
                        >
                            <MessageCircle className="h-6 w-6" />
                            <span>Tham gia nhóm Zalo</span>
                        </a>

                        <a
                            href={contactInfo.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-lapis-700/50 hover:bg-lapis-700/70 backdrop-blur-sm rounded-full transition-all font-semibold"
                        >
                            <Facebook className="h-6 w-6" />
                            <span>Facebook Fanpage</span>
                        </a>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-lapis-900 font-display mb-4">
                            Câu Hỏi Thường Gặp
                        </h2>
                        <div className="h-1.5 w-32 bg-gradient-to-r from-amber-400 to-transparent rounded-full mx-auto"></div>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                question: 'Làm thế nào để tham gia tình nguyện?',
                                answer: 'Bạn có thể liên hệ trực tiếp với chúng tôi qua số điện thoại hoặc tham gia nhóm Zalo để nhận thông báo về các đợt tuyển tình nguyện viên mới.'
                            },
                            {
                                question: 'Tôi có thể ủng hộ bằng hiện vật không?',
                                answer: 'Có, chúng tôi nhận ủng hộ cả tiền mặt và hiện vật. Vui lòng liên hệ trước để chúng tôi sắp xếp việc tiếp nhận.'
                            },
                            {
                                question: 'Làm sao để biết tiền đóng góp được sử dụng như thế nào?',
                                answer: 'Chúng tôi công khai báo cáo tài chính hàng tháng trên website và cập nhật thường xuyên trong nhóm Zalo cộng đồng.'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white rounded-[2rem] p-8 shadow-lg shadow-lapis-100/30 border border-amber-50">
                                <h3 className="text-xl font-bold text-lapis-900 mb-3 font-display">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
