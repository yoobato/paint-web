const INITIAL_COLOR = "#2c2c2c";
const INITIAL_BRUSH_SIZE = 2.5;

const canvas = document.getElementById("jsCanvas");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const colors = document.getElementsByClassName("jsColor");

let ctx;
let isFillingMode = false;

////////////////////////
// Canvas
////////////////////////
if (canvas) {
    // if 문 사용해서 한 번 더 확인해주는게 좋다.

    // Canvas 크기를 CSS로 만들기 때문에, 여기에서 다시 width, height 설정을 해준다.
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Canvas는 Context를 가지고 있다.
    // Context는 Canvas의 픽셀을 컨트롤하는 놈
    ctx = canvas.getContext("2d");

    // Canvas의 배경을 흰색으로 설정해준다. (기본적으로는 transparent)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Default value
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = INITIAL_BRUSH_SIZE;

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

    // 마우스를 누른 상태
    canvas.addEventListener("mousedown", () => {
        startPainting();
    });

    // 마우스 눌렀다가 놓은 상태
    canvas.addEventListener("mouseup", stopPainting);

    // 마우스가 Canvas 밖으로 나감.
    canvas.addEventListener("mouseleave", stopPainting);

    canvas.addEventListener("click", () => {
        if (isFillingMode) {
            // x, y, width, height
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    });

    // 우클릭했을 때 뜨는 메뉴 (save image, copy image 등)
    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}

////////////////////////
// Range (Brush size)
////////////////////////
if (range) {
    range.addEventListener("input", (event) => {
        const size = event.target.value;
        ctx.lineWidth = size;
    });
}

////////////////////////
// Mode (Fill / Paint)
////////////////////////
if (modeBtn) {
    modeBtn.addEventListener("click", () => {
        isFillingMode = !isFillingMode;
        modeBtn.innerText = isFillingMode ? "Paint" : "Fill";
    });
}

////////////////////////
// Save
////////////////////////
if (saveBtn) {
    saveBtn.addEventListener("click", () => {
        // Canvas로부터 이미지 추출
        const image = canvas.toDataURL("image/png");

        // 가상의 다운로드 링크(a;anchor)를 만들다
        const link = document.createElement("a");
        link.href = image;
        // 다운로드될 파일 이름
        link.download = "paintjs_export";
        // 링크를 클릭된 것처럼 처리
        link.click();
    });
}

////////////////////////
// Canvas
////////////////////////
if (colors) {
    // Color change
    Array.from(colors).forEach((color) => {
        color.addEventListener("click", (event) => {
            const colorRgb = event.target.style.backgroundColor;
            ctx.strokeStyle = colorRgb;
            ctx.fillStyle = colorRgb;
        });
    });
}
