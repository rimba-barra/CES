Ext.define('Erems.view.legalsudahaktappjbreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalsudahaktappjbreport.FormData'],
    alias: 'widget.legalsudahaktappjbreportpanel',
    itemId: 'LegalsudahaktappjbreportPanel',
    formSearchPanelName: 'legalsudahaktappjbreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalsudahaktappjbreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
