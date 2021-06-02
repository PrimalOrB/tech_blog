
import * as THREE from './three.module.js';
console.log( THREE)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);// Lights

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

  const widthPos = ( event.clientX / window.innerWidth ) - 0.5
  const heightPos = ( event.clientY / window.innerHeight ) - 0.5

  camera.rotation.y = widthPos * .5;
  camera.rotation.x = heightPos * .5;
}

document.onmousemove = handleMouseMove

let updateVal = 0

function animate() {
  requestAnimationFrame(animate);

  camera.rotation.y += .0005;
  camera.rotation.x += .0005;

  renderer.render(scene, camera);
}

animate();
