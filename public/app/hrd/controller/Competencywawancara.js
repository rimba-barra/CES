Ext.define('Hrd.controller.Competencywawancara', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Competencywawancara',
    controllerName: 'competencywawancara',
    fieldName: 'name',
    bindPrefixName: 'Competencywawancara',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        
        this.control(newEvs);
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                me.tools.wesea(data.levelcategory, f.down("[name=level_category_id]")).comboBox();
                console.log(data.competencynames);
            }
        }).read('listcat');
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                        me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                        me.tools.wesea(data.levelcategory, f.down("[name=level_category_id]")).comboBox();
                        console.log(data.competencynames);
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
                        me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
                        me.tools.wesea(data.levelcategory, f.down("[name=level_category_id]")).comboBox();
                        var g   = me.getGrid();
                        var rec = g.getSelectedRecord();
                        console.log(data.competencynames);
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
});