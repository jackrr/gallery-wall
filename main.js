// all dimensions in inches

const galleryWidth = 90
const galleryHeight = 48
const pixelInchRatio = 15

const frameSize = 0.5
const matteSize = 1
const gapSize = 0.5

const width = galleryWidth * pixelInchRatio
const height = galleryHeight * pixelInchRatio

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = width
canvas.height = height

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const images = [
{
  src: 'plant-still-second-high-res-01.jpg',
  width: 10,
  height: 15,
  top: 24,
  left: 40,
  hOrder: 2,
  vOrder: 1
},
{
  src: 'hand.jpg',
  width: 9,
  height: 12,
  top: 11,
  left: 30,
  hOrder: 1
},
{
  src: 'arizona.jpg',
  width: 14,
  height: 11,
  top: 24,
  left: 25,
  hOrder: 1,
  vOrder: 1,
},
{
  src: 'worker.jpg',
  width: 15,
  height: 10,
  top: 13,
  left: 40,
  hOrder: 2
},
{
  src: 'terminal.jpg',
  width: 15,
  height: 10,
  top: 13,
  left: 14
},
{
  name: "rectangle",
  color: "#b01985",
  width: 9,
  height: 12,
  left: 51,
  top: 24,
  hOrder: 3,
  vOrder: 1
},
{
  name: "square",
  color: "#b01985",
  width: 9,
  height: 9,
  left: 15,
  top: 24,
  vOrder: 1
}]

const getTop = meta => {
  return meta.top  + ((meta.vOrder || 0) * ((2 * matteSize) + (2 * frameSize) + gapSize))
}

const getLeft = meta => {
  return meta.left  + ((meta.hOrder || 0) * ((2 * matteSize) + (2 * frameSize) + gapSize))
}

const renderImage = (ctx, meta) => {
  // use function syntax to preserve "this" binding
  return function() {
    ctx.drawImage(this, pixelInchRatio * getLeft(meta), pixelInchRatio * getTop(meta), this.width, this.height)
  }
}

const drawFrame = (ctx, meta) => {
  ctx.lineWidth = pixelInchRatio * frameSize
  ctx.strokeStyle = "#fcd2a4"
  // ctx.lineWidth = 2
  ctx.strokeRect(
    pixelInchRatio * (getLeft(meta) - ((0.5 * frameSize) + matteSize)),
    pixelInchRatio * (getTop(meta) - ((0.5 * frameSize) + matteSize)),
    pixelInchRatio * (meta.width + (2 * matteSize) + frameSize),
    pixelInchRatio * (meta.height + (2 * matteSize) + frameSize)
  )
}

const drawMatte = (ctx, meta) => {
  // noop for now
}

let xMin = 10000
let xMax = 0
let yMin = 10000
let yMax = 0

images.forEach(meta => {
  if (meta.hide) return;

  drawFrame(ctx, meta)
  drawMatte(ctx, meta)

  const left = getLeft(meta)
  const width = meta.width + (2 * frameSize) + (2 * matteSize)
  const top = getTop(meta)
  const height = meta.height + (2 * frameSize) + (2 * matteSize)

  if (left < xMin) xMin = left
  if ((width + left) > xMax) xMax = width + left
  if (top < yMin) yMin = top
  if ((height + top) > yMax) yMax = height + top


  if (meta.color) {
    ctx.fillStyle = meta.color
    ctx.fillRect(pixelInchRatio * getLeft(meta), pixelInchRatio * getTop(meta), pixelInchRatio * meta.width, pixelInchRatio * meta.height)
  } else {
    img = new Image(pixelInchRatio * meta.width, pixelInchRatio * meta.height)
    img.src = meta.src
    img.onload = renderImage(ctx, meta)
  }
})

console.log({xMin, xMax, yMin, yMax})
console.log({width: xMax - xMin, height: yMax - yMin})
