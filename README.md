# Nustaravel - Hotel Booking App
## Description
nustaravel is a fullstack web-based hotel room booking application. The hotel data used is only dummy data based on hotels in Indonesia. In this application there are 10 hotels which are used as dummy data from hotels, you can add more hotel data later. and also this application has also implemented a payment gateway from Midtrans, you can see the documentation here: https://docs.midtrans.com/
## Tech Stack
- TypeScript
- NextJs
- MySQL
- Midtrans

## Library
- Prisma(ORM)
- JWT
- Twilio(SMS notification): https://pages.twilio.com/
- Next Auth : https://next-auth.js.org/getting-started/introduction
## Installation
To run this Application in your local machine, follow these steps:
Clone the repository to your machine and install the needed dependencies. We use `npm` to manage our packages, so please make sure it is installed in your local machine.
```bash
git clone https://github.com/IndraSty/nustaravel.git

cd nustaravel

npm install
```
Start up a docker container running MySQL. A `docker-compose` file is provided to make this easier.
```bash
docker compose up
```
Complete the environment in `.env.example`

Run migrations using prisma
```bash
npx prisma migrate dev
```

Import data from the `/data` folder to your database. We recommend using a GUI like MySQL Workbench, or DBeaver to make this easier.

Run the Application in your local machine
```bash
npm run dev
```

## dasboard
![Dashboard Page](/images/dasboard.png)

## Hotel Page
