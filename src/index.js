const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = 200);

const road = new Road(width / 2, width * 0.9, Math.abs(width / 50));
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
	car.update();
	// setting the height here will clear the canvas on each frame so that the car doesn't leave a trail
	const height = (canvas.height = window.innerHeight);

	road.draw(ctx);
	car.draw(ctx);

	requestAnimationFrame(animate);
}
