function pievienot(vertiba) {
    let displejs = document.getElementById("displejs")
    let operators = ["+", "-", "*", "/", "."]

    let pedejais = displejs.value.slice(-1)

    if (operators.includes(vertiba) && operators.includes(pedejais)) {
        return
    }
    
    if (displejs.value === "0" || displejs.value === "ERROR") {
        displejs.value = vertiba
    } else {
        displejs.value += vertiba
    }

    displejs.style.background = "linear-gradient(180deg, #d9e3a8 0%, #bfc98f 100%)"

    flashLED()
}

function notirit() {
    let displejs = document.getElementById("displejs")
    displejs.value = "0"
    displejs.style.background = "linear-gradient(180deg, #d9e3a8 0%, #bfc98f 100%)"
}

function izdzest() {
    let displejs = document.getElementById("displejs")

    if (displejs.value === "ERROR") {
        displejs.value = "0"
    } else {
        displejs.value = displejs.value.slice(0, -1)

        if (displejs.value === "") {
            displejs.value = "0"
        }
    }

    displejs.style.background = "liear-gradient(180deg, #d9e3a8 0%, #bfc98f 100%)"
}

function rezultats() {
    let displejs = document.getElementById("displejs")
    try {
        displejs.value = eval(displejs.value)
        displejs.style.background = "linear-gradient(180deg, #d9e3a8 0%, #bfc98f 100%)"
    } catch {
        displejs.value = "ERROR"
        displejs.style.background = "#ffb3b3"
    }
}

function flashLED() {
    let leds = document.querySelectorAll(".led")

    let randomLED = leds[Math.floor(Math.random() * leds.length)]

    randomLED.classList.add("flash")

    setTimeout(() => {
        randomLED.classList.remove("flash")
    }, 150) 
}

function highlightButton(symbol) {
    let buttons = document.querySelectorAll("button")
    buttons.forEach(btn => {
        if (btn.innerText === symbol) {
            btn.classList.add("key-active")
            setTimeout(() => {
                btn.classList.remove("key-active")
            }, 150)
        }
    })
}

document.addEventListener("keydown", function(event) {

    let key = event.key

    if (!isNaN(key)) {
        pievienot(key)
        highlightButton(key)
    }

    if (key === "+" || key === "-" || key === "*" || key === "/" || key === ".") {
        pievienot(key)
        highlightButton(key)
    }

    if (key === "Enter") {
        rezultats()
        highlightButton("=")
    }

    if (key === "Backspace") {
        izdzest()
        highlightButton("←")
    }

    if (key === "Escape") {
        notirit()
        highlightButton("CLR")
    }
})