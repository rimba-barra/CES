Ext.define('Erems.view.kartupiutangbiayalainlainreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.kartupiutangbiayalainlainreport.FormData'],
    alias: 'widget.kartupiutangbiayalainlainreportpanel',
    itemId: 'KartupiutangbiayalainlainreportPanel',
    formSearchPanelName: 'kartupiutangbiayalainlainreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'kartupiutangbiayalainlainreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
