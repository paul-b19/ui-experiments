const text = document.querySelector('.lorem')
const strText = text.textContent
const splitText = strText.split('')

text.innerHTML = ''
for (let i of splitText) {
  text.innerHTML += "<span>" + i + "</span>"
}

// text animation
let char = 0
let removeEffect = false
let timer = setInterval(onTick, 50)
timer = setInterval(onTick, 50)

function onTick() {
  const span = text.querySelectorAll('span')[char]
  if (removeEffect) span.classList.remove('fade')
  else span.classList.add('fade')
  char++
  if (char === splitText.length) {
    clearInterval(timer)
    timer = null
    char = 0
    removeEffect = true
  }
}