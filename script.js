const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

function updateSize() {
    canvas.width=innerWidth;
    canvas.height=innerHeight;
}
updateSize();

const texture=new Image();
texture.src="texture.jpg";

let t=0;

const g=0.5;

const body={
    x:canvas.width/2-canvas.height*0.1/2,
    y:canvas.height*0.4,
    v:0,
    a:g,
    frame() {
        if(this.y>=canvas.height*0.8) {
            this.v=0;
            this.a=0;
            this.y=canvas.height*0.8;
        } else {
            this.a=g;
            this.v+=this.a;
            this.y+=this.v;
        }
        this.render();
    },
    render() {
        // ctx.fillStyle="white";
        ctx.strokeStyle="red";
        ctx.lineWidth=1;
        // ctx.fillRect(this.x,this.y,canvas.height*0.1,canvas.height*0.1);

        ctx.drawImage(texture,this.x,this.y,canvas.height*0.1,canvas.height*0.1); // Andrew Tate
        ctx.strokeRect(this.x,this.y,canvas.height*0.1,canvas.height*0.1);
    }
}

function renderBasics() {

    ctx.fillStyle="white";
    ctx.fillRect(0,canvas.height*0.9,canvas.width,canvas.height*0.1);

    ctx.strokeStyle="black";
    ctx.lineWidth=3;

    for(let x=-100;x<canvas.width+100;x+=100) {
        ctx.beginPath();
        ctx.moveTo(x,canvas.height);
        ctx.lineTo(x+100,canvas.height*0.9);
        ctx.stroke();
    }
}



function renderHub() {
    ctx.fillStyle="white";
    ctx.font="16px Arial";
    ctx.textBaseline="top";
    ctx.textAlign="left";
    ctx.fillText(`${fps} FPS`,5,10);
    ctx.fillText(`t = ${t}`,5,25);
    ctx.fillText(`g = ${g}`,5,40);
    ctx.fillText(`x = ${body.x}`,5,55);
    ctx.fillText(`y = ${body.y.toFixed(1)}`,5,70);
    ctx.fillText(`v = ${body.v.toFixed(1)}`,5,85);
}

function relativeCords(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return {x:Math.floor(x),y:Math.floor(y)};
}

canvas.addEventListener("click",function(event) {
    const cords = relativeCords(event);
    body.x=cords.x-canvas.height*0.1/2;
    body.y=cords.y-canvas.height*0.1/2;
});

const fpsFilterStrength=20;
let fpsFrameTime=0,fpsLastLoop=new Date;fpsThisLoop=null;
let fps=null;
function app() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    t++;
    renderBasics();
    renderHub();

    body.frame();

    let fpsThisFrameTime=(fpsThisLoop=new Date)-fpsLastLoop;
    fpsFrameTime+=(fpsThisFrameTime-fpsFrameTime)/fpsFilterStrength;
    fpsLastLoop=fpsThisLoop;
    requestAnimationFrame(app);
}
setInterval(function(){fps=(1000/fpsFrameTime).toFixed(1);},1000);

app();
