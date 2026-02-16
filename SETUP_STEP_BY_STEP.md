# HƯỚNG DẪN SETUP DỰ ÁN TỪNG BƯỚC (THỰC HIỆN THỦ CÔNG)

## 📋 CHECKLIST TỔNG QUAN

- [ ] Bước 1: Cài đặt Mongoose
- [ ] Bước 2: Tạo file `.env.local`
- [ ] Bước 3: Tạo thư mục `lib`
- [ ] Bước 4: Tạo file kết nối MongoDB
- [ ] Bước 5: Cập nhật TypeScript types
- [ ] Bước 6: Tạo API test kết nối
- [ ] Bước 7: Chạy server và test

---

## BƯỚC 1: CÀI ĐẶT MONGOOSE

### Mở Terminal trong VS Code:
- Nhấn `` Ctrl + ` `` (phím nằm dưới phím ESC)
- Hoặc: Menu **Terminal** → **New Terminal**

### Chạy lệnh:
```bash
cd website
npm install mongoose
```

### Đợi cài đặt xong, bạn sẽ thấy:
```
added 1 package, and audited XXX packages in XXs
```

✅ **Xong bước 1!** Đóng terminal hoặc để đó.

---

## BƯỚC 2: TẠO FILE `.env.local`

### Tạo file mới:
1. Trong VS Code, click chuột phải vào thư mục **`website`**
2. Chọn **"New File"**
3. Đặt tên: `.env.local`
4. Nhấn Enter

### Dán nội dung sau vào file:
```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/thien-nguyen-db?retryWrites=true&w=majority
```

### ⚠️ QUAN TRỌNG:
- **Thay thế** `YOUR_USERNAME` bằng username bạn đã tạo trên MongoDB Atlas
- **Thay thế** `YOUR_PASSWORD` bằng password bạn đã tạo
- **Thay thế** `cluster0.xxxxx` bằng cluster URL thực tế của bạn

### Ví dụ:
```env
MONGODB_URI=mongodb+srv://admin:TamNga2026@cluster0.abc123.mongodb.net/thien-nguyen-db?retryWrites=true&w=majority
```

### Lưu file:
- Nhấn **Ctrl + S**

✅ **Xong bước 2!**

---

## BƯỚC 3: TẠO THỦ MỤC `lib`

### Tạo thư mục:
1. Click chuột phải vào thư mục **`website`**
2. Chọn **"New Folder"**
3. Đặt tên: `lib`
4. Nhấn Enter

✅ **Xong bước 3!**

---

## BƯỚC 4: TẠO FILE KẾT NỐI MONGODB

### Tạo file:
1. Click chuột phải vào thư mục **`lib`** (vừa tạo)
2. Chọn **"New File"**
3. Đặt tên: `mongodb.ts`
4. Nhấn Enter

### Dán nội dung sau vào file `lib/mongodb.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Vui lòng thêm MONGODB_URI vào file .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: CachedConnection | undefined;
}

let cached: CachedConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('✅ Kết nối MongoDB thành công!');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ Lỗi kết nối MongoDB:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
```

### Lưu file:
- Nhấn **Ctrl + S**

✅ **Xong bước 4!**

---

## BƯỚC 5: TẠO API TEST KẾT NỐI

### Tạo thư mục API:
1. Trong thư mục **`app`**, tạo thư mục mới: **`api`**
2. Trong thư mục **`api`**, tạo thư mục mới: **`test-db`**
3. Trong thư mục **`test-db`**, tạo file mới: **`route.ts`**

### Cấu trúc sẽ như sau:
```
website/
  app/
    api/
      test-db/
        route.ts  ← Tạo file này
```

### Dán nội dung sau vào file `app/api/test-db/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ 
      success: true,
      message: '✅ Kết nối MongoDB Atlas thành công!' 
    });
  } catch (error) {
    console.error('Lỗi kết nối:', error);
    return NextResponse.json(
      { 
        success: false,
        message: '❌ Lỗi kết nối MongoDB',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
```

### Lưu file:
- Nhấn **Ctrl + S**

✅ **Xong bước 5!**

---

## BƯỚC 6: CHẠY SERVER VÀ TEST

### Mở Terminal:
- Nhấn `` Ctrl + ` ``

### Đảm bảo bạn đang ở thư mục `website`:
```bash
cd website
```

### Chạy server development:
```bash
npm run dev
```

### Đợi server khởi động, bạn sẽ thấy:
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000

✓ Starting...
✓ Ready in 2.5s
```

### Mở trình duyệt và truy cập:
```
http://localhost:3000/api/test-db
```

### Kết quả mong đợi:
```json
{
  "success": true,
  "message": "✅ Kết nối MongoDB Atlas thành công!"
}
```

✅ **Xong bước 6!** Nếu thấy thông báo này = kết nối thành công!

---

## ❌ NẾU GẶP LỖI

### Lỗi 1: "Vui lòng thêm MONGODB_URI vào file .env.local"
**Nguyên nhân:** File `.env.local` chưa được tạo hoặc chưa có biến `MONGODB_URI`

**Giải pháp:**
- Kiểm tra lại Bước 2
- Đảm bảo file `.env.local` nằm trong thư mục `website/`
- Restart server: Nhấn `Ctrl + C` trong terminal, rồi chạy lại `npm run dev`

### Lỗi 2: "MongooseServerSelectionError"
**Nguyên nhân:** Connection string sai hoặc IP chưa được whitelist

**Giải pháp:**
- Kiểm tra lại connection string trong `.env.local`
- Vào MongoDB Atlas → Network Access → Add IP `0.0.0.0/0`
- Kiểm tra username/password có đúng không

### Lỗi 3: "Authentication failed"
**Nguyên nhân:** Username hoặc password sai

**Giải pháp:**
- Kiểm tra lại username/password trong `.env.local`
- Nếu password có ký tự đặc biệt, cần encode:
  - `@` → `%40`
  - `!` → `%21`
  - `#` → `%23`

---

## 🎉 HOÀN TẤT!

Bây giờ bạn đã có:
- ✅ Mongoose đã cài đặt
- ✅ File `.env.local` với connection string
- ✅ File `lib/mongodb.ts` để kết nối database
- ✅ API test để kiểm tra kết nối
- ✅ Server đang chạy thành công

---

## 📝 BƯỚC TIẾP THEO

Sau khi kết nối MongoDB thành công, bạn có thể:

1. **Tạo Models** (Schema cho dữ liệu):
   - Projects (Dự án thiện nguyện)
   - Admin (Tài khoản quản trị)
   - Reports (Báo cáo tài chính)

2. **Xây dựng API Routes**:
   - CRUD cho dự án
   - Upload ảnh
   - Quản lý báo cáo

3. **Xây dựng giao diện**:
   - Trang chủ
   - Trang admin
   - Trang chi tiết dự án

Bạn muốn làm bước nào tiếp theo? 😊
