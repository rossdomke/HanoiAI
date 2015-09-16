$(function(){
	game = {children : null, disks : 5, t1: 0, t2: 0, t3: 0, lastMovedTo : null, startingTower: null }	
	initializeGame(game);
});


function depthFirstSearch(node){
	//test node
		//if passed return true
	//else
		//get children
		//if no children
			//return false
		//foreach child
			//if depthfirstsearch
				//return true
			//else
				//delete child node
	drawGame(node);
	if(testSolution(node)){
		return true;
	}else{
		findChildren(node);
		if(node.children == null){
			return false;
		}
		for(var i = 0; i < node.children.length; i++){
			if(depthFirstSearch(node.children[i])){
				return true;
			}else{
				//this should never happen in tower of Hanoi
				node.children.splice(i, 1);
			}
		}
	}

}
function initializeGame(node){
	var towerDisks = 0;
	for(var i = 0; i < node.disks; i++){
		towerDisks = (towerDisks | (1 << i));
	}
	towerNum = Math.floor((Math.random() * 3) + 1);
	node.startingTower = 't' + towerNum;
	node[node.startingTower] = towerDisks;
	drawGame(node);
}
function testSolution(node){
	var fullStack = 0;
	for(var i = 0; i < node.disks; i++){
		fullStack = (fullStack | (1 << i));
	}
	for(var i = 1; i <= 3; i++){
		if(('t' + i) == node.startingTower){ continue; }
		if(node['t' + i] == fullStack){
			return true;
		}
	}
	return false;

}
function smartFindChildren(node){
	//maybe I will write this one at a different time
	//the additional rules are
	//1. if there is a blank space, move the largest available disk to it
	//2. when moving a block if no blank is available, move it onto the block closest to it's size (something like that, needs more thought)
}
function dumbFindChildren(node){
	for(var o = 1; o <= 3; o++){
		//don't move the same piece two turns in a row
		if(("t" + o) == node.lastMovedTo) { continue; }
		for(var i = 1; i <= 3; i++){
			var tmpNode = copyNode(node);
			if(moveDisk(tmpNode, 't' + o, 't' + i)){
				if(node.children == null){
					node.children = [];
				}
				node.children.push(tmpNode);
			}
		}
	}	
}
function findChildren(node){
	dumbFindChildren(node);
}
function copyNode(node){
	var tmpNode = JSON.parse(JSON.stringify(node));
	tmpNode.children = null;
	return tmpNode;
}
function moveDisk(node, towerFrom, towerTo){
	diskToMove = findTopDisk(node[towerFrom], node.disks);
	topDiskOnTarget = findTopDisk(node[towerTo], node.disks);
	if(diskToMove == 0){
		console.error("cannot move disk 0");
		return false;
	}
	if(diskToMove > topDiskOnTarget && topDiskOnTarget != 0){
		console.error("cannot move larger disk onto smaller disk");
		return false;
	}
	if(towerFrom == towerTo){
		console.error("cannot move to same tower");
		return false;
	}
	node[towerFrom] = node[towerFrom] - (1 << (diskToMove - 1));
	node[towerTo] = node[towerTo] + (1 << (diskToMove - 1));
	node.lastMovedTo = towerTo;
	drawGame(node);
	return true;
}

function findTopDisk(tower, disks){
	var topDisk = 0;
	for(var i = 0; i < disks; i++){
		if((tower >> i) % 2){
			topDisk = i + 1;
			i = disks;
		}
	}
	return topDisk;

}
function drawGame(node){
	$('.tower>.blockContainer').html('');
	drawTower(node.t1, node.disks, '#t1');
	drawTower(node.t2, node.disks, '#t2');
	drawTower(node.t3, node.disks, '#t3');
}
function drawTower(tower, disks, selector){
	for(var i = 0; i < disks; i++){
		if((tower >> i) % 2){
			$(selector + '>.blockContainer').append(getBlockHtml(i + 1))
		}
	}
}

function getBlockHtml(blockNum){
	return "<div class='block b" +  blockNum + "'><div></div></div>";
}