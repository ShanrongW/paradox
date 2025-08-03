export function getType(characterClass) {
  const character = characterClass.toLowerCase()
  if (character === 'gladiator' || character === 'warrior') {
    return 'Tank'
  } else if (character === 'druid' || character === 'shaman') {
    return 'Healer'
  } else if (character === 'assassin' || character === 'hunter' || character === 'mage' || character === 'warlock') {
    return 'DPS'
  } else {
    return 'null'
  }
}