Ext.define('Erems.view.kartupiutangallreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.kartupiutangallreport.FormData'],
    alias: 'widget.kartupiutangallreportpanel',
    itemId: 'KartupiutangallreportPanel',
    formSearchPanelName: 'kartupiutangallreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'kartupiutangallreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
