const video = document.querySelector('#video')
// const audio = document.querySelector('#audio')
let model

const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 2,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

navigator.getUserMedia = 
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia || 
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia

const text = document.querySelector('.lorem')
const strText = text.textContent
const splitText = strText.split('')

// converting h1.innerText to spans
text.innerHTML = ''
for (let i of splitText) {
  text.innerHTML += "<span>" + i + "</span>"
}

// loading model
handTrack.load(modelParams).then(lmodel => {
  model = lmodel
})

// starting video and hand detection
handTrack.startVideo(video).then(status => {
  if(status) {
    navigator.getUserMedia({video: {}}, stream => {
      video.srcObject = stream
      // running detection
      setInterval(runDetection, 300)
    },
    err => console.log(err)
    )
  }
})




///// animation V.1 /////
// let char = 0
// let removeEffect = false
// let timer
// // let timer = setInterval(onTick, 50)

// function onTick() {
//   const span = text.querySelectorAll('span')[char]
//   if (removeEffect) span.classList.remove('fade')
//   else span.classList.add('fade')
//   char++
//   if (char === splitText.length) {
//     clearInterval(timer)
//     // timer = null
//     char = 0
//     removeEffect = !removeEffect
//   }
// }

// function runDetection() {
//   model.detect(video).then(predictions => {
//     console.log(predictions)
//     let x, y, w, h
//     if (predictions.length === 1) {
//       let leftHand = predictions[0].bbox
//       w = leftHand[2]
//       h = leftHand[3]
//       console.log(w)
//       console.log(h)
//     }
//     if (w > h) {
//       timer = setInterval(onTick, 50)
//     } else {
//       clearInterval(timer)
//       // timer = null
//     }
//   })
// }



///// animation V.2 /////
let prevChar = 0
const spans = text.querySelectorAll('span')
const unit = Math.floor(562 / spans.length)

function onTouch(char) {
  let start
  let end
  if (char === -1) {
    prevChar === 0 ? start = 0 : start = prevChar - 1
    prevChar === spans.length - 1 ? end = spans.length - 1 : end = prevChar + 1
    for (let i = start; i <= end; i++) {
      spans[i].classList.remove('fade')
    }
  }
  else {
    prevChar === 0 ? start = 0 : start = prevChar - 1
    prevChar === spans.length - 1 ? end = spans.length - 1 : end = prevChar + 1
    for (let i = start; i <= end; i++) {
      spans[i].classList.remove('fade')
    }
    char === 0 ? start = 0 : start = char - 1
    char === spans.length - 1 ? end = spans.length - 1 : end = char + 1
    for (let i = start; i <= end; i++) {
      spans[i].classList.add('fade')
    }
    prevChar = char
  }
}

function shawAll(show) {
  if (show) {
    for (let span of spans) {
      span.classList.add('fade')
    }
  }
  else {
    for (let span of spans) {
      span.classList.remove('fade')
    }
  }
}

// function onTouch(char) {
//   const span = spans[char]
//   const prevSpan = spans[prevChar]
//   if (char === -1) {
//     prevSpan.classList.remove('fade')
//   }
//   else {
//     prevSpan.classList.remove('fade')
//     span.classList.add('fade')
//     prevChar = char
//   }
// }

function runDetection() {
  model.detect(video).then(predictions => {
    console.log(predictions)
    if (predictions.length === 1) {
      let hand = predictions[0].bbox
      let x = hand[0]
      let char = Math.floor(x / unit) - 1
      console.log('x: ', x)
      console.log('char: ', char)
      onTouch(char)
    }
    else if (predictions.length === 2) {
      shawAll(true)
    }
    else {
      // onTouch(-1)
      shawAll(false)
    }
  })
}