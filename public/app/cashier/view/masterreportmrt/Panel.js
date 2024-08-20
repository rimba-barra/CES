Ext.define('Cashier.view.masterreportmrt.Panel', {
    extend: 'Cashier.library.template.view.Panel',
    requires: ['Cashier.view.masterreportmrt.FormData'],
    alias: 'widget.masterreportmrtpanel',
    itemId: 'MasterReportMrtconfigPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'masterreportmrtformdata',
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
