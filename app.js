const canvas = document.getElementById("jsCanvas");

// Canvas 크기를 CSS로 만들기 때문에, 여기에서 다시 width, height 설정을 해준다.
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Canvas는 Context를 가지고 있다.
// Context는 Canvas의 픽셀을 컨트롤하는 놈
const ctx = canvas.getContext("2d");

// Default value
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = "2.5";

let painting = false;

const startPainting = () => {
    painting = true;
}

const stopPainting = () => {
    painting = false;
};

canvas.addEventListener("mousemove", (event) => {
    // clientX, clientY는 윈도우 내에서의 위치
    // offsetX, offsetY를 사용해야한다.

    // const x = event.offsetX;
    // const y = event.offsetY;
    const {
        offsetX: x,
        offsetY: y
    } = event;

    if (!painting) {
        // 현재 마우스가 어디에 있는지 추적
        // 클릭하는 순간부터 그리기 시작할거니까 클릭 전 마지막 마우스 위치를 알아야 한다.
        ctx.beginPath();
        // Path의 시작점 설정
        ctx.moveTo(x, y);
    } else {
        // 마지막 Path의 점부터 (x, y)까지의 Path를 잇는다. (마우스가 클릭되어 있는 순간은 Path가 계속 이어지는 개념)
        ctx.lineTo(x, y);
        // Path에 실제로 선을 긋는다.
        ctx.stroke();

        // 여기서 closePath를 하면 마지막 Path의 점은 계속 시작점이 될 것이다.
        // ctx.closePath();
    }
});

// 마우스를 클릭한 상태
canvas.addEventListener("mousedown", (event) => {
    startPainting();
});

// 마우스 클릭했다가 놓은 상태
canvas.addEventListener("mouseup", stopPainting);

// 마우스가 Canvas 밖으로 나감.
canvas.addEventListener("mouseleave", stopPainting);
