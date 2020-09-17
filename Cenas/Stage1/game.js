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

function allowDrop(ev) {
  ev.preventDefault();
}

function somEnunciado() {
  if (sounds.sfx.ingameEnunciado) { // Dá play num som
    sounds.sfx.ingameEnunciado.currentTime = 0;
    sounds.sfx.ingameEnunciado.play();
    sounds.sfx.ingameEnunciado.muted = false;
  }
}

function dragexit(ev) {
  var data = lala;
  if (lala != undefined) {
    //console.log(data)
    if (!engine.contaHUD.checaConta(parseInt(data))) {
      engine.onVacilarResposta()
    }
  }
  lala = undefined;
}

var lala = undefined;

function drag(ev) {
  //console.log('drag')
  lala = ev.target.innerHTML;
  ev.dataTransfer.setData("text", ev.target.getAttribute('valor'));
  ev.dataTransfer.setData("color", ev.target.classList);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (engine.onDarResposta(parseInt(data))) {
    const target = document.querySelector(".local-resp");
    target.innerHTML = data;
    target.classList = ev.dataTransfer.getData("color");
    target.classList.add("local-resp");
  }
  lala = undefined;
}

var loadedData = undefined;
function loadPreviousStageData(dados) {

  if (engine) {
    if (loadedData != undefined) {
      if (loadedData.repescagens == undefined) {
        engine.repescagens = 0;
      } else {
        engine.repescagens = loadedData.repescagens + 1;
      }

      var maxJogadas = 2
      document.getElementById('vezes-r').innerHTML = (maxJogadas - engine.repescagens);
      if (engine.repescagens >= maxJogadas) {
        document.getElementById('btn-repescar').style.display = 'none';
      }

      console.log(engine.repescagens);
    }
  }
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
    somEnunciado();


  }

  gameLoop() {
    var deltaTime = 0;
    if (this.lastExecution != undefined) {
      deltaTime = Math.abs(performance.now() - this.lastExecution) / 1000; //tempo em segundos
    }
    this.lastExecution = performance.now();

    this.layout = window.mobileAndTabletCheck() ? "mobile" : "desktop";
    this.layout2 = window.mobileAndTabletCheck() ? "m" : "d";

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

    // this.analogic = new TouchAnalogic({
    //   canvas: this.canvas,
    //   ctx: this.ctx,
    //   margin: 24,
    //   radius: 65,
    //   personalizedImage: {
    //     image: analogicCircle,
    //     scale: 0.1,
    //     arrow: chevronup
    //   }
    // });

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
      }], this.canvas, this.ctx);

    this.layeredBackground = new MultilayerBackground({
      canvas: this.canvas,
      ctx: this.ctx,
      layers: [
        // { depth: 70, image: montanha6, sizes: { x: (layer) => { return this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale * this.canvas.height / 568 } }, offset: { x: 0, y: -530 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.25 },
        // { depth: 65, image: montanha5, sizes: { x: (layer) => { return this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale * this.canvas.height / 568 } }, offset: { x: 0, y: -520 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.25 },
        // { depth: 60, image: montanha4, sizes: { x: (layer) => { return this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale * this.canvas.height / 568 } }, offset: { x: 0, y: -480 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.25 },
        // { depth: 55, image: montanha3, sizes: { x: (layer) => { return this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale * this.canvas.height / 568 } }, offset: { x: 0, y: -450 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.25 },
        // { depth: 50, image: montanha2, sizes: { x: (layer) => { return this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale * this.canvas.height / 568 } }, offset: { x: 0, y: -490 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.25 },
        // { depth: 45, image: montanha1, sizes: { x: (layer) => { return this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale * this.canvas.height / 568 } }, offset: { x: 0, y: -370 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.25 },

        // { depth: 40, image: campo, sizes: { x: (layer) => { return (this.layout == 'mobile') ? this.canvas.width * 2 : this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale * this.canvas.height / 900 } }, offset: { x: 100, y: -200 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.6 },
        // { depth: 35, image: campo, sizes: { x: (layer) => { return (this.layout == 'mobile') ? this.canvas.width * 2 : this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale * this.canvas.height / 900 } }, offset: { x: 0, y: -180 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.5 },
        {
          depth: 40,
          image: bg,
          sizes: {
            x: (layer) => { return this.canvas.width + 250 },
            y: (layer) => { return Math.min(layer.image.height, this.canvas.height * 0.7) }
          },
          offset: { x: 0, y: 0 }, pivot: { x: 0.5, y: 1 },
          screenPivot: { x: 0.5, y: 1 }, scale: 0.5
        },
        {
          depth: 39,
          image: circus,
          sizes: {
            x: (layer) => { return layer.image.width * layer.scale },
            y: (layer) => { return layer.image.height * layer.scale }
          },
          responsive: (w, h) => {
            if (this.layout == 'mobile') {
              return 0.35;
            }

            return 1;
          },
          offset: { x: 0, y: 0 }, pivot: { x: 0.5, y: 1 },
          screenPivot: { x: 0.55, y: 0.75 }, scale: 0.5
        },
        {
          depth: 38,
          image: rodaGig,
          sizes: {
            x: (layer) => { return layer.image.width * layer.scale },
            y: (layer) => { return layer.image.height * layer.scale }
          },
          responsive: (w, h) => {
            if (this.layout == 'mobile') {
              return 0.5;
            }

            return 2;
          },
          offset: { x: 0, y: 0 }, pivot: { x: 0.5, y: 1 },
          screenPivot: { x: 0.05, y: 0.70 }, scale: 0.6
        },
        {
          depth: 37,
          image: carrosel,
          sizes: {
            x: (layer) => { return layer.image.width * layer.scale },
            y: (layer) => { return layer.image.height * layer.scale }
          },
          responsive: (w, h) => {
            if (this.layout == 'mobile') {
              return 0.75;
            }

            return 2;
          },
          offset: { x: 0, y: 0 }, pivot: { x: 0.5, y: 1 },
          screenPivot: { x: 0.75, y: 0.8 }, scale: 0.3
        },
        {
          depth: 34,
          image: corda_bamba,
          sizes: {
            x: (layer) => { return this.canvas.width * 0.85 },
            y: (layer) => { return this.canvas.height * 0.7 }
          },
          offset: { x: 0, y: 0 }, pivot: { x: 0.5, y: 1 },
          screenPivot: { x: 0.5, y: 1 }, scale: 0.5
        },
        // { depth: 30, image: plataforma, sizes: { x: (layer) => { return this.canvas.width }, y: (layer) => { return layer.image.height * layer.scale } }, offset: { x: 0, y: 0 }, pivot: { x: 0.5, y: 1 }, screenPivot: { x: 0.5, y: 1 }, scale: 0.5 },
      ],
      riseSpeed: 0.5,
      currentHeight: 0,
      depth: 150,
      backgroundSpeed: 2,
      frontSpeed: 6,
    });

    this.equilibrista = new ArcadePhysicsObject(
      {
        canvas: this.canvas,
        ctx: this.ctx,
        image: equilibrista,
        position: { x: this.canvas.width * 0.5, y: this.canvas.height * 0.5 },
        responsive: (obj) => {
          obj.position.x = (this.distSteper.currentPosition *
            (((this.distSteper.endPoint - this.distSteper.startPoint) + this.distSteper.startPoint) / this.distSteper.steps))
            + this.canvas.width * 0.21;

          obj.position.y = this.canvas.height * 0.7 - 138 * obj.scaler + (this.equilibristaY || 0);
        },
        responsiveScaling: (fW, fH) => {
          if (this.layout2 == 'm') {
            return (this.canvas.height / 414) * 0.7;
          }
        }
      }
    );

    this.arcadeObjs = [];
    this.arcadeObjs.push(this.equilibrista);

    this.distSteper = new DistanceSteper(this.canvas.width * 0.3, this.canvas.width * 0.65, 6, 0);

    // this.distSteper.goToStep(2);

    this.perguntas = [
      {
        q: '12 - 5 =', //questão
        r: 7,         //resposta
        o: [6, 5, 8, 9]
      },
      {
        q: '14 - 6 =',
        r: 8,
        o: [9, 11, 12, 10]
      },
      {
        q: '19 - 18 =',
        r: 1,
        o: [2, 0, 3, 4]
      },
      {
        q: '24 - 4 =',
        r: 20,
        o: [21, 22, 23, 19]
      },
      {
        q: '20 - 16 =',
        r: 4,
        o: [5, 6, 3, 2]
      },
      {
        q: '12 - 4 =',
        r: 8,
        o: [11, 7, 9, 10]
      },

    ];

    this.perguntas = shuffle(this.perguntas);
    this.perguntas.splice(6, 4);
    this.perguntaAtual = 0;

    // === Set HUD
    this.crystalCounter = new HUDCounter(60, 'txt_qtd-moedas');
    this.frag = new FragManager();
    this.heartHUD = new HeartHUD(3, ['#vida1', '#vida2', '#vida3'], args => { onGameOver() }, 3); // this.heartHUD = new HeartHUD(3, ['#vida1', '#vida2', '#vida3']);
    this.contaHUD = new ContaHUD({ selector: '#continha' });

    document.querySelector('.certo-ou-errado .certo').classList.add('escondido')
    document.querySelector('.certo-ou-errado .errado').classList.add('escondido')

    // === Eventos importantes no jogo
    this.onDarResposta = (resposta) => {

      var ret = engine.contaHUD.checaConta(resposta)
      if (ret) {
        this.onAcertarQuestao(resposta, this.contaHUD.conta.r, this.contaHUD.conta.q)
      } else {
        this.onErrarQuestao(resposta, this.contaHUD.conta.r, this.contaHUD.conta.q)
      }

      return ret
    }
    this.onLoadPergunta = () => {
      this.contaHUD.setOp(this.perguntas[this.perguntaAtual])

      var bandeja = document.querySelector('.bandeja-num');
      bandeja.innerHTML = '';
      var pergunta = JSON.parse(JSON.stringify(this.perguntas[this.perguntaAtual]));
      var cor = 1;

      pergunta.o.push(pergunta.r)
      pergunta.o = shuffle(pergunta.o)
      pergunta.o.map((item) => {
        const opt = document.createElement('div')
        opt.classList.add('opicao');

        const num = document.createElement('div')
        num.innerHTML = item + '';
        num.classList.add('num');

        const val = document.createElement('div')

        val.classList.add('cor' + cor);
        cor++
        val.setAttribute('draggable', 'true')
        val.setAttribute('valor', item)
        val.ondragstart = (event) => {
          drag(event)
        }
        //
        val.ondragend = (event) => {
          dragexit(event)
        }

        val.appendChild(num)
        opt.appendChild(val)
        bandeja.appendChild(opt)
      })



    }

    this.onVacilarResposta = () => {
      if (sounds.sfx.wrongAnswer) { // Dá play num som
        sounds.sfx.wrongAnswer.currentTime = 0;
        sounds.sfx.wrongAnswer.play();
        sounds.sfx.wrongAnswer.muted = false;
      }

      document.querySelector('.certo-ou-errado .errado').classList.remove('escondido')
      setTimeout(() => {
        this.equilibristaCaindo = false;
        this.equilibristaY = 0;
        document.querySelector('.certo-ou-errado .errado').classList.add('escondido')
      }, 2500)
      document.querySelector('.certo-ou-errado .certo').classList.add('escondido')

    }
    this.onAcertarQuestao = (answerGiven, rightAnswer, questionString) => {
      this.frag.incluirAcerto({
        questionString: questionString,
        rightAnswer: rightAnswer,
        answerGiven: answerGiven
      });

      document.querySelector('.certo-ou-errado .errado').classList.add('escondido')
      setTimeout(() => {

        this.perguntaAtual++;
        if (this.distSteper.curentStep + 1 > this.distSteper.steps) {
          document.querySelector('.result-screen').style.display = 'flex';
          this.onWinGame();
        } else {
          this.onLoadPergunta();
          document.querySelector('.local-resp').innerHTML = '';
        }
        document.querySelector('.certo-ou-errado .certo').classList.add('escondido')
      }, 2500);

      var certo = document.querySelector('.certo-ou-errado .certo')
      certo.classList.remove('escondido')

      if (sounds.sfx.rightAnswer) { // Dá play num som
        sounds.sfx.rightAnswer.currentTime = 0;
        sounds.sfx.rightAnswer.play();
        sounds.sfx.rightAnswer.muted = false;
      }


      this.distSteper.nextStep();


    }
    this.onErrarQuestao = (answerGiven, rightAnswer, questionString, removeLife = true) => {
      this.frag.incluirErro({
        questionString: questionString,
        rightAnswer: rightAnswer,
        answerGiven: answerGiven
      });

      this.equilibristaCaindo = true;
      this.equilibristaY = 0;

      document.querySelector('.certo-ou-errado .errado').classList.remove('escondido')
      setTimeout(() => {
        this.equilibristaCaindo = false;
        this.equilibristaY = 0;
        document.querySelector('.certo-ou-errado .errado').classList.add('escondido')
      }, 2500)
      document.querySelector('.certo-ou-errado .certo').classList.add('escondido')

      if (removeLife)
        this.heartHUD.applyDamage(1);
      this.heartHUD.updateHUD();

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
      console.log('guemeouver')
      engineLife++;

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
    this.onLoadPergunta();
  }

  update(deltaTime) {
    if (this.layout2 == 'm') {
      document.body.classList.add("mobile");
    }

    // console.log(this.currentScene)
    this.generalScale = 1;
    this.layoutIsMobile = window.mobileAndTabletCheck();

    if (this.currentScene == 'fase1') {
      // Define number of Lanes for Layout
      // Advance or Generate Layout
      if (this.gamepaused != true) {

        this.distSteper.update();

        if (this.crystalCounter)
          this.crystalCounter.updateHUD();

        this.distSteper.startPoint = this.canvas.width * 0.3;
        this.distSteper.endPoint = this.canvas.width * 0.65;

        if (this.equilibristaCaindo)
          this.equilibristaY += 1.95;

        // if (this.analogic && this.analogic.draging) {
        // this.spaceship.readTouchMovimentation(this.analogic);
        // } else {
        // this.spaceship.readMovimentation(this.inputManager, { up: InputManager.Keys.Up_Arrow, left: InputManager.Keys.Left_Arrow, right: InputManager.Keys.Right_Arrow, down: InputManager.Keys.Down_Arrow }) //Update Ship Movimentation By Keys
        // }
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
    this.layeredBackground.render(); // Layered BG
    if (this.arcadeObjs) {
      this.arcadeObjs.map(obj => {
        obj.render();
      })
    }
    //Draw Enfeites        

    //Obstacles 
    //Pickups    
    //Draw Equation Progress
    //Draw Score
    // this.DesenhaFPS();

    // this.analogic.render();
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
const bg = sheetLoader.queueSheet('../../img/stage1/campo - Copia.png');
const corda_bamba = sheetLoader.queueSheet('../../img/stage1/corda-bamba.png');
const rodaGig = sheetLoader.queueSheet('../../img/stage1/roda-gigante-static.svg');
const circus = sheetLoader.queueSheet('../../img/stage1/circo.png');
const carrosel = sheetLoader.queueSheet('../../img/stage1/carrosel.png');
const equilibrista = sheetLoader.queueSheet('../../img/stage1/equilibrista.png');

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
    enunciado: document.getElementById("ingame-enunciado"),
    ingameEnunciado: document.getElementById("ingame-enunciado"),
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
