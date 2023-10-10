# assets-tracker-web

assets-tracker-web is Asset Tracker Demo web app built using Next.js, Tailwinds CSS, and Mapbox GL GS.

## Performance 

To address performance issues updating 1k+ Mapbox markers we push updates using GEOJSON data from Go/Gin REST API. Tested with 10k moving markers updating every second and smoothly re-forming clusters. Individual markers will show node properties on click.

Instead of utilizing SSE or Websockets/Long Polling to push updates from server to client we have to trigger data update requests on client side - this is because of the simulation of moving nodes on API side.

Once updates are pushed from server to client we can improve UI performance with Memoize and requestAnimationFrame.

## Compatibility

Tested on Chrome and Firefox, mobile view is not optimized.

## Installation

```bash
pnpm i

```

## Configuration

The following ENV variables have to be configured:

NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN - Mapbox token

NEXT_PUBLIC_API_URL - GEOJSON API url


## Usage

```bash
pnpm dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)