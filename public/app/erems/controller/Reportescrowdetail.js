Ext.define('Erems.controller.Reportescrowdetail', {
    extend: 'Erems.library.template.controller.Controllerreporttb',
    alias: 'controller.Reportescrowdetail',
    views: ['reportescrowdetail.Panel', 'reportescrowdetail.FormData', 'masterreport.Panel'],
    requires: [
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Projectptcombobox',
        'Erems.library.template.component.Bankcombobox',
    ],
    stores: ['Mastercluster','Masterdata.store.Projectpt','Masterdata.store.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'reportescrowdetailpanel'
        },
        {
            ref: 'formdata',
            selector: 'reportescrowdetailformdata'
        }

    ],
    controllerName: 'reportescrowdetail',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'reportescrowdetail',
    localStore: {
        detail: null
    },
    project_name: null,
    pt_name: null,
    pt_address: null,
    pt_phone: null,
    init: function (application) {
        var me = this;
        this.control({
            'reportescrowdetailpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'reportescrowdetailformdata': {
                afterrender: this.formDataAfterRender
            },
            'reportescrowdetailformdata button[action=process]': {
                click: function () {
                    me.processReport();
                }
            },
            'reportescrowdetailformdata button[action=reset]': {
                click: this.dataReset
            },
            'reportescrowdetailformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
            'reportescrowdetailformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
            'reportescrowdetailformdata [name=cbf_pt_id]': {
                change: me.checkboxChange
            },
            'reportescrowdetailformdata [name=pt_id]': {
                select: me.comboboxChange
            },
        });
    },
    panelAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");

        var storepp = configs.down('[name=pt_id]').getStore();
        storepp.clearFilter(true);
        storepp.filter({
            property: 'project_id',
            value: apps.project,
            exactMatch: true,
            caseSensitive: true
        });

        p.setLoading(false);
    },
    processReport: function () {
        var me = this;

        var params = me.getFormdata().getForm().getFieldValues();

        params["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
        var cbf_checked1 = me.getFormdata().down("[name=cbf_pt_id]").getValue();
        if (cbf_checked1 == '1' || !params["pt_id"]) {
            params["pt_display"] = 'ALL';
        } else {
            params["pt_display"] = me.getFormdata().down("[name=pt_id]").getRawValue();
        }

        params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
        var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
        if (cbf_checked1 == '1' || !params["cluster_id"]) {
            params["cluster_display"] = 'ALL';
        } else {
            params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
        }

        params["bank_id"] = me.getFormdata().down("[name=bank_id]").getValue();
        var cbf_checked1 = me.getFormdata().down("[name=cbf_bank_id]").getValue();
        if (cbf_checked1 == '1' || !params["bank_id"]) {
            params["bank_display"] = 'ALL';
        } else {
            params["bank_display"] = me.getFormdata().down("[name=bank_id]").getRawValue();
        }

        params["radio_statuspencairan"] = me.getFormdata().down("[name=radiogroup_statuspencairan]").getValue().radio_statuspencairan;
        params["radio_statuslunas"] = me.getFormdata().down("[name=radiogroup_statuslunas]").getValue().radio_statuslunas;

        // added by rico 10082023
        params["purchase_start_date"] = me.getFormdata().down("[name=purchase_start_date]").getValue();
        params["purchase_end_date"] = me.getFormdata().down("[name=purchase_end_date]").getValue();

        params["cair_start_date"] = me.getFormdata().down("[name=cair_start_date]").getValue();
        params["cair_end_date"] = me.getFormdata().down("[name=cair_end_date]").getValue();

        me.exportData(params);
    },

    exportData: function (params) {
        var me = this;

        me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');

        Ext.Ajax.timeout = 60000 * 30;

        Ext.Ajax.request({
            url: 'erems/reportescrowdetail/export/?action=schema',
            params: {
                pt_id: params["pt_id"],
                cluster_id: params["cluster_id"],
                bank_id: params["bank_id"],
                radio_statuspencairan: params["radio_statuspencairan"],
                radio_statuslunas: params["radio_statuslunas"],
                // added by rico 10082023
                purchase_start_date: params["purchase_start_date"],
                purchase_end_date: params["purchase_end_date"],
                cair_start_date: params["cair_start_date"],
                cair_end_date: params["cair_end_date"]
            },
            success: function (response) {
                try {
                    var resp = response.responseText;

                    if (resp) {
                        var info = Ext.JSON.decode(resp);

                        if (info.success == true) {
                            me.getFormdata().up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Info',
                                msg: '<a href="' + info.url + '" target="blank">Click Here For Download Report File</a>',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.CANCEL,
                                buttonText:
                                        {
                                            cancel: 'Close',
                                        }
                            });
                        } else {
                            me.getFormdata().up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Error: Create Report Penerimaan Collection Failed.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                } catch (e) {
                    me.getFormdata().up('window').body.unmask();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Create Report Penerimaan Collection Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
            failure: function (e) {
                me.getFormdata().up('window').body.unmask();
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Create Report Penerimaan Collection Failed.',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },

});