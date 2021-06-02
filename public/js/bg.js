
import * as THREE from './three.module.js';

let canvas =  document.querySelector('#bg')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

const arrayLen = 400
Array(arrayLen).fill().forEach(addStar);

const points = []
for( var i = 0; i < arrayLen; i++ ){
  points.push( new THREE.Vector3( scene.children[i].position.x, scene.children[i].position.y, scene.children[i].position.z ) )
}
const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );
const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( lineGeometry, lineMaterial );
scene.add( line )

let widthPos = 0.5
let heightPos = 0.5

let xDiff = 0
let yDiff = 0

function handleMouseMove(event) {
  var eventDoc, doc, body;
  const w = document.body.getBoundingClientRect()
  event = event || window.event; // IE-ism

  if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
        (doc && doc.clientTop  || body && body.clientTop  || 0 );
  }

  const newWidthPos = ( event.clientX / window.innerWidth ) - 0.5
  const newHeightPos = ( event.clientY / window.innerHeight ) - 0.5

  xDiff = newWidthPos - widthPos
  yDiff = newHeightPos - heightPos

  widthPos = newWidthPos
  heightPos = newHeightPos

}

document.onmousemove = handleMouseMove

function animate() {
  requestAnimationFrame(animate);

  camera.rotation.y -= widthPos / 100;
  camera.rotation.x -= heightPos / 100;

  renderer.render(scene, camera);
}

animate();

    //resize
function resize(){
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowAspect = windowWidth / windowHeight
  camera.aspect = windowAspect;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener( 'resize', resize, false);
