class Sensor {
	constructor(car) {
		this.car = car;
		this.rayCount = 5;
		this.rayLength = 200;
		this.raySpread = Math.PI / 4;

		this.rays = [];
	}

	update() {
		this.rays = [];
		for (let i = 0; i < this.rayCount; i++) {
			const angle = lerp(
				this.raySpread / 2,
				-this.raySpread / 2,
				i / (this.rayCount - 1)
			);

			const start = { x: this.car.x, y: this.car.y };
			const end = {
				x: this.car.x - this.rayLength * Math.sin(this.car.angle + angle),
				y: this.car.y - this.rayLength * Math.cos(this.car.angle + angle),
			};

			this.rays.push([start, end]);
		}
	}

	draw(ctx) {
		for (let i = 0; i < this.rays.length; i++) {
			const ray = this.rays[i];
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'yellow';
			ctx.moveTo(ray[0].x, ray[0].y);
			ctx.lineTo(ray[1].x, ray[1].y);
			ctx.stroke();
		}
	}
}
