Ext.define('Cashier.controller.Masterformatreportlr', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectptcombobox',
        'Cashier.library.template.combobox.Coacombobox'
    ],
    alias: 'controller.masterformatreportlr',
    views: [
        'masterformatreportlr.Grid',
        'masterformatreportlr.FormData',
        'masterformatreportlr.Panel'
    ],
    stores: [
        'Masterformatreportlr',
        'Projectpt',
        'Coa'
    ],
    models: [
        'Masterformatreportlr',
        'Projectpt',
        'Coa'
    ],
    refs: [
        { ref: 'grid', selector: 'masterformatreportlrgrid' },
        { ref: 'formdata', selector: 'masterformatreportlrformdata' },
        { ref: 'panel', selector: 'masterformatreportlrpanel' }
    ],
    controllerName: 'masterformatreportlr',
    bindPrefixName: 'Masterformatreportlr',
    formWidth: 350,
    win: null,
    winId: null,
    init: function(application) {
        var me = this;
        this.control({
            'masterformatreportlrpanel': {
                afterrender: function() {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(710);
                }
            },
            'masterformatreportlrformdata': {
                afterrender: me.formdataAfterRender
            },
            'masterformatreportlrformdata [name=projectpt_id]': {
                change: me.loadData
            },
            'masterformatreportlrformdata [name=report_type]': {
                change: me.loadData
            },
            'masterformatreportlrformdata [name=report_level]': {
                change: me.loadData
            },
            'masterformatreportlrformdata [action=update]': {
                click: function() {
                    var me = this;
                    var fd = me.getFormdata();
                    var store = me.getGrid().getStore();

                    var project_id = fd.down("[name=projectpt_id]").valueModels[0].data.project_id;
                    var pt_id = fd.down("[name=projectpt_id]").valueModels[0].data.pt_id;
                    var report_type = fd.down("[name=report_type]").getValue();
                    var report_level = fd.down("[name=report_level]").getValue();
                    var hideparam = fd.down("[name=hideparam]").getValue();
                    
                    var datadetail = [];
                    for (var i = 0; i < store.getCount(); i++) {
                        var rec = store.getAt(i);
                        datadetail.push({
                            coa_id: rec.get('coa_id'),
                            coa: rec.get('coa'),
                            coa_name: rec.get('coa_name').replace(/(?:^(?:&nbsp;)+)|(?:(?:&nbsp;)+$)/g, ''),
                            flag: rec.get('flag'),
                            type: rec.get('type'),
                            level: rec.get('level'),
                            rptformat_id: rec.get('rptformat_id')
                        })
                    }

                    fd.setLoading("Updating data...");
                    Ext.Ajax.request({
                        url: 'cashier/masterformatreportlr/update',
                        params: {
                            data: Ext.encode({
                                hideparam: hideparam,
                                project_id: project_id,
                                pt_id: pt_id,
                                report_type: report_type,
                                report_level: report_level,
                                detail: datadetail
                            })
                        },
                        success: function(response) {
                            var res = Ext.JSON.decode(response.responseText);
                            fd.setLoading(false);

                            var data = res.data;
                            var message = data[0][0]['message'];
                            Ext.Msg.alert('Info', message);

                            me.loadData();
                        }
                    })
                }
            }
        })
    },
    formdataAfterRender: function() {
        var me = this;
        var fd = me.getFormdata();

        var storeprojectpt = fd.down("[name=projectpt_id]").getStore();
        storeprojectpt.load({
            callback: function(rec, op) {
                fd.down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));

                var storecoa = me.getStore('Coa');
                storecoa.getProxy().setExtraParam('hideparam', 'getallcoabyprojectpt');
                storecoa.getProxy().setExtraParam('project_id', fd.down("[name=projectpt_id]").valueModels[0].data.project_id);
                storecoa.getProxy().setExtraParam('pt_id', fd.down("[name=projectpt_id]").valueModels[0].data.pt_id);
                storecoa.load();
            }
        });

        var reportlevelstore = fd.down("[name=report_level]").getStore();
        Ext.Ajax.request({
            url: 'cashier/masterformatreportlr/read',
            params: {
                'hideparam': 'getreportlevel'
            },
            success: function(response) {
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;

                reportlevelstore.removeAll();

                for (var i = 0; i < data.length; i++) {
                    reportlevelstore.add({
                        param: data[i].num,
                        label: data[i].num
                    })
                }
                reportlevelstore.load();
            }
        })

        var grid = me.getGrid();
        var gridstore = grid.getStore();
        gridstore.add({
            'rptformat_id': null
        })
    },
    loadData: function() {
        var me = this;
        var fd = me.getFormdata();

        var project_id = fd.down("[name=projectpt_id]").valueModels[0].data.project_id;
        var pt_id = fd.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        var report_type = fd.down("[name=report_type]").getValue();
        var report_level = fd.down("[name=report_level]").getValue();

        if (project_id != "" && pt_id != "" && report_type != "" && report_level != "") {
            var hideparam = "searchdata";
            var grid = me.getGrid();
            var store = grid.getStore();

            store.getProxy().setExtraParam('hideparam', hideparam);
            store.getProxy().setExtraParam('project_id', project_id);
            store.getProxy().setExtraParam('pt_id', pt_id);
            store.getProxy().setExtraParam('report_type', report_type);
            store.getProxy().setExtraParam('report_level', report_level);
            store.load({
                callback: function() {
                    if (store.getCount() == 0) {
                        store.add({
                            'rptformat_id': null
                        })
                    }
                }
            });
        }
    }
})