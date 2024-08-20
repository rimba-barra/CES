Ext.define('Cashier.view.bankpositionreport.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.bankpositionreport.FormData'],
    alias: 'widget.bankpositionreportpanel',
    itemId: 'BankpositionreportPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'bankpositionreportformdata',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formDataPanelName,
                    region: 'center',
                }
            ]
        });
        me.callParent(arguments);
    }

});
