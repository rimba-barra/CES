/*  JS CONTROLLER FOR 'Perspective Percentage' */

Ext.define('Hrd.controller.Perspectivepercentage', {
    extend          : 'Hrd.library.box.controller.Controller',
    alias           : 'controller.Perspectivepercentage',
    requires        : [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
    views           : ['Hrd.view.perspectivepercentage.FormDetail'],
    controllerName  : 'perspectivepercentage',
    fieldName       : 'perspective_percentage_id',
    bindPrefixName  : 'Perspectivepercentage',
    formWidth       : 600,
    localStore      : {},
    refs            : [{
        ref         : 'griddetail',
        selector    : 'perspectivepercentagegriddetail'
    }, {
        ref         : 'formdetail',
        selector    : 'perspectivepercentageformdetail'
    }],
    
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

        newEvs['perspectivepercentageformdata button[action=addperspective]'] = {
            click: function() {
                me.addNewPerspective();
            }
        }

        newEvs['perspectivepercentageformdetail'] = {
            afterrender: this.formdetailafterrender
        }

        newEvs['perspectivepercentageformdetail button[action=save]'] = {
            click: function() {
                me.addDetail();
            }
        }

        this.control(newEvs);
    },

    addNewPerspective   : function() {
        var me          = this;
        var formdata    = me.getFormdata();
        var project     = formdata.down("[name=project_id]").getRawValue();
        var pt          = formdata.down("[name=pt_id]").getRawValue();
        var dept        = formdata.down("[name=department_id]").getRawValue();

        if (project != '' || pt != '' || dept != '') {
            var win = new Ext.Window ({
                title       : 'Add Perspective',
                modal       : true,
                closable    : true,
                left        : 5,
                top         : 5,
                id          : 'add_detail',
                width       : 400,
                height      : 400,
                layout      : 'fit',
                autoScroll  : true,
                items       : [{
                    xtype   : 'perspectivepercentageformdetail'
                }]
            });
            win.show();
        } else {
            win.close();
        }
    },

    formdetailafterrender  : function() {
        var me      = this;
        var fd      = me.getFormdata();
        var fdd     = me.getFormdetail();
        var project = fd.down("[name=project_id]").getRawValue();
        var pt      = fd.down("[name=pt_id]").getRawValue();
        var dept    = fd.down("[name=department_id]").getRawValue();
        var gd      = me.getGriddetail();

        fdd.down("[name=project_id]").setValue(project);
        fdd.down("[name=pt_id]").setValue(pt);
        fdd.down("[name=department_id]").setValue(dept);
        fdd.down("[name=perspective_id]").getStore().load();

        me.tools.ajax({
            params      : {},
            success     : function(data, model) {
                me.tools.wesea(data.perspective, fdd.down("[name=perspective_id]")).comboBox();
            }
        }).read('perspectivedata');
    },
    
    addDetail           : function() {
        var me      = this;
        var fd      = me.getFormdata();
        var fdd     = me.getFormdetail();
        var gd      = me.getGriddetail();
        var win     = fdd.up('window');
        var psp     = fdd.down("[name=perspective]").getRawValue();
        var per     = fdd.down("[name=percentage]").getValue();
        // var code    = fdd.down("[name=code]").getValue();

        var sgd = gd.getStore();
        sgd.add({
            // code            : code,
            perspective     : psp,
            percentage      : per
        });

       
        win.close();
        store.add(psp);
    },

    fdar                : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        
        me.setActiveForm(f);
        f.setLoading(false);
        f.down("button[action=addperspective]").setDisabled(true);
        ;
        var x   = {
            init    : function() {

            },
            create  : function() {
                me.unMask(1);
                me.tools.ajax ({
                    params      : {},
                    success     : function(data, model) {
                        var gd  = me.getGriddetail();

                        me.tools.wesea(data.project, f.down("[name=project_id]")).comboBox();
                        me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();
                        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();

                        gd.doInit();
                        gd.getStore().load({
                            params  : {
                                perspective_id  : 0,
                                percentage      : 0
                            },

                            callback: function(recs,op) {
                                gd.attachModel(op);
                                f.down("button[action=addperspective]").setDisabled(false);
                            }
                        });
                        
                    }
                }).read('headerdata');
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