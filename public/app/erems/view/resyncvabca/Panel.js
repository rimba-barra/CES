Ext.define('Erems.view.resyncvabca.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.resyncvabca.FormData'],
    alias: 'widget.resyncvabcapanel',
    itemId: 'ResyncvabcaPanel',
    formSearchPanelName: 'Resyncvabcaformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'resyncvabcaformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
