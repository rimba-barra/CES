Ext.define('Gl.view.kodeaccountrugilaba.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Gl.view.kodeaccountrugilaba.FormData'],
    alias: 'widget.kodeaccountrugilabapanel',
    itemId: 'KodeaccountrugilabaPanel',
    layout: {
        type: 'border'
    },   
    formDataPanelName: 'kodeaccountrugilabaformdata',
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
