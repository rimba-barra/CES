
Ext.define('Hrd.view.personal.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.personal.Grid','Hrd.view.personal.FormSearch','Hrd.view.personal.FormData'],
    alias:'widget.personalpanel',
    itemId:'PersonalPanel',
    gridPanelName:'personalgrid',
    formSearchPanelName:'personalformsearch',
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
                    collapsed: true,
                    collapsible: true,
                    iconCls: 'icon-search',
                    title: 'Search'
                },
                {
                    // xtype:'panel',
                     //html:'hello'
                    xtype: me.gridPanelName,
                    region: 'center'
                },
                {
                    
                    xtype: 'personalformdata',
                    region: 'east',
                    width:800
                }
            ]
        });

        me.callParent(arguments);
    }
});