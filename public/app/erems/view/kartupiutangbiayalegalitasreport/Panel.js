Ext.define('Erems.view.kartupiutangbiayalegalitasreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.kartupiutangbiayalegalitasreport.FormData'],
    alias: 'widget.kartupiutangbiayalegalitasreportpanel',
    itemId: 'KartupiutangbiayalegalitasreportPanel',
    formSearchPanelName: 'kartupiutangbiayalegalitasreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'kartupiutangbiayalegalitasreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
