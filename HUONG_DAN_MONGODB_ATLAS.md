# HƯỚNG DẪN SETUP MONGODB ATLAS (MONGODB ONLINE MIỄN PHÍ)

## Bước 1: Tạo tài khoản MongoDB Atlas

1. Truy cập: https://www.mongodb.com/cloud/atlas/register
2. Đăng ký tài khoản bằng:
   - Email
   - Hoặc đăng nhập bằng Google
3. Xác nhận email nếu cần

---

## Bước 2: Tạo Cluster (Database) miễn phí

1. Sau khi đăng nhập, chọn **"Create a deployment"** hoặc **"Build a Database"**
2. Chọn gói **FREE** (M0 Sandbox):
   - ✅ 512 MB Storage
   - ✅ Shared RAM
   - ✅ Miễn phí mãi mãi
3. Chọn **Provider & Region**:
   - Provider: **AWS** hoặc **Google Cloud**
   - Region: Chọn **Singapore** (gần Việt Nam nhất, tốc độ nhanh)
4. Đặt tên Cluster (hoặc để mặc định): `Cluster0`
5. Click **"Create Deployment"**

⏳ Đợi 1-3 phút để MongoDB tạo cluster...

---

## Bước 3: Tạo Database User (Tài khoản truy cập)

Sau khi cluster được tạo, MongoDB sẽ hiện popup:

1. **Username**: Đặt tên user (ví dụ: `admin` hoặc `tamnga`)
2. **Password**: Đặt mật khẩu mạnh (ví dụ: `TamNga2026!`)
   
   > ⚠️ **LƯU Ý**: Ghi nhớ username và password này, bạn sẽ cần dùng sau!

3. Click **"Create Database User"**

---

## Bước 4: Whitelist IP Address (Cho phép truy cập)

1. Trong popup tiếp theo, chọn **"Add My Current IP Address"**
2. Hoặc để cho phép truy cập từ mọi nơi (cho development):
   - Click **"Add IP Address"**
   - Nhập: `0.0.0.0/0`
   - Description: `Allow all`
   - Click **"Add Entry"**

3. Click **"Finish and Close"**

---

## Bước 5: Lấy Connection String

1. Trong Dashboard, click vào nút **"Connect"** của Cluster0
2. Chọn **"Drivers"**
3. Chọn:
   - Driver: **Node.js**
   - Version: **6.8 or later**
4. Copy **Connection String** có dạng:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Thay thế** `<username>` và `<password>` bằng thông tin bạn đã tạo ở Bước 3:
   ```
   mongodb+srv://admin:TamNga2026!@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   > ⚠️ **CHÚ Ý**: Nếu password có ký tự đặc biệt, cần encode URL. Ví dụ:
   > - `@` → `%40`
   > - `!` → `%21`
   > - `#` → `%23`

---

## Bước 6: Tạo Database cho dự án

1. Trong Dashboard, click vào **"Browse Collections"**
2. Click **"Add My Own Data"**
3. Nhập:
   - **Database name**: `thien-nguyen-db`
   - **Collection name**: `projects` (hoặc `users`)
4. Click **"Create"**

---

## Bước 7: Lưu Connection String vào dự án Next.js

1. Tạo file `.env.local` trong thư mục `website/`:
   ```bash
   MONGODB_URI=mongodb+srv://admin:TamNga2026!@cluster0.xxxxx.mongodb.net/thien-nguyen-db?retryWrites=true&w=majority
   ```

2. Thêm `.env.local` vào `.gitignore` (đã có sẵn)

---

## Bước 8: Cài đặt Mongoose trong dự án

Chạy lệnh sau trong thư mục `website/`:

```bash
npm install mongoose
```

---

## Bước 9: Tạo file kết nối Database

Tạo file `lib/mongodb.ts` để kết nối MongoDB:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Vui lòng thêm MONGODB_URI vào file .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
```

---

## ✅ Hoàn tất!

Bây giờ bạn đã có:
- ✅ MongoDB Atlas cluster (miễn phí)
- ✅ Database `thien-nguyen-db`
- ✅ Connection string đã lưu trong `.env.local`
- ✅ Mongoose đã cài đặt
- ✅ File kết nối database

---

## 🔍 Kiểm tra kết nối

Để test kết nối, bạn có thể tạo API route đơn giản:

**File**: `app/api/test-db/route.ts`
```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Kết nối MongoDB thành công!' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi kết nối MongoDB', error },
      { status: 500 }
    );
  }
}
```

Sau đó chạy `npm run dev` và truy cập: http://localhost:3000/api/test-db

---

## 📚 Tài liệu tham khảo

- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Mongoose: https://mongoosejs.com/docs/
- Next.js + MongoDB: https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose
