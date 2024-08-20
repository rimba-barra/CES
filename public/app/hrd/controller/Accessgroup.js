Ext.define('Hrd.controller.Accessgroup', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Accessgroup',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'accessgroup',
    fieldName: 'accessgroup',
    bindPrefixName: 'Accessgroup',
    formWidth: 600,
    //header_id: 0,
    oldbobot:0,	
    dynamicrequest: null,
    localStore: {},
    refs: [
    ],
    constructor: function (configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function () {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();
    },	
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);
        
        var x = {
            init: function () {

            },
            create: function () {
                me.unMask(1);
            },
            update: function () {
                me.unMask(1);
				
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
    mainDataSave: function () {
        var me = this;
        var f = me.getFormdata();
        var formdata = f.getForm();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
        if (formdata.isValid()) {
            me.insSave({
                form: f,
                grid: g,
                finalData: function (data) {
                    //data["details"] = me.getGriddetail().getJson();
                    return data;
                },
                sync: true,
                callback: {
                    create: function (store, form, grid) {

                    }
                }
            });
        }


    }
});