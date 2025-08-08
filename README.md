# TaskLite Frontend (Next.js + pnpm)

This is the **frontend** for the **TaskLite MERN Stack Task Manager**.  
It provides a clean drag-and-drop interface for managing tasks with PDF export and real-time updates.

---

## 🚀 Features
- **User Registration & Login** (email only — no password).
- **Create, Read, Update, Delete (CRUD)** for tasks.
- **Drag-and-drop** task movement between "To Do", "In Progress", and "Done" columns using **@dnd-kit/core**.
- **Priority labels** and **due date** display.
- **Generate PDF** for individual tasks using `jspdf` + `html2canvas`.
- **Responsive UI** built with Tailwind CSS v4.
- **Toast notifications** via `react-hot-toast`.
- **Icons** with `react-icons`.

---

## 📦 Tech Stack
- **Framework:** Next.js (v15)
- **Styling:** Tailwind CSS v4
- **Drag & Drop:** @dnd-kit/core
- **PDF Export:** jspdf + html2canvas
- **Notifications:** react-hot-toast
- **HTTP Client:** Axios
- **Package Manager:** pnpm

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
2️⃣ Install dependencies (using pnpm)
pnpm install

3️⃣ Create .env.local file

NEXT_PUBLIC_BASE_URL="http://localhost:4000/api/user"

4️⃣ Run the development server
pnpm dev
Now open: http://localhost:3000

