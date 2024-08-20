Ext.define('Erems.view.schedulebiayalainlain.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.schedulebiayalainlain.Grid','Erems.view.schedulebiayalainlain.FormSearch'],
    alias:'widget.schedulebiayalainlainpanel',
    itemId:'SchedulebiayalainlainPanel',
    gridPanelName:'schedulebiayalainlaingrid',
    formSearchPanelName:'schedulebiayalainlainformsearch',
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
					flex:1,
                    items: [
                        {
                            xtype: 'fieldset',
                            width:'100%',
                            flex:1,
                            layout:'hbox',
                            items: [
                                {
                                    xtype: me.gridPanelName,
                                    height: '100%',
                                    flex:1
                                }
                            ]
                        },
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
