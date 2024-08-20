Ext.define('Hrd.controller.Hcreportlog', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Hcreportlog',
    controllerName: 'hcreportlog',
    fieldName: 'log_hcreport_id',
    bindPrefixName: 'Hcreportlog',
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['hcreportloggrid [action=downloadLog]'] = {
            click: function() {
               me.downloadLog();
            }
        };
        

        
        this.control(newEvs);
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
            update: function() {
                var rec = g.getSelectedRecord();
                f.editedRow = g.getSelectedRow();
                f.getForm().loadRecord(rec);

                me.unMask(1);
            }
        };
        return x;
    },
    downloadLog: function () {
        console.log("downloadLog");
        var me = this;
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var filename = rec.data.filename;
        var url ="app/hrd/uploads/report/";

        Ext.Msg.show({
            title: 'Info',
            msg: '<a href="' + url + filename+'" target="blank">Download file</a>',
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
            }
        });
        
    },
});