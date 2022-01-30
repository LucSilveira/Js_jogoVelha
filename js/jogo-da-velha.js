const jogo_da_velha = {

    campo_jogo : ['', '', '', '', '', '', '', '', ''],
    simbolos : {
        opcoes : ['X', 'O'],
        trocar_jogador : 0,
        trocar : function(){
            this.trocar_jogador = (this.trocar_jogador === 0 ? 1 : 0)
        }
    },
    container_element : null,
    game_over : false,
    sequencia_vencedora : [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ],


    iniciar_partida : function(container){
        this.container_element = container
    },

    draw : function(){
        let content = '';

        for(i in this.campo_jogo){
            content += '<div onclick="jogo_da_velha.criar_jogada(' + i + ')">' + this.campo_jogo[i] + '</div>'
        }

        this.container_element.innerHTML = content;
    },

    criar_jogada : function(position){
        if(this.game_over) return false;

        if(this.campo_jogo[position] === ''){
            this.campo_jogo[position] = this.simbolos.opcoes[this.simbolos.trocar_jogador]
            this.draw()
            let index_sequencia_vencedora = this.checagem_de_vitoria(this.simbolos.opcoes[this.simbolos.trocar_jogador])

            if(index_sequencia_vencedora >= 0){
                this.fim_de_jogo()
            }else{
                this.simbolos.trocar()
            }
            return true;
        }else{
            return false;
        }
    },

    checagem_de_vitoria : function(simbolo){
        for( i in this.sequencia_vencedora){
            if(this.campo_jogo[this.sequencia_vencedora[i][0]] == simbolo &&
                this.campo_jogo[this.sequencia_vencedora[i][1]] == simbolo &&
                this.campo_jogo[this.sequencia_vencedora[i][2]] == simbolo){
                    return i;
                }
        }
        return -1;
    },

    fim_de_jogo : function(){
        this.game_over = true;
        alert('Fim de jogo')
    },

    iniciar : function(){
        this.campo_jogo.fill('');
        this.draw();
        this.game_over = false;
    },

    jogo_acabou : function(){
        return !this.campo_jogo.includes('');
    },

    recomecar : function(){
        if(this.jogo_acabou || this.fim_de_jogo){
            this.iniciar();
        }
    }
};