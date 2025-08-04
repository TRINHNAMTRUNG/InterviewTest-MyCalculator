# 🧮 Scientific Calculator & Unit Converter

Ứng dụng tính toán khoa học và chuyển đổi đơn vị với giao diện Glass Morphism được xây dựng bằng React + TypeScript.

## ✨ Tính năng

### 🔢 Máy tính khoa học
- **Máy tính cơ bản**: +, -, ×, ÷, ngoặc đơn
- **Máy tính khoa học**: sin, cos, tan, log, ln, √, x², x^y, e^x, |x|
- **Hằng số**: π, e (10 chữ số thập phân)
- **Bộ nhớ ANS**: Lưu kết quả phép tính trước đó
- **Hiển thị số**: Dấu phẩy ngăn cách hàng nghìn
- **Xử lý lỗi**: Toast notifications cho chia 0 và giới hạn 15 chữ số

### 🔄 Chuyển đổi đơn vị
- **6 danh mục**: Diện tích, Độ dài, Khối lượng, Nhiệt độ, Thể tích, Thời gian
- **Navigation**: Prev/Next để chuyển đổi giữa các danh mục
- **Swap Units**: Hoán đổi đơn vị nhanh chóng
- **Real-time**: Chuyển đổi tức thì khi nhập số
- **Format số**: Hiển thị với dấu phẩy ngăn cách

### 🎨 Giao diện
- **Glass morphism**: Hiệu ứng kính mờ chuyên nghiệp
- **Dual mode**: Toggle giữa Calculator và Unit Converter
- **Background**: Hình nền núi tuyết tuyệt đẹp
- **Responsive**: Tối ưu cho nhiều kích thước màn hình

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

### 🧮 Máy tính khoa học
**Cơ bản**
- Nhập số: 0-9
- Phép toán: +, -, ×, ÷
- Xóa: AC (clear all), ⌫ (backspace)
- Tính: =
- Bộ nhớ: ANS (sử dụng kết quả trước đó)

**Khoa học**
- Hàm: sin, cos, tan, log, ln, √, |x|
- Lũy thừa: x², x^y, e^x
- Hằng số: π, e

**Ví dụ**
```
15 + 25 × 2 = 65
sin(π/2) = 1
√(16) = 4
ANS + 10 = (kết quả trước + 10)
```

### 🔄 Chuyển đổi đơn vị
**Navigation**
- Nút ◀ ▶: Chuyển đổi giữa các danh mục
- Dropdown: Chọn đơn vị nguồn và đích
- Nút ⇄: Hoán đổi đơn vị

**Danh mục hỗ trợ**
- **Diện tích**: ac, ha, m², km², ft², yd²
- **Độ dài**: m, km, cm, mm, in, ft, yd, mi
- **Khối lượng**: g, kg, lb, oz, t
- **Nhiệt độ**: °C, °F, K
- **Thể tích**: L, ml, gal, qt, pt, cup
- **Thời gian**: s, min, h, ngày, tuần, tháng, năm

**Ví dụ**
```
1000 m = 1 km
100 °C = 212 °F
1 kg = 2.205 lb
```

## ⚠️ Lưu ý

### Máy tính
- Giới hạn 15 chữ số/số
- Số thập phân tối đa 9 chữ số sau phẩy
- Số lớn tự động chuyển Scientific notation
- Chia 0 hiển thị thông báo lỗi
- ANS lưu kết quả phép tính gần nhất

### Chuyển đổi đơn vị
- Hỗ trợ chuyển đổi trong cùng danh mục
- Nhiệt độ có công thức chuyển đổi đặc biệt
- Số hiển thị với dấu phẩy ngăn cách hàng nghìn
- Tự động làm tròn đến 8 chữ số thập phân

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
**Version**: 2.0.0 | **Updated**: August 2025 | **Features**: Calculator + Unit Converter
