import React, { useEffect } from 'react'

import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { io } from "socket.io-client";



const App = () => {
    const socket = io("http://localhost:3000");

    const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let My_Side;
function change_camera_pos(num){
    if(num==0){
        camera.position.set(0,2.5,1.5);
    }else{
        camera.position.set(0,-2.5,-1.5);
    }
}
// camera.position.z=2.5;
useEffect(()=>{//TODO: FIX ME!!!!!!!!

    socket.on("Change_Camera", (msg)=>{
        change_camera_pos(msg);
        
        console.log("My Side is: ", msg);
    })


},[]);


const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.querySelector("#UI_MAIN").appendChild( renderer.domElement );
const controls=new TrackballControls(camera, renderer.domElement);




controls.mouseButtons.RIGHT=THREE.MOUSE.ROTATE;
controls.mouseButtons.LEFT=THREE.MOUSE.PAN;

controls.rotateSpeed=4.0;
controls.dynamicDampingFactor=1.0;
// controls.noPan=true;
// controls.target=new THREE.Vector3(0,0,0);

function make_ball(x,y,z){
    const geometry = new THREE.SphereGeometry(0.02);

    const boxmesh_mat=new THREE.MeshStandardMaterial(
        { color: 0xffffff,
          emissive: new THREE.Color(0xffffff),
        });
    const boxmesh=new THREE.Mesh(geometry, boxmesh_mat);
    scene.add(boxmesh);
    boxmesh.position.set(x,y,z);
}

function LightWIndicator(x,y,z, indicator, intensity){
    const hemilight=new THREE.DirectionalLight(0xffffff, intensity);
    hemilight.castShadow=true;
    hemilight.position.set(x,y,z);
    scene.add( hemilight );
    if(indicator){
        make_ball(x,y,z);
    }
}

function LetThereBeLight(Distance, indicator, intensity){

    // LightWIndicator(0,Distance,0, indicator, intensity);
    LightWIndicator(0,-Distance,0, indicator, intensity);
    LightWIndicator(Distance,0,0, indicator, intensity);
    // LightWIndicator(-Distance,0,0, indicator, intensity);
    // LightWIndicator(0,0,Distance, indicator, intensity);
    LightWIndicator(0,0,-Distance, indicator, intensity);

}


LetThereBeLight(6, false, 1);

const aLight=new THREE.AmbientLight(0xffffff, 2.5);
scene.add(aLight);
// ambient light is important

//====================================================================================================================MODEL LOADING====================================================================================================================
//====================================================================================================================MODEL LOADING====================================================================================================================

const geometry = new THREE.BufferGeometry();

const gltfloader=new GLTFLoader();

let counter=0;
function LoadModel(path, ref){

    gltfloader.load(path, (gltf)=>{
        gltf.scene.traverse(function(child){
                if(child.isMesh){
                    //child.material.color.set(1,1,2); //colour change after texturing also works
                    ref.material=child.material;
                    child.material.roughness=0.7;
                    child.material.metalness=0;
                    child.material.color.set(0.5,1,0.5);
                    counter+=1;
                    
                }
            }
        );
        ref.model=gltf.scene;
        scene.add(gltf.scene);
        }
    );
}



let BoardPart1= {model:null, material:null, Taken_By:18, centerpos:new THREE.Vector3(0.20161960475687282 ,  -0.9631978302307771 ,  -0.17219939882577326), rotx:  -2.95988975540257 , rotz:  -0.20850305684786535, color:{r:0,g:0,b:0}};
let BoardPart2= {model:null, material:null, Taken_By:24, centerpos:new THREE.Vector3(0.41937686110040356 ,  -0.8321111388325795 ,  -0.35818165204104985), rotx:  -2.7310398572193364 , rotz: -0.4371513536951497, color:{r:0,g:0,b:0}};
let BoardPart3= {model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.6293854881859411 ,  -0.5559988759497981 ,  -0.537545929744059),  rotx:  -2.368865339835625 , rotz:  -0.685236413891376, color:{r:0,g:0,b:0}};
let BoardPart4= {model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.7428775127634337 ,  -0.1952408673547032 ,  -0.6344772757767034),  rotx:  -1.8671404417662567 , rotz:  -0.8418584669524889, color:{r:0,g:0,b:0}};
let BoardPart5= {model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.7428775087639279 ,  0.19524086631170848 ,  -0.6344772723608024),  rotx:  -1.2744521870107768 , rotz:  -0.8418585347139762, color:{r:0,g:0,b:0}};
let BoardPart6= {model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.629385481247007 ,  0.5559988698712652 ,  -0.5375459238176498),  rotx:  -0.7727271874384076 , rotz:  -0.6852365510767389, color:{r:0,g:0,b:0}};
let BoardPart7= {model:null, material:null, Taken_By:8,  centerpos:new THREE.Vector3(0.41937686192927043 ,  0.8321111404589006 ,  -0.35818165274896896),  rotx:  -0.4105528334165346 , rotz:  -0.4371513234165982 , color:{r:0,g:0,b:0}};
let BoardPart8= {model:null, material:null, Taken_By:2,  centerpos:new THREE.Vector3(0.20161960498931802 ,  0.9631978313113175 ,  -0.1721993990243003),  rotx:  -0.18170292080086747 , rotz:  -0.2085030817733585, color:{r:0,g:0,b:0}};

let BoardPart9= {model:null, material:null, Taken_By:1,  centerpos:new THREE.Vector3(0.020803218814126858 ,  0.9631978300269048 ,  -0.26432993033469776),  rotx:  -0.2748889959463704 , rotz:  -0.0213594820693017, color:{r:0,g:0,b:0}};
let BoardPart10={model:null, material:null, Taken_By:9,  centerpos:new THREE.Vector3(0.04327171301788951 ,  0.8321110506994454 ,  -0.5498169859986206),  rotx:  -0.5890432056561208 , rotz:  -0.04369618385664565, color:{r:0,g:0,b:0}};
let BoardPart11={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.0649405433752149 ,  0.5559987711047603 ,  -0.825145112581157),  rotx:  -0.981740777858985 , rotz:  -0.0653446795004984, color:{r:0,g:0,b:0}};
let BoardPart12={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.07665048921196116 ,  0.19524086725269463 ,  -0.9739367625875329),  rotx:  -1.3744464117392776 , rotz:  -0.0770366233468528, color:{r:0,g:0,b:0}};
let BoardPart13={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.07665048894542345 ,  -0.19524086657903905 ,  -0.973936759200845),  rotx:  -1.7671462418505157 , rotz:  -0.0770365782977285, color:{r:0,g:0,b:0}};
let BoardPart14={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.06494019127767409 ,  -0.5559988035405053 ,  -0.8251451009941559),  rotx:  -2.1598362432436233 , rotz:  -0.06534513540604069, color:{r:0,g:0,b:0}};
let BoardPart15={model:null, material:null, Taken_By:25, centerpos:new THREE.Vector3(0.04327172107872735 ,  -0.8321112039787216 ,  -0.5498170884158792),  rotx:  -2.552549447941368 , rotz:  -0.0437004440828965, color:{r:0,g:0,b:0}};
let BoardPart16={model:null, material:null, Taken_By:17, centerpos:new THREE.Vector3(0.020803308504640537 ,  -0.9631978529535081 ,  -0.2643300788985667),  rotx:  -2.8667055445331155 , rotz:  -0.021362429048403984 , color:{r:0,g:0,b:0}};

let BoardPart17={model:null, material:null, Taken_By:16, centerpos:new THREE.Vector3(-0.17219953275147518 ,  -0.9631978348272354 ,  -0.20161986054124095),  rotx:  -2.929702980456242 , rotz:  0.17772447072141895, color:{r:0,g:0,b:0}};
let BoardPart18={model:null, material:null, Taken_By:26, centerpos:new THREE.Vector3(-0.3581818272181526 ,  -0.8321111374766116 ,  -0.4193772903852582),  rotx:  -2.670250254650399 , rotz:  0.3699651341068522, color:{r:0,g:0,b:0}};
let BoardPart19={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.537546115737647 ,  -0.5559988801078636 ,  -0.6293860294789664),  rotx:  -2.2901928159488065 , rotz:  0.5710440204294045, color:{r:0,g:0,b:0}};
let BoardPart20={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.6344777167845218 ,  -0.19524086974095536 ,  -0.7428782903587139),  rotx:  -1.8259013593674733 , rotz:  0.6906560841844004, color:{r:0,g:0,b:0}};
let BoardPart21={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.6344777275755389 ,  0.19524087303590573 ,  -0.7428783029933718),  rotx:  -1.315691251697074 , rotz:  0.6906563020697817, color:{r:0,g:0,b:0}};
let BoardPart22={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.5375461057225903 ,  0.5559988698357621 ,  -0.629386017752837),  rotx:  -0.851399968988543 , rotz:  0.5710437580378815, color:{r:0,g:0,b:0}};
let BoardPart23={model:null, material:null, Taken_By:10, centerpos:new THREE.Vector3(-0.35818183026297407 ,  0.8321111444715837 ,  -0.4193772939502868),  rotx:  -0.4713422896308217 , rotz:  0.36996529967291975 , color:{r:0,g:0,b:0}};
let BoardPart24={model:null, material:null, Taken_By:0,  centerpos:new THREE.Vector3(-0.17219953233763907 ,  0.9631978325748053 ,  -0.20161986005670102),  rotx:  -0.21188959410291275 , rotz:  0.17772455199174822, color:{r:0,g:0,b:0}};

let BoardPart25={model:null, material:null, Taken_By:3,  centerpos:new THREE.Vector3(-0.26433018598139096 ,  0.9631978351589011 ,  -0.02080328978824464),  rotx:  -0.022192349335699385 , rotz:  0.2748237413384278 , color:{r:0,g:0,b:0}};
let BoardPart26={model:null, material:null, Taken_By:11, centerpos:new THREE.Vector3(-0.5498172370606127 ,  0.8321111492258729 ,  -0.04327169555047487),  rotx:  -0.052538038414986415 , rotz:  0.5884089091478353, color:{r:0,g:0,b:0}};
let BoardPart27={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.8251455658298913 ,  0.5559988809572277 ,  -0.06494051991400698),  rotx:  -0.11724520533643426 , rotz:  0.9785624569191576, color:{r:0,g:0,b:0}};
let BoardPart28={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.9739376555656816 ,  0.19524087115028238 ,  -0.07665074961305554),  rotx:  -0.3767514128211433 , rotz:  1.3600527591756382, color:{r:0,g:0,b:0}};
let BoardPart29={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.9739376229806225 ,  -0.19524086466858812 ,  -0.07665074704855551),  rotx:  -2.7648393321270968 , rotz:  1.3600525904762122, color:{r:0,g:0,b:0}};
let BoardPart30={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.8251455335559705 ,  -0.5559988593925632 ,  -0.06494051737399016),  rotx:  -3.0243463957009933 , rotz:  0.9785623471941496, color:{r:0,g:0,b:0}};
let BoardPart31={model:null, material:null, Taken_By:27, centerpos:new THREE.Vector3(-0.549817224170518 ,  -0.8321111299344081 ,  -0.04327169453599914),  rotx:  -3.0890539787916063 , rotz:  0.5884088238592285, color:{r:0,g:0,b:0}};
let BoardPart32={model:null, material:null, Taken_By:19, centerpos:new THREE.Vector3(-0.26433018541177744 ,  -0.9631978331391942 ,  -0.02080328974341514),  rotx:  -3.1194002007398427 , rotz:  0.2748237255469369, color:{r:0,g:0,b:0}};

let BoardPart33={model:null, material:null, Taken_By:21, centerpos:new THREE.Vector3(-0.2016197666307465 ,  -0.9631978318294756 ,  0.17219949514519797),  rotx:  2.9598901877270163 , rotz:  0.20850268866023008, color:{r:0,g:0,b:0}};
let BoardPart34={model:null, material:null, Taken_By:28, centerpos:new THREE.Vector3(-0.4193771125782895 ,  -0.8321111328855565 ,  0.35818173695866845),  rotx:  2.7310406368630806 , rotz:  0.4371508187423643, color:{r:0,g:0,b:0}};
let BoardPart35={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.6293858472674861 ,  -0.5559988758092147 ,  0.5375460798123548),  rotx:  2.368863375598118 , rotz:  0.6852373493825424, color:{r:0,g:0,b:0}};
let BoardPart36={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.742878078591836 ,  -0.19524086719519995 ,  0.6344775430957699),  rotx:  1.8671449163822857 , rotz:  0.8418577445639532, color:{r:0,g:0,b:0}};
let BoardPart37={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.7428780745545187 ,  0.19524086614232775 ,  0.6344775396475745),  rotx:  1.2744477121599798 , rotz:  0.8418578129660303, color:{r:0,g:0,b:0}};
let BoardPart38={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.6293858286143821 ,  0.5559988594690805 ,  0.5375460638811037), rotx:  0.7727289384328346 , rotz:  0.6852377181612016, color:{r:0,g:0,b:0}};
let BoardPart39={model:null, material:null, Taken_By:12, centerpos:new THREE.Vector3(-0.41937711577652215 ,  0.8321111391608249 ,  0.3581817396902165),  rotx:  0.410552159671183 , rotz:  0.4371507019106566, color:{r:0,g:0,b:0}};
let BoardPart40={model:null, material:null, Taken_By:5,  centerpos:new THREE.Vector3(-0.20161976697925163 ,  0.9631978334495329 ,  0.17219949544284946),  rotx:  0.1817025316854931 , rotz:  0.20850263967104404, color:{r:0,g:0,b:0}};

let BoardPart41={model:null, material:null, Taken_By:7,  centerpos:new THREE.Vector3(-0.020803269820665556 ,  0.9631978319872551 ,  0.26433008575547506),  rotx:  0.2748885349238798 , rotz:  0.02135945709317312, color:{r:0,g:0,b:0}};
let BoardPart42={model:null, material:null, Taken_By:13, centerpos:new THREE.Vector3(-0.04327161728505828 ,  0.8321111399896376 ,  0.5498170740424061),  rotx:  0.5890478044947863 , rotz:  0.04369634621088831, color:{r:0,g:0,b:0}};
let BoardPart43={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.06494047302458184 ,  0.555998874733505 ,  0.8251453595890728),  rotx:  0.981748918669139 , rotz:  0.06534479467862181, color:{r:0,g:0,b:0}};
let BoardPart44={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.07665066058349529 ,  0.19524087090412715 ,  0.9739373275173131),  rotx:  1.3744426468934137 , rotz:  0.07703646903281212, color:{r:0,g:0,b:0}};
let BoardPart45={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.07665066023283874 ,  -0.1952408700178496 ,  0.97393732306179),  rotx:  1.767150008515881 , rotz:  0.07703652827162664, color:{r:0,g:0,b:0}};
let BoardPart46={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(-0.06494047213824994 ,  -0.5559988672085489 ,  0.8251453483271465),  rotx:  2.159843753125026 , rotz:  0.06534500245573818, color:{r:0,g:0,b:0}};
let BoardPart47={model:null, material:null, Taken_By:29, centerpos:new THREE.Vector3(-0.04327161705404398 ,  -0.8321111355966174 ,  0.5498170711070888),  rotx:  2.552544865006904 , rotz:  0.043696467271198386, color:{r:0,g:0,b:0}};
let BoardPart48={model:null, material:null, Taken_By:23, centerpos:new THREE.Vector3(-0.020803269828950165 ,  -0.9631978323605024 ,  0.26433008586074136),  rotx:  2.866704115857911 , rotz:  0.0213594386640726, color:{r:0,g:0,b:0}};

let BoardPart49={model:null, material:null, Taken_By:22, centerpos:new THREE.Vector3(0.17219944112877708 ,  -0.9631978319971464 ,  0.20161968755500306),  rotx:  2.9297025300674053 , rotz:  -0.17772496432625323, color:{r:0,g:0,b:0}};
let BoardPart50={model:null, material:null, Taken_By:30, centerpos:new THREE.Vector3(0.35818169683388135 ,  -0.832111138444404 ,  0.4193769802466635),  rotx:  2.670248902514782 , rotz:  -0.36996618964273825, color:{r:0,g:0,b:0}};
let BoardPart51={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.537545964944039 ,  -0.5559988806201944 ,  0.6293856706912329),  rotx:  2.290194194870727 , rotz:  -0.571043423145102, color:{r:0,g:0,b:0}};
let BoardPart52={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.634477402152452 ,  -0.19524086243857497 ,  0.7428777450817848),  rotx:  1.8259002190190698 , rotz:  -0.6906561871173217, color:{r:0,g:0,b:0}};
let BoardPart53={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.6344774249757547 ,  0.19524086940744528 ,  0.7428777718044348),  rotx:  1.315692344630348 , rotz:  -0.6906566479513603, color:{r:0,g:0,b:0}};
let BoardPart54={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.5375459550071051 ,  0.5559988704281915 ,  0.6293856590565724),  rotx:  0.8513985890426372 , rotz:  -0.5710431628001333, color:{r:0,g:0,b:0}};
let BoardPart55={model:null, material:null, Taken_By:14, centerpos:new THREE.Vector3(0.3581816953557129 ,  0.8321111350485679 ,  0.4193769785159501),  rotx:  0.47134380414084925 , rotz:  -0.36996610926549206, color:{r:0,g:0,b:0}};
let BoardPart56={model:null, material:null, Taken_By:6,  centerpos:new THREE.Vector3(0.1721994411268772 ,  0.9631978319868058 ,  0.2016196875527786),  rotx:  0.21189012382398414 , rotz:  -0.1777249639036269, color:{r:0,g:0,b:0}};

let BoardPart57={model:null, material:null, Taken_By:4,  centerpos:new THREE.Vector3(0.26433000194372097 ,  0.9631978315586002 ,  0.020803247875959666),  rotx:  0.022192428413327813 , rotz:  -0.27482441022270165, color:{r:0,g:0,b:0}};
let BoardPart58={model:null, material:null, Taken_By:15, centerpos:new THREE.Vector3(0.5498169543648105 ,  0.8321111403415571 ,  0.04327156175919109),  rotx:  0.05253821373840846 , rotz:  -0.5884101491539272, color:{r:0,g:0,b:0}};
let BoardPart59={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.8251452367377513 ,  0.5559988788274913 ,  0.06494039819203919),  rotx:  0.11724491038248351 , rotz:  -0.9785611936314134, color:{r:0,g:0,b:0}};
let BoardPart60={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.9739370305792028 ,  0.19524086716287248 ,  0.07665055615625421),  rotx:  0.3767566772781324 , rotz:  -1.360055342867025, color:{r:0,g:0,b:0}};
let BoardPart61={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.9739370272188088 ,  -0.19524086649444441 ,  0.07665055589178595),  rotx:  2.7648357794775587 , rotz:  -1.3600553254693097, color:{r:0,g:0,b:0}};
let BoardPart62={model:null, material:null, Taken_By:-1, centerpos:new THREE.Vector3(0.8251452246473383 ,  -0.5559988707489381 ,  0.06494039724050393),  rotx:  3.024347348901599 , rotz:  -0.978561152526418, color:{r:0,g:0,b:0}};
let BoardPart63={model:null, material:null, Taken_By:31, centerpos:new THREE.Vector3(0.5498169513976267 ,  -0.8321111359008454 ,  0.043271561525668786),  rotx:  3.089054293361672 , rotz:  -0.5884101295211908, color:{r:0,g:0,b:0}};
let BoardPart64={model:null, material:null, Taken_By:20, centerpos:new THREE.Vector3(0.2643300020585473 ,  -0.9631978319657446 ,  0.02080324788499667),  rotx:  3.1194002460435044 , rotz:  -0.274824413406052, color:{r:0,g:0,b:0}};


LoadModel("BoardPieces/Part1/BP1.gltf", BoardPart1);
LoadModel("BoardPieces/Part2/BP2.gltf", BoardPart2);
LoadModel("BoardPieces/Part3/BP3.gltf", BoardPart3);
LoadModel("BoardPieces/Part4/BP4.gltf", BoardPart4);
LoadModel("BoardPieces/Part5/BP5.gltf", BoardPart5);
LoadModel("BoardPieces/Part6/BP6.gltf", BoardPart6);
LoadModel("BoardPieces/Part7/BP7.gltf", BoardPart7);
LoadModel("BoardPieces/Part8/BP8.gltf", BoardPart8);

LoadModel("BoardPieces/Part9/BP9.gltf", BoardPart9);
LoadModel("BoardPieces/Part10/BP10.gltf", BoardPart10);
LoadModel("BoardPieces/Part11/BP11.gltf", BoardPart11);
LoadModel("BoardPieces/Part12/BP12.gltf", BoardPart12);
LoadModel("BoardPieces/Part13/BP13.gltf", BoardPart13);
LoadModel("BoardPieces/Part14/BP14.gltf", BoardPart14);
LoadModel("BoardPieces/Part15/BP15.gltf", BoardPart15);
LoadModel("BoardPieces/Part16/BP16.gltf", BoardPart16);

LoadModel("BoardPieces/Part17/BP17.gltf", BoardPart17);
LoadModel("BoardPieces/Part18/BP18.gltf", BoardPart18);
LoadModel("BoardPieces/Part19/BP19.gltf", BoardPart19);
LoadModel("BoardPieces/Part20/BP20.gltf", BoardPart20);
LoadModel("BoardPieces/Part21/BP21.gltf", BoardPart21);
LoadModel("BoardPieces/Part22/BP22.gltf", BoardPart22);
LoadModel("BoardPieces/Part23/BP23.gltf", BoardPart23);
LoadModel("BoardPieces/Part24/BP24.gltf", BoardPart24);

LoadModel("BoardPieces/Part25/BP25.gltf", BoardPart25);
LoadModel("BoardPieces/Part26/BP26.gltf", BoardPart26);
LoadModel("BoardPieces/Part27/BP27.gltf", BoardPart27);
LoadModel("BoardPieces/Part28/BP28.gltf", BoardPart28);
LoadModel("BoardPieces/Part29/BP29.gltf", BoardPart29);
LoadModel("BoardPieces/Part30/BP30.gltf", BoardPart30);
LoadModel("BoardPieces/Part31/BP31.gltf", BoardPart31);
LoadModel("BoardPieces/Part32/BP32.gltf", BoardPart32);

LoadModel("BoardPieces/Part33/BP33.gltf", BoardPart33);
LoadModel("BoardPieces/Part34/BP34.gltf", BoardPart34);
LoadModel("BoardPieces/Part35/BP35.gltf", BoardPart35);
LoadModel("BoardPieces/Part36/BP36.gltf", BoardPart36);
LoadModel("BoardPieces/Part37/BP37.gltf", BoardPart37);
LoadModel("BoardPieces/Part38/BP38.gltf", BoardPart38);
LoadModel("BoardPieces/Part39/BP39.gltf", BoardPart39);
LoadModel("BoardPieces/Part40/BP40.gltf", BoardPart40);

LoadModel("BoardPieces/Part41/BP41.gltf", BoardPart41);
LoadModel("BoardPieces/Part42/BP42.gltf", BoardPart42);
LoadModel("BoardPieces/Part43/BP43.gltf", BoardPart43);
LoadModel("BoardPieces/Part44/BP44.gltf", BoardPart44);
LoadModel("BoardPieces/Part45/BP45.gltf", BoardPart45);
LoadModel("BoardPieces/Part46/BP46.gltf", BoardPart46);
LoadModel("BoardPieces/Part47/BP47.gltf", BoardPart47);
LoadModel("BoardPieces/Part48/BP48.gltf", BoardPart48);

LoadModel("BoardPieces/Part49/BP49.gltf", BoardPart49);
LoadModel("BoardPieces/Part50/BP50.gltf", BoardPart50);
LoadModel("BoardPieces/Part51/BP51.gltf", BoardPart51);
LoadModel("BoardPieces/Part52/BP52.gltf", BoardPart52);
LoadModel("BoardPieces/Part53/BP53.gltf", BoardPart53);
LoadModel("BoardPieces/Part54/BP54.gltf", BoardPart54);
LoadModel("BoardPieces/Part55/BP55.gltf", BoardPart55);
LoadModel("BoardPieces/Part56/BP56.gltf", BoardPart56);

LoadModel("BoardPieces/Part57/BP57.gltf", BoardPart57);
LoadModel("BoardPieces/Part58/BP58.gltf", BoardPart58);
LoadModel("BoardPieces/Part59/BP59.gltf", BoardPart59);
LoadModel("BoardPieces/Part60/BP60.gltf", BoardPart60);
LoadModel("BoardPieces/Part61/BP61.gltf", BoardPart61);
LoadModel("BoardPieces/Part62/BP62.gltf", BoardPart62);
LoadModel("BoardPieces/Part63/BP63.gltf", BoardPart63);
LoadModel("BoardPieces/Part64/BP64.gltf", BoardPart64);


let BoardParts=[
    BoardPart8, BoardPart9,   BoardPart24, BoardPart25, BoardPart40, BoardPart41, BoardPart56, BoardPart57,
    BoardPart7, BoardPart10,  BoardPart23, BoardPart26, BoardPart39, BoardPart42, BoardPart55, BoardPart58,

    BoardPart6, BoardPart11,  BoardPart22, BoardPart27, BoardPart38, BoardPart43, BoardPart54, BoardPart59,
    BoardPart5, BoardPart12,  BoardPart21, BoardPart28, BoardPart37, BoardPart44, BoardPart53, BoardPart60,

    BoardPart4, BoardPart13,  BoardPart20, BoardPart29, BoardPart36, BoardPart45, BoardPart52, BoardPart61,
    BoardPart3, BoardPart14,  BoardPart19, BoardPart30, BoardPart35, BoardPart46, BoardPart51, BoardPart62,

    BoardPart2, BoardPart15,  BoardPart18, BoardPart31, BoardPart34, BoardPart47, BoardPart50, BoardPart63,
    BoardPart1, BoardPart16,  BoardPart17, BoardPart32, BoardPart33, BoardPart48, BoardPart49, BoardPart64,
]


let King_W=   {model:null, material:null, Type:"King", side:1, current_loction:"BP2", color:{r:1,g:1,b:1}};
let Queen_W=  {model:null, material:null, Type:"Queen", side:1, current_loction:"BP1", color:{r:1,g:1,b:1}};
let Bishop_W1={model:null, material:null, Type:"Bishop", side:1, current_loction:"BP0", color:{r:1,g:1,b:1}};
let Bishop_W2={model:null, material:null, Type:"Bishop", side:1, current_loction:"BP3", color:{r:1,g:1,b:1}};
let Knight_W1={model:null, material:null, Type:"Knight", side:1, current_loction:"BP7", color:{r:1,g:1,b:1}};
let Knight_W2={model:null, material:null, Type:"Knight", side:1, current_loction:"BP4", color:{r:1,g:1,b:1}};
let Rook_W1=  {model:null, material:null, Type:"Rook", side:1, current_loction:"BP6", color:{r:1,g:1,b:1}};
let Rook_W2=  {model:null, material:null, Type:"Rook", side:1, current_loction:"BP5", color:{r:1,g:1,b:1}};

let Pawn_W1={model:null, material:null, Type:"Pawn", side:1, current_loction:"BP8", color:{r:1,g:1,b:1}};
let Pawn_W2={model:null, material:null, Type:"Pawn", side:1, current_loction:"BP9", color:{r:1,g:1,b:1}};
let Pawn_W3={model:null, material:null, Type:"Pawn", side:1, current_loction:"BP10", color:{r:1,g:1,b:1}};
let Pawn_W4={model:null, material:null, Type:"Pawn", side:1, current_loction:"BP11", color:{r:1,g:1,b:1}};
let Pawn_W5={model:null, material:null, Type:"Pawn", side:1, current_loction:"BP12", color:{r:1,g:1,b:1}};
let Pawn_W6={model:null, material:null, Type:"Pawn", side:1, current_loction:"BP13", color:{r:1,g:1,b:1}};
let Pawn_W7={model:null, material:null, Type:"Pawn", side:1, current_loction:"BP14", color:{r:1,g:1,b:1}};
let Pawn_W8={model:null, material:null, Type:"Pawn", side:1, current_loction:"BP15", color:{r:1,g:1,b:1}};


let King_B=   {model:null, material:null, Type:"King", side:0, current_loction:"BP58", color:{r:0.01,g:0.01,b:0.01}};
let Queen_B=  {model:null, material:null, Type:"Queen", side:0, current_loction:"BP57", color:{r:0.01,g:0.01,b:0.01}};
let Bishop_B1={model:null, material:null, Type:"Bishop", side:0, current_loction:"BP56", color:{r:0.01,g:0.01,b:0.01}};
let Bishop_B2={model:null, material:null, Type:"Bishop", side:0, current_loction:"BP59", color:{r:0.01,g:0.01,b:0.01}};
let Knight_B1={model:null, material:null, Type:"Knight", side:0, current_loction:"BP63", color:{r:0.01,g:0.01,b:0.01}};
let Knight_B2={model:null, material:null, Type:"Knight", side:0, current_loction:"BP60", color:{r:0.01,g:0.01,b:0.01}};
let Rook_B1=  {model:null, material:null, Type:"Rook", side:0, current_loction:"BP62", color:{r:0.01,g:0.01,b:0.01}};
let Rook_B2=  {model:null, material:null, Type:"Rook", side:0, current_loction:"BP61", color:{r:0.01,g:0.01,b:0.01}};

let Pawn_B1={model:null, material:null, Type:"Pawn", side:0, current_loction:"BP48", color:{r:0.01,g:0.01,b:0.01}};
let Pawn_B2={model:null, material:null, Type:"Pawn", side:0, current_loction:"BP49", color:{r:0.01,g:0.01,b:0.01}};
let Pawn_B3={model:null, material:null, Type:"Pawn", side:0, current_loction:"BP50", color:{r:0.01,g:0.01,b:0.01}};
let Pawn_B4={model:null, material:null, Type:"Pawn", side:0, current_loction:"BP51", color:{r:0.01,g:0.01,b:0.01}};
let Pawn_B5={model:null, material:null, Type:"Pawn", side:0, current_loction:"BP52", color:{r:0.01,g:0.01,b:0.01}};
let Pawn_B6={model:null, material:null, Type:"Pawn", side:0, current_loction:"BP53", color:{r:0.01,g:0.01,b:0.01}};
let Pawn_B7={model:null, material:null, Type:"Pawn", side:0, current_loction:"BP54", color:{r:0.01,g:0.01,b:0.01}};
let Pawn_B8={model:null, material:null, Type:"Pawn", side:0, current_loction:"BP55", color:{r:0.01,g:0.01,b:0.01}};




LoadModel("Chesspieces/King/King.gltf", King_W);
LoadModel("Chesspieces/Queen/Queen.gltf", Queen_W);
LoadModel("Chesspieces/Bishop/Bishop.gltf", Bishop_W1);
LoadModel("Chesspieces/Bishop/Bishop.gltf", Bishop_W2);
LoadModel("Chesspieces/Knight/Knight.gltf", Knight_W1);
LoadModel("Chesspieces/Knight/Knight.gltf", Knight_W2);
LoadModel("Chesspieces/Rook/Rook.gltf", Rook_W1);
LoadModel("Chesspieces/Rook/Rook.gltf", Rook_W2);

LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_W1);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_W2);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_W3);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_W4);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_W5);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_W6);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_W7);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_W8);



LoadModel("Chesspieces/King/King.gltf", King_B);
LoadModel("Chesspieces/Queen/Queen.gltf", Queen_B);
LoadModel("Chesspieces/Bishop/Bishop.gltf", Bishop_B1);
LoadModel("Chesspieces/Bishop/Bishop.gltf", Bishop_B2);
LoadModel("Chesspieces/Knight/Knight.gltf", Knight_B1);
LoadModel("Chesspieces/Knight/Knight.gltf", Knight_B2);
LoadModel("Chesspieces/Rook/Rook.gltf", Rook_B1);
LoadModel("Chesspieces/Rook/Rook.gltf", Rook_B2);

LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_B1);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_B2);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_B3);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_B4);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_B5);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_B6);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_B7);
LoadModel("Chesspieces/Pawn/Pawn.gltf", Pawn_B8);


let Chesspieces=[King_W,  Queen_W, Bishop_W1, Bishop_W2, Knight_W1, Knight_W2, Rook_W1, Rook_W2, 
                 Pawn_W1, Pawn_W2, Pawn_W3,   Pawn_W4,   Pawn_W5,   Pawn_W6,   Pawn_W7, Pawn_W8,

                 King_B,  Queen_B, Bishop_B1, Bishop_B2, Knight_B1, Knight_B2, Rook_B1, Rook_B2, 
                 Pawn_B1, Pawn_B2, Pawn_B3,   Pawn_B4,   Pawn_B5,   Pawn_B6,   Pawn_B7, Pawn_B8]

//=====================================================================================================================================================================================================================================================
//=====================================================================================================================================================================================================================================================


//=======================================================HIGHLIGHTING========================================================
let selections=[];

function highlight_part(index){
    BoardParts[index].material.color.set(1,1,0.3);
    selections.push(BoardParts[index]);
}
function highlight_piece(index){
    Chesspieces[index].material.color.set(0.5,0.5,1.0);
    selections.push(Chesspieces[index]);
}
//===========================================================================================================================
//=====================================================CHESS PIECE MOVES=====================================================

function isMove_Valid(BP_index, C_index){
    if(BoardParts[BP_index].Taken_By==-1){
        return true;
    }else if(Chesspieces[C_index].side!=Chesspieces[BoardParts[BP_index].Taken_By].side){
        return true;
    }else{
        return false;
    }
}

function get_opposite_index(index){
    if(index<=3 && index>=0){
        return index+4;
    }else if(index>=4 && index<=7){
        return index-4;
    }else if(index>=56 && index<=59){
        return index+4;
    }else{
        return index-4;
    }
}


function get_left_index(index){
    if(index%8==0){
        return index+7;
    }else{
        return index-1;
    }
}

function get_right_index(index){
    if((index+1)%8==0){
        return index-7;
    }else{
        return index+1;
    }
}

function Knights_Moves(index, C_index){
    let bottom_asis=true;
    let top_asis=true;
    let left_asis=true;
    let right_asis=true;
    
    let Available_Parts=[]

    let i3=get_opposite_index(get_left_index(get_left_index(index)));
    let i5=get_opposite_index(get_right_index(get_right_index(index)));
    let i9=get_left_index(get_left_index(index))-8;
    let i10=get_right_index(get_right_index(index))-8;

    if(index>=0 && index<=7){
        let i1=get_left_index( get_opposite_index(index)+8);
        let i2=get_right_index( get_opposite_index(index)+8);

        if(isMove_Valid(i1, C_index)){
            Available_Parts.push(i1);
        }
        if(isMove_Valid(i2, C_index)){
            Available_Parts.push(i2);
        }

        let i4=get_left_index(get_left_index(index)+8);

        if(isMove_Valid(i3, C_index)){
            Available_Parts.push(i3);
        }
        if(isMove_Valid(i4, C_index)){
            Available_Parts.push(i4);
        }

        let i6=get_right_index(get_right_index(index)+8);

        if(isMove_Valid(i5, C_index)){
            Available_Parts.push(i5);
        }
        if(isMove_Valid(i6, C_index)){
            Available_Parts.push(i6);
        }

        top_asis=false;
        left_asis=false;
        right_asis=false;
    }else if(index>=56 && index<=63){

        let i7=get_left_index(get_opposite_index(index))-8;
        let i8=get_right_index(get_opposite_index(index))-8;

        if(isMove_Valid(i7, C_index)){
            Available_Parts.push(i7);
        }
        if(isMove_Valid(i8, C_index)){
            Available_Parts.push(i8);
        }

        if(isMove_Valid(i3, C_index)){
            Available_Parts.push(i3);
        }
        if(isMove_Valid(i9, C_index)){
            Available_Parts.push(i9);
        }

        if(isMove_Valid(i5, C_index)){
            Available_Parts.push(i5);
        }
        if(isMove_Valid(i10, C_index)){
            Available_Parts.push(i10);
        }

        bottom_asis=false;
        left_asis=false;
        right_asis=false;
    }else if(index>=8 && index<=15){

        let i11=get_left_index(get_opposite_index(index-8));
        let i12=get_right_index(get_opposite_index(index-8));
        if(isMove_Valid(i11, C_index)){
            Available_Parts.push(i11);
        }
        if(isMove_Valid(i12, C_index)){
            Available_Parts.push(i12);
        }

        top_asis=false;

    }else if( index>=48 && index<=55){

        let i13=get_left_index(get_opposite_index(index+8));
        let i14=get_right_index(get_opposite_index(index+8));

        if(isMove_Valid(i13, C_index)){
            Available_Parts.push(i13);
        }
        if(isMove_Valid(i14, C_index)){
            Available_Parts.push(i14);
        }

    
        bottom_asis=false;

    }
    if(top_asis){

        let i15=get_left_index(index-16);
        let i16=get_right_index(index-16);
        if(isMove_Valid(i15, C_index)){
            Available_Parts.push(i15);
        }
        if(isMove_Valid(i16, C_index)){
            Available_Parts.push(i16);
        }


    }
    if(bottom_asis){

        let i17=get_left_index(index+16);
        let i18=get_right_index(index+16);
        if(isMove_Valid(i17, C_index)){
            Available_Parts.push(i17);
        }
        if(isMove_Valid(i18, C_index)){
            Available_Parts.push(i18);
        }

    }
    if(right_asis){

        let i19=get_right_index(get_right_index(index))+8;
        if(isMove_Valid(i10, C_index)){
            Available_Parts.push(i10);
        }
        if(isMove_Valid(i19, C_index)){
            Available_Parts.push(i19);
        }

    }
    if(left_asis){

        let i20=get_left_index(get_left_index(index))+8;
        if(isMove_Valid(i9, C_index)){
            Available_Parts.push(i9);
        }
        if(isMove_Valid(i20, C_index)){
            Available_Parts.push(i20);
        }
    }
    return Available_Parts;
    
}

let Traversal_Matrix=[
    [60, 61, 62, 63, 56, 57, 58, 59],    
    [52, 53, 54, 55, 48, 49, 50, 51],    
    [44, 45, 46, 47, 40, 41, 42, 43],    
    [36, 37, 38, 39, 32, 33, 34, 35],    
    [28, 29, 30, 31, 24, 25, 26, 27],    
    [20, 21, 22, 23, 16, 17, 18, 19],    
    [12, 13, 14, 15, 8,  9,  10, 11],    
    [4,  5,  6,  7,  0,  1,  2,  3],     

    [0,  1,  2,  3,  4,  5,  6,  7], 
    [8,  9,  10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63] 
]

function Get_Tile_Status(BP_index, C_index){
    if(BoardParts[BP_index].Taken_By==-1){
        return "tile_empty";
    }else if(Chesspieces[C_index].side!=Chesspieces[BoardParts[BP_index].Taken_By].side){
        return "hit";
    }else{
        return false;
    }
}

function Go_UP(index, up_units){
    let long_index=((index-(index%8))/8)+8;
    let lateral_index=index%8;

    let up_index=long_index-up_units
    if(up_index<0){
        return Traversal_Matrix[16+up_index][lateral_index];
    }else{
        return Traversal_Matrix[up_index][lateral_index];
    }
}

function Go_DOWN(index, down_units){
    let long_index=((index-(index%8))/8)+8;
    let lateral_index=index%8;

    let down_index=long_index+down_units;
    if(down_index>15){
        return Traversal_Matrix[down_index-16][lateral_index];
    }else{
        return Traversal_Matrix[down_index][lateral_index];
    }

}

function Rooks_Moves(i, C_index){
    let index=i;
    let countRIGHT=0;
    let right=[];
    while(true){
        countRIGHT+=1;
        index=get_right_index(index);
        
        if(countRIGHT>7){
            break;
        }else if(Get_Tile_Status(index, C_index)==false){
            break;
        }else if(Get_Tile_Status(index, C_index)=="hit"){
            right.push(index);
            break;
        }else{
            right.push(index);
        }
    }

    index=i;
    let countLEFT=0;
    let left=[];
    while(true){
        countLEFT+=1;
        index=get_left_index(index);
        
        if(countLEFT>7){
            break;
        }else if(Get_Tile_Status(index, C_index)==false){
            break;
        }else if(Get_Tile_Status(index, C_index)=="hit"){
            left.push(index);
            break;
        }else{
            left.push(index);
        }
    }

    index=i;
    let countUP=0;
    let up=[];
    while(true){
        countUP+=1;
        index=Go_UP(i, countUP);
        if(countUP>=16){
            break;
        }else if(Get_Tile_Status(index, C_index)==false){
            break;
        }else if(Get_Tile_Status(index, C_index)=="hit"){
            up.push(index);
            break;
        }else{
            up.push(index);
        }
    }

    index=i;
    let countDOWN=0;
    let down=[];
    while(true){
        countDOWN+=1;
        index=Go_DOWN(i, countDOWN);
        if(countDOWN>=16){
            break;
        }else if(Get_Tile_Status(index, C_index)==false){
            break;
        }else if(Get_Tile_Status(index, C_index)=="hit"){
            down.push(index);
            break;
        }else{
            down.push(index);
        }
    }

    return { Up:up, Down:down, Left:left, Right:right };

}


function Go_RDiagonally_UP(index, DUP_units){
    let long_index=((index-(index%8))/8)+8;
    let lateral_index=index%8;

    let UPindex=long_index-DUP_units;
    if(UPindex<0){
        UPindex=16+UPindex
    }
    let Lindex;
    if(UPindex>=8){
        Lindex=lateral_index+DUP_units;
        if(Lindex>7){
            Lindex=Lindex%8;
            return Traversal_Matrix[UPindex][Lindex];
        }else{
            return Traversal_Matrix[UPindex][Lindex];
        }
    }else if(UPindex<8){
        let dist=long_index-8;//long_index=12; UPindex=15
        Lindex=lateral_index+(2*dist)+1-DUP_units;
        if(Lindex>7){
            Lindex=Lindex%8;
            return Traversal_Matrix[UPindex][Lindex];
        }else if(Lindex<0){
            Lindex=8+Lindex;
            return Traversal_Matrix[UPindex][Lindex];
        }else{
            return Traversal_Matrix[UPindex][Lindex];
        }

    }
    if(long_index==8){
        Lindex=lateral_index+1-DUP_units;
        return Traversal_Matrix[UPindex][Lindex];
    }
    
}

function Go_LDiagonally_UP(index, DUP_units){
    let long_index=((index-(index%8))/8)+8;
    let lateral_index=index%8;

    let UPindex=long_index-DUP_units;
    if(UPindex<0){
        UPindex=16+UPindex
    }
    let Lindex;
    if(UPindex>=8){
        Lindex=lateral_index-DUP_units;
        if(Lindex<0){
            if(-Lindex>0 && -Lindex<9 ){
                Lindex=8+Lindex;
            }else{
                Lindex=16+Lindex;
            }
            return Traversal_Matrix[UPindex][Lindex];
        }else{
            return Traversal_Matrix[UPindex][Lindex];
        }
    }else if(UPindex<8){
        let dist=long_index-8;
        Lindex=lateral_index-(2*dist)-1+DUP_units;
        if(Lindex>7){
            Lindex=Lindex%8;
            return Traversal_Matrix[UPindex][Lindex];
        }else if(Lindex<0){
            Lindex=8+Lindex;
            return Traversal_Matrix[UPindex][Lindex];
        }else{
            return Traversal_Matrix[UPindex][Lindex];
        }

    }
    if(long_index==8){
        Lindex=lateral_index-1+DUP_units;
        return Traversal_Matrix[UPindex][Lindex];
    }
}

function Go_RDiagonally_DOWN(index, DDOWN_units){
    let long_index=((index-(index%8))/8)+8;//13
    let lateral_index=index%8;

    let UPindex=long_index+DDOWN_units;
    if(UPindex>15){
        UPindex=UPindex%16;
    }
    let Lindex;
    if(UPindex>=8){
        Lindex=lateral_index+DDOWN_units;
        if(Lindex>7){
            Lindex=Lindex%8;
            return Traversal_Matrix[UPindex][Lindex];
        }else{
            return Traversal_Matrix[UPindex][Lindex];
        }
    }else if(UPindex<8){
        let dist=15-long_index;//2
        Lindex=lateral_index+(2*dist)+1-DDOWN_units;
        if(Lindex>7){
            Lindex=Lindex%8;
            return Traversal_Matrix[UPindex][Lindex];
        }else if(Lindex<0){
            Lindex=8+Lindex;
            return Traversal_Matrix[UPindex][Lindex];
        }else{
            return Traversal_Matrix[UPindex][Lindex];
        }

    }
    if(long_index==8){
        Lindex=lateral_index+1-DDOWN_units;
        return Traversal_Matrix[UPindex][Lindex];
    }
}

function Go_LDiagonally_DOWN(index, DDOWN_units){
    let long_index=((index-(index%8))/8)+8;
    let lateral_index=index%8;

    let UPindex=long_index+DDOWN_units;
    if(UPindex>15){
        UPindex=UPindex%16;
    }
    let Lindex;
    if(UPindex>=8){
        Lindex=lateral_index-DDOWN_units;
        if(Lindex<0){
            if(-Lindex>0 && -Lindex<9 ){
                Lindex=8+Lindex;
            }else{
                Lindex=16+Lindex;
            }
            return Traversal_Matrix[UPindex][Lindex];
        }else{
            return Traversal_Matrix[UPindex][Lindex];
        }
    }else if(UPindex<8){
        let dist=15-long_index;
        Lindex=lateral_index-(2*dist)-1+DDOWN_units;
        if(Lindex>7){
            Lindex=Lindex%8;
            return Traversal_Matrix[UPindex][Lindex];
        }else if(Lindex<0){
            Lindex=8+Lindex;
            return Traversal_Matrix[UPindex][Lindex];
        }else{
            return Traversal_Matrix[UPindex][Lindex];
        }

    }
    if(long_index==8){
        Lindex=lateral_index-1+DDOWN_units;
        return Traversal_Matrix[UPindex][Lindex];
    }
}

function Bishops_Moves(i, C_index){
    let index=i;
    let RUPcount=0;
    let rup=[];
    while(true){
        RUPcount+=1;
        index= Go_RDiagonally_UP(i, RUPcount);
        if(RUPcount==15){
            break;
        }else if(Get_Tile_Status(index, C_index)==false){
            break;
        }else if(Get_Tile_Status(index, C_index)=="hit"){
            rup.push(index);
            break;
        }else{
            rup.push(index);
        }

    }

    index=i;
    let LUPcount=0;
    let lup=[];
    while(true){
        LUPcount+=1;
        index= Go_LDiagonally_UP(i, LUPcount);
        if(LUPcount==15){
            break;
        }else if(Get_Tile_Status(index, C_index)==false){
            break;
        }else if(Get_Tile_Status(index, C_index)=="hit"){
            lup.push(index);
            break;
        }else{
            lup.push(index);
        }

    }

    index=i;
    let RDOWNcount=0;
    let rdown=[];
    while(true){
        RDOWNcount+=1;
        index= Go_RDiagonally_DOWN(i, RDOWNcount);
        if(RDOWNcount==15){
            break;
        }else if(Get_Tile_Status(index, C_index)==false){
            break;
        }else if(Get_Tile_Status(index, C_index)=="hit"){
            rdown.push(index);
            break;
        }else{
            rdown.push(index);
        }
    }

    index=i;
    let LDOWNcount=0;
    let ldown=[];
    while(true){
        LDOWNcount+=1;
        index= Go_LDiagonally_DOWN(i, LDOWNcount);
        if(LDOWNcount==15){
            break;
        }else if(Get_Tile_Status(index, C_index)==false){
            break;
        }else if(Get_Tile_Status(index, C_index)=="hit"){
            ldown.push(index);
            break;
        }else{
            ldown.push(index);
        }
    }

    return { Rup:rup, Rdown:rdown, Lup:lup, Ldown:ldown };

}

function Queens_Moves(index, C_index){
    let straight_moves=Rooks_Moves(index, C_index);
    let diagonal_moves=Bishops_Moves(index, C_index);

    return {Up:straight_moves.Up,   Down:straight_moves.Down,   Left:straight_moves.Left, Right:straight_moves.Right,
            Rup:diagonal_moves.Rup, Rdown:diagonal_moves.Rdown, Lup:diagonal_moves.Lup,   Ldown:diagonal_moves.Ldown
     }
}

function Kings_Moves(i, C_index){

    let pos=[];

    let i1=Go_UP(i, 1);
    if(isMove_Valid(i1, C_index)){pos.push(i1);}

    let i2=Go_DOWN(i, 1);
    if(isMove_Valid(i2, C_index)){pos.push(i2);}

    let i3=get_left_index(i);
    if(isMove_Valid(i3, C_index)){pos.push(i3);}
    
    let i4=get_right_index(i);
    if(isMove_Valid(i4, C_index)){pos.push(i4);}

    let i5=Go_RDiagonally_UP(i,1);
    if(isMove_Valid(i5, C_index)){pos.push(i5);}

    let i6=Go_LDiagonally_UP(i,1);
    if(isMove_Valid(i6, C_index)){pos.push(i6);}

    let i7=Go_RDiagonally_DOWN(i,1);
    if(isMove_Valid(i7, C_index)){pos.push(i7);}

    let i8=Go_LDiagonally_DOWN(i,1);
    if(isMove_Valid(i8, C_index)){pos.push(i8);}

    return pos;
}

function Pawns_Moves(i, C_index){
    let pos=[];
    if(Chesspieces[C_index].side==1){
        
        if(Get_Tile_Status(Go_DOWN(i, 1), C_index)=="tile_empty" ){
            pos.push(Go_DOWN(i, 1));
        }
        if(Get_Tile_Status(Go_RDiagonally_DOWN(i, 1), C_index)=="hit"){
            pos.push(Go_RDiagonally_DOWN(i, 1));
        }
        if(Get_Tile_Status(Go_LDiagonally_DOWN(i, 1), C_index)=="hit"){
            pos.push(Go_LDiagonally_DOWN(i, 1));
        }

    }
    if(Chesspieces[C_index].side==0){
        
        if(Get_Tile_Status(Go_UP(i, 1), C_index)=="tile_empty" ){
            pos.push(Go_UP(i, 1));
        }
        if(Get_Tile_Status(Go_RDiagonally_UP(i, 1), C_index)=="hit" ){
            pos.push(Go_RDiagonally_UP(i, 1));
        }
        if(Get_Tile_Status(Go_LDiagonally_UP(i, 1), C_index)=="hit" ){
            pos.push(Go_LDiagonally_UP(i, 1));
        }

    }
    
    return pos;
}

//===========================================================================================================================

//========================================================INTERRACTION========================================================
const raycaster=new THREE.Raycaster();
document.addEventListener('click', onMouseDown);


let Selected_ChessPiece;

let is_ChessPiece_selected=false;
let is_ChessPiece_moving=false;

let Start_index;
let End_index;


let StartEnd_axis=new THREE.Vector3(0,0,0);
let StartEnd_Angle=0;

let Model_toRemove;

let Movement_Array=[]
let Movement_counter=0;

let possible_places;
let Knights_moves=false;
let Rooks_moves=false;
let Bishops_moves=false;
let Queens_moves=false;
let Kings_moves=false;
let Pawns_moves=false;

function onMouseDown(event){
    const coords= new THREE.Vector2(
        (event.clientX/window.innerWidth)*2-1,
        -(event.clientY/window.innerHeight)*2+1,
    );
    raycaster.setFromCamera(coords, camera);
    const intersections=raycaster.intersectObjects(scene.children, true);
    
    if(selections.length>0){
        for(let i=0; i<selections.length; i++){
            selections[i].material.color.set(selections[i].color.r, selections[i].color.g, selections[i].color.b);
        }
    }

    if(counter==96 && is_ChessPiece_selected && !is_ChessPiece_moving){
        let is_break=false;
        if(intersections.length>0){
            for(let i=0; i<intersections.length; i++){
                if(intersections[i].object && typeof intersections[i].object.name=='string' && intersections[i].object.name.includes('BP')){

                    let BP_index=Number(intersections[i].object.name.replace("BP",""));
                    let move_finalized=false;
                    if(Knights_moves){
                        if(possible_places.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array.push(BP_index);
                            Movement_counter=0;
                            Knights_moves=false;
                            move_finalized=true;
                        }
                    }
                    if(Rooks_moves){
                        if(possible_places.Up.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Up.slice(0, possible_places.Up.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Rooks_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Down.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Down.slice(0, possible_places.Down.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Rooks_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Left.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Left.slice(0, possible_places.Left.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Rooks_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Right.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Right.slice(0, possible_places.Right.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Rooks_moves=false;
                            move_finalized=true;
                        }

                    }
                    if(Bishops_moves){
                        if(possible_places.Rup.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Rup.slice(0, possible_places.Rup.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Bishops_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Rdown.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Rdown.slice(0, possible_places.Rdown.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Bishops_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Lup.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Lup.slice(0, possible_places.Lup.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Bishops_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Ldown.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Ldown.slice(0, possible_places.Ldown.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Bishops_moves=false;
                            move_finalized=true;
                        }

                    }
                    if(Queens_moves){
                        if(possible_places.Up.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Up.slice(0, possible_places.Up.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Rooks_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Down.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Down.slice(0, possible_places.Down.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Rooks_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Left.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Left.slice(0, possible_places.Left.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Rooks_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Right.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Right.slice(0, possible_places.Right.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Rooks_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Rup.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Rup.slice(0, possible_places.Rup.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Bishops_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Rdown.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Rdown.slice(0, possible_places.Rdown.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Bishops_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Lup.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Lup.slice(0, possible_places.Lup.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Bishops_moves=false;
                            move_finalized=true;
                        }else if(possible_places.Ldown.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array=possible_places.Ldown.slice(0, possible_places.Ldown.indexOf(BP_index)+1);
                            Movement_counter=0;
                            Bishops_moves=false;
                            move_finalized=true;
                        }

                    }
                    if(Kings_moves){
                        if(possible_places.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array.push(BP_index);
                            Movement_counter=0;
                            Kings_moves=false;
                            move_finalized=true;
                        }
                    }
                    if(Pawns_moves){
                        if(possible_places.includes(BP_index)){
                            highlight_part(BP_index);
                            Movement_Array.push(BP_index);
                            Movement_counter=0;
                            Pawns_moves=false;
                            move_finalized=true;
                        }
                    }


                    if(BP_index!=Start_index && move_finalized){
                        
                        End_index=Movement_Array[Movement_counter];
                        BoardParts[Start_index].Taken_By=-1;
                        let removal_index=-1;
                        if(BoardParts[BP_index].Taken_By!=-1){

                            Model_toRemove=Chesspieces[BoardParts[BP_index].Taken_By].model;
                            removal_index=BoardParts[BP_index].Taken_By;
                        }
                        BoardParts[BP_index].Taken_By=Number(Selected_ChessPiece.model.children[0].name.replace("C",""));
                        StartEnd_axis=StartEnd_axis.crossVectors(BoardParts[Start_index].centerpos, BoardParts[End_index].centerpos);
                        StartEnd_Angle=BoardParts[Start_index].centerpos.angleTo(BoardParts[End_index].centerpos);
                        is_ChessPiece_moving=true;
                        is_break=true;

                        let move_info={ chesspiece_index: Number(Selected_ChessPiece.model.children[0].name.replace("C","")),
                            MoveArr: Movement_Array,
                            StartIndex: Start_index,
                            SE_angle: StartEnd_Angle,
                            SE_axis: [StartEnd_axis.x, StartEnd_axis.y, StartEnd_axis.z],
                            BP_i: BP_index,
                            Model_To_Remove_index: removal_index,

                        }
                        console.log(BoardParts[BP_index].Taken_By);
                        socket.emit("Player_Move", (move_info));

                       
                    }                            
                           
                }
                if(is_break){
                    break;
                }
            }
        }
    }

    if(counter==96 && !is_ChessPiece_moving){
        // console.log(intersections);
        let is_break=false;
        if(intersections.length>0){
            for(let i=0; i<intersections.length; i++){   
                if(intersections[i].object && typeof intersections[i].object.name=='string' && intersections[i].object.name.includes('C')){
                    Knights_moves=false;
                    Rooks_moves=false;
                    Bishops_moves=false;
                    Queens_moves=false;
                    Kings_moves=false;
                    Pawns_moves=false;

                    let C_index=Number(intersections[i].object.name.replace("C",""));
                    highlight_piece(C_index);
                    

                    Start_index=Number(Chesspieces[C_index].current_loction.replace("BP",""))
                    if(Chesspieces[C_index].Type=="Knight"){
                        possible_places=Knights_Moves(Start_index, C_index);

                        for(let i=0; i<possible_places.length; i++){
                            highlight_part(possible_places[i]);
                        }

                        Knights_moves=true;
                    }else if(Chesspieces[C_index].Type=="Rook"){
                        possible_places=Rooks_Moves(Start_index, C_index);

                        for(let i=0; i<possible_places.Up.length; i++){
                            highlight_part(possible_places.Up[i]);
                        }

                        for(let i=0; i<possible_places.Down.length; i++){
                            highlight_part(possible_places.Down[i]);
                        }

                        for(let i=0; i<possible_places.Left.length; i++){
                            highlight_part(possible_places.Left[i]);
                        }

                        for(let i=0; i<possible_places.Right.length; i++){
                            highlight_part(possible_places.Right[i]);
                        }

                        Rooks_moves=true;
                    }else if(Chesspieces[C_index].Type=="Bishop"){
                        possible_places=Bishops_Moves(Start_index, C_index);

                        for(let i=0; i<possible_places.Rup.length; i++){
                            highlight_part(possible_places.Rup[i]);
                        }

                        for(let i=0; i<possible_places.Rdown.length; i++){
                            highlight_part(possible_places.Rdown[i]);
                        }

                        for(let i=0; i<possible_places.Lup.length; i++){
                            highlight_part(possible_places.Lup[i]);
                        }

                        for(let i=0; i<possible_places.Ldown.length; i++){
                            highlight_part(possible_places.Ldown[i]);
                        }

                        Bishops_moves=true;
                    }else if(Chesspieces[C_index].Type=="Queen"){
                        possible_places=Queens_Moves(Start_index, C_index);

                        for(let i=0; i<possible_places.Up.length; i++){
                            highlight_part(possible_places.Up[i]);
                        }

                        for(let i=0; i<possible_places.Down.length; i++){
                            highlight_part(possible_places.Down[i]);
                        }

                        for(let i=0; i<possible_places.Left.length; i++){
                            highlight_part(possible_places.Left[i]);
                        }

                        for(let i=0; i<possible_places.Right.length; i++){
                            highlight_part(possible_places.Right[i]);
                        }

                        for(let i=0; i<possible_places.Rup.length; i++){
                            highlight_part(possible_places.Rup[i]);
                        }

                        for(let i=0; i<possible_places.Rdown.length; i++){
                            highlight_part(possible_places.Rdown[i]);
                        }

                        for(let i=0; i<possible_places.Lup.length; i++){
                            highlight_part(possible_places.Lup[i]);
                        }

                        for(let i=0; i<possible_places.Ldown.length; i++){
                            highlight_part(possible_places.Ldown[i]);
                        }

                        Queens_moves=true;
                    }else if(Chesspieces[C_index].Type=="King"){
                        possible_places=Kings_Moves(Start_index, C_index);

                        for(let i=0; i<possible_places.length; i++){
                            highlight_part(possible_places[i]);
                        }

                        Kings_moves=true;
                    }else if(Chesspieces[C_index].Type=="Pawn"){
                        possible_places=Pawns_Moves(Start_index, C_index);

                        for(let i=0; i<possible_places.length; i++){
                            highlight_part(possible_places[i]);
                        }

                        Pawns_moves=true;
                    }
                    
                    

                    Selected_ChessPiece=Chesspieces[C_index];
                    
                    is_ChessPiece_selected=true;
                    is_break=true;

                }
                if(is_break){
                    break;
                }
            }
        }
    }  
}
//===========================================================================================================================


useEffect(()=>{
    socket.on("Movement_info", (moveinfo)=>{
        //is_ChessPiece_moving && is_ChessPiece_selected && Start_index!=null && Movement_Array.length!==0
        //SE_angle: StartEnd_Angle,
        //SE_axis: StartEnd_axis,
        is_ChessPiece_moving=true;
        is_ChessPiece_selected=true;
        Start_index=moveinfo.StartIndex;
        End_index=moveinfo.MoveArr[0];
        Movement_Array=moveinfo.MoveArr;
        StartEnd_Angle=moveinfo.SE_angle;
        StartEnd_axis= new THREE.Vector3(moveinfo.SE_axis[0], moveinfo.SE_axis[1], moveinfo.SE_axis[2]);

        Selected_ChessPiece=Chesspieces[moveinfo.chesspiece_index];
        BoardParts[moveinfo.StartIndex].Taken_By=-1;
        BoardParts[moveinfo.BP_i].Taken_By=Number(Selected_ChessPiece.model.children[0].name.replace("C",""));
        if(moveinfo.Model_To_Remove_index!=-1){
             Model_toRemove=Chesspieces[moveinfo.Model_To_Remove_index].model;
            // console.log(moveinfo.Model_To_Remove_index);
        }
        
        // console.log("Movement Broadcasted", moveinfo);

    })
}, []);




function put_model(object, BP_index, color){
    object.model.position.set(BoardParts[BP_index].centerpos.x, BoardParts[BP_index].centerpos.y, BoardParts[BP_index].centerpos.z);
    object.model.rotation.x=BoardParts[BP_index].rotx;
    object.model.rotation.z=BoardParts[BP_index].rotz;
    object.material.color.set(color.x, color.y, color.z);
    object.material.roughnes=0.5;
    object.material.metalness=0.2;
    // console.log(object.material)
}

let put_models=false;
let colour_board=false;
let name_objects=false;

let startTime;
let duration = 500; 


let BoardColorMatrix=[
    [7, 8,  23, 24, 39, 40, 55, 56],
    [6, 9,  22, 25, 38, 41, 54, 57],
    [5, 10, 21, 26, 37, 42, 53, 58],
    [4, 11, 20, 27, 36, 43, 52, 59],
    [3, 12, 19, 28, 35, 44, 51, 60],
    [2, 13, 18, 29, 34, 45, 50, 61],
    [1, 14, 17, 30, 33, 46, 49, 62],
    [0, 15, 16, 31, 32, 47, 48, 63]
]



function animate(t=0){
    
    if(counter==96 && !name_objects){
        for(let i=0; i<BoardParts.length; i++){
            BoardParts[i].model.children[0].name=`BP${i}`;
        }
        for(let i=0; i<Chesspieces.length; i++){
            Chesspieces[i].model.children[0].name=`C${i}`;
        }
        name_objects=true;


    }

    if(counter==96 && !put_models){
        put_model(King_W, 2, new THREE.Vector3(1,1,1) );
        put_model(Queen_W, 1, new THREE.Vector3(1,1,1) );
        put_model(Bishop_W1, 0, new THREE.Vector3(1,1,1) );
        put_model(Bishop_W2, 3, new THREE.Vector3(1,1,1) );
        put_model(Knight_W1, 7, new THREE.Vector3(1,1,1) );
        put_model(Knight_W2, 4, new THREE.Vector3(1,1,1) );
        put_model(Rook_W1, 6, new THREE.Vector3(1,1,1) );
        put_model(Rook_W2, 5, new THREE.Vector3(1,1,1) );

        put_model(Pawn_W1, 8, new THREE.Vector3(1,1,1) );
        put_model(Pawn_W2, 9, new THREE.Vector3(1,1,1) );
        put_model(Pawn_W3, 10, new THREE.Vector3(1,1,1) );
        put_model(Pawn_W4, 11, new THREE.Vector3(1,1,1) );
        put_model(Pawn_W5, 12, new THREE.Vector3(1,1,1) );
        put_model(Pawn_W6, 13, new THREE.Vector3(1,1,1) );
        put_model(Pawn_W7, 14, new THREE.Vector3(1,1,1) );
        put_model(Pawn_W8, 15, new THREE.Vector3(1,1,1) );


        put_model(King_B, 58, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Queen_B, 57, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Bishop_B1, 56, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Bishop_B2, 59, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Knight_B1, 63, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Knight_B2, 60, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Rook_B1, 62, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Rook_B2, 61, new THREE.Vector3(0.01,0.01,0.01) );

        put_model(Pawn_B1, 48,  new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Pawn_B2, 49,  new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Pawn_B3, 50, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Pawn_B4, 51, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Pawn_B5, 52, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Pawn_B6, 53, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Pawn_B7, 54, new THREE.Vector3(0.01,0.01,0.01) );
        put_model(Pawn_B8, 55, new THREE.Vector3(0.01,0.01,0.01) );
        
        put_models=true;
    }


    
    if(counter==96 && is_ChessPiece_moving && is_ChessPiece_selected && Start_index!=null && Movement_Array.length!==0){
        if (!startTime) startTime = t;
        
        let T = (t - startTime) / duration;

        if(T>=1){
            Selected_ChessPiece.model.position.set(BoardParts[End_index].centerpos.x, BoardParts[End_index].centerpos.y, BoardParts[End_index].centerpos.z);
            

            if(Movement_counter+1>=Movement_Array.length){
                is_ChessPiece_moving=false;
                is_ChessPiece_selected=false;
                Selected_ChessPiece.current_loction=`BP${End_index}`;
                Start_index=null;
                End_index=null;
                startTime=null;
                Movement_Array=[];
                if(Model_toRemove){
                    scene.remove(Model_toRemove);
                }
                
            }else{
                Start_index=Movement_Array[Movement_counter];
                End_index=Movement_Array[Movement_counter+1];
                Movement_counter+=1;
                StartEnd_axis=StartEnd_axis.crossVectors(BoardParts[Start_index].centerpos, BoardParts[End_index].centerpos);
                StartEnd_Angle=BoardParts[Start_index].centerpos.angleTo(BoardParts[End_index].centerpos);
                startTime=null;

                
                console.log(Selected_ChessPiece);
          
            }
            
            

        }else{
           
            let angle_increment=0+( StartEnd_Angle - 0 ) * T;
            
            let Position_Quat = new THREE.Quaternion();
            Position_Quat.setFromAxisAngle( StartEnd_axis.normalize(), angle_increment );

            let CurrentPos_vec= new THREE.Vector3(BoardParts[Start_index].centerpos.x, BoardParts[Start_index].centerpos.y, BoardParts[Start_index].centerpos.z);
            CurrentPos_vec.applyQuaternion( Position_Quat );

            let Quat_obj=new THREE.Quaternion();
            let Qobj_axis=new THREE.Vector3(0,0,0).crossVectors(new THREE.Vector3(0,1,0), CurrentPos_vec);
            Quat_obj.setFromAxisAngle( Qobj_axis.normalize(), CurrentPos_vec.angleTo(new THREE.Vector3(0,1,0)) );

            Selected_ChessPiece.model.rotation.x=0;
            Selected_ChessPiece.model.rotation.y=0;
            Selected_ChessPiece.model.rotation.z=0;

            let front_quat=new THREE.Quaternion();
            let front=new THREE.Vector3(1,0,0);
            let up=new THREE.Vector3(0,-1,0);
            front.applyQuaternion(Quat_obj);
            up.applyQuaternion(Quat_obj)
            
            Selected_ChessPiece.model.applyQuaternion( Quat_obj );

            let current_vec_byref=new THREE.Vector3(
                CurrentPos_vec.x-Selected_ChessPiece.model.position.x,
                CurrentPos_vec.y-Selected_ChessPiece.model.position.y,
                CurrentPos_vec.z-Selected_ChessPiece.model.position.z
            )

            front_quat.setFromAxisAngle(up.normalize(), current_vec_byref.angleTo(front));
            Selected_ChessPiece.model.applyQuaternion( front_quat );

            Selected_ChessPiece.model.position.set(CurrentPos_vec.x, CurrentPos_vec.y, CurrentPos_vec.z)
        }

    }
    
    
    if(counter==96 && !colour_board){
        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(BoardColorMatrix[i][j]%2==0){
                    BoardParts[i+j*8].material.color.set(0.1,0.5,0.1);
                    BoardParts[i+j*8].color.r=0.1;
                    BoardParts[i+j*8].color.g=0.5;
                    BoardParts[i+j*8].color.b=0.1;
                }else{
                    BoardParts[i+j*8].material.color.set(1,1,1);
                    BoardParts[i+j*8].color.r=1;
                    BoardParts[i+j*8].color.g=1;
                    BoardParts[i+j*8].color.b=1;
                }
            }
        }
        colour_board=true;
    }


    controls.update();
    renderer.render( scene, camera );
}

window.addEventListener("resize", function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

  return (<div></div>);
}

export default App
