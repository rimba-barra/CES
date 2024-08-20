Ext.define('Erems.controller.Reporttunggakanwa', {
    extend: 'Erems.library.template.controller.Controllerreporttb',
    alias: 'controller.Reporttunggakanwa',
    views: ['reporttunggakanwa.Panel', 'reporttunggakanwa.FormData', 'masterreport.Panel'],
    requires: [
        // 'Erems.library.template.component.Clustercombobox',
        // 'Erems.library.template.component.Projectptcombobox',
        // 'Erems.library.template.component.Bankcombobox',
    ],
    stores: ['Mastercluster','Masterdata.store.Projectpt','Masterdata.store.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'reporttunggakanwapanel'
        },
        {
            ref: 'formdata',
            selector: 'reporttunggakanwaformdata'
        }

    ],
    controllerName: 'reporttunggakanwa',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'reporttunggakanwa',
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
            'reporttunggakanwapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'reporttunggakanwaformdata': {
                afterrender: this.formDataAfterRender
            },
            'reporttunggakanwaformdata button[action=process]': {
                click: function () {
                    me.processReport();
                }
            },
            'reporttunggakanwaformdata button[action=reset]': {
                click: this.dataReset
            },
            // 'reporttunggakanwaformdata [name=cbf_cluster_id]': {
            //     change: me.checkboxChange
            // },
            // 'reporttunggakanwaformdata [name=cluster_id]': {
            //     select: me.comboboxChange
            // },
            // 'reporttunggakanwaformdata [name=cbf_pt_id]': {
            //     change: me.checkboxChange
            // },
            // 'reporttunggakanwaformdata [name=pt_id]': {
            //     select: me.comboboxChange
            // },
        });
    },
    panelAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");

        p.setLoading(false);
    },
    processReport: function () {
        var me = this;

        var params = me.getFormdata().getForm().getFieldValues();

        // var dateNow = new Date();
        // var tglStart = me.getFormdata().down("[name=periode]").getValue();
        // var startDate = new Date(tglStart);

        // params["periode"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query

        // me.exportData(params);
        
        var pertDate = new Date(params['periode']);
        var bln      = pertDate.getMonth()+1;

        params["periode"] = pertDate.getFullYear() + "-" + (bln < 10 ? '0' : '')+bln + "-" + pertDate.getDate();

        me.exportData(JSON.stringify(params));
    },

    exportData: function (params) {
        var me = this;

        me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');

        Ext.Ajax.timeout = 60000 * 30;

        Ext.Ajax.request({
            url     : 'erems/reporttunggakanwa/export/?action=schema',
            // params  : {periode : params["periode"]},
            params  : {data : params},
            success : function (response) {
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
                                buttonText:{
                                    cancel: 'Close',
                                }
                            });
                        } else {
                            me.getFormdata().up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Error: Create Report Data Tunggakan WA Blast Failed.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                } catch (e) {
                    me.getFormdata().up('window').body.unmask();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Create Report Data Tunggakan WA Blast Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
            failure: function (e) {
                me.getFormdata().up('window').body.unmask();
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Create Report Data Tunggakan WA Blast Failed.',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },

});