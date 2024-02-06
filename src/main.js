import kaboom from "kaboom"

const k = kaboom({
	background: [0, 255, 125],

	scale: 1,
	debug: true,
})
let score = 0;
let jumped = 0;
//k.loadRoot("sprites/");
k.loadSprite("cheeku", "sprites/cheeku.png")
k.setGravity(2400)
k.loadSprite("cheeku", "sprites/cheeku-sprite.png", {
	width: 128,
	height: 128,
	sliceX: 8,
	sliceY: 10,
	anims: {
		"idle": { from: 0, to: 4 },
		"right": { from: 17, to: 24 },
		"left": { from: 25, to: 32 },
		"sleep": { from: 33, to: 36 },
		"jump": { from: 43, to: 48 },
	},
})




k.scene("game", () => {


	const cheeku = k.add([
		k.pos(120, 80),
		k.sprite("cheeku"),
		k.scale(5),
		k.body(),
		k.area()
	])

	//cheeku.play("left")

	const scoreLabel = k.add([
		text(score),
		pos(24, 24)
	])

	k.onUpdate(() => {
		score++;
		scoreLabel.text = score;
	});

	const platform = k.add([
		rect(width(), 48),
		pos(0, height() - 48),
		outline(4),
		area(),
		body({ isStatic: true }),
		color(127, 200, 255),
		"platform"
	])



	k.onKeyPress("space", () => {
		cheeku.jump(1000)
		cheeku.moveBy(50, 0)
		cheeku.play("jump")

	})
	k.onKeyDown("d", () => {
		cheeku.moveBy(10, 0)
		cheeku.play("jump")

	})

	k.onKeyDown("a", () => {
		cheeku.moveBy(-10, 0)
		cheeku.flipX
		cheeku.play("jump")
		//cheeku.scale(-1,-1)
	})


	loop(2, () => {
		// add tree
		const tmp = rand(128, 256)

		if (tmp > 200) {
			let block = k.add([
				rect(48, rand(128, 256)
				),
				area(),
				outline(4),
				pos(width(), height() - 48),
				anchor("botleft"),
				color(255, 0, 0),
				move(LEFT, 240),
				"enemy", // add a tag here
				body()
			]);


			k.add([
				rect(48, rand(128, 256)
				),
				area(),
				outline(4),
				pos(width(), -48 + rand(128, 256)),
				anchor("botleft"),
				color(255, 0, 0),
				move(LEFT, 240),
				"enemy", // add a tag here
				//	body()
			]);



		} else if (tmp > 175 & tmp < 200) {
			let block = k.add([
				rect(48, rand(128, 256)
				),
				area(),
				outline(4),
				pos(width(), height() - 48),
				anchor("botleft"),
				color(0, 144,),
				move(LEFT, 240),
				"point", // add a tag here
				body()
			]);

			k.add([
				rect(48, rand(128, 256)
				),
				area(),
				outline(4),
				pos(width(), -48 + rand(128, 256)),
				anchor("botleft"),
				color(0, 144,),
				move(LEFT, 240),
				"point", // add a tag here
				//	body()
			]);
		} else {
			let block = k.add([
				rect(48, rand(128, 256)
				),
				area(),
				outline(4),
				pos(width(), height() - 48),
				anchor("botleft"),
				color(0, 0, 255),
				move(LEFT, 240),
				"box", // add a tag here
				body()
			]);

			k.add([
				rect(48, rand(128, 256)
				),
				area(),
				outline(4),
				pos(width(), -48 + rand(128, 256)),
				anchor("botleft"),
				color(0, 0, 255),
				move(LEFT, 240),
				"box", // add a tag here
				//body()
			]);
		}




	});

	cheeku.onCollide("enemy", () => {
		k.addKaboom(cheeku.pos);
		k.shake()

		//	k.destroyAll()
		go("lose");

	})

	cheeku.onCollide("point", () => {
		k.addKaboom(cheeku.pos);
		k.shake()
		score += 1000
		//	k.destroy("point")

	})

	/* 	platform.onCollide("platform", () => {
			jumped = 0
		}) */

})

scene("lose", () => {
	add([
		text("Game Over"),
		pos(center()),
		anchor("center"),
	])


	const scoreLabel = k.add([
		text("Total Score : " + score),
		pos(24, 24)
	])

	k.onKeyDown("space", () => {
		score = 0
		go("game")
	})
})

go("game")


//k.onClick(() => k.addKaboom(k.mousePos()))