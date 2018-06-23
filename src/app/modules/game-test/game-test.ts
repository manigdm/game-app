import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'game-manage',
  templateUrl: './game-test.html',
  styleUrls: ['./game-test.css'],
  providers: []
})

export class GameComponent implements OnInit {
	game:any={};
	gameLevels:any;
	timeLeft:number;
	timerNum:any;
	gameEasy:any;
	gameMedium:any;
	countIteration:number = 0;
	highScore:any;
    constructor() {
    	this.gameLevels = [{"value":"1","label":"Easy"},{"value":"2","label":"Medium"},{"value":"3","label":"Hard"}];
    	this.gameEasy = [
			{"id":"1","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"2","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"3","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"4","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"5","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"6","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"7","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"8","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"9","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false}
    	]
    	this.gameMedium = [{"id":"1","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"2","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"3","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"4","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"5","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"6","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"7","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"8","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"9","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"10","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"11","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"12","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"13","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"14","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"14","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false},
			{"id":"15","score":[{"slug":"Score","value":"0"}],"highscore":[{"slug":"High Score","value":"0"}],"active":false}
		];
    	this.timeLeft = 60;
    	this.game['level'] = 'Easy';
    	if(localStorage.getItem('levelObj') != undefined && localStorage.getItem('levelObj') != null){
    		this.gameEasy = JSON.parse(localStorage.getItem('levelObj'));
    		this.countdown();
			this.timerNum = setInterval(() => {
			    this.countdown(); 
			}, 1000);
    	}
    	if(localStorage.getItem('timerObj') != undefined && localStorage.getItem('timerObj') != null){
    		this.timeLeft = JSON.parse(localStorage.getItem('timerObj'));
    	}
    }

    ngOnInit() {
    	this.highScore = {};
		this.highScore[this.game['level']] = [];
	}

    startGame(){
    	this.countdown();
		this.timerNum = setInterval(() => {
		    this.countdown(); 
		}, 1000);
    }

	countdown() {
	  	if (this.timeLeft == 0) {
	    	clearTimeout(this.timerNum);
	    	this.getReStartConfirmation();
	  	}else {
	  		this.countIteration ++;
	  	if(this.countIteration == 10){
	  		this.countIteration = 0;
	  	}

	  	if(this.game['level'] == 'Easy'){
				this.checkEasyActiveBox(this.countIteration);
			}else if(this.game['level'] == 'Medium'){
				this.checkMediumActiveBox(this.countIteration);
			}
	    this.timeLeft--;
	  	}
	}

	onSelectLevel(){
		localStorage.clear();
	}

	checkEasyActiveBox(countIteration,){
		this.gameEasy.forEach((element, index) => {
            if(countIteration == element.id){
                this.gameEasy[index].active = true;
            }else{
            	this.gameEasy[index].active = false;
            }
        })
	}
	checkMediumActiveBox(countIteration,){
		this.gameMedium.forEach((element, index) => {
            if(countIteration == element.id){
                this.gameMedium[index].active = true;
            }else{
            	this.gameMedium[index].active = false;
            }
        })
	}

	onCheckScore(gameLevel){
		if(gameLevel.active){
			gameLevel.score[0].value = parseInt(gameLevel.score[0].value) + 1;
		}else{
			gameLevel.score[0].value = parseInt(gameLevel.score[0].value) - 1;
		}
		if(gameLevel.score[0].value > gameLevel.highscore[0].value){
			gameLevel.highscore[0].value = gameLevel.score[0].value;
			if(this.game['level'] == 'Easy'){
				localStorage.setItem('levelObj', JSON.stringify(this.gameMedium));
			}else if(this.game['level'] == 'Medium'){
				localStorage.setItem('levelObj', JSON.stringify(this.gameEasy));
			}	
			localStorage.setItem('timerObj', JSON.stringify(this.timeLeft)); 
		}
	}

	reStart(){
		localStorage.clear();
		this.timeLeft = 60;
		this.countdown();
		this.timerNum = setInterval(() => {
		    this.countdown(); 
		}, 1000);
	}

	getReStartConfirmation(){
        var retVal = confirm("Game Over !!! Do you want to continue ?");
        if( retVal == true ){
        	this.reStart();
            return true;
        }
        else{
            return false;
        }
    }

}
