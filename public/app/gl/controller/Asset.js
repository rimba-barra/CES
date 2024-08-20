Ext.define('Gl.controller.Asset', {
    extend: 'Gl.library.box.controller.Controller',
    alias: 'controller.Asset',
    requires: ['Gl.library.box.tools.Tools','Gl.library.box.tools.DefaultConfig', 'Gl.library.box.tools.EventSelector', 'Gl.library.Box.Tools.Browse'],
    controllerName: 'asset',
    fieldName: 'asset_id',
    bindPrefixName: 'Asset',
    formWidth: 500,
    localStore: {},
    constructor: function(configs) {
        var me = this;
        var config = new Gl.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        var events = new Gl.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Gl.library.box.tools.Tools({config: me.myConfig});
        var newEvs = {};
        
        this.control(newEvs);

    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);
        f.setLoading(false);
        ;
        var x = {
            init: function() {
            },
            create: function() {
               me.unMask(1)
            },
            update: function() {
               me.unMask(1)
               var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if (rec) {
                     f.editedRow = g.getSelectedRow();
                     f.loadRecord(rec);
                }
            }
        };
        return x;
    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata(); // untuk mendapatkan data dari form
        var g = me.getGrid(); // untuk mendapatkan data dari grid
        var s = g.getStore(); // untuk mendapatkan data dari store
        var row = f.editedRow; // untuk mendapatkan data dari grid terhadap row

        me.insSave({
            form: f,
            grid: g,
            finalData: function(data) {
                
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },

});