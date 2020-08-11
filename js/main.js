import * as THREE from "./Three.js";
import {OrbitControls} from "./OrbitControls.js";

let scene;
let camera;
let renderer;
let skyBox;

function init() {
    scene = new THREE.Scene;
    camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 45, 30000);
    camera.position.set(-900, -200, -900);
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", () => updateAspectRatio());

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", renderer);
    controls.minDistance = 500;
    controls.maxDistance = 1500;

    skyBox = createSkyBox("arid");
    scene.add(skyBox);

    animate();
}

function animate() {
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

function createSkyBox(name) {
    const material = createMaterial(name);
    const skyBoxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    const skyBox = new THREE.Mesh(skyBoxGeo, material);

    return skyBox;
}

function createMaterial(name) {
    const texture_ft = new THREE.TextureLoader().load("img/" + name + "_ft.jpg");
    const texture_bk = new THREE.TextureLoader().load("img/" + name + "_bk.jpg");
    const texture_up = new THREE.TextureLoader().load("img/" + name + "_up.jpg");
    const texture_dn = new THREE.TextureLoader().load("img/" + name + "_dn.jpg");
    const texture_rt = new THREE.TextureLoader().load("img/" + name + "_rt.jpg");
    const texture_lf = new THREE.TextureLoader().load("img/" + name + "_lf.jpg");

    const materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_lf}));

    for (const material of materialArray) material.side = THREE.BackSide;

    return materialArray;
}

function changeMaterial(name) {
    skyBox.material = createMaterial(name);
}

function updateAspectRatio() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = width/height;

    renderer.setSize(width, height);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

document.addEventListener("DOMContentLoaded", function() {
    init();

    document.querySelector("#skybox").addEventListener("change", function() {
        changeMaterial(this.value);
    });
});
