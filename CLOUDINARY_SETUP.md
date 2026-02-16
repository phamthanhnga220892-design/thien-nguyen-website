# Hướng Dẫn Cấu Hình Cloudinary

## Bước 1: Tạo Tài Khoản Cloudinary (Miễn Phí)

1. Truy cập: https://cloudinary.com/users/register_free
2. Đăng ký tài khoản miễn phí với email của bạn
3. Xác nhận email và đăng nhập

## Bước 2: Lấy API Credentials

Sau khi đăng nhập vào Cloudinary Dashboard:

1. Vào trang **Dashboard** (trang chủ sau khi login)
2. Bạn sẽ thấy phần **Account Details** với các thông tin:
   - **Cloud Name** (ví dụ: `dxxxxx`)
   - **API Key** (ví dụ: `123456789012345`)
   - **API Secret** (click vào icon mắt để xem)

## Bước 3: Cập Nhật File .env.local

Mở file `.env.local` và thay thế các giá trị Cloudinary:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
```

**Ví dụ:**
```env
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## Bước 4: Khởi Động Lại Dev Server

Sau khi cập nhật `.env.local`, bạn cần restart dev server:

1. Dừng server hiện tại (Ctrl + C trong terminal)
2. Chạy lại: `npm run dev`

## Bước 5: Test Upload

1. Đăng nhập admin: http://localhost:3000/admin/login
2. Vào **Tạo dự án mới**: http://localhost:3000/admin/projects/new
3. Thử upload ảnh vào phần "Ảnh đại diện"
4. Nếu thành công, bạn sẽ thấy ảnh preview hiển thị

## ✅ Kiểm Tra Cấu Hình

Nếu upload thành công:
- ✅ Ảnh sẽ hiển thị preview
- ✅ URL ảnh sẽ có dạng: `https://res.cloudinary.com/your-cloud-name/...`
- ✅ Ảnh được tự động optimize (WebP, resize)

Nếu gặp lỗi:
- ❌ Kiểm tra lại Cloud Name, API Key, API Secret
- ❌ Đảm bảo đã restart dev server
- ❌ Kiểm tra console log để xem lỗi chi tiết

## 📦 Cloudinary Free Tier

- **Storage**: 25GB
- **Bandwidth**: 25GB/tháng
- **Transformations**: 25,000/tháng
- **Hoàn toàn đủ** cho website thiện nguyện!

## 🔒 Bảo Mật

⚠️ **QUAN TRỌNG**: 
- KHÔNG commit file `.env.local` lên Git
- KHÔNG chia sẻ API Secret với ai
- File `.gitignore` đã được cấu hình để ignore `.env.local`
