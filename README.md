# aframe-hemisphere-controls #

a simple "orbit-controls" alternative for A-Frame

For a simple model viewer based on an [A-Frame](https://github.com/aframevr/aframe/) instance embedded in a web page I needed a  mechanism to rotate the shown model by mouse, finger, arrow and WASD keys. Only model(!) rotation was needed, panning and zooming were unwanted. Additionally, stereoscopic display (aka "VR mode") and gyroscopes found in mobile devices had to be disabled.

And since the existing [orbit-controls](https://github.com/supermedium/superframe/tree/master/components/orbit-controls/) did not meet my requirements, I just made my own.

## Installation ##

`aframe-hemisphere-controls` may be used as an ECMAScript module (ESM) or explicitly loaded after the `<script>` tag for A-Frame itself.

For the ESM variant, install the package into your build environment using [NPM](https://docs.npmjs.com/) with the command

```
npm install aframe-hemisphere-controls
```

and `import` it in your code whereever needed

```javascript
import "aframe-hemisphere-controls"
```

Otherwise, load the plain script file directly

```html
<script src="https://unpkg.com/aframe-hemisphere-controls"></script>
```






### Example ###

Here is a complete example (albeit without the HTML boilerplate)

```html
<script src="https://unpkg.com/aframe"></script>
<script src="https://unpkg.com/aframe-hemisphere-controls"></script>

<a-scene embedded
  hemisphere-controls="position:0 0.5 4; target:0 0 0"
  style="width:600px; height:450px"
>
  <a-sky color="#ECECEC"></a-sky>

  <a-plane width="4" height="4" color="#7BC8A4"
    position="0 0 0" rotation="-90 0 0"></a-plane>

  <a-box      color="#4CC3D9" position="-1 0.5 1"  rotation="0 45 0"></a-box>
  <a-sphere   color="#EF2D5E" position="0 1.25 -1" radius="1.25"></a-sphere>
  <a-cylinder color="#FFC65D" position="1 0.75 1"  radius="0.5" height="1.5"></a-cylinder>
</a-scene>
```

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/aframe-hemisphere-controls/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
