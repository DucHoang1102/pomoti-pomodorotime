function init(){
	Item_first = document.querySelectorAll("#content-show div")[0];
	importtime = document.getElementById("importtime");
	hour = 0;
	sec = 0;
}

function splitTime(){
	var array_minute= []
	var valuetime = importtime.value.split("+");
	for (var i = 0; i < valuetime.length; i++){

		if (isNaN(valuetime[i])){
			continue;
		}

		number_minute = Number(valuetime[i]);
		if(number_minute === 0){
			continue;
		}

		if(number_minute > 99){
			number_minute = 99;
		}
		// Tat dau cham dong;
		number_minute = parseInt(number_minute)

		array_minute.push(number_minute);
	}

	return array_minute;
}

function setTime(){
	//Kiem tra 3 tham so hour, minute, sec
	var flag = (sec || minute || hour);
	if(isNaN(sec) || isNaN(minute) || isNaN(hour)){
		flag = false;
	}
	if(flag)
	{
		if (sec > -1){
			sec = sec -1;
		}

		if((minute > -1) && (sec === -1)){
			minute = minute -1;
			sec = 59;
		}

		if((hour > 0) && (minute === -1)){
			hour = hour - 1;
			minute = 59;
		}
	}
}

function itemViewPomodo(minuteview, secminute, iditem){
	parent_content_show = document.getElementById("content-show");

	div_content_show = document.createElement("div");
	div_content_show.className = "show";
	div_content_show.id = iditem;

	span_view_minute = document.createElement("span");
	span_view_minute.className = "minute";
	span_view_minute.innerHTML = minuteview;

	span_td = document.createElement("span")
	span_td.innerHTML = ":";

	span_view_sec = document.createElement("span");
	span_view_sec.className = "sec";
	span_view_sec.innerHTML = secminute;

	br_time_vs_icon = document.createElement("br");

	i_icon_clear = document.createElement("i");
	i_icon_clear.className = "material-icons";
	i_icon_clear.innerHTML = "clear";

	i_icon_pause_play = document.createElement("i");
	i_icon_pause_play.className = "material-icons";
	i_icon_pause_play.innerHTML = "play_arrow";

	//i_icon_pause = document.createElement("i");
	//i_icon_pause.className = "material-icons";
	//i_icon_pause.innerHTML = "pause";

	i_icon_replay = document.createElement("i");
	i_icon_replay.className = "material-icons";
	i_icon_replay.innerHTML = "replay";


	parent_content_show.appendChild(div_content_show);

	div_content_show.appendChild(span_view_minute);
	div_content_show.appendChild(span_td);
	div_content_show.appendChild(span_view_sec);
	div_content_show.appendChild(br_time_vs_icon);
	div_content_show.appendChild(i_icon_clear);
	div_content_show.appendChild(i_icon_pause_play);
	div_content_show.appendChild(i_icon_replay);

	//Clear Item
	i_icon_clear.addEventListener("click", function(){
		clearItem(iditem);
	})

	//pause and play
	//i_icon_pause_play.addEventListener("click", function(){
		//pauseAndPlay(iditem);
	//})
}

function setItem(){
	array_minute_list = splitTime();
	for(var i = 0; i < array_minute_list.length; i++){
		var minute = array_minute_list[i];
		itemViewPomodo(minute, 0, "show"+ Math.random());
	}
}

function clearItem(iditem){
	parent_content_show.removeChild(document.getElementById(iditem));
	clearInterval(startTime);
	sec = 0; //reset sec;
	startItemTime();


}

function pauseAndPlay(node_pause_play){
	if(node_pause_play.innerHTML == "play_arrow")
	{
		node_pause_play.innerHTML = "pause";
		startItemTime();
	}
	else
	{
		node_pause_play.innerHTML = "play_arrow";
		clearInterval(startTime);
	}
}

function runTime(){
	var Item_first = document.querySelectorAll("#content-show div")[0];
	setTime()
	Item_first.childNodes[0].innerHTML = minute;
	Item_first.childNodes[2].innerHTML = sec;
	if((sec == 0) && (minute == 0)){
		clearInterval(startTime);
		clearItem(Item_first.id);
		startItemTime();
	}
}

function startItemTime(){
	Item_first = document.querySelectorAll("#content-show div")[0];

	if (Item_first){

		//get minute item time
		var viewminute = Item_first.childNodes[0].innerHTML;

		// Element span class = "minute" - View minute, sec;
		minute = parseInt(viewminute);

		//Pause - play
		var node_pause_play = Item_first.childNodes[5];
		node_pause_play.innerHTML = "pause";
		node_pause_play.addEventListener("click", function(){
			pauseAndPlay(node_pause_play)
		})

		startTime = setInterval(runTime, 1000);

	}
}

window.onload = init;