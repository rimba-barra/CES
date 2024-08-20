Ext.define('Erems.view.kartupiutangbiayalegalitasreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.kartupiutangbiayalegalitasreportformdata',
    requires: [
		'Erems.library.template.component.Clustercombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 600,
	height: 100,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10px 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'clustercombobox',
                            name: 'cluster_id',
                            fieldLabel:'Cluster',
                            //reportParams: true
							// multiSelect : true,
							labelWidth: 150,
							width: 475,
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
                        },
						{
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_cluster_id',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                }
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 125,
                        iconCls: 'icon-search',
                        text: 'Process to Excel'
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

