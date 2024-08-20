Ext.define('Erems.view.ktpiutangfin.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ktpiutangfinpanel',
    itemId: 'TemplateViewPanel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start',
    },
    requires:['Erems.view.ktpiutangfin.GridGl','Erems.view.ktpiutangfin.GridPurc','Erems.view.ktpiutangfin.Grid','Erems.view.ktpiutangfin.FormData'],
    gridPanelName: 'gridpanelname',
    formSearchPanelName: 'formsearchpanelname',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    flex: 2,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'start',

                    },
                    items: [
                        {xtype:'ktpiutangfinformdata', flex: 3},
                        {

                            flex: 7,
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                pack: 'start',
                            },
                            items: [
                                {
                                    xtype:'ktpiutangfingridpurc', 
                                    flex: 1,
                                 //   resizable:true
                                },
                                {
                                   // resizable:true,
                                    xtype:'ktpiutangfingridgl',
                                 // html:'Hello',
                                 // id:'KtPanelGridId',
                                    flex: 1
                                },
                            ]
                        }
                    ]
                },

                { xtype:'ktpiutangfingrid', flex: 1}
            ]
        });

        me.callParent(arguments);
    }
});
