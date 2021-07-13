let browser
mp.events.add('showLogin', ()=>{
    browser = mp.browsers.new("package://browser/auth/login.html")
    mp.gui.chat.activate(false)
    setTimeout(()=>{
        mp.gui.cursor.show(true, true)
    }, 0)
})
mp.events.add('showReg', ()=>{
    browser = mp.browsers.new("package://browser/auth/reg.html")
    mp.gui.chat.activate(false)
    setTimeout(()=>{
        mp.gui.cursor.show(true, true)
    }, 0)
})

mp.events.add('sendLogin', data =>{
    mp.events.callRemote('onPlayerLogin', data)
})

mp.events.add('sendReg', data =>{
    mp.events.callRemote('onPlayerRegister', data)
})

mp.events.add('hideAllBrowsers', ()=> {
    mp.gui.cursor.show(false, false)
    mp.gui.chat.activate(true)
    browser.destroy()
})