# LiveSyntax
https://livesyntax.vercel.app/

> NOTE: if you get server error when joining a room on the live website above , visit https://livesyntax-server.glitch.me/wakeup and refresh the page to wake up the server (`glitch.com` puts the server to sleep after just 5 minutes of inactivity)

A code editor that allows multiple users to edit the same code in real-time.

## Setup locally:
- requirements:  nodejs and npm
- clone this repo
- cd into the root directory
- install dependencies (this will install dependencies for both the client and server)
```bash
npm install
npm run install:all
```

- rename the `.env.example` file in the client directory to `.env` then edit it to your liking (see `client/src/libs/socket.ts`)

To start the server and client at the same time, run the following command from the root directory:
```bash
npm run dev
```

or do it manually for better debugging

start server: 
```bash 
cd server
npm run dev
```

start client:
```bash 
cd client
npm run dev
```
> for yarn / pnpm users, edit the scripts in `package.json` files

Tech used:
- React (with typescript)
- Tailwindcss
- CodeMirror
- Vite
- Nodejs (express)
- Socket.io
- [Glitch.com](https://glitch.com/) (for hosting the server)