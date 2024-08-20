Ext.define('Erems.library.CleanText', {
	copyPaste : function(str=''){
	    str = this.clean_1(str);
	    str = this.clean_2(str);
	    str = this.clean_3(str);

		return str;
	},
	clean_1 : function(str){
		str = str.replace(/<o:p>\s*<\/o:p>/g, "") ;
		str = str.replace(/<o:p>.*?<\/o:p>/g, "&nbsp;") ;
		str = str.replace( /\s*mso-[^:]+:[^;"]+;?/gi, "" ) ;
		str = str.replace( /\s*MARGIN: 0cm 0cm 0pt\s*;/gi, "" ) ;
		str = str.replace( /\s*MARGIN: 0cm 0cm 0pt\s*"/gi, "\"" ) ;
		str = str.replace( /\s*TEXT-INDENT: 0cm\s*;/gi, "" ) ;
		str = str.replace( /\s*TEXT-INDENT: 0cm\s*"/gi, "\"" ) ;
		str = str.replace( /\s*TEXT-ALIGN: [^\s;]+;?"/gi, "\"" ) ;
		str = str.replace( /\s*PAGE-BREAK-BEFORE: [^\s;]+;?"/gi, "\"" ) ;
		str = str.replace( /\s*FONT-VARIANT: [^\s;]+;?"/gi, "\"" ) ;
		str = str.replace( /\s*tab-stops:[^;"]*;?/gi, "" ) ;
		str = str.replace( /\s*tab-stops:[^"]*/gi, "" ) ;
		str = str.replace( /\s*face="[^"]*"/gi, "" ) ;
		str = str.replace( /\s*face=[^ >]*/gi, "" ) ;
		str = str.replace( /\s*FONT-FAMILY:[^;"]*;?/gi, "" ) ;
		str = str.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3") ;
		str = str.replace( /<(\w[^>]*) style="([^\"]*)"([^>]*)/gi, "<$1$3" ) ;
		str = str.replace( /\s*style="\s*"/gi, '' ) ; 
		str = str.replace( /<SPAN\s*[^>]*>\s*&nbsp;\s*<\/SPAN>/gi, '&nbsp;' ) ; 
		str = str.replace( /<SPAN\s*[^>]*><\/SPAN>/gi, '' ) ; 
		str = str.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3") ; 
		str = str.replace( /<SPAN\s*>(.*?)<\/SPAN>/gi, '$1' ) ; 
		str = str.replace( /<FONT\s*>(.*?)<\/FONT>/gi, '$1' ) ;
		str = str.replace(/<\\?\?xml[^>]*>/gi, "") ; 
		str = str.replace(/<\/?\w+:[^>]*>/gi, "") ; 
		str = str.replace( /<H\d>\s*<\/H\d>/gi, '' ) ;
		str = str.replace( /<H1([^>]*)>/gi, '' ) ;
		str = str.replace( /<H2([^>]*)>/gi, '' ) ;
		str = str.replace( /<H3([^>]*)>/gi, '' ) ;
		str = str.replace( /<H4([^>]*)>/gi, '' ) ;
		str = str.replace( /<H5([^>]*)>/gi, '' ) ;
		str = str.replace( /<H6([^>]*)>/gi, '' ) ;
		str = str.replace( /<\/H\d>/gi, '<br>' ) ; //remove this to take out breaks where Heading tags were 
		str = str.replace( /<(U|I|STRIKE)>&nbsp;<\/\1>/g, '&nbsp;' ) ;
		str = str.replace( /<(B|b)>&nbsp;<\/\b|B>/g, '' ) ;
		str = str.replace( /<([^\s>]+)[^>]*>\s*<\/\1>/g, '' ) ;
		str = str.replace( /<([^\s>]+)[^>]*>\s*<\/\1>/g, '' ) ;
		str = str.replace( /<([^\s>]+)[^>]*>\s*<\/\1>/g, '' ) ;

		//some RegEx code for the picky browsers
		var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)","gi") ;
		str = str.replace( re, "<div$2</div>" ) ;
		var re2 = new RegExp("(<font|<FONT)([^*>]*>.*?)(<\/FONT>|<\/font>)","gi") ; 
		str = str.replace( re2, "<div$2</div>") ;
		str = str.replace( /size|SIZE = ([\d]{1})/g, '' ) ;

		// Remove additional MS Word content
	    str = str.replace(/<(\/)*(\\?xml:|meta|link|span|font|del|ins|st1:|[ovwxp]:)((.|\s)*?)>/gi, ''); // Unwanted tags
	    str = str.replace(/(class|style|type|start)=("(.*?)"|(\w*))/gi, ''); // Unwanted sttributes
	    str = str.replace(/<style(.*?)style>/gi, '');   // Style tags
	    str = str.replace(/<script(.*?)script>/gi, ''); // Script tags
	    str = str.replace(/<!--(.*?)-->/gi, '');        // HTML comments

		return str;
	},
	clean_2 : function(str){
		// 1. Remove line breaks / Mso classes
	    var stringStripper = /(\r| class=(")?Mso[a-zA-Z]+(")?)/g;
	    str = str.replace(stringStripper, ' ');

	    // 2. Strip Word generated HTML comments
	    var commentSripper = new RegExp('<!--(.*?)-->', 'g');
	    str = str.replace(commentSripper, '');


	    // 3. Remove tags leave content if any
	    var tagStripper = new RegExp('<(/)*(meta|link|\\?xml:|st1:|o:|font)(.*?)>', 'gi');
	    str = str.replace(tagStripper, '');

	    // 4. Remove everything in between and including tags '<style(.)style(.)>'
	    var badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'];
	    for (var i = 0; i < badTags.length; i++) {
	        tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
	        str = str.replace(tagStripper, '');
	    }

	    // 5. Remove any unwanted styling
	    // NOTE: Add your own list of 'blacklisted' css attributes here
	    var badStyling = ['margin-top:', 'margin-bottom:', 'line-height:', 'mso-fareast-font-family:&quot;', 'font-weight:', 'margin:'];
	    for (var i = 0; i < badStyling.length; i++) {
	        attrStripper = new RegExp('(' + badStyling[i] + ')([^;]*)+[^]', 'gm');
	        str = str.replace(attrStripper, '');
	    }

	    // 6. Remove any unwanted attributes
	    var badAttributes = ['start'];
	    for (var i = 0; i < badAttributes.length; i++) {
	        var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
	        str = str.replace(attributeStripper, '');
	    }
	    return str;
	},
	clean_3 : function(str) {
	    var cleanString = "";
	    var insideTag = false;
	    for (var i = 0, len = str.length; i < len; i++) {
	        if (str.charAt(i) == "<") insideTag = true;
	        if (str.charAt(i) == ">") {
	            if (str.charAt(i+1) != "<") {
	                insideTag = false;
	                i++;
	            }
	        }
	        if (!insideTag) cleanString += str.charAt(i);
	    }

	    return cleanString;
	}
});