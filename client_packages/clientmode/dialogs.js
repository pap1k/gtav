const STYLES = {
    1: "table"
}
let browser

mp.events.add("showDialog", (style, data) => {
    data = JSON.parse(data)
    if(STYLES[style]){
        setTimeout(()=>{
            mp.gui.cursor.show(true, true)
        }, 0)
        browser = mp.browsers.new('package://browser/dialog/dialog'+STYLES[style]+'.html')
        browser.execute('fillTitle('+data.title+')')
        browser.execute('fillData('+data.data+')')
    }
})

mp.events.add("closeDialog", () => {
    browser.destroy()
})