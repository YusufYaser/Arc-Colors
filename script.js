const vars = [
    "--arc-palette-background",
    "--arc-palette-focus",
    "--arc-palette-cutoutColor",
    "--arc-background-gradient-color1",
    "--arc-background-gradient-color0",
    "--arc-palette-backgroundExtra",
    "--arc-palette-subtitle",
    "--arc-palette-foregroundSecondary",
    "--arc-palette-foregroundTertiary",
    "--arc-palette-foregroundPrimary",
    "--arc-palette-maxContrastColor",
    "--arc-palette-title",
    "--arc-palette-minContrastColor",
    "--arc-palette-hover"
]

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
// :P
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
}

window.onload = function () {
    let content = document.getElementById("content")
    
    vars.forEach((v) => {
        let div = document.createElement("div")
        div.style.backgroundColor = `var(${v})`
        div.className = "item"
        div.innerText = v

        div.addEventListener('click', function () {
            copyTextToClipboard(v)
        })

        content.appendChild(div)
    })
}
