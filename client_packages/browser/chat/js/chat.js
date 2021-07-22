let chat =
{
	size: 0,
	container: null,
	input: null,
	enabled: false,
    active: true,
    timer: null,
    previous: "",
	hide_chat: 5000 // 15 - seconds
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
        chat.container.append("<li>" + text + "</li>");
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
    for (let i = 0; i < 20; i++) {
        chatAPI.push('');
    }
    chatAPI.push('Приветствуем вас на Trinity RPG! Приятной игры!!!');
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
                    chat.previous = value;
                    if (value[0] == "/") {
                        value = value.substr(1);

                        if (value.length > 0 && value.length <= 100)
                            mp.invoke("command", value);
                    }
                    else {
                        if (value.length <= 100)
                            mp.invoke("chatMessage", value);
                    }
                }
                enableChatInput(false);
                hide();
            }
            else if (event.which == 27) {
                enableChatInput(false);
                hide();
            }
            else if (event.which == 117) {
                enableChatInput(false);
                hide();
            }
            else if (event.which == 38) {
                chat.input.children("input").val(chat.previous);
            }
        }
    });
});

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