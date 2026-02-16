import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  content: string; // HTML content
  thumbnail: string;
  images: string[];
  status: 'ongoing' | 'completed';
  type: 'featured' | 'support' | 'normal';
  donationInfo: {
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    qrCode?: string;
  };
  totalDonated: number; // Tổng số tiền đã quyên góp được
  targetAmount?: number; // Mục tiêu quyên góp
  startDate: Date;
  endDate?: Date;
  reports: { // Báo cáo tài chính/tiến độ
    title: string;
    fileUrl: string; // Link PDF hoặc ảnh
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    status: { 
      type: String, 
      enum: ['ongoing', 'completed'], 
      default: 'ongoing' 
    },
    type: { 
      type: String, 
      enum: ['featured', 'support', 'normal'], 
      default: 'normal' 
    },
    donationInfo: {
      bankName: String,
      accountNumber: String,
      accountName: String,
      qrCode: String,
    },
    totalDonated: { type: Number, default: 0 },
    targetAmount: { type: Number },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    reports: [{
      title: String,
      fileUrl: String,
      date: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

// Ngăn tạo lại model nếu đã tồn tại (lỗi thường gặp trong Next.js hot reload)
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
