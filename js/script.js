const jogo_da_velha = {
  //Array para costruir um tabuleiro, com nove opções
  board: [ '','','','','','','','','', ],
  //Array simbolos utlizados no jogo
  simbols: {
    options:['X', 'O'],
    turn_index: 0,
    change: function(){
      this.turn_index = (this.turn_index === 0 ? 1 : 0);
    }
  },

  container_element: null,
  gameover: false,
  // Verificando as sequencias vencedoras
  winnig_sequences: [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
  ],

  init: function(container){
    this.container_element = container;
  },

  make_play: function(position){
    if (this.gameover) return false;
    //Verificar se a casa esta vazia, para proceguir na jogada
    if (this.board[position] === ''){
        this.board[position] = this.simbols.options [ this.simbols.turn_index ];
        this.draw();
        let winnig_sequences_index = this.check_wiring_sequences ( this.simbols.options[ this.simbols.turn_index ] );
        if(winnig_sequences_index >= 0){
           this.game_is_over();

        }else{
          this.simbols.change();
        }
        return true;
      } else {
        return false;
      }
  },

  game_is_over: function(){
    this.gameover = true;
    console.log("GAME OVER");
  },

  start: function(){
    this.board.fill('');
    this.draw();
    this.gameover = false;
  },

  // Verificar sequencia vencedora
  check_wiring_sequences: function(simbol){
    for ( i in this.winnig_sequences){
      if(this.board [ this.winnig_sequences [i][0] ] == simbol &&
         this.board [ this.winnig_sequences [i][1] ] == simbol &&
         this.board [ this.winnig_sequences [i][2] ] == simbol){
           console.log('Sequencia vencedora: ' +i);
           return i;
           
         }
    };

    return -1;
  },

  draw: function(){
    let content = '';

    for (i in this.board) {
      content += '<div onclick="jogo_da_velha.make_play('+ i +')">' + this.board[i] + '</div>';

      this.container_element.innerHTML = content;
    }

  }

};