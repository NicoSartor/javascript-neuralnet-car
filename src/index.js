const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = 200);

const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
	car.update();
	// setting the height here will clear the canvas on each frame so that the car doesn't leave a trail
	const height = (canvas.height = window.innerHeight);
	car.draw(ctx);

	requestAnimationFrame(animate);
}
