Ext.define('Erems.view.bagihasilproses.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.bagihasilproses.Grid',
				'Erems.view.bagihasilproses.GridMainDetail',
				'Erems.view.bagihasilproses.GridMainProsesDate',
				'Erems.view.bagihasilproses.FormSearch'],
    alias:'widget.bagihasilprosespanel',
    itemId:'BagihasilprosesPanel',
    gridPanelName:'bagihasilprosesgrid',
    formSearchPanelName:'bagihasilprosesformsearch',
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
                            title: 'Bagi Hasil - Proses',
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
                        {
                            xtype: 'fieldset',
                            title: 'Detail LRP',
                            flex:1,
                            width:'100%',
                            layout:'hbox',
                            items: [
								{
                                    xtype:'bagihasilprosesdategrid',
                                    height: '100%',
                                    flex:3,
                                    itemId:'BagihasilprosesdateGrid'
                                },
								{
									xtype: 'splitter', width: 10,
								},
                                {
                                    xtype:'bagihasilprosesdetailgrid',
                                    height: '100%',
                                    flex:6,
                                    itemId:'BagihasilprosesDetailGrid'
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
