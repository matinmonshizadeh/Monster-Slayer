function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}


const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            healCounter: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%' };
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%' };
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },
        mayUseHeal(){
            return this.healCounter > 2;
        },
        roundCounter(){
            return {marginRight: '40%', borderRadius: '40%', border: 'solid', borderColor: "black", backgroundColor: 'black', color: 'white'};
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'player';
            }
        }

    },
    methods: {
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.healCounter = 0
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster(){
            this.currentRound++;

            // attack damage between 5 and 12
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage(this.currentRound, 'player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer(){

            // attack damage between 10 and 15
            const attackValue = getRandomValue(10, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage(this.currentRound, 'monster', 'attack', attackValue);
        },
        specialAttackMonster(){
            this.currentRound++;

            // attack damage between 10 and 25
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage(this.currentRound, 'player', 'special-attack', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            this.healCounter++;

            // heal player between 8 and 20
            const healValue = getRandomValue(8, 20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.addLogMessage(this.currentRound, 'player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(round, who, what, value){
            this.logMessages.unshift({
                actionRound: round,
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount("#game");