Ext.define('Gl.controller.Cashflowtemplate', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Cashflowtemplate',
    requires: [
        'Gl.library.template.combobox.CoaSettingCombobox'
    ],
    views: [
        'cashflowtemplate.Panel',
        'cashflowtemplate.FormData'
    ],
    stores: [
        'Cashflowtemplate',
        'CoaSettingCombo',
    ],
    models: [
        'Cashflowtemplate',
        'Coa'
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'cashflowtemplateformdata'
        }
    ],
    controllerName: 'cashflowtemplate',
    fieldName: 'kodeaccount_id',
    bindPrefixName: 'Cashflowtemplate',
    init: function (application) {
        var me = this;
        this.control({
            'cashflowtemplatepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'cashflowtemplateformdata': {
                afterrender: function (panel) {
                    panel.up('window').maximize();
                    this.formDataAfterRenderCustome(this);

                }
            },          
            'cashflowtemplateformdata button[action=save]': {                 
                click: function () {
                    var flag, url = '';
                    flag = this.getValue(me, 'flag_input', 'value');
                    if (flag !== '0') {
                        url = 'gl/cashflowtemplate/update';
                    } else {
                        url = 'gl/cashflowtemplate/create';
                    }

                    this.dataSaveCustome(url);
                }
            }
        });
    },
   
   

});