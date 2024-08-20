Ext.define('Cashier.view.mastertemplate.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mastertemplatepanel',
    requires: ['Cashier.view.mastertemplate.FormData'],
    itemId: 'MastercoaconfigPanel',
    autoHeight: true,
    layout: 'border',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'mastertemplateformdata',
                    region: 'center',
                    state: 'create',
                   autoHeight: true
                }
            ]
        });

        me.callParent(arguments);
    }

});
