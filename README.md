# Perihelion

This is a simple web-app built on top of [SSB](https://scuttlebutt.nz/). For dev documentation visit the [Scuttlebutt Treasure Map for Developers](https://dev.scuttlebutt.nz/#/)

The purpose I had to build it is to learn, and to create a web client that I can eventually host and access from multiple devices.

It uses [Next.js](https://nextjs.org/) and other "modern" web development tools.

## Installation

If you want to run Perihelion, you will have to clone this repository and then:

```
npm install
npm run dev
```

This will run the project in development mode, meaning it will have _hot reloading_ and all the NextJs goodness.

If you want to run in "production" mode, you will have to:

```
npm install
npm run build
npm start
```

## Compatibility

It's important to know that Perihelion uses `ssb-db2`, which means is not compatible with the likes of Patchwork and other similar clients.

Also, it relies on `ssb-ebt` for replication. And I haven't managed to get it replicating using the legacy `ssb-replicate` yet.
