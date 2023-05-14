class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.acceleration = 0.1;
		this.maxSpeed = 5;
		this.minSpeed = -5;
		this.angle = 0;
		this.friction = 0.05;

		this.controls = new Controls();
	}

	update() {
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}
		if (this.controls.reverse) {
			this.speed -= this.acceleration;
		}
		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		}
		if (this.speed < this.minSpeed) {
			this.speed = this.minSpeed;
		}
		if (this.speed > 0) {
			this.speed -= this.friction;
		}
		if (this.speed < 0) {
			this.speed += this.friction;
		}
		this.y -= this.speed;

		if (this.controls.left) {
			this.x -= 2;
		}
		if (this.controls.right) {
			this.x += 2;
		}
	}

	draw(ctx) {
		console.log('draw');
		ctx.beginPath();
		ctx.rect(
			this.x - this.width / 2,
			this.y - this.height / 2,
			this.width,
			this.height
		);
		ctx.fillStyle = 'red';
		ctx.fill();
	}
}
