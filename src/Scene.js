import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

class Scene extends Component {
  componentDidMount() {
    this.setupScene();
  }

  setupScene = () => {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    const scene = new THREE.Scene();


    const loader = new THREE.TextureLoader();
    loader.load('https://securelogin.kiksar.com/auth/resources/6.0.1/login/kiksar/img/keycloak-bg.png', function (texture) {
      scene.background = texture;
    });


    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 800);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: '#069494' });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.object = cube;
    this.computeBoundingBox();
  }

  computeBoundingBox = () => {
    this.camera.position.z = 3;
    this.camera.updateProjectionMatrix();
    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls = controls;
    this.container.appendChild(this.renderer.domElement);
    this.start();
  }

  start = () => {
    requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderScene();
  }
  render() {
    return (
      <div>
        <h1 style={{color:'#03B0FE',textAlign:'center',backgroundColor:'#d5effb'}}> Task from Kiksar </h1>
        <div ref={(container) => { this.container = container }} />
      </div>
    )
  }
}

export default Scene;