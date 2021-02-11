
$(() => {

let score=0
let categories = ["fish" , "music" , "miscellaneous", "science", "vacation spots"]
let value = ["$100" , "$200", "$300", "$400", "$500"]
let question = [
    ["What is the most popular fish?", "What is flounder?","How can you cook eel?","What is a group of fish called?","Where do fish live?"],
    ["Who is Beethoven?" , "How many sharps are in the key of g?", "Which of the following is a musical genre?", "Which of the following is a string instrument?", "What instrument did John Coltrane play?"],
    ["What is Antartica?" , "Which of the following is a computer coding language?" , "What do people wear on their legs?", "Which of the following can fly?", "What is 80 divided by 5?"],
    ["When water freezes what does it turn into?","Who  discovered the theory of relativity?", "What is the science of living things?", "What is the second planet from the sun?","Which particle has a positive charge?"],
    ["Italy is in which continent?", "What alcoholic drink is made with coconut?", "In America what country is referred to as 'South of the Border'?","A popular winter passtime that is cross-country or downhill.","A Caribbean island."]
]
let answers = [

    [ //this is the fish array
        [{name: "Flounder", value: false},{name:"Trout", value: false},{name:"Bass", value:true},{name:"Fluke",value: false}],
        [{name: "A fish" , value: true}, {name: "A reptile", value: false},{name: "A bird" , value: false},{name: "A mammal", value: false}],
        [{name: "You can't" , value: false}, {name: "Sautee", value: true}, {name: "With sand", value:false}, {name: "It is self-cooking", value: false}],
        [{name: "A corporation" , value: false}, {name: "A flock", value: false}, {name: "A herd", value: false}, {name: "A school", value: true}],
        [{name: "The sky", value: false}, {name: "Extraterrestrial", value: false}, {name: "Water", value: true}, {name: "On land", value: false}]
    ],

    [//this is the music array
        [{name: "A composer", value: true},{name:"An architect", value: false},{name:"Fictional", value:false},{name: "A former president", value: false}],
        [{name: "1" , value: false}, {name: "2", value: true},{name: "It depends" , value: false}, {name: "6", value: false}],
        [{name: "Baseball" , value: false}, {name: "Hunting", value: false}, {name: "Cars", value:false}, {name: "Jazz", value: true}],
        [{name: "Tuba", value: false}, {name: "Violin", value: true}, {name: "Drums", value: false},{name: "BMW", value: false}],
        [{name: "Saxophone", value: true}, {name: "Guitar", value: false}, {name: "Bagpipes", value: false},{name: "Cello", value: false}]
    ],

    [//this is the miscellaneous array
        [{name: "A planet", value: false},{name:"An ocean", value: false},{name:"A continent", value:true}, {name:"A cuisine", value: false}],
        [{name: "Javascript" , value: true}, {name: "Chinese", value: false},{name: "Excel" , value: false}, {name: "Laptop", value: false}],
        [{name: "Pants" , value: true}, {name: "Sweatshirts", value: false}, {name: "Hats", value:false}, {name: "gloves", value: false}],
        [{name: "Elephants", value: false}, {name: "Kangaroos", value: false}, {name: "Birds", value: true}, {name: "Lizards", value: false}],
        [{name: "6", value: false}, {name: "16", value: true}, {name: "24", value: false}, {name: "10", value: false}]
    ],

    [//Science
        [{name: "Steam", value: false},{name:"Pure carbon", value: false},{name:"Ice", value:true}, {name:"Lava", value: false}],
        [{name: "Albert Einstein" , value: true}, {name: "Galileo Galilei", value: false},{name: "Nicolaus Copernicus" , value: false}, {name: "Stephen Hawking", value: false}],
        [{name: "Biology" , value: true}, {name: "Physics", value: false}, {name: "Chemistry", value:false}, {name: "Geology", value: false}],
        [{name: "Earth", value: false}, {name: "Pluto", value: false}, {name: "Venus", value: true}, {name: "Jupiter", value: false}],
        [{name: "Neutron", value: false}, {name: "Proton", value: true}, {name: "Electron", value: false}, {name: "Marbles", value: false}]
    ],

    [//Vacation Spots
        [{name: "Africa", value: false},{name:"North America", value: false},{name:"Europe", value:true}, {name:"Asia", value: false}],
        [{name: "Pina Colada" , value: true}, {name: "Daquiri", value: false},{name: "Mojito" , value: false}, {name: "Wine", value: false}],
        [{name: "Mexico" , value: true}, {name: "Canada", value: false}, {name: "Peru", value:false}, {name: "France", value: false}],
        [{name: "What is tennis?", value: false}, {name: "What is ping-pong?", value: false}, {name: "What is skiing?", value: true}, {name: "What is drag racing?", value: false}],
        [{name: "What is Japan?", value: false}, {name: "What is Jamaica?", value: true}, {name: "What is Utah?", value: false}, {name: "What is Madagascar?", value: false}]
    ]
]






function display(i,event,k) {
    if($(event.target).attr('class') == 'square stop'){
        return
    }
    $(event.target).css('color', 'blue')
    $(event.target).css('text-shadow', '3px 3px #0000FF')
    $(event.target).addClass('stop')
    $('.modal').css('display','block')
    const $div = $('<div>').text(question[k][i].toUpperCase()).addClass('question')
    const $ul = $('<ul>').addClass('qList')
    
    for(let j = 0; j < answers[k][i].length; j++){
        const $li = $('<li>').text(answers[k][i][j].name.toUpperCase())
        $li.on('click',() => checkAnswer(i,j,k))
        $ul.append($li)
    }
    $('.text_box').append($div)
    $('.text_box').append($ul)

}

let clickOut = false


function checkAnswer(i,j,k) {
    let scoreValue = parseInt(value[i].replace('$',""))
    $('.text_box').toggleClass('result')
    setTimeout(() => clickOut = true, 500)
    if(answers[k][i][j].value == true){ 
        $('.text_box').empty()
        $('.text_box').text("CORRECT!").css('font-size','70px')
        score += scoreValue
        $('.score').text(score)
        
    }else{
        $('.text_box').text("I'M SORRY THE CORRECT ANSWER WAS " + correctAnswer(k, i).toUpperCase()).css('font-size','35px')
        score -= scoreValue
        $('.score').text(score)
        
    }
}

function correctAnswer(k, i) {
    for(object of answers[k][i]){
        if(object.value == true){
            return object.name
        } 
    }
}

$('.modal').on('click', closeModal)

function closeModal() {
    if(clickOut == false){
        return
    }
    $('.text_box').css('font-size','25px')
    $('.modal').css('display','none')
    $('.text_box').toggleClass('result')
    $('.text_box').empty()
    clickOut = false
}

for(let k = 0; k < categories.length; k++){
    const $column = $('<div>').addClass('column')
    const $title = $('<div>').addClass('square').addClass('title').attr('id', categories[k].replace(" ",""))
    $title.text(categories[k].toUpperCase())
    const $ul = $('<ul>')
    $('.container').append($column)
    $column.append($title)
    $column.append($ul)
    
    for(let i = 0; i < value.length; i++){
        const $square = $('<li>').text(value[i]).addClass('square')
        $square.on('click', () => display(i,event,k))
        $($ul).append($square)
        
    }

}






















})