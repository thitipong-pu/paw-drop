# API Requirements: Paw Drop Back Office

เอกสารนี้ระบุความต้องการของ API สำหรับระบบ Back Office ของแอปพลิเคชัน **Paw Drop** (ศูนย์บริจาคอาหารสัตว์) เพื่อใช้จัดการสถานที่รับบริจาค, รายการสิ่งของบริจาค, และแสดงผลสถิติในรูปแบบ Dashboard

---

## 1. Data Models (โครงสร้างข้อมูล)

### 1.1 Place (สถานที่รับบริจาค)
| Field | Type | Description |
|---|---|---|
| `id` | String (UUID) | รหัสสถานที่ |
| `name` | String | ชื่อสถานที่รับบริจาค |
| `address` | String | ที่อยู่ |
| `phone` | String | เบอร์โทรศัพท์ |
| `description` | Text | รายละเอียดเพิ่มเติม |
| `operating_hours` | String | เวลาทำการ |
| `place_type` | String | ประเภทสถานที่ (เช่น มูลนิธิ, วัด, ศูนย์พักพิง) |
| `needed_items` | Array of Strings | สิ่งที่ต้องการรับบริจาค |
| `animal_types` | Array of Strings | ประเภทสัตว์ (เช่น หมา, แมว) |
| `image_url` | String | URL รูปภาพสถานที่ |
| `tags` | Array of Strings | Tag พิเศษ (เช่น ["ด่วน", "ขาดแคลนมาก"]) |
| `created_at` | DateTime | วันที่สร้างรายการ |
| `updated_at` | DateTime | วันที่แก้ไขล่าสุด |

### 1.2 Donation Item (รายการของบริจาค)
| Field | Type | Description |
|---|---|---|
| `id` | String (UUID) | รหัสสิ่งของ |
| `name` | String | ชื่อรายการสิ่งของ |
| `image_url` | String | URL รูปภาพสินค้า |
| `animal_types` | Array of Strings | ประเภทสัตว์ที่ใช้ (เช่น หมา, แมว) |
| `tags` | Array of Strings | Tag พิเศษ (เช่น ["ด่วน", "ใช้บ่อย"]) |
| `product_url` | String | URL สินค้าสำหรับสั่งซื้อ (เช่น ลิงก์ Shopee) |
| `created_at` | DateTime | วันที่สร้างรายการ |
| `updated_at` | DateTime | วันที่แก้ไขล่าสุด |

### 1.3 Tracking Event (ข้อมูลสถิติการเข้าชม/คลิก)
| Field | Type | Description |
|---|---|---|
| `id` | String (UUID) | รหัส Event |
| `target_id` | String | ID ของ Place หรือ Item ที่ถูกเข้าชม/คลิก |
| `target_type` | String | ประเภทเป้าหมาย (`PLACE` หรือ `ITEM`) |
| `event_type` | String | ประเภทการกระทำ (`VIEW` หรือ `CLICK`) |
| `user_country` | String | ประเทศของผู้ใช้งาน (ได้จาก IP) |
| `user_province`| String | จังหวัดของผู้ใช้งาน (ได้จาก IP) |
| `timestamp` | DateTime | วันเวลาที่เกิด Event |

### 1.4 Admin User (ผู้ดูแลระบบ)
| Field | Type | Description |
|---|---|---|
| `id` | String (UUID) | รหัสผู้ดูแลระบบ |
| `email` | String | อีเมล (ใช้สำหรับ Login) |
| `password_hash` | String | รหัสผ่านที่เข้ารหัสแล้ว |
| `name` | String | ชื่อผู้ดูแลระบบ |
| `created_at` | DateTime | วันที่สร้าง |
| `updated_at` | DateTime | วันที่แก้ไขล่าสุด |

---

## 2. API Endpoints: Places Management (จัดการสถานที่รับบริจาค)

### 2.1 Get All Places
- **Endpoint:** `GET /api/v1/admin/places`
- **Description:** ดึงข้อมูลสถานที่รับบริจาคทั้งหมด (รองรับ Pagination สำหรับแสดงใน Table)
- **Query Params:**
  - `page` (int) - หน้าที่ต้องการ (default: 1)
  - `size` (int) - จำนวนต่อหน้า (default: 20)
  - `search` (string) - ค้นหาจากชื่อหรือที่อยู่
- **Response:**
  ```json
  {
    "data": [ { /* Place Object */ } ],
    "meta": { "total": 100, "page": 1, "size": 20, "last_page": 5 }
  }
  ```

### 2.2 Get Place by ID
- **Endpoint:** `GET /api/v1/admin/places/:id`
- **Description:** ดึงข้อมูลสถานที่ระบุตาม ID

### 2.3 Create Place
- **Endpoint:** `POST /api/v1/admin/places`
- **Description:** เพิ่มสถานที่รับบริจาคใหม่
- **Request Body:** `Place` object (ยกเว้น id, created_at, updated_at)

### 2.4 Update Place
- **Endpoint:** `PUT /api/v1/admin/places/:id`
- **Description:** แก้ไขข้อมูลสถานที่
- **Request Body:** ฟิลด์ที่ต้องการอัปเดตของ `Place`

### 2.5 Delete Place
- **Endpoint:** `DELETE /api/v1/admin/places/:id`
- **Description:** ลบสถานที่ออกจากระบบ

---

## 3. API Endpoints: Items Management (จัดการรายการของบริจาค)

### 3.1 Get All Items
- **Endpoint:** `GET /api/v1/admin/items`
- **Description:** ดึงรายการของบริจาคทั้งหมด (รองรับ Pagination สำหรับ Table)
- **Query Params:**
  - `page` (int) - หน้าที่ต้องการ (default: 1)
  - `size` (int) - จำนวนต่อหน้า (default: 20)
  - `search` (string) - คำค้นหา
- **Response:**
  ```json
  {
    "data": [ { /* Donation Item Object */ } ],
    "meta": { "total": 50, "page": 1, "size": 20, "last_page": 3 }
  }
  ```

### 3.2 Get Item by ID
- **Endpoint:** `GET /api/v1/admin/items/:id`
- **Description:** ดึงข้อมูลรายการของบริจาคตาม ID

### 3.3 Create Item
- **Endpoint:** `POST /api/v1/admin/items`
- **Description:** เพิ่มรายการของบริจาคใหม่
- **Request Body:** `Donation Item` object

### 3.4 Update Item
- **Endpoint:** `PUT /api/v1/admin/items/:id`
- **Description:** แก้ไขข้อมูลรายการของบริจาค
- **Request Body:** ฟิลด์ที่ต้องการอัปเดตของ `Donation Item`

### 3.5 Delete Item
- **Endpoint:** `DELETE /api/v1/admin/items/:id`
- **Description:** ลบรายการของบริจาค

---

## 4. API Endpoints: Dashboard & Analytics (สถิติและ Dashboard)

### 4.1 Get Dashboard Overview Stats
- **Endpoint:** `GET /api/v1/admin/analytics/overview`
- **Description:** ดึงสถิติภาพรวมเพื่อแสดงใน Dashboard
- **Query Params:** `start_date`, `end_date`
- **Response:**
  ```json
  {
    "total_place_views": 1500,
    "total_item_clicks": 3200,
    "top_places": [ ... ],
    "top_items": [ ... ]
  }
  ```

### 4.2 Get Analytics by Demographics (Province & Country)
- **Endpoint:** `GET /api/v1/admin/analytics/demographics`
- **Description:** ดึงสถิติแยกตามพื้นที่ของผู้เข้าชม
- **Query Params:** `target_type` (PLACE, ITEM), `event_type` (VIEW, CLICK)
- **Response:**
  ```json
  {
    "by_country": [
      { "country": "Thailand", "count": 4500 },
      { "country": "Laos", "count": 200 }
    ],
    "by_province": [
      { "province": "Bangkok", "count": 2500 },
      { "province": "Chiang Mai", "count": 800 }
    ]
  }
  ```

### 4.3 Get Specific Target Stats
- **Endpoint:** `GET /api/v1/admin/analytics/stats/:target_id`
- **Description:** ดึงข้อมูลสถิติเจาะจงราย Place หรือราย Item พร้อมข้อมูล จังหวัด/ประเทศ ที่กดเข้ามา

---

## 5. API Endpoints: Public Tracking (สำหรับให้ระบบ Front-End บ้านผู้ใช้เรียก)

*หมายเหตุ: ควรมีการจำกัด Rate Limit อย่างเข้มงวด (เช่น 10-20 requests / 1 นาที / 1 IP Address) เพื่อป้องกันการ Spam หรือปั่นยอดวิว*

### 5.1 Track Event
- **Endpoint:** `POST /api/v1/tracking/event`
- **Description:** ส่งข้อมูลเมื่อผู้ใช้กดเข้ามาดู (View) หรือกดลิงก์ไปซื้อ (Click) ระบบจะจับ IP เพื่อแปลงเป็นจังหวัดและประเทศ
- **Rate Limit:** 20 requests / 1 min / IP
- **Request Body:**
  ```json
  {
    "target_id": "uuid-of-place-or-item",
    "target_type": "PLACE", // หรือ "ITEM"
    "event_type": "VIEW" // หรือ "CLICK"
  }
  ```

---

## 6. API Endpoints: Public Homepage (สำหรับผู้ใช้งานทั่วไป)

*หมายเหตุ: API ในกลุ่มนี้มีการบังคับใช้ **Rate Limiting (Limit ต่อ IP)** เพื่อป้องกันการ Spam เเละการดึงข้อมูลเพื่อก่อกวนเซิร์ฟเวอร์ เช่น จำกัดที่ 100 requests / 1 นาที / 1 IP Address หากเกินระบบจะตอบกลับด้วย HTTP Status `429 Too Many Requests`*

### 6.1 Get Homepage Places
- **Endpoint:** `GET /api/v1/public/places`
- **Description:** ดึงข้อมูลสถานที่รับบริจาคสำหรับแสดงบนหน้า Homepage 
- **Rate Limit:** 100 requests / 1 min / IP
- **Query Params:**
  - `page` (int) - หน้าที่ต้องการ (default: 1)
  - `size` (int) - จำนวนที่ต้องการแสดงต่อหน้า (default: 10)
  - `search` (string) - คำค้นหา
  - `tag` (string) - ค้นหาจาก Tag พิเศษ (เช่น "ด่วน")
- **Response:**
  ```json
  {
    "data": [ { /* Public Place Object */ } ],
    "meta": { "total": 50, "page": 1, "size": 10, "last_page": 5 }
  }
  ```

### 6.2 Get Homepage Items
- **Endpoint:** `GET /api/v1/public/items`
- **Description:** ดึงข้อมูลรายการของบริจาคสำหรับแสดงบนหน้า Homepage
- **Rate Limit:** 100 requests / 1 min / IP
- **Query Params:**
  - `page` (int) - หน้าที่ต้องการ (default: 1)
  - `size` (int) - จำนวนที่ต้องการแสดงต่อหน้า (default: 10)
  - `animal_type` (string) - กรองประเภทสัตว์
  - `tag` (string) - กรองตาม Tag (เช่น "ด่วน")
- **Response:**
  ```json
  {
    "data": [ { /* Public Item Object */ } ],
    "meta": { "total": 100, "page": 1, "size": 10, "last_page": 10 }
  }
  ```

---

## 7. API Endpoints: Authentication (ระบบยืนยันตัวตน)

### 7.1 Admin Login
- **Endpoint:** `POST /api/v1/admin/auth/login`
- **Description:** เข้าสู่ระบบสำหรับผู้ดูแลระบบ (Admin)
- **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "your_password"
  }
  ```
- **Response (Success):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT Token (ใช้ส่งใน Header: Authorization Bearer <token>)
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "name": "Admin Name"
    }
  }
  ```
- **Response (Error 401 Unauthorized):**
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

***

**ข้อมูลบัญชีผู้ดูแลระบบเริ่มต้น (Default Admin Account)**
*ระบบจะต้องมีการสร้างบัญชีผู้ดูแลระบบเริ่มต้น (Seed Data) เพื่อใช้สำหรับล็อกอินครั้งแรก โดยใช้ข้อมูลดังต่อไปนี้:*
- **Email:** `systemadmin@gmail.com`
- **Password:** `@gkfvdgm`