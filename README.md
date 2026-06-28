# Zealthy EMR

A modern Electronic Medical Record (EMR) web application built with Next.js, TypeScript, Prisma, PostgreSQL, and Tailwind CSS.

## Features

### Patient Portal

- Secure patient login
- Dashboard with patient summary
- Upcoming appointments (next 7 days)
- Medication refills (next 7 days)
- View all appointments
- View all prescriptions
- Responsive design

### Admin Portal

- Patient management
- Create, edit and delete patients
- Manage appointments
- Manage prescriptions
- Responsive dashboard
- Searchable patient list

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- PostgreSQL
- Zod
- React Hook Form
- JWT Authentication

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create environment variables

```env
DATABASE_URL=
JWT_SECRET=
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Seed database (if applicable)

```bash
npx prisma db seed
```

Run locally

```bash
npm run dev
```

Application runs at

```
http://localhost:3000
```

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Project Structure

```
app/
components/
lib/
prisma/
schemas/
services/
repositories/
types/
```

## Author

Vineeth G
