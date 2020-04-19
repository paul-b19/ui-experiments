const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 2,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

const video = document.querySelector('#video')
const audio = document.querySelector('#audio')
const audio2 = document.querySelector('#audio2')
let model

navigator.getUserMedia = 
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia || 
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia

handTrack.startVideo(video).then(status => {
  if(status) {
    navigator.getUserMedia({video: {}}, stream => {
      video.srcObject = stream
      // running detection
      setInterval(runDetection, 200)
      // runDetection()
    },
    err => console.log(err)
    )
  }
})

function runDetection() {
  model.detect(video).then(predictions => {
    console.log(predictions)
    let lx, ly, rx, ry
    if (predictions.length === 1) {
      let leftHand = predictions[0].bbox
      lx = leftHand[0]
      ly = leftHand[1]
    }
    else if (predictions.length === 2) {
      let leftHand = predictions[0].bbox
      lx = leftHand[0]
      ly = leftHand[1]
      let rightHand = predictions[1].bbox
      rx = rightHand[0]
      ry = rightHand[1]
      console.log(ly)
    }
    if (ly > 200) {
      if (lx < 250) audio.play()
      else audio2.play()
    }
    if (ry > 200) {
      if (rx < 250) audio.play()
      else audio2.play()
    }
  })
  // requestAnimationFrame(runDetection)
}

handTrack.load(modelParams).then(lmodel => {
  model = lmodel
})