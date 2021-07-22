const STYLES = {
    1: "table"
}
let browser

mp.events.add("showDialog", (style, title, data) => {
    if(STYLES[style]){
        browser = mp.browsers.new('package://browser/dialog/dialog_'+STYLES[style]+'.html')
        browser.execute("mp.invoke('focus', true)");
        browser.execute(`fillTitle('${title}')`)
        browser.execute(`fillData('${data}')`)
    }
})

mp.events.add("closeDialog", () => {
    if(browser){
        mp.gui.cursor.show(false, false)
        browser.destroy()
        browser = null
    }
    
})