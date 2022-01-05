"use strict"

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")



let grd = ctx.createRadialGradient(canvas.width/ 2, canvas.height/ 2, 100, canvas.width/ 2, canvas.height/ 2, 700)
    grd.addColorStop(0, "#62287038")
    grd.addColorStop(1, "#01001a3d")
  
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let grd1 = ctx.createRadialGradient(canvas.width/ 2, canvas.height/ 2, 100, canvas.width/ 2, canvas.height/ 2, 700)
    grd1.addColorStop(0, "#622870")
    grd1.addColorStop(1, "#01001a")
    ctx.fillStyle = grd1
    ctx.fillRect(0,0,canvas.width, canvas.height)

let fireworks = []
let subFireworks = []
let subFireworks2 = []
let subFireworks3 = []

  
class Firework {
    constructor(x,y, radius, velocityX, velocityY, color, vOpacity, gravity)
    {
        this.x = x
        this.y = y
        this.radius = radius
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.vOpacity = vOpacity
        this.gravity = gravity
        this.color = color
        this.opacity = 1
    }

    update()
    {
        this.velocityY -= this.gravity
        this.x += this.velocityX
        this.y += this.velocityY
        this.opacity -= this.vOpacity
        if(this.opactiy < 0) this.opacity = 0

    }

    draw()
    {
        ctx.save()
        ctx.shadowBlur = 7
        ctx.shadowColor = this.color
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()

    }

}

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 

let req;

let animate = () => {
    req = requestAnimationFrame(animate)
    update()
    draw()
}

let colors = ["Blue", "Orange", "Red", "Purple", "Green", '#878787','#c6bb9f']
let initializeCount = 0
let maximumInitialize = 1

let initDelay = 500 // ms
let fireworkRadius = 2
let particleCount = 20
let speedMultiplier = 3

let createSubFireworks = (x, y, count, color, speedMultiplier, subFireworks) => {
  
    let created = 0
    let radians = (Math.PI * 2) / count
 
    while(created < count )
    {
        let firework = new Firework(x,y,fireworkRadius,
                    Math.sin(radians * created) * Math.random() *  speedMultiplier,
                    Math.cos(radians * created) * Math.random() * speedMultiplier,
                    colors[Math.floor(Math.random() * colors.length)],
                    0.006,
                    -0.02
                    )

        subFireworks.push(firework)
        created++
    }
}



let update = () => {
    grd = ctx.createRadialGradient(canvas.width/ 2, canvas.height/ 2, 100, canvas.width/ 2, canvas.height/ 2, 700)
    grd.addColorStop(0, "#62287038")
    grd.addColorStop(1, "#01001a3d")

    ctx.fillStyle = grd // this will give tail effect
    ctx.fillRect( 0, 0, canvas.width, canvas.height)
    if(initializeCount < maximumInitialize)
    {
        let firework = new Firework(Math.random() * canvas.width,
                                    canvas.height + Math.random() * 70
                                    , fireworkRadius,
                                    3 * (Math.random() - 0.5), -13,
                                    colors[Math.floor(Math.random() * colors.length)],
                                    0.006,
                                    -0.1
                                )
        fireworks.push(firework)
        
        setTimeout(()=>{
            initializeCount --
        }, getRandomInt(500, 2000))
        initializeCount ++
    }
    fireworks.forEach((firework,i)=>{
        if(firework.opacity <= 0)
        {
            
            let boom = new Audio("./audio/FireWorks-Single-A-www.fesliyanstudios.com.mp3")
            boom.autoplay = true
            boom.play()
            
            fireworks.splice(i,1)
            createSubFireworks(firework.x, firework.y, 150,
            firework.color, 5, subFireworks)
        }
        else {
            firework.update()
        }
    })
    subFireworks.forEach((firework,i)=>{
        if(firework.opacity <= 0.1)
        {

            subFireworks.splice(i,1)
        }
        else {
            firework.update()
        }
    })


}

window.addEventListener("resize", ()=>{

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    reset();
  
})

let reset = () =>{
    grd1 = ctx.createRadialGradient(canvas.width/ 2, canvas.height/ 2, 100, canvas.width/ 2, canvas.height/ 2, 700)
    grd1.addColorStop(0, "#622870")
    grd1.addColorStop(1, "#01001a")

    ctx.fillStyle = grd1 // this will give tail effect
    ctx.fillRect( 0, 0, canvas.width, canvas.height)
}

let draw = () => {
    fireworks.forEach(firework=> {
        firework.draw()
    })
    subFireworks.forEach(firework=>{
        firework.draw()
    })
}
    
animate()