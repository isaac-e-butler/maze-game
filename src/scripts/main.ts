const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

function Main() {
    context.fillStyle = 'red';
    context.fillRect(10, 10, 100, 100);
    console.log('called');
}

Main();
