let browser
mp.events.add('showLogin', ()=>{
    browser = mp.browsers.new("package://browser/auth/login.html")
    mp.gui.chat.activate(false)
    setTimeOut(()=>{browser.execute("mp.invoke('focus', true)")}, 500)
})
mp.events.add('showReg', ()=>{
    browser = mp.browsers.new("package://browser/auth/reg.html")
})

mp.events.add('sendLogin', (data)=>{
    mp.events.callRemote('onPlayerLogin', data)
})

mp.events.add('sendReg', (data)=>{
    mp.events.callRemote('onPlayerRegister', data)
})