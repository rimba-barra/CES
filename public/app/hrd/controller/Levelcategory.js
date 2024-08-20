/*  JS CONTROLLER FOR 'Competency Level' */

Ext.define('Hrd.controller.Levelcategory', {
    extend          : 'Hrd.library.box.controller.Controller',
    alias           : 'controller.Levelcategory',
    requires        : [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
    controllerName  : 'levelcategory',
    fieldName       : 'levelcategory_id',
    bindPrefixName  : 'Levelcategory',
    formWidth       : 500,
    localStore      : {},
    
    constructor         : function(configs) {
        var me      = this;
        var config  = new Hrd.library.box.tools.DefaultConfig ({
            moduleName  : me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init                : function() {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools    = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var newEvs  = {};

        this.control(newEvs);
    },

    fdar                : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        
        me.setActiveForm(f);
        f.setLoading(false);
        ;
        var x   = {
            init    : function() {

            },
            create  : function() {
                me.unMask(1)
            },
            update  : function() {
                me.unMask(1)
                var g   = me.getGrid();
                var rec = g.getSelectedRecord();
                
                if (rec) {
                    f.editedRow = g.getSelectedRow();
                    f.loadRecord(rec);
                }
            }
        };
        return x;
    },
    
    mainDataSave        : function() {
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
                create: function(store, form, grid) {

                }
            }
        });
    },
});