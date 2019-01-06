import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-threejs-viewer',
  templateUrl: './threejs-viewer.component.html',
  styleUrls: ['./threejs-viewer.component.css']
})
export class ThreejsViewerComponent implements OnInit {

  @ViewChild('container') elementRef: ElementRef;
  private container: HTMLElement;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private cube: THREE.Mesh;
  private selectableObjects = [];
  private ambientLight;


  constructor(private location: Location) {
    console.log(THREE);
  }

  ngOnInit() {
    this.container = this.elementRef.nativeElement;
    console.log(this.container);
    this.init();
  }

  init() {
    let screen = {
      width: 1200,
      height: 800
    },
      view = {
        angle: 80,
        aspect: screen.width / screen.height,
        near: 0.1,
        far: 1000
      };
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(view.angle, view.aspect, view.near, view.far);
    this.renderer = new THREE.WebGLRenderer();

    this.scene.add(this.camera);
    this.scene.add(new THREE.AxesHelper(20));

    this.camera.position.set(-100, 300, 200);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer.setSize(screen.width, screen.height);
    this.container.appendChild(this.renderer.domElement);


    let geometry = new THREE.BoxGeometry(5, 5, 5),
      material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(-50, -50, -50);

    this.addBase();

    //this.scene.add(this.cube);

    this.render();
  }

  addBase() {

    let materialBase = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
    //Lights
    this.ambientLight = new THREE.AmbientLight(0x000000, 1);
    this.scene.add(this.ambientLight);

    //Movel 1
    //Floor
    let floorGeometry = new THREE.CubeGeometry(77.5, 5, 35);
    let floorMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let floor = new THREE.Mesh(floorGeometry, materialBase);
    floor.position.y = 1.5;
    this.scene.add(floor);

    //Ceiling
    let ceilingGeometry = new THREE.CubeGeometry(77.5, 2.5, 35);
    let ceilingMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let ceiling = new THREE.Mesh(ceilingGeometry, materialBase);
    ceiling.position.y = 199.75;
    this.scene.add(ceiling);

    //Left Wall
    let leftWallGeometry = new THREE.CubeGeometry(2.5, 202, 35);
    let leftWallMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let leftWall = new THREE.Mesh(leftWallGeometry, materialBase);
    leftWall.position.x = 40;
    leftWall.position.y = 100;
    this.scene.add(leftWall);

    //Right Wall
    let rightWallGeometry = new THREE.CubeGeometry(2.5, 202, 35);
    let rightWallMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let rightWall = new THREE.Mesh(rightWallGeometry, materialBase);
    rightWall.position.x = -40;
    rightWall.position.y = 100;
    this.scene.add(rightWall);

    //Back Wall
    let backWallGeometry = new THREE.CubeGeometry(77.5, 200, 2);
    let backWallMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let backWall = new THREE.Mesh(backWallGeometry, materialBase);
    backWall.position.z = -15;
    backWall.position.y = 100;
    this.scene.add(backWall);

    //Shelf1
    let shelf1Geometry = new THREE.CubeGeometry(77.5, 2, 31.5);
    let shelf1Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let shelf1 = new THREE.Mesh(shelf1Geometry, materialBase);
    shelf1.position.z = 1.75;
    shelf1.position.y = 164;
    this.scene.add(shelf1);

    //Shelf2
    let shelf2Geometry = new THREE.CubeGeometry(77.5, 2, 31.5);
    let shelf2Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let shelf2 = new THREE.Mesh(shelf2Geometry, materialBase);
    shelf2.position.z = 1.75;
    shelf2.position.y = 137;
    this.scene.add(shelf2);

    //shelf 3
    let shelf3Geometry = new THREE.CubeGeometry(77.5, 2, 31.5);
    let shelf3Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let shelf3 = new THREE.Mesh(shelf3Geometry, materialBase);
    shelf3.position.z = 1.75;
    shelf3.position.y = 110;
    this.scene.add(shelf3);

    //shelf 4
    let shelf4Geometry = new THREE.CubeGeometry(77.5, 2, 31.5);
    let shelf4Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let shelf4 = new THREE.Mesh(shelf4Geometry, materialBase);
    shelf4.position.z = 1.75;
    shelf4.position.y = 75;
    //scene.add(shelf4);

    //GLASS
    let shelfGlassGeometry = new THREE.CubeGeometry(77.5, 1, 31.5);
    //refractCubeCamera = new THREE.CubeCamera(0.1,10000,128);
    //scene.add(refractCubeCamera);

    //let textureCube = new THREE.CubeTextureLoader().load(urls);
    //textureCube.mapping = THREE.CubeRefractionMapping;
    //refractCubeCamera.renderTarget.mapping=

    var refractGlassMaterial = new THREE.MeshLambertMaterial({
      color: 0xA8CCD7,
      refractionRatio: 0.5,
      reflectivity: 0.99,
      emissive: null
    });

    refractGlassMaterial.transparent = true;
    refractGlassMaterial.opacity = 0.4;
    let shelfGlass = new THREE.Mesh(shelfGlassGeometry, refractGlassMaterial);
    shelfGlass.position.z = 1.75;
    shelfGlass.position.y = 45;
    //refractCubeCamera.position = shelfGlass.position;
    this.scene.add(shelfGlass);

    //DOORS

    //top part
    //wood
    let woodStripR1Geometry = new THREE.CubeGeometry(8, 127, 2);
    let woodStripR1Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });

    let woodStripR1 = new THREE.Mesh(woodStripR1Geometry, materialBase);
    woodStripR1.position.z = 18.5;
    woodStripR1.position.y = 137.5;
    woodStripR1.position.x = -35.75;

    this.scene.add(woodStripR1);


    let woodStripR2Geometry = new THREE.CubeGeometry(5, 127, 2);
    let woodStripR2Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });

    let woodStripR2 = new THREE.Mesh(woodStripR2Geometry, materialBase);
    woodStripR2.position.z = 18.5;
    woodStripR2.position.y = 137.5;
    woodStripR2.position.x = -2.75;


    this.scene.add(woodStripR2);


    let woodStripR3Geometry = new THREE.CubeGeometry(26.5, 2, 2);
    let woodStripR3Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });

    let woodStripR3 = new THREE.Mesh(woodStripR3Geometry, materialBase);
    woodStripR3.position.z = 18.5;
    woodStripR3.position.y = 200;
    woodStripR3.position.x = -18.5;


    this.scene.add(woodStripR3);


    //LEFT

    let woodStripL1Geometry = new THREE.CubeGeometry(8, 127, 2);
    let woodStripL1Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });

    let woodStripL1 = new THREE.Mesh(woodStripL1Geometry, materialBase);
    woodStripL1.position.z = 18.5;
    woodStripL1.position.y = 137.5;
    woodStripL1.position.x = 35.75;
    this.scene.add(woodStripL1);


    let woodStripL2Geometry = new THREE.CubeGeometry(5, 127, 2);
    let woodStripL2Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });

    let woodStripL2 = new THREE.Mesh(woodStripL2Geometry, materialBase);
    woodStripL2.position.z = 18.5;
    woodStripL2.position.y = 137.5;
    woodStripL2.position.x = 2.75;
    this.scene.add(woodStripL2);


    let woodStripL3Geometry = new THREE.CubeGeometry(26.5, 2, 2);
    let woodStripL3Material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });

    let woodStripL3 = new THREE.Mesh(woodStripL3Geometry, materialBase);
    woodStripL3.position.z = 18.5;
    woodStripL3.position.y = 200;
    woodStripL3.position.x = 18.5;
    this.scene.add(woodStripL3);


    //Glass strip Right

    let glassStripRGeometry = new THREE.CubeGeometry(26.5, 125, 1);
    let glassStripRMaterial = new THREE.MeshLambertMaterial({
      color: 0xA8CCD7,
      refractionRatio: 0.5,
      reflectivity: 0.99,
      emissive: null
    });

    glassStripRMaterial.transparent = true;
    glassStripRMaterial.opacity = 0.4;
    let glassStripR = new THREE.Mesh(glassStripRGeometry, glassStripRMaterial);
    glassStripR.position.z = 18.5;
    glassStripR.position.y = 136.5;
    glassStripR.position.x = -18.5;


    this.scene.add(glassStripR);


    //Glass strip Left

    let glassStripLGeometry = new THREE.CubeGeometry(26.5, 125, 1);
    let glassStripLMaterial = new THREE.MeshLambertMaterial({
      color: 0xA8CCD7,
      refractionRatio: 0.5,
      reflectivity: 0.99,
      emissive: null
    });

    glassStripLMaterial.transparent = true;
    glassStripLMaterial.opacity = 0.4;
    let glassStripL = new THREE.Mesh(glassStripLGeometry, glassStripLMaterial);
    glassStripL.position.z = 18.5;
    glassStripL.position.y = 136.5;
    glassStripL.position.x = 18.5;
    this.scene.add(glassStripL);


    //lower part
    let door1DGeometry = new THREE.CubeGeometry(39.5, 71, 2);
    let door1DMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let door1D = new THREE.Mesh(door1DGeometry, materialBase);
    door1D.position.z = 18.5;
    door1D.position.y = 38.5;
    door1D.position.x = -20;
    this.scene.add(door1D);

    let door2DGeometry = new THREE.CubeGeometry(39.5, 71, 2);
    let door2DMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let door2D = new THREE.Mesh(door2DGeometry, materialBase);
    door2D.position.z = 18.5;
    door2D.position.y = 38.5;
    door2D.position.x = 20;
    this.scene.add(door2D);

    //door knobs

    //drawer
    let drawerBottomGeometry = new THREE.CubeGeometry(77.5, 2, 31.5);
    let drawerBottomMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });
    let drawerSideGeometry = new THREE.CubeGeometry(12.5, 2, 27.5);
    let drawerSideMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });

    let drawerFrontGeometry = new THREE.CubeGeometry(77.5, 2, 12.5);
    let drawerFrontMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('imgs/TestTextureWood.png'),
      side: THREE.DoubleSide,
      emissive: null
    });

    let drawerBottom = new THREE.Mesh(drawerBottomGeometry, materialBase);
    drawerBottom.position.z = 1.75;
    drawerBottom.position.y = 75;

    let drawerRight = new THREE.Mesh(drawerSideGeometry, materialBase);
    drawerRight.position.z = 1.75;
    drawerRight.position.y = 82;
    drawerRight.rotation.z += Math.PI / 2;
    drawerRight.position.x = 37.75;

    let drawerLeft = new THREE.Mesh(drawerSideGeometry, materialBase);
    drawerLeft.position.z = 1.75;
    drawerLeft.position.y = 82;
    drawerLeft.rotation.z += Math.PI / 2;
    drawerLeft.position.x = -37.75;

    let drawerFront = new THREE.Mesh(drawerFrontGeometry, materialBase);
    drawerFront.position.z = 16.50;
    drawerFront.position.y = 82;
    drawerFront.rotation.x += Math.PI / 2;

    let drawerBack = new THREE.Mesh(drawerFrontGeometry, materialBase);
    drawerBack.position.z = -13;
    drawerBack.position.y = 82;
    drawerBack.rotation.x += Math.PI / 2;

    var drawer = new THREE.Object3D();
    drawer.add(drawerBottom);
    drawer.add(drawerRight);
    drawer.add(drawerLeft);
    drawer.add(drawerFront);
    drawer.add(drawerBack);
    /*drawer.name = moduleTypes[2];
    drawer2 = buildDrawer(100, 20, 150, 50, 0);*/
    //scene.add(drawer2);

    //Group door right
    var rightDoor = new THREE.Object3D();
    rightDoor.add(woodStripR1);
    rightDoor.add(woodStripR2);
    rightDoor.add(woodStripR3);
    rightDoor.add(glassStripR);
    rightDoor.add(door1D);
    this.scene.add(rightDoor);

    //Group left door
    var leftDoor = new THREE.Object3D();
    leftDoor.add(woodStripL1);
    leftDoor.add(woodStripL2);
    leftDoor.add(woodStripL3);
    leftDoor.add(glassStripL);
    leftDoor.add(door2D);
    this.scene.add(leftDoor);

    //Cabinet "Casket"
    let cabinet = new THREE.Object3D();
    cabinet.add(shelfGlass,
      shelf4, shelf3, shelf2, shelf1, backWall,
      rightWall, leftWall, ceiling, floor);
    this.scene.add(cabinet);

    //add objects to the raycast selection range
    this.selectableObjects.push(rightDoor, leftDoor, cabinet, drawer);

    //Lights
    let ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    this.scene.add(ambientLight);
  }

  render() {

    let self: ThreejsViewerComponent = this;

    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);

      self.animate();
    }());

  }

  animate() {
    this.renderer.clear();
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
  }

  goBack(): void {
    this.location.back();
  }

}
