Ext.define('Hrd.view.absentrecord.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.absentrecord.Grid','Hrd.view.absentrecord.FormSearch'],
    alias:'widget.absentrecordpanel',
    itemId:'AbsentrecordPanel',
    gridPanelName:'absentrecordgrid',
    formSearchPanelName:'absentrecordformsearch',
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
                    itemId:'MyAbsentGrid',
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }
});