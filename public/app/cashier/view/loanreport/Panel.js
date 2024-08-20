Ext.define('Cashier.view.loanreport.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.loanreport.FormData'],
    alias: 'widget.loanreportpanel',
    itemId: 'LoanreportPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'loanreportformdata',
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
