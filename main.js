// all dimensions in inches

const galleryWidth = 90
const galleryHeight = 48
const pixelInchRatio = 14

const width = galleryWidth * pixelInchRatio
const height = galleryHeight * pixelInchRatio

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = width
canvas.height = height

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const images = [{
  hide: true,
  src: 'skull-high-res-03.jpg',
  width: 11,
  height: 7.33,
  top: 14,
  left: 41
}, {
  src: 'plant-still-second-high-res-01.jpg',
  width: 8.25,
  height: 11.75,
  top: 23,
  left: 41
},
{
  src: 'hand.jpg',
  width: 9,
  height: 12,
  top: 11,
  left: 30
},
{
  src: 'arizona.jpg',
  width: 14,
  height: 11,
  top: 24,
  left: 25
},
{
  src: 'worker.jpg',
  width: 11,
  height: 7.33,
  top: 14,
  left: 41
  // top: 23,
  // left: 51
},
{
  src: 'terminal.jpg',
  width: 11,
  height: 7.333,
  top: 15.66,
  left: 17
}]

const renderImage = (ctx, meta) => {
  // use function syntax to preserve "this" binding
  return function() {
    ctx.drawImage(this, pixelInchRatio * meta.left, pixelInchRatio * meta.top, this.width, this.height)
  }
}

images.forEach(meta => {
  if (meta.hide) return;
  img = new Image(pixelInchRatio * meta.width, pixelInchRatio * meta.height)
  img.src = meta.src
  img.onload = renderImage(ctx, meta)
  return img
})
