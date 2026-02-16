'use client';

import React, { useState } from 'react';
import { Copy, QrCode, Landmark, User, Hash, Info, CheckCircle, Heart } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Breadcrumb from '@/components/Breadcrumb';
import { bankInfo } from '@/lib/mockData';

export default function DonatePage() {
    const [copied, setCopied] = useState<string | null>(null);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#fffdfa]">
            <PageHeader
                badge="Trợ Duyên Thiện Nguyện"
                title="Phát Tâm Công Đức"
                description="Sự ủng hộ của quý vị là nguồn động lực to lớn để chúng tôi tiếp tục hành trình mang lại nụ cười cho mọi người."
            />

            <Breadcrumb items={[{ label: 'Đóng góp', href: '/ung-ho' }]} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Bank Card */}
                    <div className="bg-white rounded-[3rem] shadow-2xl shadow-lapis-100 overflow-hidden border border-amber-100 transform hover:-translate-y-2 transition-transform duration-500">
                        <div className="bg-gradient-to-br from-lapis-600 to-lapis-500 p-10 text-white relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-sm opacity-80 mb-2 uppercase tracking-widest font-bold">
                                        Quỹ Thiện Nguyện
                                    </h2>
                                    <p className="text-3xl font-bold font-display">Tâm Nga Charity</p>
                                </div>
                                <Landmark className="h-10 w-10 opacity-50" />
                            </div>
                            <div className="mt-12 flex items-center space-x-2">
                                <Heart className="h-5 w-5 text-amber-300 fill-amber-300" />
                                <span className="text-xs uppercase tracking-[0.3em] font-bold">
                                    Vạn Sự Tùy Duyên
                                </span>
                            </div>
                        </div>

                        <div className="p-10 space-y-8">
                            {/* Bank Name */}
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-lapis-50 rounded-2xl text-lapis-500">
                                        <Landmark className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                            Ngân hàng
                                        </p>
                                        <p className="font-bold text-gray-900 text-lg">{bankInfo.bankName}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Number */}
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
                                        <Hash className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                            Số tài khoản
                                        </p>
                                        <p className="text-2xl font-mono font-bold text-lapis-900 tracking-wider">
                                            {bankInfo.accountNumber}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(bankInfo.accountNumber, 'account')}
                                    className="p-3 bg-gray-50 text-gray-400 hover:text-lapis-600 hover:bg-lapis-50 rounded-2xl transition-all active:scale-90"
                                    title="Sao chép số tài khoản"
                                >
                                    {copied === 'account' ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <Copy className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {/* Account Name */}
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-pink-50 rounded-2xl text-pink-500">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                            Chủ tài khoản
                                        </p>
                                        <p className="font-extrabold text-gray-900 uppercase text-lg">
                                            {bankInfo.accountName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Syntax */}
                            <div className="pt-8 border-t border-gray-100">
                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <Info className="h-5 w-5 text-amber-500" />
                                        <span className="text-sm font-bold text-amber-900">Cú pháp trợ duyên:</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-amber-200 shadow-sm">
                                        <code className="text-sm font-mono font-bold text-amber-900">
                                            {bankInfo.syntax}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(bankInfo.syntax, 'syntax')}
                                            className="text-amber-500 hover:text-amber-700"
                                            title="Sao chép cú pháp"
                                        >
                                            {copied === 'syntax' ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Area */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-amber-100 border border-amber-50 w-full flex flex-col items-center">
                            <div className="bg-amber-400 text-amber-950 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 shadow-lg shadow-amber-200">
                                Quét Mã Chuyển Khoản
                            </div>
                            <div className="relative p-6 bg-white rounded-3xl border-4 border-amber-100 mb-8 group">
                                <img
                                    src="/images/qr-bidv.jpg"
                                    alt="QR Code BIDV"
                                    className="w-64 h-64 md:w-80 md:h-80 object-contain transition-transform group-hover:scale-105"
                                />
                                {/* Decorative Corners */}
                                <div className="absolute top-2 left-2 w-10 h-10 border-t-4 border-l-4 border-lapis-500 rounded-tl-xl"></div>
                                <div className="absolute top-2 right-2 w-10 h-10 border-t-4 border-r-4 border-lapis-500 rounded-tr-xl"></div>
                                <div className="absolute bottom-2 left-2 w-10 h-10 border-b-4 border-l-4 border-lapis-500 rounded-bl-xl"></div>
                                <div className="absolute bottom-2 right-2 w-10 h-10 border-b-4 border-r-4 border-lapis-500 rounded-br-xl"></div>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                                    <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium">
                                        Xác nhận chuyển khoản tức thì
                                    </span>
                                </div>
                                <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                                    <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium">
                                        Tự động điền đầy đủ thông tin
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Donation Guide */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-lapis-900 text-center mb-12 font-display">
                        Hướng Dẫn Đóng Góp
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Quét mã QR',
                                description: 'Mở ứng dụng ngân hàng và quét mã QR bên trên'
                            },
                            {
                                step: '02',
                                title: 'Nhập số tiền',
                                description: 'Nhập số tiền bạn muốn đóng góp (tùy tâm)'
                            },
                            {
                                step: '03',
                                title: 'Xác nhận',
                                description: 'Kiểm tra thông tin và xác nhận chuyển khoản'
                            }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-lapis-500 to-amber-400 text-white font-bold text-xl mb-4 shadow-lg">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thank You Message */}
                <div className="mt-20 bg-gradient-to-br from-lapis-50 via-white to-amber-50 rounded-[3rem] p-12 text-center border border-lapis-100">
                    <Heart className="h-12 w-12 text-lapis-600 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-lapis-900 mb-4 font-display">
                        Cảm Ơn Quý Vị
                    </h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Mỗi đóng góp của quý vị, dù lớn hay nhỏ, đều là nguồn động lực to lớn giúp chúng tôi
                        tiếp tục hành trình mang yêu thương đến với những hoàn cảnh khó khăn.
                    </p>
                </div>
            </div>
        </div>
    );
}
