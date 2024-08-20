Ext.define('Erems.library.TypeRounding', {
	init : function() {},
	rounding : function(type, value){
        if(type == 1){ /// round
            value = Math.round(value);
        }
        else if(type == 2){ /// floor
            value = Math.floor(value);
        }
        else if(type == 3){ ///ceil
            value = Math.ceil(value);
        }
        value = accounting.toFixed(value, 2);
        
        return parseFloat(value);
	}
});