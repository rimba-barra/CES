Ext.define('Hrd.view.leavegiving.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.leavegiving.Grid','Hrd.view.leavegiving.FormSearch'],
    alias:'widget.leavegivingpanel',
    itemId:'LeavegivingPanel',
    gridPanelName:'leavegivinggrid',
    formSearchPanelName:'leavegivingformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    
                    xtype: me.formSearchPanelName,
                    region: 'west',
                    split: true,
                    maxWidth: 500,
                    minWidth: 300,
                    width: 300,
                    collapsed: false,
                    collapsible: true,
                    iconCls: 'icon-search',
                    title: 'Filter'
                },
                {
                    // xtype:'panel',
                     //html:'hello'
                    xtype: me.gridPanelName,
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }
});