// Isometric projection helpers for the shop floor.
// Grid units on x/y (the floor), z is height in grid units.
// Viewer sits at +x/+y, so the faces at x+w and y+d are the visible ones.

export const TILE = { w: 46, h: 23, z: 34 }
export const ORIGIN = { x: 500, y: 196 }

export function iso(x, y, z = 0) {
  return [
    ORIGIN.x + (x - y) * TILE.w,
    ORIGIN.y + (x + y) * TILE.h - z * TILE.z,
  ]
}

/** [[x,y,z], ...] -> "x1,y1 x2,y2 ..." for a <polygon points> */
export const pts = (corners) =>
  corners.map(([x, y, z = 0]) => iso(x, y, z).join(',')).join(' ')

/** The three visible faces of an axis-aligned box. */
export function boxFaces(x, y, z, w, d, h) {
  return {
    top: pts([
      [x, y, z + h],
      [x + w, y, z + h],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ]),
    right: pts([
      [x + w, y, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x + w, y, z + h],
    ]),
    left: pts([
      [x, y + d, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ]),
  }
}

/** A flat panel hung on the back-right wall (the y = 0 plane). */
export const wallRight = (x1, x2, z1, z2) =>
  pts([
    [x1, 0, z1],
    [x2, 0, z1],
    [x2, 0, z2],
    [x1, 0, z2],
  ])

/** A flat panel hung on the back-left wall (the x = 0 plane). */
export const wallLeft = (y1, y2, z1, z2) =>
  pts([
    [0, y1, z1],
    [0, y2, z1],
    [0, y2, z2],
    [0, y1, z2],
  ])

/** A footprint on the floor. */
export const floorPad = (x, y, w, d) =>
  pts([
    [x, y],
    [x + w, y],
    [x + w, y + d],
    [x, y + d],
  ])
