Ext.define('Hrd.controller.Contohjobfamily', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Contohjobfamily',
    controllerName: 'contohjobfamily',
    fieldName: 'name',
    bindPrefixName: 'Contohjobfamily',
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
                me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_id]")).comboBox();
                console.log(data.jobfamily);
            }
        }).read('listjob');
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
                        me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_id]")).comboBox();
                        console.log(data.jobfamily);
                    }
                }).read('listjob');
            },
            update  : function() {
               me.unMask(1);

               me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                    /* panggil wesea untuk proses hasil master table */
                        me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_id]")).comboBox();
                        
                        var g   = me.getGrid();
                        var rec = g.getSelectedRecord();
                        console.log(data.jobfamily);
                        if (rec) {
                            f.editedRow = g.getSelectedRow();
                            f.loadRecord(rec);
                        }
                    }
                }).read('listjob');
            }
        };
        return x;
    },
});