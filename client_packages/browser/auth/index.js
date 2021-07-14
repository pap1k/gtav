const inp = document.getElementById("pass")
const inp2 = document.getElementById("pass_2")

const govno = function(e){
    if(e.key == "Enter"){
        if(inp2)
            reg()
        else
            login()
        return
    }
    if(!/[A-Za-z0-9]/.test(e.key)){
        e.preventDefault()
    }
}

inp.addEventListener("keydown", govno)
inp2.addEventListener("keydown", govno)
mp.events.add('showPassError'), txt => {
    alert(txt)
    inp.value = ""
}

function login(){
    if(inp.value.length > 4){
        mp.trigger('sendLogin', JSON.stringify({pass: inp.value}))
    }
}
function reg(){
    if(inp.value.length > 4 && inp.value == inp2.value){
        mp.trigger('sendReg', JSON.stringify({pass1: inp.value, pass2: inp2.value}))
    }
    else{
        showError()
    }
}
function showError(){
    alert("БЛЯТЬ Ошибка")
}