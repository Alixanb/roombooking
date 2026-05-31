# RoomBooking — Frontend

Vue 3 + TypeScript SPA for the RoomBooking project.

> For full setup instructions (including Docker), see the [root README](../README.md).  
> Backend: [`../back/`](../back/README.md)

---

## Stack

- **Vue 3.5** with TypeScript
- **Vite 6** (build tool)
- **TailwindCSS 3** + Radix Vue (UI)
- **Vee-validate** (forms)
- **Axios** (HTTP)
- **Vue Router 4**

Tested with **Node.js 22.10.0**.

---

## Local Setup

```bash
# Set the backend URL
echo "VITE_ROOM_BOOKING_API=http://localhost:5010" > .env

npm install
npm run dev      # Dev server → http://localhost:5173
```

## Available Scripts

| Command              | Description              |
|----------------------|--------------------------|
| `npm run dev`        | Start dev server         |
| `npm run build`      | Production build         |
| `npm run preview`    | Preview production build |
| `npm run type-check` | Run TypeScript checks    |
| `npm run lint`       | Lint & auto-fix          |
| `npm run format`     | Format with Prettier     |

---

## Features

### Required
- [x] Booking requests (+ edit)
- [x] Room catalog (CRUD by admins)
- [ ] Email reminders before event
- [x] Client profile
- [x] Admin profile
- [x] Mobile-friendly booking
- [x] Export `.cal`

### Additional
- [ ] Interactive room calendar
- [ ] Current schedule display
- [x] Search & filters
- [x] Available / unavailable slots
- [x] Cancel a booking
- [x] Export `.csv`
- [ ] Export `.xlsx`
- [x] Booking history
