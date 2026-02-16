# Quick Setup Guide - Admin Panel

## Bước 1: Tạo file .env.local

Tạo file `.env.local` trong thư mục `website/`:

```env
# MongoDB - Thay bằng connection string thật của bạn
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thien-nguyen-db?retryWrites=true&w=majority

# NextAuth - Tạo secret key mới
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key-here

# Cloudinary (tạm thời để trống, sẽ dùng sau)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Tạo NEXTAUTH_SECRET:**
```bash
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Hoặc dùng online: https://generate-secret.vercel.app/32
```

## Bước 2: Seed Admin User

Chạy lệnh sau để tạo tài khoản admin:

```bash
npx tsx scripts/seed-admin.ts
```

**Thông tin đăng nhập:**
- Email: `phamthanhnga220892@gmail.com`
- Password: `admin123`

## Bước 3: Khởi động server

```bash
npm run dev
```

## Bước 4: Đăng nhập Admin

Truy cập: **http://localhost:3000/admin/login**

Nhập thông tin đăng nhập ở trên.

## Bước 5: Khám phá Admin Panel

Sau khi đăng nhập, bạn sẽ thấy:

- **Dashboard** - Tổng quan thống kê
- **Quản lý dự án** - Xem, tạo, sửa, xóa dự án
- **Báo cáo tài chính** - (Sẽ phát triển sau)
- **Cài đặt** - (Sẽ phát triển sau)

## Troubleshooting

### Lỗi: "Cannot connect to MongoDB"
- Kiểm tra `MONGODB_URI` trong `.env.local`
- Đảm bảo IP của bạn được whitelist trong MongoDB Atlas

### Lỗi: "Invalid credentials"
- Chạy lại seed script: `npx tsx scripts/seed-admin.ts`
- Kiểm tra email/password

### Lỗi: "NEXTAUTH_SECRET is not defined"
- Đảm bảo đã tạo file `.env.local`
- Restart dev server sau khi tạo `.env.local`

## Next Steps

Sau khi test admin panel, chúng ta sẽ:
1. Kết nối public pages với API (thay mock data)
2. Thêm image upload với Cloudinary
3. Test end-to-end flow
