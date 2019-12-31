# Traveling Salesman Problem - With Conditions
Whether you need to find the optimal route regardless of conditions or you have conditions based on time windows and load capacity, tsp-wc will help you find the shortest route.

![Demo app to find optimal route](https://i.imgur.com/JmhGUur.jpg)

## Sample Usage
See the [sample file in TypeScript](tests/usage.ts) to see how it can be used in your Node.js projects. The core function (solve) is in [tspwc.ts](tspwc.ts) and takes the following parameters:

```
stops: ITspStop (required)
initialTime: Date (optional)
initialLoad: number (optional) - initial load capacity, generally set to 100
ignoreConditions: boolean (optional) - this will ignore conditions passed into stops
initialPath: [0] (optional, not recommended to change)
```

ITspStop is defined as follows:
```typescript
export interface ITspStop {
    id: string,
    arriveBetween?: Date[],
    arriveAfter?: Date,
    arriveBy?: Date,
    load?: number,
    times: number[],
    startTime?: Date
}
```

### HTML
See [tests/demo.html](tests/demo.html) to learn more about how to incorporate this into your project via HTML and JS or tests/usage.ts for an example on how to tspwc with NodeJS and TypeScript. We have included a browser-friendly version of tspwc that you can [find here](tspwc-browser.js). Please note that you will need your own Google API key to test this with both Maps and Directions API enabled on your Google Account.

## Available Scripts 

In the project directory, you can run:

### `npm run build`

Builds [tspwc.ts] and [tests/usage.ts](tests/usage.ts) into JS files for usage. usage.ts is a demo of the script being used in Typescript while [tests/demo.html](tests/demo.html) provides a demonstration of usage within the browser.

### `npm run test-usage`

Runs the sample usage.js file which should output a log in your console.

## Learn More

You can learn more about [the developer here](https://www.linkedin.com/in/daniel-moxon/).