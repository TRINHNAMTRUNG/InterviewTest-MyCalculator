# 🧮 Scientific Calculator

Máy tính khoa học với giao diện Glass Morphism được xây dựng bằng React + TypeScript.

## ✨ Tính năng

- **Máy tính cơ bản**: +, -, ×, ÷, ngoặc đơn
- **Máy tính khoa học**: sin, cos, tan, log, ln, √, x², x^y, e^x, |x|
- **Hằng số**: π, e (10 chữ số thập phân)
- **Xử lý lỗi**: Toast notifications cho chia 0 và giới hạn 15 chữ số
- **Giao diện**: Glass morphism với background núi tuyết

## 🚀 Yêu cầu

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0

Kiểm tra phiên bản:
```bash
node --version
npm --version
```

## 📦 Cài đặt

```bash
# 1. Clone repository
git clone <repo-url>
cd my-calculator

# 2. Cài đặt dependencies
npm install

# 3. Khởi động development
npm run dev
```

Ứng dụng chạy tại: `http://localhost:5173`

## 🛠️ Scripts

```bash
npm run dev      # Development server
npm run build    # Build production
npm run preview  # Preview build
npm run lint     # ESLint check
```

## 🧰 Công nghệ

- React 19.1.0 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- mathjs (tính toán)
- react-hot-toast (notifications)

## 🎯 Sử dụng

### Cơ bản
- Nhập số: 0-9
- Phép toán: +, -, ×, ÷
- Xóa: AC (clear all), ⌫ (backspace)
- Tính: =

### Khoa học
- Hàm: sin, cos, tan, log, ln, √, |x|
- Lũy thừa: x², x^y, e^x
- Hằng số: π, e

### Ví dụ
```
15 + 25 × 2 = 65
sin(π/2) = 1
√(16) = 4
```

## ⚠️ Lưu ý

- Giới hạn 15 chữ số/số
- Số thập phân tối đa 9 chữ số sau phẩy
- Số lớn tự động chuyển Scientific notation
- Chia 0 hiển thị thông báo lỗi

## 🐛 Troubleshooting

```bash
# Lỗi install
rm -rf node_modules package-lock.json
npm install

# Port bận
npm run dev -- --port 3000

# Clean build
npm run build -- --force
```

---
**Version**: 1.0.0 | **Updated**: August 2025
