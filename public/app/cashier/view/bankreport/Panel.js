Ext.define('Cashier.view.bankreport.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Cashier.view.bankreport.FormData'],
    alias: 'widget.bankreportpanel',
    itemId: 'BankreportPanel',
    layout: {
        type: 'border',
        layout:'fit',
    },

    formDataPanelName: 'bankreportformdata',
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
