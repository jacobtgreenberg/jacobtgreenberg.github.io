$(()=> {

$('#disco').on('click', ()=> {
    
    $('body').css('background-color','yellow')
    $('a').css('color','blue')
    setTimeout(()=>$('body').css('background-color','red'), 300)
    setTimeout(()=>$('body').css('background-color','yellow'), 600)
    setTimeout(()=>$('body').css('background-color','red'), 900)
    setTimeout(()=>$('body').css('background-color','yellow'), 1200)
    setTimeout(()=>$('body').css('background-color','red'), 1500)
    setTimeout(()=>$('body').css('background-color','yellow'), 1800)
    setTimeout(()=>$('body').css('background-color','red'), 2100)
    setTimeout(()=>$('body').css('background-color','yellow'), 2400)
    setTimeout(()=>$('body').css('background-color','white'), 2700)
    setTimeout(()=>$('a').css('color', 'lightseagreen'), 2700)
    
   
})


})