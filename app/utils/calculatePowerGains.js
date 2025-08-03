export function calculatePowerGains(powerArray) {
  if (powerArray.length < 2) {
    return 0
  } else {
    const currentPower = powerArray[powerArray.length - 1]
    const pastPower = powerArray[powerArray.length - 2]
    return currentPower - pastPower
  }
}



