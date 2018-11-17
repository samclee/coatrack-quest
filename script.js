// title:  game title
// author: game developer
// desc:   short description
// script: js

var p = {x:7, y:9}
var floor = 0
var score = 0
var numC = 0
var bossHP = 3

var msg = "<Placeholder>"
function drawUI()
{
	rectb(0,0,100,12,15)
	print("coats racked: " + score, 3, 3)
	rectb(2, 122, 236,12,15)
	print(msg,5,125)
}

var starts=[{x:7,y:9},{x:55,y:7},{x:65,y:8}]
function enterFloor(){
	var start = starts[floor]
	p.x = start.x
	p.y = start.y
	msg=">Welcome to floor " + floor
}

enterFloor(floor)
music(0)
function TIC()
{
	// draw
	cls()
	map(floor*30,0)
	spr(1,p.x*8,p.y*8)
	drawUI()
	
	// input
	var nx = p.x+floor*30
	var ny = p.y
	if (btnp(0)) ny--
	if (btnp(1)) ny++
	if (btnp(2)) nx--
	if (btnp(3)) nx++
	
	// logic
	var next = mget(nx,ny)
	if (next==0) {
		p.x = nx % 30
		p.y = ny
	} // ground
	
	else if (next == 4) {
		numC++
		mset(nx,ny,5)
		msg = ">Found coat!"
		sfx(1,'C-5',20,1)
	} // chest
	else if (next == 6 && numC > 0) {
		numC--
		score++
		mset(nx,ny,7)
		msg = ">Hung coat! Very satisfying."
		sfx(2,'C-4',20,1)
	} // rack
	
	else if (next == 3) {
		floor++
		enterFloor()
		sfx(1,'C-3',20,1)
	} // stairs
	
	else if (next == 8) {
		numC--
		score++
		bossHP--
		mset(nx,ny,9)
		sfx(2,'C-2',20,1)
		if (bossHP > 0){
			msg = ">Covered enemy! Much safer!"
		}
		else {
			music(1)
			msg = ">Defeated boss! You are winner!"
		}
	} // enemy
	
}
