Ext.define('Erems.view.legalsudahajbbelumstreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalsudahajbbelumstreport.FormData'],
    alias: 'widget.legalsudahajbbelumstreportpanel',
    itemId: 'LegalsudahajbbelumstreportPanel',
    formSearchPanelName: 'legalsudahajbbelumstreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalsudahajbbelumstreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
