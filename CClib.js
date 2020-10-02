var speaker = new p5.Speech();

function listent() {
  let lang = navigator.language || 'en-US';
  var speech = new p5.SpeechRec(lang); // speech recognition object (will prompt for mic access)
  speech.onResult = showResult; // bind callback function to trigger when speech is recognized
  speech.start(); // start listening
  function showResult() {

    if (speech.resultValue) {
      console.log(speech.resultString); // log the result
      let msg = speech.resultString;
      sendUserMessage(msg);
      respond(msg);
    }

  }
  
  

  //console.log("clicked");

}




function getTime() {
  let h = hour();
  let m = minute();
  let ampm = h <= 12 ? "AM" : "PM"
  return "" + h % 12 + ":" + m + " " + ampm
}

function escape(txt) {
  let newtxt = "";
  for (let char in txt) {
    char = txt.charAt(char);
    if (char == "<") {
      newtxt += "&lt"
    } else if (char == ">") {
      newtxt += "&gt"
    } else newtxt += char
  }
  return newtxt
}

function sendMessage(msg) {
  if (msg != "") {

    setTimeout(() => {
      let reply = createDiv('<div class="chat_imgL"><img src="https://iamashwin99.github.io/Chuki-Chat-Library/Chuki.webp" alt="Avatar" class="right" style="width:100%;"></div><div class="container sb2"><p class="left-txt">'+msg+'</p><span class="time-right">'+ getTime() +'</span></div></div>'); 
      reply.parent("txtScreen");

      select("#msg").value("");
      let objDiv = document.getElementById("txtScreen");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 1000);
  }
  
  
  speaker.speak(msg);
}

function sendUserMessage(msg) {
  msg = escape(msg);
  let div = createDiv('<div class="chat_imgR"><img src="https://iamashwin99.github.io/Chuki-Chat-Library/user.webp" alt="Avatar" class="right" style="width:100%;"></div><div class="container sb1"><p class="right-txt">'+msg+'</p><span class="time-left">'+ getTime() +'</span></div></div>');
  div.parent("txtScreen");  
  let objDiv = document.getElementById("txtScreen");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function send() {
  let msg = select("#msg").value();
  if (msg != "") {
    sendUserMessage(msg);
    respond(msg);
  }
}

function keyPressed() {
  if (keyCode == 13) {
    send()
  }
}
