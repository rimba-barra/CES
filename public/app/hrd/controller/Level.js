/*  JS CONTROLLER FOR 'Level' */

Ext.define('Hrd.controller.Level', {
    extend          : 'Hrd.library.box.controller.Controller',
    alias           : 'controller.Level',
    requires        : [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
    controllerName  : 'level',
    fieldName       : 'level_id',
    bindPrefixName  : 'Level',
    formWidth       : 500,
    localStore      : {},

    constructor     : function(configs) {
        var me      = this;
        var config  = new Hrd.library.box.tools.DefaultConfig ({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init            : function() {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools    = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var newEvs  = {};
        this.control(newEvs);
    },

    fdar            : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        
        me.setActiveForm(f);
        f.setLoading(false);
        ;
        
        var x   = {
            init    : function() {},
            create  : function() {
               me.unMask(1);
               me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                    /* panggil wesea untuk proses hasil master table */
                        me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                        me.tools.wesea(data.levelcategory, f.down("[name=level_category_id]")).comboBox();
                    }
                }).read('listcat');
            },
            update  : function() {
               me.unMask(1);

               me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                    /* panggil wesea untuk proses hasil master table */
                        me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                        me.tools.wesea(data.levelcategory, f.down("[name=level_category_id]")).comboBox();
                        
                        var g   = me.getGrid();
                        var rec = g.getSelectedRecord();
                        if (rec) {
                            f.editedRow = g.getSelectedRow();
                            f.loadRecord(rec);
                        }
                    }
                }).read('listcat');
            }
        };

        return x;
    },

    mainDataSave    : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        var s   = g.getStore();
        var row = f.editedRow;

        me.insSave ({
            form        : f,
            grid        : g,
            finalData   : function(data) {                
                return data;
            },
            sync        : true,
            callback    : {
                create  : function(store, form, grid) {}
            }
        });
    },
});