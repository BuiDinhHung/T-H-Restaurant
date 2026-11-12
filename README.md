# T&H Restaurant New Asian – Website

Next.js 16 (static export) · TypeScript · Tailwind CSS 4 · lucide-react.

## Chạy & build
```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # xuất web tĩnh ra thư mục out/
```
> Thư mục cha có ký tự `&` (T&H) có thể làm `npm run` lỗi trên Windows. Khi đó chạy trực tiếp:
> `node node_modules/next/dist/bin/next build` (hoặc `... next dev`).

## Triển khai
**GitHub Pages (đang dùng):** mỗi lần push lên nhánh `main`, workflow `.github/workflows/deploy.yml` tự build và xuất bản tại
https://buidinhhung.github.io/T-H-Restaurant/

**Hosting khác / tên miền riêng:**
Upload thư mục `out/` lên bất kỳ hosting tĩnh nào (Netlify, Vercel, Cloudflare Pages, hosting thường).
Trước khi build bản thật, đặt tên miền để SEO/Open Graph/sitemap đúng:
```bash
NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban.com node node_modules/next/dist/bin/next build
```

## Cấu trúc
| Đường dẫn | Nội dung |
|---|---|
| `/` | Tự chuyển sang `/de/` (hoặc `/cz/` nếu khách từng chọn CZ / trình duyệt tiếng Séc) |
| `/de/` | Tiếng Đức · menu Đức – Việt (€) |
| `/cz/` | Tiếng Séc · menu Séc – Việt (Kč) |

Nút **DE | CZ** trên thanh menu để chuyển qua lại. Web đã chặn trình duyệt tự dịch (`translate="no"`, `notranslate`).

## Sửa nội dung
- **Thông tin quán** (địa chỉ, điện thoại, giờ mở cửa, link bản đồ): `src/lib/site.ts`
- **Thực đơn** (chép nguyên văn từ 2 file PDF, 155 món mỗi bản): `src/lib/menu-data.json`. Mỗi món: `{ no, name, sub, size, price, spice }` (`spice` = số ớt 1–3). Ảnh từng trang menu gốc: `public/menu/`.
- **Văn bản DE / CZ**: `src/lib/i18n.ts`
- **Màu sắc / font (design system)**: `src/app/globals.css` (khối `@theme`)
- **Ảnh/video**: `public/media` (WebP 640/1080/1536 px), `public/video`
