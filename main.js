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
  src: 'skull-high-res-03.jpg',
  width: 9,
  height: 6,
  top: 16,
  left: 41
}, {
  src: 'plant-still-second-high-res-01.jpg',
  width: 8.25,
  height: 11.75,
  top: 24,
  left: 41
},
{
  src: 'hand.jpg',
  width: 9,
  height: 12,
  top: 10,
  left: 30
}]

const renderImage = (ctx, meta) => {
  // use function syntax to preserve "this" binding
  return function() {
    ctx.drawImage(this, pixelInchRatio * meta.left, pixelInchRatio * meta.top, this.width, this.height)
  }
}

images.forEach(meta => {
  img = new Image(pixelInchRatio * meta.width, pixelInchRatio * meta.height)
  img.src = meta.src
  img.onload = renderImage(ctx, meta)
  return img
})
