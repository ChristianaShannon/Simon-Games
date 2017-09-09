$(document).ready(function() {
	let simon={
		power:false,
		strict:false,
		running:false,
		setList:[],
		setListNum:0,
		userList:[],
		userListNum:0,
		levelCount:1,
		tempColor:"",
		runCache:"",
		matchList:true,
		runList:"",
		reset:reset,
		/*audioColors:{
			green:'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
			red:'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
			blue:'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
			yellow:'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
			fail:'http://k003.kiwi6.com/hotlink/clrtgq79wz/failsimon.mp3'                   
		}*/
	}
	function reset(){
		this.power=false;
		this.strict=false;
		this.running=false;
		this.setList=[];
		this.setListNum=0;
		this.userList=[];
		this.userListNum=0;
		this.levelCount=1;
		this.tempColor="";
		this.runCache="";
		this.matchList=true;
		this.runList="";
		this.reset=reset;
		/*this.audioColors={
			green:'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
			red:'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
			blue:'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
			yellow:'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
			fail:'http://k003.kiwi6.com/hotlink/clrtgq79wz/failsimon.mp3'                   
		};*/
	}
	$(".switch").on("click",function () {
		if (simon.power===false) {
			$(".switch").addClass('open2').removeClass('close2');
			$(".powerSwitch").addClass('open1').removeClass('close1');
			$("#countNum").css('opacity', '1');
			simon.power=true;
		}else if(simon.power===true){
			$(".switch").addClass('close2').removeClass('open2');
			$(".powerSwitch").addClass('close1').removeClass('open1');
			$("#countNum").css('opacity', '0.3');
			$("#countNum").html('--');
			$("#strictBtn").removeClass('strictOn');
			$("#startBtn").removeClass('startOn');
			simon.reset();
			$(".mainbutton").css('pointer-events', 'none');
			clearInterval(simon.runCache);
		}
	})
	$("#startBtn").on('click',  function() {
		if (simon.power===true) {
			$("#startBtn").addClass('startOn');
			simon.running=true;
			simon.userList=[];
			simon.userListNum=0;
			simon.setList=[];
			simon.setListNum=0;
			simon.levelCount=1;
			simon.matchList=true;
			$("#countNum").css('opacity', '1').html('--');
			clearInterval(simon.runCache);
			newList();
			setTimeout(()=>{simon.runCache=setInterval(playGame,500);},1000);
		}
	});
	$("#strictBtn").on('click',  function() {
		if(simon.power===true&&simon.running===true){
			if(simon.strict===false){
				$("#strictBtn").addClass('strictOn');
				simon.strict=true;
			}else if(simon.strict===true){
				$("#strictBtn").removeClass('strictOn');
				simon.strict=false;
			}
		}
	});
	$(".mainbutton").on('click', function() {
		 $("#sound" + this.id).get(0).cloneNode().play();
		//let curSound=simon.audioColors[this.id];
		//playIt(curSound);
		simon.userList.push(this.id);
		simon.userListNum++;
		for (i = 0; i < simon.userList.length; i++){
			if(simon.userList[i]!==simon.setList[i]){
				simon.matchList=false;
			}
		}
		if(!simon.matchList){
			$("#countNum").html('!!');
			//let fails=simon.audioColors['fail'];
			//playIt(fails);
			$("#soundfail").get(0).play();
			simon.userList=[];
			simon.userListNum=0;
			simon.setListNum=0;
			simon.matchList=true;
			$(".mainbutton").css('pointer-events', 'none');
			if (simon.strict===true) {
				simon.levelCount=1;
				simon.setList=[];
				newList();
				setTimeout(()=>{simon.runCache=setInterval(playGame,500);},1000);
			}else{
				setTimeout(()=>{simon.runCache=setInterval(playGame,500);},1000);
			}
		}else{
			if(simon.userListNum===simon.setListNum){
				if(simon.levelCount===20){
					win();
				}else{
					simon.userList=[];
					simon.setListNum=0;
					simon.userListNum=0;
					newList();
					simon.levelCount++;
					setTimeout(()=>{simon.runCache=setInterval(playGame,500);},1000);
					$(".mainbutton").css('pointer-events', 'none');
				}
			}
		}
	})

	/*function playIt(sound) {
		let audio=new Audio(sound);
		audio.play();
	}*/
	function newList() {
		let temp=Math.floor((Math.random()*4)+1);
		switch(temp){
			case 1:
			simon.setList.push('red');
			break;
			case 2:
			simon.setList.push('green');
			break;
			case 3:
			simon.setList.push('yellow');
			break;
			case 4:
			simon.setList.push('blue');
			break;
		}
	}
	function playGame() {
		$("#countNum").html(simon.levelCount);
		simon.tempColor=simon.setList[simon.setListNum];
		//let cursetSound=simon.audioColors[simon.tempColor];
		//playIt(cursetSound);
		
		$("#sound" + simon.tempColor).get(0).cloneNode().play();
		$("#"+simon.tempColor).addClass('activated');
		setTimeout(()=>{$("#"+simon.tempColor).removeClass('activated');},150);
		simon.setListNum++;
		if(simon.setListNum===simon.setList.length){
			clearInterval(simon.runCache);
			$(".mainbutton").css('pointer-events', 'auto');
		}
	}
	function win(){
		$("#countNum").html('WIN');
		setTimeout(()=>{
			simon.reset();
			$("#countNum").html('--');
			clearInterval(simon.runCache);
			newList();
			$(".mainbutton").css('pointer-events', 'none');
			setTimeout(()=>{simon.runCache=setInterval(playGame,500);},1000);
		},3000)
	}
});