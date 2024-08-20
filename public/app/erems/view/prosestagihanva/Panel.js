Ext.define('Erems.view.prosestagihanva.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.prosestagihanva.FormData'],
    alias: 'widget.prosestagihanvapanel',
    itemId: 'ProsestagihanvaPanel',
    formSearchPanelName: 'Prosestagihanvaformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'prosestagihanvaformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
