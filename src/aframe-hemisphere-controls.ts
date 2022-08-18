import './THREE-OrbitControls.js'

declare const AFRAME:any, THREE:any

delete AFRAME.components['hemisphere-controls']

AFRAME.registerComponent('hemisphere-controls', {
  dependencies: ['camera','vr-mode-ui','look-controls'],
  schema: {
    'position': { type:'vec3', default:{ x:0,y:1,z:4 } },
    'target':   { type:'vec3', default:{ x:0,y:0,z:0 } }
  },

/**** init ****/

  init: function ():void {
    this.el.sceneEl.setAttribute('vr-mode-ui',   'enabled',false)  // disable VR
    this.el.sceneEl.setAttribute('look-controls','enabled',false)   // important

    this.Camera        = this.el.getObject3D('camera')
    this.OrbitControls = new THREE.OrbitControls(
      this.Camera, this.el.sceneEl.renderer.domElement
    )

    Object.assign(this.OrbitControls, {
      enableKeys:false, enablePan:false, enableZoom:false,
      minPolarAngle:Math.PI/180*1, maxPolarAngle:Math.PI/180*89
    })            // reduced limits avoid "strange" behaviour when reaching them

    this.KeyEventListener = KeyEventListener.bind(this)
  },

/**** update ****/

  update: function (oldData:any):void {
    if (
      (oldData == null) || (oldData.position == null) ||
      ! oldData.position.equals(this.data.position)
    ) {
      this.Camera.position.copy(this.data.position)
    }

    if (
      (oldData == null) || (oldData.target == null) ||
      ! oldData.target.equals(this.data.target)
    ) {
      this.OrbitControls.target.copy(this.data.target)
    }

    this.OrbitControls.update()
  },

/**** play/pause ****/

  play:  function ():void {
    this.el.sceneEl.style.cursor = 'grab'            // visual feedback for user
    startEventHandlingFor(this)
  },

  pause: function ():void {
    this.el.sceneEl.style.cursor = 'auto'            // visual feedback for user
    stopEventHandlingFor(this)
  },

/**** remove ****/

  remove: function ():void {
    this.OrbitControls.reset()
    this.OrbitControls.dispose()
  }
})

/**** startEventHandlingFor ****/

  function startEventHandlingFor (Component:any):void {
    window.addEventListener('keydown',Component.KeyEventListener)
  }

/**** stopEventHandlingFor ****/

  function stopEventHandlingFor (Component:any):void {
    window.removeEventListener('keydown',Component.KeyEventListener)
  }

/**** KeyEventListener ****/

  function KeyEventListener (this:any, Event:any):void {
    let Orbiter = this.OrbitControls
    let Delta   = Math.PI/180

    switch (Event.key) {
      case 'Home':
        this.Camera.position.copy(this.data.position)
        Orbiter.update()
        break

      case 'ArrowLeft':  rotateBy( (Event.shiftKey ? 10 : 1)*Delta,0); break
      case 'ArrowRight': rotateBy(-(Event.shiftKey ? 10 : 1)*Delta,0); break
      case 'ArrowUp':    rotateBy(0, (Event.shiftKey ? 10 : 1)*Delta); break
      case 'ArrowDown':  rotateBy(0,-(Event.shiftKey ? 10 : 1)*Delta); break

      case 'a': rotateBy( Delta,0); break
      case 'd': rotateBy(-Delta,0); break
      case 'w': rotateBy(0, Delta); break
      case 's': rotateBy(0,-Delta); break

      case 'A': rotateBy( 10*Delta,0); break
      case 'D': rotateBy(-10*Delta,0); break
      case 'W': rotateBy(0, 10*Delta); break
      case 'S': rotateBy(0,-10*Delta); break
    }

  /**** rotateBy - weird approach, but OrbitControls have no setters ****/

    function rotateBy (
      horizontalAngle:number, verticalAngle:number
    ):void {
      let { minAzimuthAngle,maxAzimuthAngle, minPolarAngle,maxPolarAngle } = Orbiter
        Orbiter.minAzimuthAngle = Orbiter.maxAzimuthAngle
          = Orbiter.getAzimuthalAngle() + horizontalAngle
        Orbiter.minPolarAngle = Orbiter.maxPolarAngle
          = Orbiter.getPolarAngle() + verticalAngle
        Orbiter.update()
      Object.assign(Orbiter,{ minAzimuthAngle,maxAzimuthAngle, minPolarAngle,maxPolarAngle })
      Orbiter.update()
    }
  }
