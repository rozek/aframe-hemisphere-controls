# aframe-hemisphere-controls #

a simple "orbit-controls" alternative for A-Frame

For a simple model viewer based on an [A-Frame](https://github.com/aframevr/aframe/) instance embedded in a web page I needed a  mechanism to rotate the shown model by mouse, finger, arrow and WASD keys. Only model(!) rotation was needed, panning and zooming were unwanted. Additionally, stereoscopic display (aka "VR mode") and gyroscopes found in mobile devices had to be disabled.

And since the existing [orbit-controls](https://github.com/supermedium/superframe/tree/master/components/orbit-controls/) did not meet my requirements, I made my own controls.
