let scriptStartSide = 0
let recentSide = 0
let rotationThreshold = 0
let rightSpeed = 0
let leftSpeed = 0
leftSpeed = 50
rightSpeed = 50
// počet sekund, kolik se bude robot max točit na
// stranu (za cyklus hledání max 3x)
rotationThreshold = 5
// recentSide 1 = vpravo
//
// 2 = vlevo
forever(function () {
    control.waitMicros(1)
    if (sensors.color1.isColorDetected(ColorSensorColor.Black)) {
        motors.largeAB.tank(leftSpeed, rightSpeed)
        sensors.color1.pauseUntilColorDetected(ColorSensorColor.White)
        motors.stopAll()
        if (recentSide == 1) {
            motors.largeAB.tank(leftSpeed, rightSpeed * -1)
        } else {
            motors.largeAB.tank(rightSpeed * -1, leftSpeed)
        }
        scriptStartSide = recentSide
        control.timer1.reset()
        pauseUntil(() => sensors.color1.isColorDetected(ColorSensorColor.Black) || control.timer1.seconds() >= rotationThreshold)
        console.logValue("time", control.timer1.seconds())
        motors.stopAll()
        if (sensors.color1.isColorDetected(ColorSensorColor.White)) {
            if (recentSide == 2) {
                motors.largeAB.tank(leftSpeed, rightSpeed * -1)
            } else {
                motors.largeAB.tank(rightSpeed * -1, leftSpeed)
            }
            control.timer1.reset()
            pauseUntil(() => sensors.color1.isColorDetected(ColorSensorColor.Black) || control.timer1.seconds() >= 2 * rotationThreshold)
            motors.stopAll()
            recentSide = 2
        }
    } else {
        recentSide = 1
    }
})
