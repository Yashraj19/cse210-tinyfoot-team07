# Tinyfoot

## Live Demo

A live demo of Tinyfoot can be found at
https://yashraj19.github.io/cse210-tinyfoot-team07/

## Usage

Include the following snippet in your HTML:

```html
<template id="tinyfoot-template">
  <link rel="stylesheet" href="dist/tinyfoot.css" />
  <span id="tinyfoot-container">
    <button id="tinyfoot-button"></button>
    <div id="tinyfoot-popup">
      <slot></slot>
    </div>
  </span>
</template>
<script type="module">
  import tinyfoot from "dist/tinyfoot.js";
  tinyfoot({
    numeric: true,
    bottom: true,
  });
</script>
```

Then, you can write footnotes using the `tinyfoot-footnote` tag:

```html
This is a sentence. <tinyfoot-footnote>This is a footnote.</tinyfoot-footnote>
```

There are two configurable options when initializing Tinyfoot:

- `numeric` controls whether the footnote buttons will be numbered.
- `bottom` controls whether the footnote popup will show at the bottom or next to the buttons.

## Development

### Start the demo

```sh
npm install && npm start
```

### Format code

```sh
npm run format
```
