import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReport extends Document {
    title: string;
    description?: string;
    month: number; // 1-12
    year: number;
    type: 'income' | 'expense' | 'summary';
    fileUrl: string;
    fileType: 'pdf' | 'image';
    publicId?: string; // Cloudinary public ID for deletion
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ReportSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },
        year: {
            type: Number,
            required: true,
            min: 2020,
            max: 2100
        },
        type: {
            type: String,
            enum: ['income', 'expense', 'summary'],
            default: 'summary'
        },
        fileUrl: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            enum: ['pdf', 'image'],
            required: true
        },
        publicId: {
            type: String
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

// Index for faster queries
ReportSchema.index({ year: -1, month: -1 });
ReportSchema.index({ type: 1 });

// Ngăn tạo lại model nếu đã tồn tại
const Report: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);

export default Report;
