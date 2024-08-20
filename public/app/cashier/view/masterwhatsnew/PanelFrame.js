Ext.define('Cashier.view.masterwhatsnew.PanelFrame', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MasterwhatsnewPanelFrame',   
    itemId: 'MasterwhatsnewPanelFrame',
    height:500,
    layout:'fit',
    frame: true,
    autoScroll: true,
    initComponent: function() {
        var me = this;
        var div = '<div id="MasterwhatsnewIFrame" style="overflow-y: scroll; padding: 20px; width:100%; height:100%;"><b>Loading . . . </b></div>';
        Ext.applyIf(me, {
            items: [
                {
                    xtype:'panel',
                    autoScroll: true,
                    itemId:'MyFramePanel',
                    html: div,
                    width:'100%',
                    height:'100%'
                }
            ]
        });

        me.callParent(arguments);
    }

});