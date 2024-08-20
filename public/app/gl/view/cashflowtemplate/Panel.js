Ext.define('Gl.view.cashflowtemplate.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Gl.view.cashflowtemplate.FormData'],
    alias: 'widget.cashflowtemplatepanel',
    itemId: 'KodeaccountrugilabaPanel',
    layout: {
        type: 'border'
    },   
    formDataPanelName: 'cashflowtemplateformdata',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formDataPanelName,
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }
});
