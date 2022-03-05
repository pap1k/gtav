let v = false
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    if(v)
        mp.players.local.position = new mp.Vector3(targetPosition.x, targetPosition.y, targetPosition.z+1)
});

mp.events.add("toggleShotTp", () => {
    v = !v
})