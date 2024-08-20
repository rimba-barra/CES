Ext.define('Hrd.view.dashboard.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.dashboardpanel',
    itemId: 'DashboardPanel',
    layout: 'fit',
    autoScroll: true,
    height: '100%',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            
            items: [
                {
                    xtype: 'panel',
                    bodyPadding: 0,
                    itemId: 'dashboardID',
                    width: '100%',
                    autoScroll: true,
                    height: '100',                    
                    //html   : '<iframe src="http://localhost/Chart/samples/charts/pie.php?abc=test" style="width: 100%; height: 100%; border: 0"></iframe>',
                    html   : '<iframe src="hrd/dashboard/read" style="width: 100%; height: 100%; border: 0"></iframe>',

                }
            ]
        });
        
        me.callParent(arguments);
    }
});

