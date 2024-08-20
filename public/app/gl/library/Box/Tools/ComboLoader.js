Ext.define('Gl.library.box.tools.ComboLoader', {
    formSearch: null,
    formData: null,
    mainPanel: null,
    isLoading: false,
    loadedCount: 0,
    callback:null,
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    doneCallback: function() {
        var me = this;
        me.loadedCount--;
        if (me.isLoading && me.loadedCount == 0) {
            me.mainPanel.setLoading(false);
            me.isLoading = false;
            if(typeof me.callback ==="function"){
                me.callback();
            }
        }
    },
    run: function(controllerName) {
        var me = this;
        var mp = me.mainPanel;
        var arLoad = [];
        if (me.formData) {
            var f = me.formData;
            var pl = null;
            var arLoad = [];
            f.items.each(function(el) {
                pl = el.preLoad;
                if (pl) { /// allow preload
                    arLoad.push({name:el.name,form:'fd'});
                    me.loadedCount++;
                }
            });
        }
        


        if (me.formSearch) {
            var f = me.formSearch;
            var pl = null;
            
            f.items.each(function(el) {
                pl = el.preLoad;
                if (pl) { /// allow preload
                    arLoad.push({name:el.name,form:'fs'});
                    me.loadedCount++;
                }
            });


        }
        
        if (mp && me.loadedCount > 0) {
            mp.setLoading("Please wait...");
            me.isLoading = true;
        }
        f = null;
        for (var x in arLoad) {
            f = arLoad[x]['form']=='fs'?me.formSearch:me.formData;
            var cmp = f.down("[name=" + arLoad[x]['name'] + "]");
            if (cmp) {
                cmp.bindPrefixName = controllerName;
                cmp.doInit(true, function() {

                    me.doneCallback();
                });
            }
        }
    }
});