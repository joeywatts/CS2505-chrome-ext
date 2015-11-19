// font-awesome fix.
(function() {
	var fa = document.createElement('style');
	fa.type = 'text/css';
	fa.textContent = '@font-face { font-family: FontAwesome; src: url("'
        + chrome.extension.getURL('font-awesome-4.4.0/fonts/fontawesome-webfont.woff?v=4.4.0')
        + '"); }';
	document.head.appendChild(fa);
})();

$(function() {
	// http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
	function copyTextToClipboard(text) {
		var textArea = document.createElement("textarea");
		// Place in top-left corner of screen regardless of scroll position.
		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;
		// Ensure it has a small width and height. Setting to 1px / 1em
		// doesn't work as this gives a negative w/h on some browsers.
		textArea.style.width = '2em';
		textArea.style.height = '2em';
		// We don't need padding, reducing the size if it does flash render.
		textArea.style.padding = 0;
		// Clean up any borders.
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';
		// Avoid flash of white box if rendered for any reason.
		textArea.style.background = 'transparent';
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		var success = false;
		try {
			success = !!document.execCommand('copy');
		} catch (err) {
			success = false;
		}
		document.body.removeChild(textArea);
		return success;
	}
	function createElement(links, tr) {
		var str = '';
		for (var i = 0; i < links.length; i++) {
			str += 'curl -O "' + links[i] + '"; ';
		}
		return $('<div style="position: absolute; top: 4px; right: 4px;"></div').append(
			$('<a style="text-align: center; vertical-align: middle;"><i class="fa fa-download"></i></a>')
				.css('cursor', 'pointer')
				.hover(function() {
					$(this).css('color', 'green');
				}, function() {
					$(this).css('color', 'black');
				})
				.click(function() {
					if (copyTextToClipboard(str)) {
						$(this).notify("Copied! Paste into a Linux terminal!", {className: "success", position: "bottom center"});
					} else {
						$(this).notify("Failed!", {className: "error", position: "bottom center"});
					}
				}));
	}
	$('body').removeAttr('background');
	$('#table1 > tbody > tr').each(function(idx, tr) {
		var links = [];
		$(tr).children().eq(2).find('a').each(function() {
			links.push(this.href);
		});
		if (links.length) {
			$(tr).children().eq(1).css('position', 'relative').append(createElement(links));
		}
	});
});
