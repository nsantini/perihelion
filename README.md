# Perihelion

This is a simple web-app built on top of [SSB](https://scuttlebutt.nz/). For dev documentation visit the [Scuttlebutt Treasure Map for Developers](https://dev.scuttlebutt.nz/#/)

The purpose I had to build it is to learn, and to create a web client that I can eventually host and access from multiple devices.

It uses [Next.js](https://nextjs.org/) and other "modern" web development tools.

## Installation

If you want to run Perihelion, you will have to clone this repository, install [Node.js](https://nodejs.org/en/) (tested on Node 14), and then:

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

## Support for Apple M1 hardware

As mentioned in this [GitHub issue](https://github.com/ssbc/ssb-validate2-rsjs-node/issues/18#issuecomment-1140326214), there is a workaround to get it working.

Here are the steps after doing `npm install`

- Install rust following https://www.rust-lang.org/tools/install
- Run `cargo install nj-cli`
- Inside the node folder `node_modules/ssb-validate2-rsjs-node`, run `npm run build`
- Then you will be able to run Perihelion without issues

## Using with Docker

A `docker-compose.yml` file is provided.

Note that this setup uses Caddy with only local certs so you'll have to bypass the insecure domain cert locally. Actual certs should be set up for a public instance.

### Running in Dev Mode

- Install packages: `docker-compose run --rm dev npm install`
- Run app: `docker-compose up dev -d` Or remove `-d` for console output.
- Access the app at `https://perihelion.lvh.me/`

### Running in Production Mode

- Install packages: `docker-compose run --rm app npm install`
- Build production site: `docker-compose run --rm app npm run build`
- Run app: `docker-compose up app -d`
- Access the app at `https://perihelion.lvh.me/`

# Other SSB apps

You may find other SSB clients/applications preferable to, or complementary to, Perihelion.
As of 2022-10-27, the following are mutually-compatible, actively used and maintained FLOSS (Free/libre and open-source software) SSB applications, of various architectures:

- [Manyverse](https://www.manyver.se/) (Android, iOS)
- [Patchfox](https://patchfox.org/) (Firefox/WebExtension)
- [Patchwork](https://ahdinosaur.github.io/patchwork-downloader/) (Windows, macOS, Linux)
- [Planetary.social](https://www.planetary.social/) (iOS)
- [Patchfoo](https://git.scuttlebot.io/%25YAg1hicat%2B2GELjE2QJzDwlAWcx0ML%2B1sXEdsWwvdt8%3D.sha256)
