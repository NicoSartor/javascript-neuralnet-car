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

		this.sensor = new Sensor(this);
		this.controls = new Controls();
	}

	update(roadBorders) {
		this.#handleMovement();
		this.sensor.update(roadBorders);
	}

	#handleMovement() {
		if (this.controls.forward) {
			this.speed -= this.acceleration;
		}
		if (this.controls.reverse) {
			this.speed += this.acceleration;
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
		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		if (this.speed != 0) {
			const flip = this.speed < 0 ? 1 : -1;

			if (this.controls.left) {
				this.angle += 0.015 * flip;
			}
			if (this.controls.right) {
				this.angle -= 0.015 * flip;
			}
		}

		this.x += this.speed * Math.sin(this.angle);
		this.y += this.speed * Math.cos(this.angle);
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(-this.angle);

		ctx.beginPath();
		ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);

		ctx.fillStyle = 'red';
		ctx.fill();

		ctx.restore();

		this.sensor.draw(ctx);
	}
}
