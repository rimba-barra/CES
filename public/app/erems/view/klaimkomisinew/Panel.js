Ext.define('Erems.view.klaimkomisinew.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.klaimkomisinew.Grid','Erems.view.klaimkomisinew.FormSearch','Erems.view.klaimkomisinew.GridDetail'],
    alias:'widget.klaimkomisinewpanel',
    itemId:'KlaimkomisinewPanel',
    gridPanelName:'klaimkomisinewgrid',
    formSearchPanelName:'klaimkomisinewformsearch',
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
                        {
                            xtype: 'fieldset',
//                            title: 'Detail LRP',
                            flex:1,
                            width:'100%',
                            layout:'hbox',
                            items: [
								{
                                    xtype:'klaimkomisinewgriddetail',
                                    height: '100%',
                                    flex:1,
                                    itemId:'klaimkomisiGridDetail'
                                },
                            ]
                        }
                    ]
                }
//                {
//                    xtype:'panel',
//                    layout:'vbox',
//                    region: 'center',
//                    items:[
//                        
//                        {
//                            xtype: me.gridPanelName,
//                            itemId:'berkasGrid',
////                            title:'Purchaseletter Information',
//                            flex:1,
//                            width:1000
//                        },
//                        {
//                            xtype:'klaimkomisinewgridspr',
//                            itemId:'berkassprGrid',
//                            height:200,
//                            width:1000
//                        }
//                    ]
//                }
            ]
        });

        me.callParent(arguments);
    }
});
