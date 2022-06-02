const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;


function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}
// 마우스가 canvas 에서 move 할때
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // 마우스의 위치를 beginpath로 지정하기 (no clicked)
    // moveTo 는 ctx의 offsetX,Y를 계속 갱신해주기 (위에 말과 동일)
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    // lineTo 는 moveTo에서 지정한 x,y의 위치에서 지금까지 위치를 지정
    // stork 로 그려주기 (style = strokestyle,lineWidth)
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

// mousemove = the mouse move on canvas
// mousedown = the mouse clicked
// mouseup = the mouse on canvas
// mouseleave = the mouse leave the canvas
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove)
    canvas.addEventListener("mousedown",startPainting)
    canvas.addEventListener("mouseup",stopPainting)
    canvas.addEventListener("mouseleave",stopPainting)
}

Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick))