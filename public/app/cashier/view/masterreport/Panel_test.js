Ext.define('Gl.view.masterreport.Panel_test', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.masterreportpanel',
    height:500,
    layout:'fit',
    frame: true,
    autoScroll: true,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype:'panel',
                    autoScroll: true,
                    itemId:'MyReportPanel',
                    html:'hello',
                    width:'100%',
                    height:'100%'
                }
            ]
        });

        me.callParent(arguments);
    }

});