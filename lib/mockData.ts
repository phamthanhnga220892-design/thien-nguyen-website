export interface Project {
    id: string;
    title: string;
    summary: string;
    content: string;
    thumbnail: string;
    images?: string[];
    status: 'in-progress' | 'completed';
    featured: boolean;
    createdAt: string;
    targetAmount?: number;
    currentAmount?: number;
}

export const mockProjects: Project[] = [
    {
        id: '1',
        title: 'Mái Ấm Cho Em',
        summary: 'Xây dựng nhà tình thương cho các em học sinh nghèo vùng cao',
        content: `Dự án "Mái Ấm Cho Em" được khởi động từ tháng 1/2026 với mục tiêu xây dựng 5 ngôi nhà tình thương cho các em học sinh có hoàn cảnh khó khăn tại vùng cao Hà Giang.
    
Mỗi ngôi nhà có diện tích 40m2, được xây dựng kiên cố với đầy đủ tiện nghi cơ bản: phòng ngủ, bếp, nhà vệ sinh. Chúng tôi mong muốn mang đến cho các em một không gian sống an toàn, ấm áp để các em có thể yên tâm học tập.

Đến nay, dự án đã hoàn thành 3/5 ngôi nhà và đang trong quá trình hoàn thiện 2 ngôi còn lại. Chúng tôi rất cảm ơn sự đóng góp của các nhà hảo tâm đã giúp dự án đạt được những kết quả tích cực này.`,
        thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000',
        images: [
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000',
            'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?auto=format&fit=crop&q=80&w=2000',
            'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000'
        ],
        status: 'in-progress',
        featured: true,
        createdAt: '2026-01-15',
        targetAmount: 150000000,
        currentAmount: 95000000
    },
    {
        id: '2',
        title: 'Sách Cho Em',
        summary: 'Trao tặng sách và đồ dùng học tập cho học sinh vùng sâu',
        content: `Chương trình "Sách Cho Em" là hoạt động thường niên của nhóm Thiện Nguyện Tâm Nga, nhằm mang tri thức đến với các em học sinh ở vùng sâu, vùng xa.

Trong năm 2025, chúng tôi đã trao tặng hơn 2,000 cuốn sách cùng với các dụng cụ học tập cho 15 trường học tại các tỉnh miền núi phía Bắc.

Mỗi "bộ sách yêu thương" bao gồm: sách giáo khoa, sách tham khảo, truyện thiếu nhi, vở viết, bút, thước kẻ và các dụng cụ học tập cần thiết khác.`,
        thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=2000',
        images: [
            'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=2000',
            'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2000'
        ],
        status: 'completed',
        featured: true,
        createdAt: '2025-09-01',
        targetAmount: 50000000,
        currentAmount: 50000000
    },
    {
        id: '3',
        title: 'Bữa Cơm Yêu Thương',
        summary: 'Nấu cơm miễn phí cho bệnh nhân nghèo tại bệnh viện',
        content: `"Bữa Cơm Yêu Thương" là chương trình thiện nguyện được duy trì hàng tuần tại Bệnh viện K và Bệnh viện Bạch Mai.

Mỗi tuần, nhóm tình nguyện viên của chúng tôi nấu và phát khoảng 200 suất cơm miễn phí cho bệnh nhân và người nhà có hoàn cảnh khó khăn.

Mỗi suất cơm đảm bảo đầy đủ dinh dưỡng với thực đơn đa dạng, được nấu nướng tận tâm với mong muốn san sẻ phần nào gánh nặng của các bệnh nhân.`,
        thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000',
        status: 'in-progress',
        featured: false,
        createdAt: '2025-06-01',
        targetAmount: 30000000,
        currentAmount: 18000000
    },
    {
        id: '4',
        title: 'Áo Ấm Mùa Đông',
        summary: 'Trao tặng áo ấm và chăn màn cho người vô gia cư',
        content: `Mùa đông Hà Nội lạnh giá, nhiều người vô gia cư, người già neo đơn không có điều kiện để giữ ấm cơ thể.

Chương trình "Áo Ấm Mùa Đông" của chúng tôi đã trao tặng hơn 500 chiếc áo ấm, 300 chiếc chăn và 200 bộ quần áo cho những người có hoàn cảnh khó khăn.

Ngoài ra, chúng tôi còn phát cháo nóng và bánh mì miễn phí vào các buổi tối cuối tuần tại khu vực ga Hà Nội và cầu Long Biên.`,
        thumbnail: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?auto=format&fit=crop&q=80&w=2000',
        status: 'completed',
        featured: false,
        createdAt: '2025-12-01',
        targetAmount: 40000000,
        currentAmount: 40000000
    },
    {
        id: '5',
        title: 'Xe Đạp Đến Trường',
        summary: 'Tặng xe đạp cho học sinh vùng xa đến trường',
        content: `Nhiều em học sinh ở vùng sâu, vùng xa phải đi bộ hàng chục km mỗi ngày để đến trường. Điều này không chỉ gây mệt mỏi mà còn ảnh hưởng đến sức khỏe và thời gian học tập của các em.

Chương trình "Xe Đạp Đến Trường" đã trao tặng 150 chiếc xe đạp cho các em học sinh nghèo vượt khó tại Sơn La và Điện Biên.

Mỗi chiếc xe đạp không chỉ là phương tiện đi lại mà còn là động lực để các em tiếp tục hành trình chinh phục tri thức.`,
        thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000',
        status: 'in-progress',
        featured: false,
        createdAt: '2026-01-20',
        targetAmount: 60000000,
        currentAmount: 35000000
    },
    {
        id: '6',
        title: 'Khám Bệnh Miễn Phí',
        summary: 'Tổ chức khám bệnh và phát thuốc miễn phí cho người nghèo',
        content: `Chương trình "Khám Bệnh Miễn Phí" được tổ chức định kỳ hàng tháng tại các xã vùng sâu, vùng xa.

Đội ngũ bác sĩ tình nguyện của chúng tôi đã khám và tư vấn sức khỏe cho hơn 1,000 người dân, đồng thời phát miễn phí thuốc và vitamin.

Chúng tôi đặc biệt chú trọng đến việc khám sàng lọc các bệnh mãn tính và tư vấn dinh dưỡng cho trẻ em.`,
        thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000',
        status: 'in-progress',
        featured: false,
        createdAt: '2025-10-15',
        targetAmount: 80000000,
        currentAmount: 55000000
    }
];

export const bankInfo = {
    bankName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)',
    accountNumber: '8817518410',
    accountName: 'PHAM THI THANH NGA',
    branch: 'Chi nhánh Hà Đông',
    syntax: 'TAMNGA [Ten Du An] [Ten Cua Ban]'
};

export const contactInfo = {
    address: 'Hà Nội, Việt Nam',
    phone: '0345 119 464',
    email: '', // Removed as requested
    facebook: 'https://www.facebook.com/nga.pham.79069323',
    zalo: 'https://zalo.me/g/lcyzac043',
    workingHours: '' // Removed as requested
};
