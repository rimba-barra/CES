Ext.define('Hrd.controller.Hcreport', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.hcreport',
    controllerName: 'hcreport',
    bindPrefixName: 'Hcreport',
    otherParamsAT :{leave:0,sick:0,permission:0},
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['#HcreportFormID button[action=export]'] = {
            click: function (el, val) {
                this.exportData();                
                
            }
        };
        //searchButtonID
      

        this.control(newEvs);
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;
       
        var sd = new Date(reportData['params']['asof_date']);
        reportData['params']['asof_date'] = me.tools.dateFunc(reportData['params']['asof_date']).toYMD('-');
    
        switch (reportData['params']['report_type']) {
            case 'quarterly': reportData['file'] = 'quarterly';break;
            case 'annual': reportData['file'] = 'annual';break;
            case 'annual_raw': reportData['file'] = 'annual_raw';break;
        }
     
        return reportData;


    },
    
    cleannullinCombo: function (form, value) {
        if (!form.down("[name=asof_date]").getValue()) {
            value['asof_date'] = '2021-01-01';
        }
        return value;
    },
    exportData:function(){
        var me, url, formvalue, form;
        me = this;
        form = me.getForm();
        formvalue = me.getForm().getValues();
        formvalue = me.cleannullinCombo(form, formvalue);
               
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {
                data: Ext.encode(formvalue)
            },
            success: function (data, model) {
                p.setLoading(false);
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
        }).read('export');        
     }
});