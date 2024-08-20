Ext.define('Erems.view.legalsudahajbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalsudahajbreport.FormData'],
    alias: 'widget.legalsudahajbreportpanel',
    itemId: 'LegalsudahajbreportPanel',
    formSearchPanelName: 'legalsudahajbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalsudahajbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
