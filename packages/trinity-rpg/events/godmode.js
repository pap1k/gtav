mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    if(targetEntity.getVariable("agm"))
        return damage = 0
})