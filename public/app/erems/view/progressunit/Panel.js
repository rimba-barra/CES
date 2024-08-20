Ext.define('Erems.view.progressunit.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.progressunit.Grid','Erems.view.progressunit.GridMainDetail', 'Erems.view.progressunit.FormSearch'],
    alias: 'widget.progressunitpanel',
    itemId: 'ProgressunitPanel',
    gridPanelName: 'progressunitgrid',
    formSearchPanelName: 'progressunitformsearch',
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
                    xtype: 'container',
                    layout: 'vbox',
                    region: 'center',
                    height:'100%',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Construction Progress',
                            width:'100%',
                            flex:1,
                            layout:'vbox',
                            items: [
                                {
                                    xtype: me.gridPanelName,
                                    width: '100%',
                                    flex:1
                                }
                            ]
                        },
                        {
                            xtype  : 'fieldset',
                            title  : 'Detail Progress',
                            itemId : 'detailProgress',
                            flex   : 1,
                            width  : '100%',
                            layout : 'vbox',
                            items  : [
                                {
                                    xtype  : 'progressgridmaindetail',
                                    width  : '100%',
                                    flex   : 1,
                                    itemId :'ProgressMainDetailGrid'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});