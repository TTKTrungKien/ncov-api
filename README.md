# ncov-api
API cung cấp thông tin, dữ liệu bệnh nhân về COVID-19!

## Cách setup API chạy local
### Yêu cầu: node + mongodb + yarn
- Bước 1: Clone repo về máy
- Bước 2: `yarn`
- Bước 3: Tạo file `.env` và nhập `MONGODB=` sau đó là link mongodb
- Bước 4: `yarn run dev` để bắt đầu server. ( Nếu bạn muốn test các endpoints thì hãy edit file test sau đó sử dụng `yarn run test` ) để chạy
- Nếu bạn set `NODE_ENV=dev` trong `.env` thì lần sau bạn chạy app sẽ không chạy scraper lúc bắt đầu app nữa.
