mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    console.log(targetEntity.getVariable("agm"), targetEntity, damage)
    if(targetEntity.getVariable("agm"))
        return damage = 0
})

mp.events.add("playerDamage", (player, healthLoss, armorLoss) => {
    console.log(player, healthLoss, armorLoss)
    if(targetEntity.getVariable("agm"))
        return damage = 0
});