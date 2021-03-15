/// <reference path="../../../Content/GamesDownloadTemplate/lib/ScormHelper.js" />
/// <reference path="http://code.createjs.com/createjs-2013.12.12.min.js" />

var Game = Game || (function (createjs, $) {
    var standardTextShadow = new createjs.Shadow("gray", 1, 1, 3);


    function Game(canvasId, gameData) {
        gameData = gameData || {};
        var assetsPath = gameData.assetsPath || "";
        var gameBoard = null;
        var assets = [
            { id: "titleBackground", src: assetsPath + "titleAndPlayerChoiceBackground.jpg" },
            { id: "GameBackground", src: assetsPath + "beeGameBackground.jpg" },
            { id: "comb", src: assetsPath + "space.png" },
            { id: "redComb", src: assetsPath + "redMarker.png" },
            { id: "playButton", src: assetsPath + "playButton.png" },
            { id: "greenBee", src: assetsPath + "beeSpriteGreen.png" },
            { id: "purpleBee", src: assetsPath + "beeSpritePurlple.png" },
            { id: "redBee", src: assetsPath + "beeSpriteRed.png" },
            { id: "yellowBee", src: assetsPath + "beeSpriteYellow.png" },
            { id: "playerIndicator", src: assetsPath + "playerIndicator.png" },
            { id: "bigComb", src: assetsPath + "bigHoneyComb.png" },
            { id: "spin", src: assetsPath + "spin.png" },
            { id: "musicOn", src: assetsPath + "musicOn.png" },
            { id: "musicOff", src: assetsPath + "musicOff.png" },
            { id: "instructions_background", src: assetsPath + "instructions_background.png" },
            { id: "instructions_question", src: assetsPath + "instructions_question.png" },
            { id: "instructions", src: assetsPath + "BeeKeeperInstructions.png" }
        ];


        // Randomize Questions

        // Randomize Questions/Answers
        if (gameData.RandomizeQuestions || gameData.RandomizeQuestions === undefined) {
            gameData.Questions = shuffle(gameData.Questions);
        }


        for (var i = 0; i < gameData.Questions.length; i++) {
            if (gameData.Questions[i].RandomizeAnswers) {
                gameData.Questions[i].Answers = shuffle(gameData.Questions[i].Answers);
            }
        }

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        // Random end


        var currentLmsInteraction = null;
        var queue = new createjs.LoadQueue(false);
        queue.addEventListener("complete", function (event) {
            initializeGame();
        });
        queue.loadManifest(assets);

        //adding audio
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/spinnerTick.mp3", id: "spinnerTick" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/spinnerBell.mp3", id: "spinnerBell" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/Bee_pop_1.mp3", id: "pop1" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/Bee_pop_2.mp3", id: "pop2" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/Bee_pop_3.mp3", id: "pop3" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/BeeBuzz.mp3", id: "beeBuzz" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/Bee_Buzz_1.mp3", id: "buzz1" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/Bee_Buzz_2.mp3", id: "buzz2" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/Bee_Buzz_3.mp3", id: "buzz3" });
        createjs.Sound.registerSound({ src: assetsPath + "BeeAudio/Bee_Buzz_4.mp3", id: "buzz4" });
        var spinnerTick = createjs.Sound.createInstance("spinnerTick");

        var spinnerBell = createjs.Sound.createInstance("spinnerBell");
        spinnerBell.volume = spinnerBell.volume * 0.25;

        var pop1 = createjs.Sound.createInstance("pop1");
        var pop2 = createjs.Sound.createInstance("pop2");
        var pop3 = createjs.Sound.createInstance("pop3");
        var beeBuzz = createjs.Sound.createInstance("beeBuzz");
        var buzz1 = createjs.Sound.createInstance("buzz1");
        var buzz2 = createjs.Sound.createInstance("buzz2");
        var buzz3 = createjs.Sound.createInstance("buzz3");
        var buzz4 = createjs.Sound.createInstance("buzz4");
        var TitleView = new createjs.Container();
        var NumberOfPlayers = new createjs.Container();
        var GameView = new createjs.Container();
        var instructionsView = null;
        var isTwoPlayer = false;
        var isLmsConnected = false;

        var gameState = {
            player1Score: 0,
            player1Name: "Player 1",
            gameOn: false,
            currentQuestion: "",
            usedQuestionCount: 0,
            playerCount: 1,
            musicOn: true,

        }

        //gameData.Questions = shuffle(gameData.Questions);



        function initializeGame() {
            if (typeof ScormHelper !== 'undefined') {
                isLmsConnected = ScormHelper.initialize();
                if (isLmsConnected) {
                    ScormHelper.cmi.completionStatus(ScormHelper.completionStatus.incomplete);
                }
            }

            var stage = new createjs.Stage(canvasId);
            stage.enableMouseOver();
            addTitleView();

            //ticker
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", updateStage);
            var tickCount = 0;

            function updateStage() {
                stage.update();
            }

            function createInstructionsView() {
                var instructionImage = new createjs.Bitmap(queue.getResult("instructions"));
                instructionImage.name = "instructionImage";
                var hit = new createjs.Shape();
                var exitContainer = new createjs.Container();
                exitContainer.name = "exitContainer";
                var exitBox = new createjs.Shape();
                exitContainer.x = 720;
                exitContainer.y = 570;
                var exitText = new createjs.Text("BACK", "bold 18px Georgia", "#000");
                exitText.x = 8;
                exitText.y = 8;
                exitContainer.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#c1272D").beginStroke("#000").setStrokeStyle(1).drawRoundRect(0, 0, 70, 37, 5).endFill().endStroke());
                hit.graphics.beginFill("#000").drawRect(0, 0, exitText.getMeasuredWidth(), exitText.getMeasuredHeight());
                exitBox.graphics.beginFill("#FFCC00").beginStroke("#000").setStrokeStyle(1).drawRoundRect(0, 0, 70, 37, 5).endFill().endStroke();
                exitText.hitArea = hit;
                exitContainer.addChild(exitBox, exitText);
                stage.addChild(instructionImage, exitContainer);

                exitContainer.addEventListener("click", function (event) {
                    var instructionContainer = stage.getChildByName("instructionImage");
                    var exitContainer = stage.getChildByName("exitContainer");
                    stage.removeChild(instructionContainer, exitContainer);

                });
            }
            function handleInstructionsMouseOver(event) {
                if (event.type == "mouseover") {
                    createjs.Tween.get(questionMark, { loop: false }).to({ scaleX: 1.0625, scaleY: 1.0625 }, 50);
                }
                else {
                    createjs.Tween.get(questionMark, { loop: false }).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
                }
            }

            function addTitleView() {

                var titleBackground = new createjs.Bitmap(queue.getResult("titleBackground"));
                TitleView.addChild(titleBackground);
                addSoundControl(TitleView);
                var titleText = new createjs.Text(gameData.Title, "36px Arial Black", "black");
                titleText.shadow = new createjs.Shadow("gray", 1, 1, 3);
                titleText.textAlign = "center";
                titleText.x = 400;
                titleText.lineWidth = 780;
                titleText.y = 20;
                TitleView.addChild(titleText);

                var descriptionText = new createjs.Text(gameData.Description, "24px Arial Black", "black");
                descriptionText.lineWidth = 600;
                descriptionText.textAlign = "center";
                descriptionText.x = 400;
                descriptionText.y = 240;
                TitleView.addChild(descriptionText);

                //////start button
                var startB = new createjs.Bitmap(queue.getResult("playButton"));
                startB.textAlign = "center";
                startB.x = 520;
                startB.y = 400;
                startB.shadow = new createjs.Shadow("gray", 0, 2, 2);

                startB.addEventListener("click", function (event) {
                    createjs.Sound.play("pop1");
                    addNumberOfPlayers();
                });
                startB.addEventListener("mouseover", function (event) {
                    startB.alpha *= .80;
                });
                startB.on("mouseout", function (event) {
                    startB.alpha = 1;
                });
                TitleView.addChild(startB);


                stage.addChild(TitleView);
            }

            function addNumberOfPlayers() {
                stage.removeChild(TitleView);
                var titleBackground = new createjs.Bitmap(queue.getResult("titleBackground"));
                var titleText = new createjs.Text(gameData.Title, "36px Arial Black", "black");
                titleText.shadow = new createjs.Shadow("gray", 1, 1, 3);
                titleText.textAlign = "center";
                titleText.x = 400;
                titleText.lineWidth = 780;
                titleText.y = 20;
                NumberOfPlayers.addChild(titleBackground);
                NumberOfPlayers.addChild(titleText);
                NumberOfPlayers.addChild(NumberOfPlayers);
                var playersText = new createjs.Text("How many players???", "20px Arial Bold", "black");
                standardTextShadow = new createjs.Shadow("gray", 1, 1, 3);
                playersText.textAlign = "center";
                playersText.x = 280;
                playersText.y = 260;
                NumberOfPlayers.addChild(playersText);
                addSoundControl(NumberOfPlayers);
                function PlayerButtons(container, x, y, index) {
                    this.index = index;
                    this.container = new createjs.Container();
                    // this.container.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0, 0, 150, 150));
                    this.container.shadow = new createjs.Shadow("gray", 3, 3, 10);
                    this.container.placeholder = this;
                    container.addChild(this.container);
                    var playerText = "Player";
                    if (index > 1) {
                        playerText = "Players";
                    }
                    this.text = new createjs.Text(index + playerText, "14px Arial Black");
                    this.text.textAlign = "center";
                    this.text.x = x;
                    this.text.y = y - 14;

                    this.boardPiece = new createjs.Bitmap(queue.getResult("comb"));
                    t = this.boardPiece.getBounds();
                    this.boardPiece.id = "comb";
                    this.boardPiece.regX = t.width / 2;
                    this.boardPiece.regY = t.width / 2;
                    this.boardPiece.scaleX = this.boardPiece.scaleY = 2;
                    this.boardPiece.x = x;
                    this.boardPiece.y = y;

                    this.container.addChild(this.boardPiece);
                    this.container.hitArea = this.boardPiece;
                    this.container.addChild(this.text);
                    this.container.on("mouseover", this.mouseover, this);
                    this.container.on("mouseout", this.mouseout, this);
                    this.container.on("click", this.click, this);

                    var _selected = false;
                    Object.defineProperty(this, "selected", {
                        get: function () {
                            return _selected;
                        },
                        set: function (value) {
                            if (value) {
                                this.boardPiece.image = queue.getResult("redComb");
                                t = this.boardPiece.getBounds();
                                this.boardPiece.regX = t.width / 2;
                                this.boardPiece.regY = t.width / 2;
                                createjs.Tween.get(this.boardPiece).to({ scaleX: 2.4, scaleY: 2.4 }, 100);

                            } else {
                                this.boardPiece.image = queue.getResult("comb");
                                t = this.boardPiece.getBounds();
                                this.boardPiece.regX = t.width / 2;
                                this.boardPiece.regY = t.width / 2;
                                this.boardPiece.scaleX = this.boardPiece.scaleY = 2;
                            }
                            _selected = value;
                        }
                    });
                }
                PlayerButtons.prototype.mouseover = function (evt) {
                    var t = evt.currentTarget.placeholder;
                    createjs.Tween.get(t.boardPiece).to({ scaleX: this.selected ? 2.4 : 2.2, scaleY: this.selected ? 2.4 : 2.2 }, 100);
                }
                PlayerButtons.prototype.mouseout = function (evt) {
                    var t = evt.currentTarget.placeholder;
                    createjs.Tween.get(t.boardPiece).to({ scaleX: this.selected ? 2.2 : 2.0, scaleY: this.selected ? 2.2 : 2.0 }, 100);
                }
                PlayerButtons.prototype.click = function (evt) {
                    var t = evt.currentTarget.placeholder;
                    createjs.Sound.play("pop3");
                    for (var p = 0; p < evt.currentTarget.parent.children.length; p++) {
                        if (evt.currentTarget.parent.children[p].hasOwnProperty("placeholder"))
                            evt.currentTarget.parent.children[p].placeholder.selected = false;
                    }
                    gameState.playerCount = t.index;
                    this.selected = true;
                    addGameView();
                }
                this.btn1 = new PlayerButtons(NumberOfPlayers, 200, 400, 1);
                if (gameData.Questions.length > 5) this.btn2 = new PlayerButtons(NumberOfPlayers, 315, 400, 2);
                if (gameData.Questions.length > 10) this.btn3 = new PlayerButtons(NumberOfPlayers, 200, 506, 3);
                if (gameData.Questions.length > 15) this.btn4 = new PlayerButtons(NumberOfPlayers, 315, 506, 4);

                // Instructions Button
                var instructionsContainer = new createjs.Container();
                instructionsContainer.name = "gameSessionInstructionButtonContainer";
                instructionsContainer.x = 0;
                instructionsContainer.y = 550;
                instructionsContainer.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#F00").drawCircle(0, 50, 50));
                instructionsContainer.cursor = 'pointer';
                questionMark = new createjs.Bitmap(queue.getResult("instructions_question"));

                instructionsContainer.addChild(new createjs.Bitmap(queue.getResult("instructions_background")));
                instructionsContainer.addChild(questionMark);


                instructionsContainer.on("mouseover", handleInstructionsMouseOver);
                instructionsContainer.on("mouseout", handleInstructionsMouseOver);
                instructionsContainer.addEventListener("click", function () {
                    createInstructionsView();
                });

                NumberOfPlayers.addChild(instructionsContainer);

                stage.addChild(NumberOfPlayers);
            }

            function addGameView() {
                stage.removeChild(TitleView)

                var GameBackground = new createjs.Bitmap(queue.getResult("GameBackground"));
                GameView.addChild(GameBackground);
                addSoundControl(GameView);
                // here we will have the honeycomb trail and the question / answer area
                gameBoard = new GameBoard(GameView);
                gameBoard.init();

                stage.addChild(GameView);
            }

            function GameBoard(container) {

                this.pieces = [];
                this.players = [];
                this.container = container;
                this.questions = gameData.Questions.slice();
                this.spinner = new Spinner(this);
                this.isGameOver = false;
                //player Indicator
                var data = {
                    images: [queue.getResult("playerIndicator")],
                    frames: { width: 42, height: 45 },
                    animations: { red: [0, 0], purple: [1, 1], green: [2, 2], yellow: [3, 3] }
                };
                var indicatorSpriteSheet = new createjs.SpriteSheet(data);

                var _currentPlayer = -1;
                Object.defineProperty(this, "currentPlayer", {
                    get: function () { return _currentPlayer; },
                    set: function (value) {
                        var colors = ["green", "red", "yellow", "purple"];
                        if (this.playerIndicator)
                            this.container.removeChild(this.playerIndicator);
                        this.playerIndicator = new createjs.Sprite(indicatorSpriteSheet, colors[value.number]);
                        this.playerIndicator.x = 575;
                        this.playerIndicator.y = 120;
                        this.container.addChild(this.playerIndicator);
                        _currentPlayer = value;
                    }
                });

                var _currentQuestion = -1;
                Object.defineProperty(this, "currentQuestion", {
                    get: function () { return _currentQuestion; },
                    set: function (value) {
                        if (_currentQuestion != -1)
                            this.container.removeChild(_currentQuestion.contain);
                        _currentQuestion = null;
                        _currentQuestion = value;
                    }
                });

                // Instructions Button
                var instructionsContainer = new createjs.Container();
                instructionsContainer.name = "gameSessionInstructionButtonContainer";
                instructionsContainer.x = 0;
                instructionsContainer.y = 550;
                instructionsContainer.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#F00").drawCircle(0, 50, 50));
                instructionsContainer.cursor = 'pointer';
                questionMark = new createjs.Bitmap(queue.getResult("instructions_question"));

                instructionsContainer.addChild(new createjs.Bitmap(queue.getResult("instructions_background")));
                instructionsContainer.addChild(questionMark);


                instructionsContainer.on("mouseover", handleInstructionsMouseOver);
                instructionsContainer.on("mouseout", handleInstructionsMouseOver);
                instructionsContainer.addEventListener("click", function () {
                    createInstructionsView();
                });

                container.addChild(instructionsContainer);



                this.init = function () {
                    // calculate point values    
                    // each player can win if they answer all their questions correctly
                    // 
                    boardPoints = [];
                    gameState.gameOn = true;
                    gameState.submitedScore = false;
                    boardPoints.length = gameState.playerCount;

                    for (var j = 0; j < boardPoints.length; j++) { boardPoints[j] = []; }


                    for (var l = 0; l < this.questions.length; l++) {
                        this.questions[l].Text = (this.questions[l].Text && this.questions[l].Text != "" ? this.questions[l].Text : "");
                        for (var m = 0; m < this.questions[l].Answers.length; m++) {
                            this.questions[l].Answers[m].Text = (this.questions[l].Answers[m].Text && this.questions[l].Answers[m].Text != "" ? this.questions[l].Answers[m].Text : "");
                        }

                        boardPoints[0].push({ id: l, value: 0 });
                        boardPoints.push(boardPoints.shift());
                    }

                    //each player could have a diffrent mid value
                    for (var j = 0; j < boardPoints.length; j++) {
                        var playerQuestions = boardPoints[j].length;
                        var midVal = Math.floor(52 / boardPoints[j].length) + 1;
                        if (midVal < 2) midVal = 2;
                        for (var k = 0; k < boardPoints[j].length; k++) {
                            boardPoints[j][k].value = midVal;
                        }
                    }

                    // make it random
                    for (var j = 0; j < boardPoints.length; j++) {
                        for (var k = 0; k < boardPoints[j].length; k++) {
                            var diff = ((Math.random() * (boardPoints[j][k].value))) | 0 //needs tuning
                            boardPoints[j][k].value = boardPoints[j][k].value + diff;
                            this.questions[boardPoints[j][k].id].spaceValue = boardPoints[j][k].value;
                            k++;
                            if (boardPoints[j][k]) {
                                boardPoints[j][k].value = boardPoints[j][k].value - diff;
                                this.questions[boardPoints[j][k].id].spaceValue = boardPoints[j][k].value;
                            }
                        }
                    }

                    this.pieces.push(new TilePiece(106, 521, this));
                    this.pieces.push(new TilePiece(148, 546, this));
                    this.pieces.push(new TilePiece(188, 522, this));
                    this.pieces.push(new TilePiece(230, 546, this));
                    this.pieces.push(new TilePiece(270, 521, this));
                    this.pieces.push(new TilePiece(312, 546, this));
                    this.pieces.push(new TilePiece(352, 522, this));
                    this.pieces.push(new TilePiece(394, 546, this));
                    this.pieces.push(new TilePiece(434, 522, this));
                    this.pieces.push(new TilePiece(476, 498, this));
                    this.pieces.push(new TilePiece(517, 474, this));
                    this.pieces.push(new TilePiece(517, 426, this));
                    this.pieces.push(new TilePiece(476, 402, this));
                    this.pieces.push(new TilePiece(434, 426, this));
                    this.pieces.push(new TilePiece(394, 451, this));
                    this.pieces.push(new TilePiece(352, 426, this));
                    this.pieces.push(new TilePiece(312, 450, this));
                    this.pieces.push(new TilePiece(270, 426, this));
                    this.pieces.push(new TilePiece(230, 451, this));
                    this.pieces.push(new TilePiece(188, 426, this));
                    this.pieces.push(new TilePiece(148, 450, this));
                    this.pieces.push(new TilePiece(106, 426, this));
                    this.pieces.push(new TilePiece(106, 379, this));
                    this.pieces.push(new TilePiece(146, 354, this));
                    this.pieces.push(new TilePiece(186, 330, this));
                    this.pieces.push(new TilePiece(228, 354, this));
                    this.pieces.push(new TilePiece(269, 329, this));
                    this.pieces.push(new TilePiece(310, 354, this));
                    this.pieces.push(new TilePiece(350, 330, this));
                    this.pieces.push(new TilePiece(392, 354, this));
                    this.pieces.push(new TilePiece(432, 330, this));
                    this.pieces.push(new TilePiece(474, 305, this));
                    this.pieces.push(new TilePiece(433, 281, this));
                    this.pieces.push(new TilePiece(391, 257, this));
                    this.pieces.push(new TilePiece(349, 232, this));
                    this.pieces.push(new TilePiece(309, 257, this));
                    this.pieces.push(new TilePiece(267, 233, this));
                    this.pieces.push(new TilePiece(226, 257, this));
                    this.pieces.push(new TilePiece(185, 233, this));
                    this.pieces.push(new TilePiece(143, 255, this));
                    this.pieces.push(new TilePiece(103, 229, this));
                    this.pieces.push(new TilePiece(61, 205, this));
                    this.pieces.push(new TilePiece(61, 157, this));
                    this.pieces.push(new TilePiece(102, 133, this));
                    this.pieces.push(new TilePiece(144, 157, this));
                    this.pieces.push(new TilePiece(185, 133, this));
                    this.pieces.push(new TilePiece(227, 157, this));
                    this.pieces.push(new TilePiece(268, 133, this));
                    this.pieces.push(new TilePiece(310, 157, this));
                    this.pieces.push(new TilePiece(351, 133, this));
                    this.pieces.push(new TilePiece(393, 157, this));
                    this.pieces.push(new TilePiece(460, 157)); // beehive spot                

                    for (var k = 0; k < gameState.playerCount; k++) {
                        this.players.push(new Player(k, this));
                    }
                    //shuffle start player
                    var random = Math.floor(Math.random() * 10) + 1;
                    for (var k = 0; k < random; k++)
                        this.players.push(this.players.shift());

                    this.currentPlayer = this.players[0];
                }
                GameBoard.prototype.update = function () {
                    for (var j = 0; j < this.players.length; j++) {
                        this.players[j].update();
                    }
                }
                ////////////////

                GameBoard.prototype.gameOver = function () {
                    var wasLmsConnected = false;
                    gameState.gameOn = false;
                    var correctQuestions = 0;
                    var winner = this.players[0];
                    if (this.players.length == 2) {
                        // Multi-Player Winner Results
                        for (var j = 0; j < this.players.length; j++) {
                            correctQuestions += this.players[j].correctQuestions;
                            if (this.players[j].location > winner.location)
                                winner = this.players[j];
                        }
                    }
                    else {
                        // Single Player Results
                        if (winner.location >= 52) {
                            // Player Wins
                            correctQuestions += this.players[0].correctQuestions;
                            //winner = this.players[0];
                        }
                        else {
                            // Player Losses
                            correctQuestions += this.players[0].correctQuestions;
                            winner = null;
                        }
                    }
                    if (isLmsConnected) {
                        wasLmsConnected = true;
                        ScormHelper.cmi.completionStatus(ScormHelper.completionStatus.completed);
                        ScormHelper.cmi.score.raw(correctQuestions * 100);
                        var scaledscore = correctQuestions / gameData.Questions.length;
                        ScormHelper.cmi.score.scaled(scaledscore);
                        var isPassed = (scaledscore >= ScormHelper.cmi.scaledPassingScore());

                        if (isPassed) {
                            ScormHelper.cmi.successStatus(ScormHelper.successStatus.passed);
                        } else {
                            ScormHelper.cmi.successStatus(ScormHelper.successStatus.failed);
                        }

                        isLmsConnected = false;
                        currentLmsInteraction = null;
                    }

                    var scaledCorrect = Math.floor(correctQuestions * 100 / gameData.Questions.length)

                    submitScore(scaledCorrect);  // percent of questions answered correctly

                    var quitCallback = function () {
                        if (wasLmsConnected) {
                            ScormHelper.cmi.exit("");
                            ScormHelper.adl.nav.request("exitAll");


                            ScormHelper.terminate();
                        }
                        else {
                            window.location = "http://www.wisc-online.com";
                        }
                    };
                    var winColor = ["Green", "Red", "Yellow", "Purple"];

                    var gameOverContainer = new createjs.Container();
                    var gameOverBackground = new createjs.Shape();
                    gameOverBackground.graphics.beginFill("#fff").beginStroke("#000").setStrokeStyle(1).drawRoundRect(0, 0, 400, 300, 5).endFill().endStroke();

                    // NEED TO DISPLAY LOSE GAME IS PLAYER ONE HASN'T FINISHED
                    if (winner != null) {
                        var winTxt = new createjs.Text("Player " + [winner.number + 1] + " Wins! \n \n", "bold 30px Arial");
                        winTxt.y = 40;
                        winTxt.regX = winTxt.getBounds().width / 2;
                        winTxt.x = 200;
                    }
                    else {
                        var winTxt = new createjs.Text("Try Again!\nYou did not reach the end! \n \n", "bold 30px Arial");
                        winTxt.y = 30;
                        winTxt.regX = winTxt.getBounds().width / 2;
                        winTxt.x = 400;
                        winTxt.textAlign = "center";
                    }


                    var gameOverTxt = new createjs.Text("Game Over", "bold 30px Arial");
                    gameOverTxt.y = 100;
                    gameOverTxt.regX = gameOverTxt.getBounds().width / 2;
                    gameOverTxt.x = 200;

                    var replayButton = new createjs.Container();
                    replayButton.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0, 0, 200, 35));
                    replayButton.addChild(new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("dark gray").beginFill("#FAC608").drawRoundRect(0, 0, 200, 35, 5).endFill()));
                    replayButton.getChildAt(0).shadow = new createjs.Shadow("gray", 3, 3, 5);
                    var replayTxt = new createjs.Text("Re-Play", "Bold 24px Arial", "Black");
                    replayTxt.regX = replayTxt.getBounds().width / 2;
                    replayTxt.x = 100;
                    replayTxt.y = 3;
                    replayButton.addChild(replayTxt);
                    replayButton.addEventListener("click", replay);
                    replayButton.x = 100;
                    replayButton.y = 200;

                    gameOverContainer.addChild(gameOverBackground, winTxt, gameOverTxt);

                    if (!isLmsConnected) {
                        gameOverContainer.addChild(replayButton);
                    }

                    if (wasLmsConnected || navigator.userAgent.match(/Android/i)
                        || navigator.userAgent.match(/webOS/i)
                        || navigator.userAgent.match(/iPhone/i)
                        || navigator.userAgent.match(/iPad/i)
                        || navigator.userAgent.match(/iPod/i)
                        || navigator.userAgent.match(/BlackBerry/i)
                        || navigator.userAgent.match(/Windows Phone/i)
                    ) {
                        var quitTxt = new createjs.Text("Quit", "bold 24px Arial");
                        var quitButton = new createjs.Container();
                        quitButton.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0, 0, 200, 35));
                        quitButton.regX = 100;
                        quitButton.addChild(new createjs.Shape(new createjs.Graphics().setStrokeStyle(1).beginStroke("dark gray").beginFill("#FAC608").drawRoundRect(0, 0, 200, 35, 5).endFill()));
                        quitButton.shadow = new createjs.Shadow("gray", 3, 3, 5);
                        quitButton.addChild(quitTxt);
                        quitButton.addEventListener("click", quitCallback);
                        quitTxt.regX = quitTxt.getBounds().width / 2;
                        quitTxt.x = 100;
                        quitTxt.y = 3;
                        quitButton.x = 200;
                        quitButton.y = 200;
                        gameOverContainer.addChild(quitButton);
                    }

                    gameOverContainer.x = gameOverContainer.y = 130;

                    return gameOverContainer;

                }

                function replay() {
                    gameBoard = null;
                    addNumberOfPlayers();  //wow that was easy
                }

                $(window).bind('beforeunload', function () {
                    gameBoard.gameOver();
                })
                function submitScore(score) {
                    if (gameState.submitedScore)
                        return false;
                    gameState.submitedScore = true;

                    var url = gameData.leaderboardUrl;
                    if (url) {
                        var data = {
                            gameId: gameData.id,
                            score: score
                        };

                        $.ajax(url, {
                            type: "POST",
                            data: data,
                            success: function (x) { },
                            error: function (x, y, z) { }
                        });
                    }
                }

                function Player(number, board) {
                    this.board = board;
                    this.questionsAsked = 0
                    this.correctQuestions = 0;
                    var _location = -1;
                    Object.defineProperty(this, "location", {
                        get: function () { return _location; },
                        set: function (value) {
                            if (_location == -1) { _location = 0; value++; }
                            if (value > 52) value = 52;
                            var offsets = [{ x: -5, y: 0 }, { x: 5, y: 0 }, { x: 0, y: 15 }, { x: 5, y: 15 }];
                            var tween = createjs.Tween.get(this.animation)
                            for (var j = _location; j < value; j++) {
                                tween.to({
                                    x: this.board.pieces[j].boardPiece.x - 25 + offsets[this.number].x,
                                    y: this.board.pieces[j].boardPiece.y - 70 + offsets[this.number].y,
                                }, 200);
                            }
                            //bee done moving on board
                            tween.wait(20).call(function () {
                                var bee = board.currentPlayer.animation;
                                if (bee.x > 420 && bee.y < 200) {
                                    var gameOverBoard = this.board.gameOver();
                                    this.board.container.addChild(gameOverBoard);
                                }
                                else {
                                    if (gameState.gameOn) {
                                        board.spinner.showSpin();
                                        board.players.push(board.players.shift());
                                        board.currentPlayer = board.players[0];
                                    }
                                }
                            }, this, this);

                            _location = value;
                        }
                    });

                    this.number = number;

                    var colors = [queue.getResult("greenBee"), queue.getResult("redBee"), queue.getResult("yellowBee"), queue.getResult("purpleBee")];
                    var buzzes = [queue.getResult("buzz1"), queue.getResult("buzz2"), queue.getResult("buzz3"), queue.getResult("buzz4")];
                    var data = {
                        sounds: [buzzes[number]],
                        images: [colors[number]],
                        frames: { width: 50, height: 68 },
                        animations: { buzz: [0, 5], speed: .15 }
                    };
                    var spriteSheet = new createjs.SpriteSheet(data);
                    this.animation = new createjs.Sprite(spriteSheet, "buzz");
                    this.update();
                    //this.animation.speed = 200; //set fps lower to match desired speed
                    this.animation._animation.speed = .15 + (.01 * this.number);   // cant get speed to work any other way

                    this.animation.play();
                    board.container.addChild(this.animation);
                }
                Player.prototype.update = function (loc) {
                    var localLocation = loc ? loc : this.location;
                    //location updates
                    var offsets = [{ x: 0, y: 0 }, { x: 50, y: 20 }, { x: 0, y: 50 }, { x: 50, y: 70 }];
                    if (localLocation == -1) {
                        this.animation.x = 5 + offsets[this.number].x;
                        this.animation.y = 420 + offsets[this.number].y;
                    } else {
                        this.animation.x = this.board.pieces[localLocation].boardPiece.x - 25;
                        this.animation.y = this.board.pieces[localLocation].boardPiece.y - 70;
                    }
                }

                function TilePiece(x, y, board) {
                    this.boardPiece = new createjs.Bitmap(queue.getResult("comb"));
                    t = this.boardPiece.getBounds();
                    this.boardPiece.regX = t.width / 2;
                    this.boardPiece.regY = t.width / 2;
                    this.boardPiece.scaleX = this.boardPiece.scaleY = 0;
                    this.boardPiece.x = x;
                    this.boardPiece.y = y;
                    this.boardPiece.name = "comb";
                    this.nextPiece = null;
                    if (!board) {
                        return; //empty spot for winning behive spot
                    }
                    this.pos = board.pieces.length;
                    this.gameBoard = board;
                    // this.cale = this.callee;
                    this.gameBoard.container.addChild(this.boardPiece);
                    this.plop();


                }
                TilePiece.prototype.plop = function () {
                    createjs.Tween.get(this.boardPiece)
                        .wait(this.pos * 100)
                        .to({ scaleY: 1, scaleX: 1 }, 200).call(function () { createjs.Sound.play("pop" + Math.floor(Math.random() * (3 - 1) + 1)) })

                }
            }

        }

        function Spinner(board) {
            this.board = board;
            this.contain = new createjs.Container();
            this.bigComb = new createjs.Bitmap(queue.getResult("bigComb"));
            this.spinImg = new createjs.Bitmap(queue.getResult("spin"));
            var t = this.spinImg.getBounds();
            this.spinImg.regY = t.height / 2;
            this.spinImg.regX = t.width / 2;
            this.board.container.addChild(this.bigComb);
            this.contain.placeholder = this;
            this.board.container.addChild(this.contain);
            this.bigComb.x = 580;
            this.bigComb.y = 13;
            this.contain.hitArea = this.bigComb;
            this.showSpin();
            this.contain.on("click", this.click);
            this.spinVisible = true;
        }

        Spinner.prototype.spinNumber = function (evt) {
            if (!evt.target.parent) return;

            var t = evt.target.parent.placeholder;
            t.contain.removeChild(t.spinImg);
            t.spinVisible = false;
            var numbers = t.board.questions[0].spaceValue + " \n";
            for (var j = 0; j < 48; j++) {

                numbers = numbers + Math.floor(Math.random() * (49 - 1)) + " \n";
            }
            numbers = numbers + numbers + numbers;
            var test = new createjs.Text(numbers, "bold 60pt Arial");
            test.textAlign = "center";
            test.x = 685;
            test.y = -3000;
            var circleMask = new createjs.Shape();
            // the mask's position will be relative to the parent of its target:
            //circleMask.graphics.beginStroke("#FF0").setStrokeStyle(5).drawCircle(680, 100, 70); //line to see the clip circle
            circleMask.graphics.drawCircle(680, 100, 55);
            t.contain.addChild(circleMask);
            t.contain.addChild(test);
            test.mask = circleMask;
            createjs.Tween.get(test).to({ y: -1500 }, 1000).to({ y: -700 }, 1000).to({ y: -300 }, 1000).to({ y: 60 }, 1000).call(
                function () {
                    t.board.currentQuestion = new Question(t.board.questions.shift(), t.board);
                }
            );
        }
        Spinner.prototype.focus = function () {
            createjs.Tween.get(this.spinImg).to({ rotation: 10 }, 150).to({ rotation: 0 }, 100);
        }
        Spinner.prototype.click = function (event) {
            var t = event.currentTarget.placeholder;  //t = this 
            // options as object properties   
            if (t.spinVisible) {
                spinnerTick.play();
                createjs.Tween.get(t.spinImg).to({ rotation: 360, alpha: 0 }, 1000).to({ rotation: 0 }).call(t.spinNumber);
            }
        }

        function wait(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }

        Spinner.prototype.showSpin = function () {
            if (this.board.questions.length == 0) {

                var gameOverBoard = this.board.gameOver();
                this.board.container.addChild(gameOverBoard);
            } else {
                this.spinVisible = true;
                this.spinImg.id = "spin";
                this.spinImg.x = 680;
                this.spinImg.y = 100;
                this.spinImg.alpha = 1;
                this.contain.removeAllChildren();
                this.contain.addChild(this.spinImg);
                this.board.container.addChild(this.contain);
                this.focus();
            }

        }

        function Question(question, gameBoard) {

            if (isLmsConnected) {
                currentLmsInteraction = ScormHelper.cmi.interactions().new();
                currentLmsInteraction.id = question.Id;
                currentLmsInteraction.type = ScormHelper.interactions.choice;
                currentLmsInteraction.description = "Question (" + (gameData.Questions.length - gameBoard.questions.length) + "/" + gameData.Questions.length + ")\n\n" + question.Text;
            }

            spinnerTick.stop();
            //createjs.Sound.play("spinnerBell");
            spinnerBell.play();
            this.x = 560;
            this.gameBoard = gameBoard;
            this.y = 185;
            this.width = 190;
            this.questionFont = "14pt Arial Black";
            this.answerFont = "12pt Arial Black";
            this.answered = false;
            this.question = question;
            this.contain = new createjs.Container();
            this.questionText = new createjs.Text("Question (" + (gameData.Questions.length - gameBoard.questions.length) + "/" + gameData.Questions.length + ")\n\n" + question.Text, this.questionFont);

            // question overflow
            if (this.questionText.text.length > 50) {

                this.questionText.font = "10pt Arial Black";
            }

            this.questionText.x = this.x + 20;
            this.questionText.y = this.y;
            this.questionText.lineWidth = this.width;
            this.answers = [];
            var currentY = this.questionText.y + this.questionText.getMeasuredHeight() + 35;
            this.contain.addChild(this.questionText);
            this.correctAnswer = null
            for (var j = 0; j < question.Answers.length; j++) {
                var a = new createjs.Text(question.Answers[j].Text, this.questionFont);
                // answer overflow
                if (a.text.length > 20 && a.text.length < 40) {
                    a.font = "10pt Arial Black";
                }
                else if (a.text.length > 40) {
                    a.font = "8pt Arial Black";
                }

                a.y = currentY - 20;
                a.x = this.x + 20;
                a.lineWidth = this.width - 20;
                a.maxWidth = this.width - 20;
                currentY += 15 + a.getMeasuredHeight();
                this.answers.push(a);

                var bg = new createjs.Shape();
                bg.graphics.beginFill("powderblue");
                bg.graphics.drawRoundRect(a.x - 4, a.y - 4, this.width, a.getMeasuredHeight() + 8, 8);
                bg.shadow = standardTextShadow;
                bg.id = "Answer" + j;
                var answerContainer = new createjs.Container();
                answerContainer.correct = question.Answers[j].IsCorrect;
                answerContainer.click = question.Answers[j].click;
                if (answerContainer.correct)
                    this.correctAnswer = answerContainer;

                answerContainer.text = a;
                answerContainer.question = question;
                answerContainer.gameBoard = this.gameBoard;
                a.hitArea = bg;
                answerContainer.addChild(bg);
                answerContainer.addChild(a);
                this.contain.addChild(answerContainer);
                this.gameBoard.container.addChild(this.contain);

                function changeBGcolor(evtContainer, color) {

                    var oldbox = evtContainer.children[0];
                    var a = evtContainer.text;
                    evtContainer.removeChild(oldbox);
                    evtContainer.removeChild(a);
                    var bg = new createjs.Shape();
                    bg.graphics.beginFill(color);
                    bg.graphics.drawRoundRect(a.x - 8, a.y - 4, a.lineWidth + 20, a.getMeasuredHeight() + 8, 8);
                    bg.shadow = standardTextShadow;
                    evtContainer.addChild(bg);
                    evtContainer.addChild(a);
                }
                answerContainer.addEventListener("click", function (evt) {
                    var board = evt.currentTarget.gameBoard;
                    if (evt.currentTarget.click) {
                        evt.currentTarget.click();
                        return;
                    }
                    if (board.currentQuestion.answered) {
                        board.spinner.focus();
                        return;
                    }
                    board.currentQuestion.answered = true;

                    if (currentLmsInteraction != null) {
                        currentLmsInteraction.result = evt.currentTarget.correct ? ScormHelper.results.correct : ScormHelper.results.incorrect;
                        currentLmsInteraction.learnerResponse = evt.currentTarget.text.text;

                        currentLmsInteraction.save();
                        currentLmsInteraction = null;
                    }

                    //add feedback

                    if (board.currentQuestion.question.Feedback) {
                        var a = new createjs.Text(board.currentQuestion.question.Feedback, "Bold 14pt Arial");
                        a.lineWidth = 300;
                        a.maxWidth = 300;
                        a.x = 100;
                        a.y = 60;
                        var bg = new createjs.Shape();
                        bg.graphics.beginFill("white");
                        bg.graphics.drawRoundRect(a.x - 8, a.y - 4, 400, a.getMeasuredHeight() + 8, 8);
                        bg.shadow = standardTextShadow;
                        board.currentQuestion.contain.addChild(bg, a);
                    }
                    if (evt.currentTarget.correct) {

                        var a = new createjs.Text("Correct!", "Bold 14pt Arial");
                        a.lineWidth = 300;
                        a.maxWidth = 300;
                        a.x = 250;
                        a.y = 20;
                        var bg = new createjs.Shape();
                        bg.graphics.beginFill("white");
                        bg.graphics.drawRoundRect(a.x - 8, a.y - 4, 90, a.getMeasuredHeight() + 8, 8);
                        bg.shadow = standardTextShadow;
                        board.currentQuestion.contain.addChild(bg, a);

                        changeBGcolor(evt.currentTarget, "green");
                        evt.currentTarget.gameBoard.currentPlayer.location = evt.currentTarget.gameBoard.currentPlayer.location + evt.currentTarget.question.spaceValue;

                        buzz = createjs.Sound.createInstance("beeBuzz");
                        buzz.play({ offset: 0, loop: 0, pan: 0 });
                        //

                        board.currentPlayer.correctQuestions++;
                    } else {
                        var a = new createjs.Text("Incorrect", "Bold 14pt Arial");
                        a.lineWidth = 300;
                        a.maxWidth = 300;
                        a.x = 250;
                        a.y = 20;
                        var bg = new createjs.Shape();
                        bg.graphics.beginFill("white");
                        bg.graphics.drawRoundRect(a.x - 8, a.y - 4, 96, a.getMeasuredHeight() + 8, 8);
                        bg.shadow = standardTextShadow;
                        board.currentQuestion.contain.addChild(bg, a);

                        changeBGcolor(evt.currentTarget, "red");
                        if (board.currentQuestion.correctAnswer)
                            changeBGcolor(board.currentQuestion.correctAnswer, "green");
                        if (gameState.gameOn) {
                            board.spinner.showSpin();
                            board.players.push(board.players.shift());
                            board.currentPlayer = board.players[0];
                        }
                    }
                });
            }


        }
        function addSoundControl(container) {
            var soundContainer = new createjs.Container();
            soundContainer.x = 0;
            soundContainer.y = 0;
            soundContainer.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#F00").drawCircle(0, 50, 50));
            soundContainer.cursor = 'pointer';
            var sound = new createjs.Bitmap(queue.getResult(gameState.musicOn ? "musicOn" : "musicOff"));
            sound.name = "music"
            soundContainer.addChild(sound);
            createjs.Sound.setMute(!gameState.musicOn);
            container.addChild(soundContainer);
            soundContainer.addEventListener("click", function (evt) {
                gameState.musicOn = !gameState.musicOn;
                var sound = new createjs.Bitmap(queue.getResult(gameState.musicOn ? "musicOn" : "musicOff"));
                sound.name = "music"
                //sound.scaleX = .75;
                //sound.scaleY = .75;
                var destroy = evt.currentTarget.getChildByName("music");
                evt.currentTarget.removeChild(destroy);
                evt.currentTarget.addChild(sound);
                createjs.Sound.setMute(!gameState.musicOn);
            });
        }

    }
    return Game;
})(createjs, $);
