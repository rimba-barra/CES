Ext.define('Erems.view.biayalegalitas.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.biayalegalitas.Grid','Erems.view.biayalegalitas.FormSearch'],
    alias:'widget.biayalegalitaspanel',
    itemId:'BiayalegalitasPanel',
    gridPanelName:'biayalegalitasgrid',
    formSearchPanelName:'biayalegalitasformsearch',
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
//                            title: 'Bagi Hasil - Proses',
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
//                        {
//                            xtype: 'fieldset',
////                            title: 'Detail LRP',
//                            flex:1,
//                            width:'100%',
//                            layout:'hbox',
//                            items: [
//								{
//                                    xtype:'biayalegalitasgridspr',
//                                    height: '100%',
//                                    flex:1,
//                                    itemId:'berkassprGrid'
//                                },
//                            ]
//                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
