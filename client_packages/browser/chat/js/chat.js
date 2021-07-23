let chat =
{
	size: 0,
	container: null,
	input: null,
	enabled: false,
    active: true,
    timestamp: true,
    timer: null,
    previous: [],
    previous_count: 0,
	hide_chat: 10000
};

function enableChatInput(enable)
{
	if(chat.active == false
		&& enable == true)
		return;
    if (enable != (chat.input != null))
	{
        mp.invoke("focus", enable);
        if (enable)
        {
            $("#chat").css("opacity", 1);
            chat.input = $("#chat").append('<div><input id="chat_msg" type="text" /></div>').children(":last");
            chat.input.children("input").focus();
            mp.trigger("changeChatState", true);
        }
		else
		{
            chat.input.fadeOut('fast', function()
			{
                chat.input.remove();
                chat.input = null;
                mp.trigger("changeChatState", false);
            });
        }
    }
}

let chatAPI =
{
	push: (text) =>
	{
		chat.size++;
		if (chat.size >= 50)
		{
			chat.container.children(":first").remove();
        }
        if (chat.timestamp){
            let date = new Date();  
            let options = {   
                hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
            };  
            chat.container.append("<li>[" + date.toLocaleTimeString("en-us", options) + "] " + text + "</li>");
        } else {
            chat.container.append("<li>" + text + "</li>");
        }
        chat.container.scrollTop(9999);
	},
	clear: () =>
	{
		chat.container.html("");
	},
	activate: (toggle) =>
	{
		if (toggle == false
			&& (chat.input != null))
			enableChatInput(false);

		chat.active = toggle;
	},
	show: (toggle) =>
	{
		if(toggle)
			$("#chat").show();
		else
			$("#chat").hide();

		chat.active = toggle;
	}
};
function hide() {
    chat.timer = setTimeout(function () {
        $("#chat").css("opacity", 0.5);
		$("#chat_messages").css("overflow",'hidden');
    }, chat.hide_chat);
}
function show() {
    clearTimeout(chat.timer);
    $("#chat").css("opacity", 1);
	$("#chat_messages").css("overflow",'overlay');
}
$(document).ready(function()
{
    chat.container = $("#chat ul#chat_messages");
    hide();
    $(".ui_element").show();
    pushWelcomeMessage();
    chat.previous.push(' ');
    $("body").keydown(function(event)
    {   
        if (chat.input == null && chat.active == true) {
            if (event.which == 84 || event.which == 117 && chat.input == null && chat.active == true) {
                enableChatInput(true);
                event.preventDefault();
                show();
            }
        } else {
            if (event.which == 13) {
                var value = chat.input.children("input").val();
                
                if (value.length > 0) {
                    chat.previous = chat.previous.reverse()
                    chat.previous.push(value);
                    chat.previous = chat.previous.reverse()
                    if (value[0] == "/") {
                        value = value.substr(1);

                        if (value.length > 0 && value.length <= 100){
                            if (value.match(/fontsize (.+)/)){
                                $("#chat ul#chat_messages").css("font-size", value.match(/fontsize (.+)/)[1] + 'px');
                            } else if (value.match(/fontsize (.+)/)){
                                $("#chat ul#chat_messages").css("height", value.match(/pagesize (.+)/)[1] + 'px');
                            } else if (value == 'timestamp'){
                                if (chat.timestamp == true){
                                    chat.timestamp = false
                                } else {
                                    chat.timestamp = true
                                }
                            } else {
                                mp.invoke("command", value);
                            }
                        }
                    }
                    else {
                        if (value.length <= 100)
                            mp.invoke("chatMessage", value);
                    }
                }
                enableChatInput(false);
                hide();
                chat.previous_count = 0;
            }
            else if (event.which == 27) {
                enableChatInput(false);
                hide();
                chat.previous_count = 0;
            }
            else if (event.which == 117) {
                enableChatInput(false);
                hide();
                chat.previous_count = 0;
            }
            else if (event.which == 38) {
                if (chat.previous_count <= chat.previous.length){
                    chat.input.children("input").val(chat.previous[chat.previous_count]);
                    chat.previous_count = chat.previous_count + 1;
                }
            }
            else if (event.which == 40) {
                if (chat.previous_count > -1){
                    chat.input.children("input").val(chat.previous[chat.previous_count]);
                    chat.previous_count = chat.previous_count - 1;
                }
            }
        }
    });
});

function pushWelcomeMessage() {
    let text_to_send = '- '
    for (let i = 0; i < 20; i++) {
        chatAPI.push(text_to_send);
        text_to_send = text_to_send + '- - - '
    }
    chatAPI.push('Приветствуем вас на Trinity RPG! Приятной игры!');
    chatAPI.push(text_to_send);
}

let api = {"chat:push": chatAPI.push, "chat:clear": chatAPI.clear, "chat:activate": chatAPI.activate, "chat:show": chatAPI.show};
for(let fn in api)
{
    mp.events.add(fn, api[fn]);
}

// chatAPI.push("Multiplayer started");
// chatAPI.push("Multiplayer started");
// chatAPI.push("Multiplayer started");
// for (let i = 0; i < 5; i++) {
//     chatAPI.push("");
// }