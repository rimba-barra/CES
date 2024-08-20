Ext.define('Gl.library.box.view.directviewinput.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.templateviewdirectpanel',
    requires: [],
    itemId: 'TemplateViewPanel',
    layout: {
        type: 'border'
    },
    gridPanelName: 'gridpanelname',
    formSearchPanelName: 'formsearchpanelname',
    formDataName: 'formdataname',
    formDataWidth: 600,
    fsCollapsed:true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    // xtype:'panel',
                    //html:'hello'
                    xtype: me.gridPanelName,
                    region: 'west',
                    width:360
                },
                {
                    xtype: 'panel',
                    region:'center',
                    autoScroll:true,
                    items: [
                        {
                            xtype: me.formSearchPanelName,
                            region: 'north',
                            split: true,
                       
                            collapsed: me.fsCollapsed,
                            collapsible: true,
                            iconCls: 'icon-search',
                            title: 'Search'
                        },
                        {
                            xtype: me.formDataName,
                            region: 'south',
                            width: me.formDataWidth
                        }
                        
                    ]
                }

            ]
        });

        me.callParent(arguments);
    }

});