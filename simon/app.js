$(()  => {

    let computerArray = [];
    let playerArray = [];
    let clickCounter = 0;
    let score = 0;
    let start;
    let playerUnclick = false;
    let freestyleMode = false;
    let begin;
    
    function toggleC(call, color, sound){
        $(call).toggleClass(color + 'Lit')
         setTimeout(() => {
             $(call).toggleClass(color + 'Lit')
         }, 400)
         $(sound).get(0).play()
    }
    
    function lightRandomColor() {
        const randomIndex = Math.ceil(Math.random() * 4)
        if(randomIndex === 1){
            toggleC('.red', 'red', '#ding')
            computerArray.push(1)
        }else if(randomIndex === 2){
            toggleC('.blue', 'blue', '#bleep')
            computerArray.push(2)
        }else if(randomIndex === 3){
            toggleC('.yellow', 'yellow', '#ping')
            computerArray.push(3)
        }else if(randomIndex === 4){
            toggleC('.green', 'green', '#beep')
            computerArray.push(4)
        }
    }

    function repeatIntro() {
        start = setInterval( () =>  {
            if(computerArray[0] === 1){
                toggleC('.red', 'red', '#ding')
            }else if(computerArray[0] === 2){
                toggleC('.blue', 'blue', '#bleep')
            }else if(computerArray[0] === 3){
                toggleC('.yellow', 'yellow', '#ping')
            }else if(computerArray[0] === 4){
                toggleC('.green', 'green', '#beep')
            }
        }   
        , 4000)
    }
    
    function stopRepeat() {
        clearInterval(start)
    }

    function loopThroughComputerArray() {
        let counter = 0;
        playerUnclick = true;
        begin = setInterval( () =>  {
            if(computerArray[counter] === 1){
                toggleC('.red', 'red', '#ding')
            }else if(computerArray[counter] === 2){
                toggleC('.blue', 'blue', '#bleep')
            }else if(computerArray[counter] === 3){
                toggleC('.yellow', 'yellow', '#ping')
            }else if(computerArray[counter] === 4){
                toggleC('.green', 'green', '#beep')
            }else{
                lightRandomColor();
                playerUnclick = false
                clearInterval(begin);             
            }
            counter++
        }   
        , 600)
    }

    function toggle (event, color, number, sound) {
        if(playerUnclick == true){
            return
        }
        $(event.target).toggleClass(color + 'Lit')
        setTimeout(() => {
            $(event.target).toggleClass(color + 'Lit')
        }, 400)
        if(freestyleMode == true){
            $(sound).get(0).play()
            return
        }
        playerArray.push(number)
        if(computerArray[clickCounter] === playerArray[clickCounter]){
            $(sound).get(0).play();
            clickCounter++;
            if(clickCounter === computerArray.length){              
                clickCounter = 0
                playerArray = []
                score = computerArray.length 
                $('.score').text(score)
                setTimeout(loopThroughComputerArray, 900)
            }
        }else{
            $('#wrong').get(0).play()
            clearInterval(begin)
            computerArray = []
            playerArray = []
            clickCounter = 0
            $('.score').empty()
            if(score > $('#hi_score').text()){
                $('#hi_score').text(score)
            }
            setTimeout(lightRandomColor, 1300)
            setTimeout(repeatIntro, 1300)
        }
        
    }

    $('.red').on('click', () => toggle(event, 'red', 1, '#ding'))
    $('.blue').on('click', () => toggle(event, 'blue', 2, '#bleep'))
    $('.yellow').on('click', () => toggle(event,'yellow', 3, '#ping'))
    $('.green').on('click', () => toggle(event,'green', 4, '#beep'))

    $('.red').on('click', stopRepeat)
    $('.blue').on('click', stopRepeat)
    $('.yellow').on('click', stopRepeat)
    $('.green').on('click', stopRepeat)

    $('.score').on('click', () => {
        if(freestyleMode == false){
            return
        }        
        $('#wrong').get(0).play()
    })

    $('.freestyle').on('click', () => {
        if(freestyleMode == false){
            playerUnclick = false
            freestyleMode = true
            clearInterval(begin)
            $('.score').empty()
            $('#hi_score').empty()
            computerArray = []
            playerArray = []
            clickCounter = 0
            $('.freestyle').text('new game')
            $('.score').text(0)
            $('.score').toggleClass('fscore')
        }else{
            freestyleMode = false
            $('.score').empty()
            $('.score').toggleClass('fscore')
            setTimeout(lightRandomColor, 1000)
            setTimeout(repeatIntro, 1000)
            $('.freestyle').text('freestyle')
        }
    })


    setTimeout(lightRandomColor, 1000)
    setTimeout(repeatIntro, 1000)

   
    })