const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const reset = document.getElementById("jsReset")

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

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
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

// Reset
function handleReset(){
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    ctx.strokeStyle = INITIAL_COLOR;

}

// mousemove = the mouse move on canvas
// mousedown = the mouse clicked
// mouseup = the mouse on canvas
// mouseleave = the mouse leave the canvas
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick)
}

if(reset){
    reset.addEventListener("click",handleReset)
}



