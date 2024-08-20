Ext.define('Erems.view.legalsudahsppjbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalsudahsppjbreport.FormData'],
    alias: 'widget.legalsudahsppjbreportpanel',
    itemId: 'LegalsudahsppjbreportPanel',
    formSearchPanelName: 'legalsudahsppjbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalsudahsppjbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
