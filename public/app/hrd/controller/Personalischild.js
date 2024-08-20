Ext.define('Hrd.controller.Personalischild', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Personalischild',
    controllerName: 'personalischild',
    fieldName: 'nomor',
    bindPrefixName: 'Personalischild',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    dynamicrequest: null,
    refs: [
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();

        newEvs['personalischildgrid button[action=checked]'] = {
            click: function () {
                me.Checked();
            },
        };
        newEvs['personalischildgrid button[action=unchecked]'] = {
            click: function () {
                me.Unchecked();
            },
        };
        
        this.control(newEvs);
     
        
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
            }
        }).read('detail');
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
                        
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        console.log(rec.get('private'));
                        
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },
    Checked: function () {
        var me, grid, store, counter, rows, recordcounttext, record, rowdata, data,form;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        
        if (counter > 0) {
            rows = grid.getSelectionModel().getSelection();
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            data = [];
            for (var i = 0; i < rows.length; i++) {
                record = rows[i];
                rowdata = record.raw.personalischild.employee_id;
                data[i] = rowdata;
            }
            grid.up('window').body.mask('Saving, please wait ...');
            me.tools.ajax({
                params: {"data": Ext.JSON.encode(data)},
                success: function (data, model) {
                
                grid.up('window').body.unmask();
                me.getGrid().getStore().reload();
                    
                }
            }).read('checkedemployee');            
        } else {
            me.dynamicrequest.buildWarningAlert("Process failed,no data in this grid");
        }


    },
    Unchecked: function () {
        var me, grid, store, counter, rows, recordcounttext, record, rowdata, data,form;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        
        if (counter > 0) {
            rows = grid.getSelectionModel().getSelection();
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            data = [];
            for (var i = 0; i < rows.length; i++) {
                record = rows[i];
                rowdata = record.raw.personalischild.employee_id;
                data[i] = rowdata;
            }
            grid.up('window').body.mask('Saving, please wait ...');
            me.tools.ajax({
                params: {"data": Ext.JSON.encode(data)},
                success: function (data, model) {
                
                grid.up('window').body.unmask();
                me.getGrid().getStore().reload();
                    
                }
            }).read('uncheckedemployee');            
        } else {
            me.dynamicrequest.buildWarningAlert("Process failed,no data in this grid");
        }


    },
});