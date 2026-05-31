# RoomBooking

A room booking web application built as an M1 project at Ynov.  
Users can browse rooms, make reservations, and manage bookings. Admins manage rooms, equipment, and users.

**Stack:** Vue 3 + TypeScript (frontend) · .NET 8 / ASP.NET Core (backend) · SQLite (database)

---

## Quick Start (Docker)

> Requires [Docker](https://docs.docker.com/get-docker/) with Compose v2.

```bash
git clone <repo-url>
cd roombooking

# 1. Set up environment variables
cp .env.example .env
# Edit .env and set a strong JWT_SECRET_KEY

# 2. Start everything
docker compose up --build
```

| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:5173        |
| Backend  | http://localhost:5010        |
| Swagger  | http://localhost:5010/swagger |

---

## Local Development (without Docker)

### Backend (.NET 8)

```bash
cd back

# Copy and configure dev settings
cp appsettings.Development.example.json appsettings.Development.json
# Edit appsettings.Development.json and set a Jwt.SecretKey

dotnet restore
dotnet run
# API runs on http://localhost:5010
```

Requires [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).

### Frontend (Vue 3 + Vite)

```bash
cd front

# Set up environment
echo "VITE_ROOM_BOOKING_API=http://localhost:5010" > .env

npm install
npm run dev
# App runs on http://localhost:5173
```

Requires [Node.js 22+](https://nodejs.org/).

---

## Project Structure

```
roombooking/
├── back/          # .NET 8 REST API
├── front/         # Vue 3 + Vite SPA
├── .env.example   # Environment variable template
└── docker-compose.yml
```

See [`back/README.md`](./back/README.md) and [`front/README.md`](./front/README.md) for stack-specific details.

---

## Features

| Feature                              | Status |
|--------------------------------------|--------|
| Room catalog (CRUD by admins)        | ✅     |
| Booking requests (+ edit)            | ✅     |
| Client & admin profiles              | ✅     |
| Available / unavailable time slots   | ✅     |
| Cancel a booking                     | ✅     |
| Booking history                      | ✅     |
| Search & filters                     | ✅     |
| Export `.cal` / `.csv`               | ✅     |
| Mobile-friendly                      | ✅     |
| Email reminders before event         | ❌     |
| Interactive room calendar            | ❌     |
| Export `.xlsx`                       | ❌     |

---

## Authors

- [Alixan Balu](https://github.com/Alixanb)
- [Aurélie Runser](https://github.com/Aurelie-Runser)
