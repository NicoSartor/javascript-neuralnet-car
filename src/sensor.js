class Sensor {
	constructor(car) {
		this.car = car;
		this.rayCount = 5;
		this.rayLength = 150;
		this.raySpread = Math.PI / 3;

		this.rays = [];
		this.readings = [];
	}

	update(roadBorders) {
		this.#castRays();
		this.readings = [];

		for (let i = 0; i < this.rays.length; i++) {
			this.readings.push(this.#getReading(this.rays[i], roadBorders));
		}

		console.log('readings', this.readings);
	}

	#getReading(ray, roadBorders) {
		const intersections = [];
		for (let i = 0; i < roadBorders.length; i++) {
			const intersection = getIntersection(
				ray[0],
				ray[1],
				roadBorders[i][0],
				roadBorders[i][1]
			);
			if (intersection) {
				intersections.push(intersection);
			}
		}

		if (intersections.length === 0) {
			return null;
		} else {
			const offsets = intersections.map((e) => e.offset);
			const minOffset = Math.min(...offsets);
			return intersections.find((e) => e.offset === minOffset);
		}
	}

	#castRays() {
		this.rays = [];
		for (let i = 0; i < this.rayCount; i++) {
			const angle = lerp(
				this.raySpread / 2,
				-this.raySpread / 2,
				this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
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
			let end = this.rays[i][1];
			if (this.readings[i]) {
				end = this.readings[i];
			}

			const ray = this.rays[i];
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'yellow';
			ctx.moveTo(ray[0].x, ray[0].y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'black';
			ctx.moveTo(ray[1].x, ray[1].y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
		}
	}
}
