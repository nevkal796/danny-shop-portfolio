// Shop-floor palette. Pale interior, blue epoxy floor, yellow floor
// markings — the machine-shop reference. Orange is reserved exclusively
// for the selected bay, so it never competes with the painted markings.

export const SHOP = {
  wallOffice: '#d7d0c3', // warm off-white, office side
  wallTool: '#ccd4dc', // cool off-white, tool side
  floor: '#35638c', // blue epoxy
  floorDark: '#2b5175',
  grid: 'rgba(255,255,255,.07)',
  lane: '#e8c33a', // painted walkway
  laneWash: 'rgba(232,195,58,.09)',
  bayLine: 'rgba(232,195,58,.60)',
  bayFill: 'rgba(232,195,58,.05)',
  stencil: 'rgba(255,255,255,.34)',
}

// Machine bodies: mid grey so they read against pale walls AND blue floor.
export const MACHINE = ['#b9c2cb', '#8e98a3', '#6b757f']
export const MACHINE_DARK = ['#7d8791', '#5e6771', '#464e57']
export const PANEL = ['#39424b', '#2a323a', '#1f262c']
export const WOOD = ['#a8794a', '#805a37', '#5f4328']
export const CORK = ['#c2996a', '#9b7749', '#755733']

// Selected bay
export const HOT = ['#f08a3c', '#c96520', '#9c4a14']
