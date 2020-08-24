// =================================================== External Funcitons


function loadNewScene() {
  alert("loadNewScene está vazio");
}

function onFinishGame() {
  console.log("undefined function");
}

function showResults() {
  console.log("undefined function");
  engine.engineState = engineStates.RESULT;
}

function setFrag(frag) {
  engine.frag = frag;
}

// =================================================== Engine Base

const drawColliders = false;
const debugEngine = false;
const revivePrice = 30;
var engineLife = 0;

const canvas = document.getElementById("canvas");
const canvasInt = new CanvasInterface({
  canvas: canvas,
  pixelBeauty: false
})

const engineStates = {
  StagePlaying: 0,
  LOADING: 1,

  WAITING_NEW_SCENE: 99,
};

class GameEngine {
  constructor(ctx, canvas) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.engineState = undefined;
    this.animationCounter = 0;
    this.lastExecution = undefined;

    this.fpsBuffer = [];
    this.maxFPSBuffer = 10;
  }

  registerEvents() {
    canvas.addEventListener(
      "mousedown",
      (event) => {
        this.touchOrClickCanvas(event, true);
      },
      false
    );
    canvas.addEventListener(
      "touchstart",
      (event) => {
        this.touchOrClickCanvas(event, true);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      (event) => {
        this.touchOrClickCanvas(event, false);
        this.botaoClicado = false;
      },
      false
    );
    canvas.addEventListener(
      "touchend",
      (event) => {
        this.touchOrClickCanvas(event, false);
        this.botaoClicado = false;
      },
      false
    );
  }

  changeState(newState) {
    switch (newState) {
      case engineStates.StagePlaying:
        this.hasGameloop = true;
        this.engineState = newState;
        break;
      case engineStates.LOADING:
        this.engineState = newState;
        break;
      case engineStates.WAITING_NEW_SCENE:
        this.hasGameloop = false;
        this.engineState = newState;
        break;

      default:
        break;
    }
  }



  start() {
    if (debugEngine)
      console.log('Engine iniciada!');

    this.changeState(engineStates.StagePlaying);
    this.gameLoop();
  }

  gameLoop() {
    var deltaTime = 0;
    if (this.lastExecution != undefined) {
      deltaTime = Math.abs(performance.now() - this.lastExecution) / 1000; //tempo em segundos
    }
    this.lastExecution = performance.now();

    this.layout = window.mobileAndTabletCheck() ? "mobile" : "desktop";

    // this.fps = 1 / (deltaTime / 1000);
    // if (this.fpsBuffer.length + 1 > this.fpsmaxFPSBuffer) {
    //   this.fpsBuffer.splice(0, 1);
    // }
    // if (this.fps != Infinity)
    //   this.fpsBuffer.push({ fps: this.fps, deltaTime: deltaTime });

    this.tempDeBotaoClicado++;
    this.animationCounter++;
    if (this.animationCounter > 9999999) {
      this.animationCounter = 0;
    }

    // setInterval(() => {
    //   // window.r equ estAnimationFrame(() => {
    //   this.gameLoop();
    //   // });
    // }, 1000 / 30);



    // this.evolveState(deltaTime / (1 / 30));
    this.evolveState(1);

    if (this.hasGameloop) {
      window.requestAnimationFrame(() => {
        this.hasGameloop = true;
        this.gameLoop();
      });
    }
  }

  evolveState(deltaTime = 1) {
    switch (this.engineState) {
      case engineStates.StagePlaying: {

      } break;
      case engineStates.LOADING: {

      } break;
      case engineStates.WAITING_NEW_SCENE: {

      } break;
    }

    this.update(deltaTime);
  }

  touchOrClickCanvas(event, clickValue = true) {

    // Get X and Y dop mouse / toque
    var x = 0;
    if (event.touches) {
      if (event.touches.length > 0)
        x = event.touches[0].pageX
      else
        x = event.pageX;
    }
    else
      x = event.pageX;

    var y = event.touches ? event.touches.length > 0 ? event.touches[0].pageY : event.pageY
      : event.pageY;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    // this.checkEnunciadoBtnClick(x, y);

    // Frescuras pra possibilitar que a leitura do toque / clique seja impedida
    // if (document.fullscreenElement == null && this.layout == 'mobile') {
    //   return;
    // }

    // if (this.mayDrag == false) {
    //   return;
    // }
    // if (this.mayReadClick == false)
    //   return;

    // Processa clique / desclique
    if (clickValue == true) {

    } else {

    }
  }

  // =========================== renderizar  

  onLoadStage(stage = 1) {
    this.engineLife = engineLife;
    this.currentStage = stage;
    this.currentScene = 'fase' + stage;
    this.firstFrame(stage);
    this.changeState(engineStates.StagePlaying);
    document.querySelector('.gameover-screen').style.display = 'none'; //Esconde tela de gameover
    // document.querySelector('.menu-screen').style.display = 'none'; //Esconde tela de menu
  }

  firstFrame(stageToLoad = 1) {
    // === Set Inputs
    this.inputManager = new InputManager({
      right: InputManager.Keys.Right_Arrow,
      left: InputManager.Keys.Left_Arrow,
      up: InputManager.Keys.Up_Arrow,
      down: InputManager.Keys.Down_Arrow,
    });

    this.analogic = new TouchAnalogic({
      canvas: this.canvas,
      ctx: this.ctx,
      margin: 24,
      radius: 65,
      personalizedImage: {
        image: analogicCircle,
        scale: 0.1,
        arrow: chevronup
      }
    });

    // === Set Layout
    this.ceu = new BGGradiente([
      {
        firstFrame: true,
        keyframe: 0,
        points: [
          { id: 0, color: { r: 132, g: 214, b: 255 }, position: 0 },
          { id: 1, color: { r: 129, g: 213, b: 225 }, position: 0.16 },
          { id: 2, color: { r: 115, g: 206, b: 255 }, position: 0.35 },
          { id: 3, color: { r: 107, g: 198, b: 247 }, position: 0.58 },
          { id: 4, color: { r: 97, g: 192, b: 247 }, position: 0.75 },
          { id: 5, color: { r: 82, g: 181, b: 239 }, position: 1 },
        ]
      },
      {
        keyframe: 3500,
        points: [
          { id: 0, color: { r: 68, g: 174, b: 239 }, position: 0 },
          { id: 1, color: { r: 57, g: 165, b: 222 }, position: 0.06 },
          { id: 2, color: { r: 54, g: 163, b: 222 }, position: 0.15 },
          { id: 3, color: { r: 41, g: 156, b: 222 }, position: 0.48 },
          { id: 4, color: { r: 33, g: 148, b: 214 }, position: 0.6 },
          { id: 5, color: { r: 8, g: 132, b: 206 }, position: 1 },
        ]
      }
    ], this.canvas, this.ctx);

    // === Set HUD
    this.frag = new FragManager();
    this.heartHUD = new HeartHUD(5, ['#vida1', '#vida2', '#vida3', '#vida4', '#vida5'], args => { onGameOver() }, 5); // this.heartHUD = new HeartHUD(3, ['#vida1', '#vida2', '#vida3']);

    // === Eventos importantes no jogo
    const onAcertarQuestao = (answerGiven, rightAnswer, questionString) => {
      this.frag.incluirAcerto({
        questionString: questionString,
        rightAnswer: rightAnswer,
        answerGiven: answerGiven
      });

      this.acertosHUD.pushRightQuestion();
      // this.heartHUD.applyDamage(-1);

      this.stageBuilder.param2Range.splice(this.stageBuilder.param2Range.indexOf(answerGiven), 1);
      this.stageBuilder.resetCheckpointCounter();
      this.lastRandomParam1 = undefined;
      this.stageBuilder.chooseNextChallenge();

      this.acertosHUD.updateHUD();

      if (sounds.sfx.rightAnswer) { // Dá play num som
        sounds.sfx.rightAnswer.currentTime = 0;
        sounds.sfx.rightAnswer.play();
        sounds.sfx.rightAnswer.muted = false;
      }
    }
    const onErrarQuestao = (answerGiven, rightAnswer, questionString, itemCollected) => {
      this.frag.incluirErro({
        questionString: questionString,
        rightAnswer: rightAnswer,
        answerGiven: answerGiven
      });

      // this.acertosHUD.pushWrongQuestion();
      this.stageBuilder.chooseNextChallenge();
      // if (itemCollected.allResults) {
      // itemCollected.properties.allResults.map(result => {
      //   // console.log(;
      //   // result.destroy(result);
      //   // result.properties.forceNoRender = true;

      //   // result.y -= 150;
      //   // result.properties.xaimba = 'U'
      //   // result.mustRender = false;
      //   // result.activeCollider = false;
      // })
      // // console.log(itemCollected);
      // console.log('==========================');
      // }

      this.heartHUD.applyDamage(1);
      this.heartHUD.updateHUD();

      this.layoutManager.estado = 'challenge';

      if (sounds.sfx.wrongAnswer) { // Dá play num som
        sounds.sfx.wrongAnswer.currentTime = 0;
        sounds.sfx.wrongAnswer.play();
        sounds.sfx.wrongAnswer.muted = false;
      }
    }
    const onColetarCrystal = (crystalValue, col) => {
      col.mustRender = true;
      col.activeCollider = false;
      const icon = document.querySelector('#crystal-icon');
      var clientRectangle = icon.getBoundingClientRect();
      col.animateToCounter = {
        rect: clientRectangle,
        speed: 10,
      };

      // consolelog('frag change:', this.frag);

      // console.log(clientRectangle); //or left, right, bottom

      switch (crystalValue) {
        case 1:
          this.crystalCounter.increase(1);

          if (sounds.sfx.crystalPickup) {
            sounds.sfx.crystalPickup.currentTime = 0;
            sounds.sfx.crystalPickup.play();
            sounds.sfx.crystalPickup.muted = false;
            sounds.sfx.crystalPickup.volume = 0.35;
          }
          break;
        case 5:
          this.crystalCounter.increase(5);

          if (sounds.sfx.safiraPickup) {
            sounds.sfx.safiraPickup.currentTime = 0;
            sounds.sfx.safiraPickup.play();
            sounds.sfx.safiraPickup.muted = false;
            sounds.sfx.safiraPickup.volume = 0.45;
          }
          break;

        default:
          break;
      }


    }
    const onColetarCheckpoint = (checkpointValue, col) => {

    }
    const onGameOver = () => {
      engineLife++;
      this.ceu.mayRise = false;
      this.spaceship.turnedOn = false;
      this.layeredBackground.mayRise = false;
      this.layoutManager.mayRise = false;

      document.querySelector('.gameover-screen').style.display = 'flex'; //Exibe tela de gameover

      // Checa se jogador tem dinheiro o suficiente para reviver
      if (this.crystalCounter.counter < revivePrice) {
        document.querySelector(".continuar-button").style.display = 'none'
      } else {
        document.querySelector(".continuar-button").style.display = 'flex'
      }

      // sounds.sfx.nakaOST.play();
      // this.engineSoundOn = false;
    }
    this.onPauseGame = () => {
      this.gamepaused = true;
      // console.log('pause')
      document.querySelector('.pause-btn').style.display = 'none'; //Bloqueia botão de pausa
      document.querySelector('.pause-screen').style.display = 'flex'; //Exibe tela de pausa

      setRising(false)
    }
    this.onUnpauseGame = () => {
      this.gamepaused = false;
      // console.log('unpause')
      document.querySelector('.pause-btn').style.display = 'flex'; //Libera botão de pausa
      document.querySelector('.pause-screen').style.display = 'none'; //Esconde tela de pausa

      setRising(true)
    }
    this.onWinGame = () => {
      document.querySelector('.result-screen').style.display = 'flex'; //Exibe a tela de resultado

      // var percentage = (this.acertosHUD.slots.length + this.heartHUD.hearts) / (this.acertosHUD.slots.length + this.heartHUD.maxHearts)
      var percentage = this.frag.getPercentage();
      document.querySelector('#nota-final').innerHTML = percentage.toFixed(0) + '%';

      console.log("You're a win!");
      setRising(false);
    }
    this.tryToBuyRevive = () => {
      if (this.crystalCounter.counter >= revivePrice) {
        this.crystalCounter.decrease(revivePrice);
        this.onRevive();
      }
    }
    this.onRevive = () => {
      this.heartHUD.recoverDamage(3);
      document.querySelector('.gameover-screen').style.display = 'none'; //Exibe tela de gameover
      setRising(true)
    }
    this.onResetGame = () => {
      // document.querySelector('.result-screen').style.display = 'none'; //Esconde a tela de resultado
      this.closeAllScreens();
      this.firstFrame();
    }
    this.closeAllScreens = () => {
      document.querySelector('.pause-screen').style.display = 'none'; //Esconde tela
      document.querySelector('.gameover-screen').style.display = 'none';
      document.querySelector('.result-screen').style.display = 'none';
      document.querySelector('.menu-screen').style.display = 'none';
    }
    this.irParaMenuPrincipal = () => {
      this.hasGameloop = false;
      onGameOver();
      this.onPauseGame();
      this.changeState(engineStates.WAITING_NEW_SCENE);
      this.closeAllScreens();
      document.querySelector('.menu-screen').style.display = 'flex'; //Esconde tela de menu
    }

    var setRising = (boolean = true) => {
      this.ceu.mayRise = boolean;
    }
    this.ceu.mayRise = true;

    // =========================== Filminho inicial
    var lancarFoguete = () => {
      setTimeout(() => {
        document.querySelector('.pause-btn').style.display = 'flex';
        document.querySelector('.info-btn').style.display = 'flex';
        setRising(true)
        this.spaceship.keepPosition = true;
        this.onUnpauseGame();
        // sounds.sfx.nakaOST.play();
        this.engineSoundOn = true;
      }, 100);
    }
    var filminhoInicial = () => {
      if (this.layoutManager.hasLoaded) {
        console.log('filminhoInicial');
        this.rocketCounterHUD.start(() => {
          lancarFoguete();
        })
      } else {
        setTimeout(() => {
          filminhoInicial();
        }, 10);
      }
    }
    // filminhoInicial();
  }

  update(deltaTime) {
    // console.log(this.currentScene)
    this.generalScale = 1;
    this.layoutIsMobile = window.mobileAndTabletCheck();

    if (this.currentScene == 'fase1') {
      // Define number of Lanes for Layout
      // Advance or Generate Layout
      if (this.gamepaused != true) {
        if (this.analogic && this.analogic.draging) {
          // this.spaceship.readTouchMovimentation(this.analogic);
        } else {
          // this.spaceship.readMovimentation(this.inputManager, { up: InputManager.Keys.Up_Arrow, left: InputManager.Keys.Left_Arrow, right: InputManager.Keys.Right_Arrow, down: InputManager.Keys.Down_Arrow }) //Update Ship Movimentation By Keys
        }
        // this.spaceship.fisica(deltaTime);


        //Update Colliders
        // if (this.spaceship.rectCollider) {
        //   var collisions = this.layoutManager.checkcollision(this.spaceship.rectCollider); //Check Ship Collisions with Collectibles and Checkpoints      
        //   collisions.map(col => {
        //     if (!col.oncollect(col)) {
        //       col.mustRender = false;
        //       col.activeCollider = false;
        //     }
        //   })
        // }
      }

      this.engineAudioLoop(); //Control Ship Sound

      this.tryRenderThings();
    }
  }

  tryRenderThings() {
    //Draw Cenario
    this.ceu.render(); // Sky BG    
    //Draw Enfeites        

    //Obstacles 
    //Pickups    
    //Draw Equation Progress
    //Draw Score
    // this.DesenhaFPS();

    this.analogic.render();
  }

  DesenhaFPS() {
    var fontSize = 36;
    this.ctx.font = fontSize + "px sans-serif";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;

    var mediaFPS = 0;
    var mediaDeltaTime = 0;

    this.fpsBuffer.map(amostra => {
      mediaFPS += amostra.fps;
      mediaDeltaTime += amostra.deltaTime;
    })

    if (this.fpsBuffer.length > 0) {
      mediaFPS = mediaFPS / this.fpsBuffer.length;
      mediaDeltaTime = mediaDeltaTime / this.fpsBuffer.length;
    }

    // this.ctx.fillText(mediaFPS.toFixed(0) + ' FPS, ' + (mediaDeltaTime * 1000).toFixed(1) + 'ms, ', 15, 25, this.canvas.width);
    // this.ctx.strokeText(mediaFPS.toFixed(0) + ' FPS, ' + (mediaDeltaTime * 1000).toFixed(1) + 'ms, ', 15, 25, this.canvas.width);

    this.ctx.fillText(this.fps.toFixed(0) + ' FPS', 15, 25, this.canvas.width);
    this.ctx.strokeText(this.fps.toFixed(0) + ' FPS', 15, 25, this.canvas.width);
  }

  engineAudioLoop() {
    if (this.engineSoundOn != true) {
      return;
    }
    if (!this.engineCounter) {
      this.engineCounter = 0;
      // sounds.sfx.engineloop1.play();
      // sounds.sfx.engineloop2.play();
      // sounds.sfx.engineloop1.onended = (event) => {
      //   sounds.sfx.engineloop1.play();
      // }
      // sounds.sfx.engineloop2.onended = (event) => {
      //   sounds.sfx.engineloop2.play();
      // }
    }

    const generalRocketSound = 0.15;
    var isPlaying = function (myaudio) {
      return myaudio
        && myaudio.currentTime > 0
        && !myaudio.paused
        && !myaudio.ended
        && myaudio.readyState > 2;
    }
    if (!isPlaying(sounds.sfx.engineloop1)) {
      // console.log('play!', sounds.sfx.engineloop1)
      // if (Math.abs(this.spaceship.speed.x) > 0.5) {
      if (sounds.sfx.engineloop1.currentTime > 0.6) {
        sounds.sfx.engineloop1.currentTime = 0;
        // sounds.sfx.engineloop1.play();
        sounds.sfx.engineloop1.muted = false;
        sounds.sfx.engineloop1.volume = 0.5;
      }
      // }

      if (!sounds.sfx.engineloop2.hasPlayedFirstTime && !sounds.sfx.engineloop2.hasPlayedFirstTimePromisse) {
        sounds.sfx.engineloop2.hasPlayedFirstTimePromisse = true;
        setTimeout(() => {
          sounds.sfx.engineloop2.hasPlayedFirstTime = true;
          sounds.sfx.engineloop2.currentTime = 0;
          // sounds.sfx.engineloop2.play();
          sounds.sfx.engineloop2.muted = false;
          sounds.sfx.engineloop2.loop = true;
        }, sounds.sfx.engineloop1 * 0.5 * 1000 * 456789)
      }
    }

    if (sounds.sfx.engineloop2.hasPlayedFirstTime) {
      // if (this.spaceship.speed.y <= -0.05) {
      if (sounds.sfx.engineloop2.currentTime > 0.6) {
        sounds.sfx.engineloop2.currentTime = 0;
        // sounds.sfx.engineloop2.play();
      }
      // }
    }

    // sounds.sfx.engineloop2.play();
    sounds.sfx.engineloop1.volume = Math.abs((Math.cos(degrees_to_radians((this.engineCounter % 360))) + 1)) * 0.15 * generalRocketSound;
    // sounds.sfx.engineloop1.volume = 0;
    sounds.sfx.engineloop2.volume = 0.5 * generalRocketSound;
    // sounds.sfx.engineloop2.volume = 0;

    const speedXRate = (Math.abs(this.spaceship.speed.x) / this.spaceship.maxSpeed.x) * 0.6;
    sounds.sfx.engineloop1.volume += sounds.sfx.engineloop1.volume * speedXRate;
    sounds.sfx.engineloop2.volume += sounds.sfx.engineloop2.volume * speedXRate;

    this.engineCounter += Math.PI;
  }
  // ==================================
}

// ===========================================================================================================

const forceFullscreen = true;
var forcedOrientation = undefined;
canvas.addEventListener("click", function () {
  if (!document.fullscreenElement && forceFullscreen) {
    openFullscreen(document.querySelector('body'));
    // return;
    if (forcedOrientation) {
      if (screen.orientation.lock) {
        screen.orientation.lock(forcedOrientation);
      }
      else {
        screen.lockOrientationUniversal = screen.orientation.lock || screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
        screen.lockOrientationUniversal(forcedOrientation)
      }
    }
  }
}, false);

// ========================================= Carrega recursos
var sheetLoader = new SheetLoader();
// Scenery
const bg = sheetLoader.queueSheet('../../img/stage1/bg-circo.png');

const chevronup = sheetLoader.queueSheet('../../img/stage1/chevron-up-solid.svg');
const analogicCircle = sheetLoader.queueSheet('../../img/ui/analogicCircle.png');

// ======================= Audio Loading
var sounds = {
  desbloqueados: false,
  sfx: {
    crystalPickup: document.getElementById("SFX-crystalPickup"),
    checkpointPickup: document.getElementById("SFX-checkpointPickup"),
    safiraPickup: document.getElementById("SFX-safiraPickup"),
    engineloop1: document.getElementById("SFX-engineLoop1"),
    engineloop2: document.getElementById("SFX-engineLoop2"),
    // nakaOST: document.getElementById("OST-naka"),
    rightAnswer: document.getElementById("SFX-rightAnswer"),
    wrongAnswer: document.getElementById("SFX-wrongAnswer"),
  },
  ost: {

  }
}
var ostStarted = false;
function startOST() {
  if (!ostStarted) {
    ostStarted = true;
    sounds.sfx.nakaOST.play();
    sounds.sfx.nakaOST.muted = false;
    sounds.sfx.nakaOST.play();
    sounds.sfx.nakaOST.muted = false;
    sounds.sfx.nakaOST.volume = 0.5;
  }
}
var ativarSounds = () => {
  startOST();
  engine.engineAudioLoop();

  if (!sounds.allSoundsDescloqueados) {
    var soundsToDesbloquear = 0;
    var soundsDesbloqueados = 0;
    for (var sound in sounds.sfx) {
      if (Object.prototype.hasOwnProperty.call(sounds.sfx, sound)) {
        soundsToDesbloquear++;
        if (!sound.desbloqueado) {
          soundsDesbloqueados++;
          sound.currentTime = 0.99 * sound.duration;
          sound.play();
          // sound.volume = 0.6;
          sound.muted = false;
          sound.desbloqueado = true;
        } else {
          soundsDesbloqueados++;
        }
      }
      if (soundsToDesbloquear == soundsDesbloqueados) {
        sounds.allSoundsDescloqueados = true;
      }
    }
  }
}

// window.addEventListener('load', () => {
//   // window.addEventListener('mousemove', () => {
//   //   // ativarSounds();
//   //   startOST();
//   // })
//   // window.addEventListener('touchstart', () => {
//   //   // ativarSounds();
//   //   startOST();
//   // })
// })

let engine = new GameEngine(canvas.getContext('2d'), canvas);
sheetLoader.loadSheetQueue(() => {
  if (debugEngine)
    console.log('Imagens carregadas!');
  engine.start();
  engine.onLoadStage(1)
});
