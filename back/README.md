# RoomBooking — Backend

.NET 8 REST API for the RoomBooking project.

> For full setup instructions (including Docker), see the [root README](../README.md).  
> Frontend: [`../front/`](../front/README.md)

---

## Stack

- **.NET 8** / ASP.NET Core
- **Entity Framework Core 8** + SQLite
- **JWT** authentication (BCrypt password hashing)
- **Swagger** (available in Development mode)
- **Serilog** (structured logging)
- **EPPlus** / **CsvHelper** / **Ical.Net** (exports)

Tested with **.NET 8.0.404**.

---

## Local Setup

```bash
# Copy dev config template and fill in your JWT secret
cp appsettings.Development.example.json appsettings.Development.json

dotnet restore
dotnet run       # API → http://localhost:5010
                 # Swagger → http://localhost:5010/swagger
```

## Available Commands

| Command          | Description              |
|------------------|--------------------------|
| `dotnet restore` | Restore NuGet packages   |
| `dotnet build`   | Build the project        |
| `dotnet run`     | Run the dev server       |

## Database Migrations

```bash
dotnet ef migrations add <MigrationName>
dotnet ef database update
```

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
