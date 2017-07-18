window.onload = init;

var scene, camera, render;
var path = 'models/earth';

function init() {
  if (!Detector.webgl) {
    var warning = Detector.getWebGLErrorMessage();
    warning.innerHTML = 'WebGL not supported';
    return document.body.appendChild(warning);
  }

  var amColor = "#717171";
  var amLigth = new THREE.AmbientLight(amColor);
  var manager = new THREE.LoadingManager();
  var loader = new THREE.ImageLoader(manager);
  var earthTexture  = new THREE.Texture();
  var objLoader = new THREE.OBJLoader();
  var bumpMap = new THREE.TextureLoader().load(path + '/4096_bump.jpg');
  var ligth = new THREE.DirectionalLight('#ffffff', 3);


  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 10000);
  camera.position.z = 1500;
  render = new THREE.WebGLRenderer({ antialias: true });
  render.setClearColor( 0x1f1f1f );
  render.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(render.domElement);

  loader.load(path + '/4096_earth.jpg', function (image) {
    earthTexture.image = image;
    earthTexture.needsUpdate = true;
  });

  objLoader.load(path + '/earth.obj', function (object) {
    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhongMaterial({
          map: earthTexture,
          bumpMap: bumpMap,
          specular: amColor,
          bumpScale: 0.5
        });
      }
    });

    scene.add(object);
  });

  scene.add(ligth);
  scene.add(amLigth);

  var controls = new THREE.TrackballControls(camera);
  var rendering = function () {
    requestAnimationFrame( rendering );
    controls.update();
    render.render( scene, camera );
  };

  rendering();
}
