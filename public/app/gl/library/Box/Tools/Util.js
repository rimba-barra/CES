Ext.define('Gl.library.box.tools.Util', {
    number: function(number) {
        var me = this;
        var x = {
            /*@charCount => 100 -> 3 char count
         *              1250-> 4 char count
         *           => default ->2
         * */
            addZero: function(charCount) {
                number = this.cast(number);
                var cc = 2; // set default to puluhan
                if (charCount) {
                    cc = charCount;
                }
                
                var str = number/(10^charCount);
                str = str.toString();
               
                if (number < 10^charCount) {
                    number = this._getZeroChar(str.split("0").length - 1) + number;
                }
                return number;
            },
            /* make sure number is real number*/
            cast: function(char) {
                var n = parseInt(char);
                n = isNaN(n) ? 0 : n;
                return n;

            },
            _getZeroChar:function(count){
                var str = '';
                for(var i=0;i<count;i++){
                    str += '0';
                }
                return str;
            }
        }
        
        return x;
        

    }
});