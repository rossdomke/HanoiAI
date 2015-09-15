$(function(){
	game = {children : null, disks : 7, t1: 0, t2: 0x7F, t3: 0, lastMovedDisk : null }	
});
function findChildren(node){
	topDisks = [findTopDisk(node.t1, node.disks), findTopDisk(node.t2, node.disks), findTopDisk(node.t3, node.disks)]

	//move largest disk if possible
	if(topDisks[0] == 0 || topDisks[1] == 0 || topDisk[2] == 0){

	}else{
		//move largest disk that wasn't moved recently. 
	}
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
	node[towerFrom] = node[towerFrom] - (1 << (diskToMove - 1));
	node[towerTo] = node[towerTo] + (1 << (diskToMove - 1));
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