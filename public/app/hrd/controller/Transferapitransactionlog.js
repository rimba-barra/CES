Ext.define('Hrd.controller.Transferapitransactionlog', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Transferapitransactionlog',
    controllerName: 'transferapitransactionlog',
    fieldName: 'name',
    bindPrefixName: 'Transferapitransactionlog',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    refs:[
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['transferapitransactionloggrid [action=downloadLog]'] = {
            click: function() {
               me.downloadLog();
            }
        };
        

        
        this.control(newEvs);
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.companycherry, f.down("[name=pt_id]")).comboBox();
            }
        }).read('getTransaction');
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var gt = me.getGridtrans();
        me.setActiveForm(f);
        var rec_empid = g.getSelectedRecord();
        var employee_id = rec_empid.data['employee_id'];
        // console.log(rec.data['employee_id']);
        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                        employee_id: employee_id
                    },
                    success: function(data, model) {
                        me.tools.wesea({data: data, model: model}, gt).grid();
                    }
                }).read('getTransaction');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                        employee_id: employee_id
                    },
                    success: function(data, model) {
                        me.tools.wesea({data: data, model: model}, gt).grid();
                        // me.tools.wesea({data: data, model: model}, g).grid();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        // me.empExist();
                        console.log(rec.get('private'));
                    }
                }).read('getTransaction');


                me.unMask(1);

            }
        };
        return x;
    },
    downloadLog: function () {
        var me = this;
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var process_log_process_id = rec.data.log_process_id;
        var process_api = rec.data.data;
        var process_api_model = rec.data.data;
        console.log(process_log_process_id+' - '+process_api+' - '+process_api_model);
 
        var formvalue = rec.data;

        g.setLoading("Please wait");

        me.tools.ajax({
            params: {},
            params: {
                data: Ext.encode(formvalue)
            },
            success: function (data, model) {
                g.setLoading(false);
                url = data['others'][1]['directdata'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                        }
                    });
                }
            }
        }).read('exportdata');  
        
    },

   
});