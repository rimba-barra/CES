Ext.define('Erems.view.keuanganmodelb.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.keuanganmodelb.FormData'],
    alias: 'widget.keuanganmodelbpanel',
    itemId: 'KeuanganmodelbPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'keuanganmodelbformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
