const footerData = document.querySelector("footer").getBoundingClientRect();

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");
let shapes = [];
let xPosition = 0;


async function handleFetch() {
    try {
    const result = await fetch("http://localhost:3000/users/");
    const data = await result.json();
    if (!result.ok) {
        console.error(data);
        return
    }
    drawShapes(data);
}
catch (error) {
    console.log(error);
}
}

document.addEventListener("DOMContentLoaded", handleFetch);

class Square {
    constructor(text, color, shape, xPos) {
        this.velocity = 0.5;
        this.gravity = 0.1;
        this.width = 50;
        this.height = 50;
        this.x = xPos
        this.y = 0;
        this.color = color;
        this.text = text;
        this.text_X = this.x + this.width/2 - ctx.measureText(this.text).width/2;
        this.text_Y = this.y + this.height / 2;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black"
        ctx.fillText(this.text, this.text_X, this.text_Y);
    }
    update() {
        this.move();
        this.draw();
        this.detectCollision();
    }
    move() {
        this.y += this.velocity;
        this.text_Y += this.velocity;
        if (this.velocity < 8) {
            this.velocity += this.gravity;
        }
    }
    detectCollision() {
        if (this.y + this.height > canvas.height - footerData.height) {
            this.y = canvas.height - footerData.height - this.height - 5;
        }
        if (this.text_Y > canvas.height - this.height/2 - footerData.height) {
            this.text_Y = canvas.height - this.height/2 - footerData.height;
        }
    }
}

class Circle {
    constructor(text, color, shape, xPos) {
        this.velocity = 0.5;
        this.gravity = 0.1;
        this.width = 50;
        this.height = 50;
        this.x = xPos + this.width/2
        this.y = 0 + this.height/2;
        this.color = color;
        this.text = text;
        this.text_X = this.x - ctx.measureText(this.text).width/2;
        this.text_Y = this.y;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 0.5*this.width, 0, 2*Math.PI);
        ctx.fill();
        ctx.fillStyle = "black"
        ctx.fillText(this.text, this.text_X, this.text_Y);
    }
    update() {
        this.move();
        this.draw();
        this.detectCollision();
    }
    move() {
        this.y += this.velocity;
        this.text_Y += this.velocity;
        if (this.velocity < 8) {
            this.velocity += this.gravity;
        }
    }
    detectCollision() {
        if (this.y + this.height/2 > canvas.height - footerData.height) {
            this.y = canvas.height - footerData.height - this.height/2 - 5;
        }
        if (this.text_Y > canvas.height - this.height/2 - footerData.height) {
            this.text_Y = canvas.height - this.height/2 - footerData.height;
        }
    }
}

class Triangle {
    constructor(text, color, shape, xPos) {
        this.velocity = 0.5;
        this.gravity = 0.1;
        this.width = 50;
        this.height = 50;
        this.x = xPos
        this.y = 0;
        this.color = color;
        this.text = text;
        this.text_X = this.x + this.width/2 - ctx.measureText(this.text).width/2;
        this.text_Y = this.y + this.height / 2;
    }
        /*
        Parametric equations:
        x = h + rcos(angle)
        y = k + rsin(angle)
        h and k are the center (h,k)
        r is radius
        angle is angle in radians (i think).
    */
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y+this.height);
        ctx.lineTo(this.x+this.width/2, this.y);
        ctx.lineTo(this.x+this.width, this.y+this.height);
        ctx.fill();

        ctx.fillStyle = "black"
        ctx.fillText(this.text, this.text_X, this.text_Y);
    }
    update() {
        this.move();
        this.draw();
        this.detectCollision();
    }
    move() {
        this.y += this.velocity;
        this.text_Y += this.velocity;
        if (this.velocity < 8) {
            this.velocity += this.gravity;
        }
    }
    detectCollision() {
        if (this.y + this.height > canvas.height - footerData.height) {
            this.y = canvas.height - footerData.height - this.height - 5;
        }
        if (this.text_Y > canvas.height - this.height/2 - footerData.height) {
            this.text_Y = canvas.height - this.height/2 - footerData.height;
        }
    }
}

export function drawShapes(data) {
    console.log(data);
    for (const user of data) {
        let shape;
        switch (user.shape) {
            case "triangle":
                shape = new Triangle(user.name, user.color, user.shape, xPosition);
            break
            case "square": 
                shape = new Square(user.name, user.color, user.shape, xPosition);
            break
            case "circle":
                shape = new Circle(user.name, user.color, user.shape, xPosition);
            break
            case "star":
                shape = new Square(user.name, user.color, user.shape, xPosition);
            break
        }
        shapes.push(shape);
        xPosition += shape.width;
        if (xPosition > window.innerWidth) {
            xPosition = 0;
        }
    }
    animate();
}

// POTENTIAL WAY TO FIX THIS:
// Set it up so that you continually check two of the shapes. So while overlap is true, move them apart.
// Once the two that have been focused on are no longer colliding, move to the next ones.
// Rinse and repeat until all shapes are no longer overlapping.
// I think the way to do this is to use two seperate functions: one that checks if overlap, and one that has the logic
//  to handle when this is or is not overlap.
function checkObjectCollision() {
    for (let x = 0; x < shapes.length; x++) {
        for (let y = 0; y < shapes.length; y++) {
            if (shapes[x].x < shapes[y].x + shapes[y].width/2 &&
                shapes[x].x > shapes[y].x
            ) {
                shapes[x].x -= 1;
                shapes[x].text_X -= 1;
                shapes[y].x += 1;
                shapes[y].text_X += 1;
            }
            if (shapes[x].x > shapes[y].x + shapes[y].width/2 &&
                shapes[x].x < shapes[y].x + shapes[y].width
            ) {
                shapes[x].x += 1;
                shapes[x].text_X += 1;
                shapes[y].x -= 1;
                shapes[y].text_X -= 1;

            }
        }
    }
}

function animate() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //checkObjectCollision();
    for (let shape of shapes) {
        shape.update();
    }

    requestAnimationFrame(animate);
}
