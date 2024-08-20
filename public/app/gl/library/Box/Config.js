Ext.define('Gl.library.box.Config', {
    moduleName:'gl',
    _module:'gl',
    _viewFolder:'Gl.view.',
    _controllerName:null,
    MAX_YEAR:2050,
    MIN_YEAR:1800,
    DATE_FORMAT:'d-m-Y',
    DATE_SUBMITFORMAT:'Y-m-d',
    MAX_HOUR_LEN:2,
    MAX_MINUTE_LEN:2,
    constructor: function(options) {
        Ext.apply(this, options || {});
        var me = this;
        me._viewFolder = me._viewFolder+''+me._controllerName+'.';
    },
    getViewFolder:function(){
        return this._viewFolder;
    }
    
    
});


