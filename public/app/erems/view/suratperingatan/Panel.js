Ext.define('Erems.view.suratperingatan.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.suratperingatan.Grid','Erems.view.suratperingatan.GridSchedulePayment','Erems.view.suratperingatan.FormSearch','Erems.view.suratperingatan.GridSpr','Erems.view.suratperingatan.GridSprDetail'],
    alias:'widget.suratperingatanpanel',
    itemId:'SuratperingatanPanel',
    gridPanelName:'suratperingatangrid',
    formSearchPanelName:'suratperingatanformsearch',
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
                                },
                                {
                                    xtype: 'suratperingatangridschedulepayment',
                                    height: '100%',
                                    flex:1,
                                    itemId:'schedulepaymentgrid'
                                }
                            ]
                        },
                        {   
                            xtype: 'fieldset',
                            width:'100%',
//                            flex:1,
                            height:35,
                            layout:'hbox',
                            items: [
                                {
//                                    height: '100%',
//                                    flex:1
                                    height:20,
                                    xtype: 'label',
                                    text: 'History SP',
//                                    width: 300
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex:1,
                            width:'100%',
                            layout:'hbox',
                            items: [
				{
                                    xtype:'suratperingatangridspr',
                                    height: '100%',
                                    flex:1,
                                    itemId:'berkassprGrid'
                                },
                                {
                                    xtype:'suratperingatangridsprdetail',
                                    height: '100%',
                                    flex:1,
                                    itemId:'berkassprGrid2'
                                }
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
//                            xtype:'suratperingatangridspr',
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
