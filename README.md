# An Express Server Template

โปรเจกต์นี้เป็น RESTful API สำหรับระบบ ถาม–ตอบ (Q&A) พัฒนาด้วย Node.js + Express และเชื่อมต่อฐานข้อมูล PostgreSQL

## features
- จัดการคำถาม (สร้าง, อ่าน, แก้ไข, ลบ)
- จัดการคำตอบที่ผูกกับคำถาม
- ค้นหาคำถามด้วย `title` หรือ `category`
- ลบคำถามแล้วคำตอบที่เกี่ยวข้องจะถูกลบตาม (cascade delete)
- ตรวจสอบความถูกต้องของข้อมูล (Validation)

## Installation and Running the Project
   ```bash
   git clone https://github.com/Pimtawann/backend-skill-checkpoint-express-server.git
   cd backend-skill-checkpoint-express-server
   npm install express nodemon pg
   npm run start
   ```

## 🛠 Built With
- Node.js + Express
- PostgreSQL
- pg (node-postgres)
- nodemon

## 📚 Endpoint หลัก
Questions
- POST /questions → สร้างคำถามใหม่
- GET /questions → ดึงคำถามทั้งหมด
- GET /questions/:questionId → ดึงคำถามตาม ID
- GET /questions/search?title=xxx&category=xxx → ค้นหาคำถาม
- PUT /questions/:questionId → แก้ไขคำถาม
- DELETE /questions/:questionId → ลบคำถาม (คำตอบที่เกี่ยวข้องจะถูกลบด้วย)

Answers
- POST /questions/:questionId/answers → เพิ่มคำตอบ
- GET /questions/:questionId/answers → ดึงคำตอบของคำถาม
- DELETE /questions/:questionId/answers → ลบคำตอบทั้งหมดของคำถาม