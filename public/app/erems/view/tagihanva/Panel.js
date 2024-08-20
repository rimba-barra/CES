Ext.define('Erems.view.tagihanva.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.tagihanva.FormData'],
    alias: 'widget.tagihanvapanel',
    itemId: 'TagihanvaPanel',
    formSearchPanelName: 'Tagihanvaformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tagihanvaformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
