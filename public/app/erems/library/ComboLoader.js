Ext.define("Erems.library.ComboLoader", {
    currentLoaded: 0,
    loadedCount: 0,
    form: null,
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    start: function() {
        if (this.loadedCount > 0 && this.form) {
            this.form.setLoading(this.getLoadingText());
        }

    },
    getLoadingText:function(){
        return "Loading data ... "+this.currentLoaded+"/"+this.loadedCount;
    },
    end: function() {
        this.form.setLoading(false);
        this.currentLoaded = 0;
        if (typeof this.doneFunc === "function") {
            this.doneFunc();
        }
    },
    doneFunc: null,
    checkLoadedData: function() {
        var me = this;
        me.currentLoaded++;
        this.form.setLoading(this.getLoadingText());
        if (me.currentLoaded == me.loadedCount) {
            this.end();

        }
    },
    run: function(cb, controller) {
        var me = this;
        var f = this.form;
        for (var i in cb) {

            f.down("[name=" + cb[i] + "]").bindPrefixName = controller.controllerName;
            f.down("[name=" + cb[i] + "]").doInit(true, function() {
                me.checkLoadedData();
            });


        }
    }
});



