
$(() => {

        const wordBank = [
            ["f", "i", "s", "h"],
            ["s","w","o","r","d"],
            ["o","c","t","o","p","u","s"],
            ["v","e","g","e","t","a","b","l","e"],
            ["p","r","o","g","r","a","m","m","e","r"],
            ["y","e","s","t","e","r","d","a","y"],
            ["s","w","a","l","l","o","w"],
            ["p","e","r","s","i","s","t","e","n","c","e"],
            ["s","t","u","d","e","n","t"]
        ]

        let word = []
        const alphabet = ["a", "b", "c", "d", "e", "f", "g","h","i", "j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        let strikes = 0
        let lettersCorrect = 0
        let $chosenWord
        let playerCanClick = true


        //Grabs a word at random from word list
        function pickWord() {
            const $randomIndex = Math.floor(Math.random() * wordBank.length)
            $chosenWord = wordBank[$randomIndex]         
             for(letter of $chosenWord){
                 word.push(letter)
             }
        }

        //Creates blank tiles for each of the chosen word's letters
        function setWord() {
            for(letter of word){
                const $div = $('<div>').text(letter).addClass('current')
                $('#container').append($div)
            }
        }

        //Populates board with letter buttons
        function setAlphabet() {
            for(letter of alphabet ){
                const $div = $('<div>').text(letter).addClass('omega')
                $('#alpha').append($div)
                $div.on('click', checkWord)
            }
        }

        //Removes chosen word from the original list so it can't be picked again
        function removeWord(){
            let wordToRemove = wordBank.indexOf($chosenWord)
            wordBank.splice(wordToRemove, 1)
        }

        //Creates a button to enter reset state
        function playAgain() {
            const $div = $('<div>').addClass('replay')
            $div.text('Play Again')
            $('body').append($div)
            for(child of $('#container').children()){
                $(child).css('color','black')
            }
            $div.on('click' , (e) => {
                playerCanClick = true
                $('#alpha').empty()
                $('#container').empty()
                $(e.target).remove()
                $('#chances').empty()
                word = []
                removeWord()
                setAlphabet()
                pickWord()
                setWord()
                lettersCorrect = 0
                strikes = 0               
            })
        }

        //Function to populate blanks and check for win-state if player chooses correct letter
        function letterCorrect(e) {
            for(child of $('#container').children()){
                if($(child).text() == $(e.target).text()){
                    $(child).css('color','black')
                    lettersCorrect++
                    if(lettersCorrect == word.length){
                        $('#chances').text("You got the word!")
                        playerCanClick = false
                        $('.omega').toggleClass('temp')
                        playAgain()
                    }
                }
            }
        }

        //Function for incorrect letter choice, checks for lose-state
        function letterIncorrect() {
            if(strikes == 1){
                $('#chances').text(strikes + " strike")
            }else if(strikes == 6){
                $('#chances').text("Ya lose.")
                playerCanClick = false
                $('.omega').toggleClass('temp')
                playAgain()
            }
            else{
                $('#chances').text(strikes + " strikes")
            }
        }

        //Function to determine whether chosen letter is correct or incorrect
        function checkWord(e){
            const $chosen = $(e.target).text()
            if(playerCanClick == false){
                return
            }
            if(word.includes($chosen)){
                $(e.target).remove()
                letterCorrect(e)
            }else{
                $(e.target).remove()
                strikes++;
                letterIncorrect()
            }   
        }

        //Clears opening screen and begins the game
        $("#start_game").on('click', (e) => {
            const $container = $('<div>').attr('id','container')
            $('body').append($container)
            const $alpha = $('<div>').attr('id','alpha')
            $('body').append($alpha)
            const $chances = $('<div>').attr('id','chances')
            $('body').append($chances)
            $('p').remove()
            $(e.target).remove()
            setAlphabet()
            pickWord()
            setWord()
        })

})