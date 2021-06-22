// declaracion de variables
var dino, dinocorre, dinochoca, ale_num;
var suelo, suelofalso, sueloima, nube, nube_ima;
var obst, obst1, obst2, obst3, obst4, obst5, obst6;
var puntos, est_jueg, jugar, fin, grup_nub, grup_obst;
var finDJ, finDJM, reini, reiniM;
var sonimuere, sonisalta, sonipunto;
jugar=1;
fin=0;
est_jueg= jugar;

// funcion de precarga de imagenes animadas y estaticas
function preload() 
{
    dinocorre = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    dinochoca = loadAnimation("trex_collided.png");
 
    sueloima = loadImage("ground2.png");
    nube_ima=loadImage("cloud.png");
    obst1=loadImage("obstacle1.png");
    obst2=loadImage("obstacle2.png");
    obst3=loadImage("obstacle3.png");
    obst4=loadImage("obstacle4.png");
    obst5=loadImage("obstacle5.png");
    obst6=loadImage("obstacle6.png");
    reiniM=loadImage("restart.png");
    finDJM=loadImage("gameOver.png");
    sonimuere=loadSound("die.mp3");
    sonisalta=loadSound("jump.mp3");
    sonipunto=loadSound("checkPoint.mp3");
  
  
  
}
// funcion de inicio crea espacio de trabajo y objetos
function setup() 
{
    createCanvas(600, 200);
    //creacion de dinosaurio
    dino = createSprite(50,160,20,50);
    dino.addAnimation("corre", dinocorre);
    dino.addAnimation("choca", dinochoca);
    dino.scale = 0.5;
  
  //creacion de suelos falso e imagen
    suelo = createSprite(200,180,400,20);
    suelo.addImage("suelo",sueloima);
    suelo.x = suelo.width /2;
    
    //imagen termina el juego
      finDJ = createSprite(300,100,20,20);
      finDJ.addImage("finj",finDJM);
      finDJ.scale=0.5;
      
  //imagen reinicia el juego
      reini = createSprite(300,150,50,50);
      reini.addImage("finj",reiniM);
      reini.scale=0.5;

      //suelo falso
    suelofalso=createSprite(200,190,400,10)
    suelofalso.visible=false;
  
     grup_nub = createGroup();
    grup_obst = createGroup();
  
    //dino.setCollider("rectangle", 0, 0, 400,dino.height)
   dino.setCollider("circle",0,0,40)
    dino.debug=true;
  puntos=0;
  //console.log(mensaje);
  
}
//funcion dibujar objetos
function draw()
{
      background("white");
      
      text("Puntiación: "+puntos,420,90);
      
   if(est_jueg=== jugar)
     {
       finDJ.visible=false;
       reini.visible=false;
       
       //velocidad del suelo 
       suelo.velocityX = -(4 +3*puntos/100);
       
       //puntaje
         puntos=puntos + Math.round(getFrameRate()/60);
         if (puntos>0 && puntos%100===0)
           {
             sonipunto.play();
           }
        // imagen repetida de suelo
        if (suelo.x < 0)
        {
          suelo.x = suelo.width / 2;
        }
       //el dino salta cuando presionas espacio
        if (keyDown("space") && dino.y >= 100  )
        {
          dino.velocityY = -10;
          sonisalta.play();
        }
       // gravedad del dino
          dino.velocityY = dino.velocityY + 0.8; 
         nubes();
         obstaculos();
       if(grup_obst.isTouching(dino))
         {
           //dino.velocityY=-12;
           //sonisalta.play();
           est_jueg = fin;
            sonimuere.play();
         }
     }
   else if(est_jueg===fin)
   {
     finDJ.visible=true;
     reini.visible=true;
          suelo.x = 0;
     dino.velocityY=0;
     
     //cambiamos animacion
     dino.changeAnimation("choca",dinochoca);
     
     //ciclos de vida
     grup_obst.setLifetimeEach(-1);
     grup_nub.setLifetimeEach(-1);
     //velocidad 0 a los obtaculos y a las nubes
    grup_obst.setVelocityXEach(0);
     grup_nub.setVelocityXEach(0);
     if (mousePressedOver(reini))
    {
      reinicio();
      //console.log("Reinicia el juego");
    }
     
   }
    
    //dino cae y se detiene en suelo falso
    dino.collide(suelofalso);
  //var mensaje="esto es una prueba";
     //     console.log(mensaje);
  
    
    drawSprites();
}

//funcion de crear nubes
function nubes ()
{
    if(frameCount % 60===0)
      {
        nube=createSprite(600,100,40,10);      
        nube.addImage(nube_ima);
        nube.y=Math.round(random(10,60))
        nube.scale=0.5;
        nube.velocityX=-3;        
        nube.lifetime=200;
        //cambia la profundidad a nube y a dino
        nube.depth=dino.depth;
        dino.depth=dino.depth+1;
        grup_nub.add(nube);
      } 
  
}
function obstaculos()
{
    if(frameCount % 60===0)
      {
        obst=createSprite(600,165,10,40);
        obst.velocityX=-(6+puntos/100);
        ale_num=Math.round(random(1,6));
        switch(ale_num)
        {
            case 1:     obst.addImage(obst1);
                        break;
            case 2:     obst.addImage(obst2);
                        break;
            case 3:     obst.addImage(obst3);
                        break;
            case 4:     obst.addImage(obst4);
                        break;
            case 5:     obst.addImage(obst5);
                        break;
            case 6:     obst.addImage(obst6);
                        break;
            default:    break;
               
               }
        
        obst.scale=0.5;
        obst.lifetime=300;
        grup_obst.add(obst);
      }
  
}
function reinicio()
{
  est_jueg=jugar;
  finDJ.visible=false;
  reini.visible=false;
  dino.changeAnimation("corre",dinocorre);
  grup_obst.destroyEach();
  grup_nub.destroyEach();
 
 puntos=0;
}
