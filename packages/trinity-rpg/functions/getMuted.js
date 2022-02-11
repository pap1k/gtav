module.exports ={
    isMuted: (p) => {
        const v = p.getVariable('muted')
        if(v){
            const t = (v.muteTimeStamp+v.muteDuration)-Date.now()
            if(t <= 0){
                p.setVariable('muted', false)
                return false
            }
            p.outputChatBox(`У вас мут еще ${t} мс. выданный по причине ${v.reason}`)
            return true
        }
        return false
    }
} 