Ext.define('Erems.view.masterreport.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.masterreportpanel',
    height:500,
    layout:'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype:'panel',
                    itemId:'MyReportPanel',
//                    html:'hello',
                    width:'100%',
                    height:'100%'
                }
            ]
        });

        me.callParent(arguments);
    }

});