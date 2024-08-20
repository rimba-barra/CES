Ext.define('Cashier.view.chequepaymentlist.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.chequepaymentlistpanel',
    requires: ['Cashier.view.chequepaymentlist.FormData'],
    itemId: 'MastercoaconfigPanel',
    autoHeight: true,
    layout: 'border',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'chequepaymentlistformdata',
                    region: 'center',
                    state: 'create',
                   autoHeight: true
                }
            ]
        });

        me.callParent(arguments);
    }

});
