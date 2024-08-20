Ext.define('Erems.view.stockmereportb.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.stockmereportbformdata',
    requires: [
		'Erems.library.template.component.Clustercombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 600,
	//height: 300,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
						{
							xtype: 'label',
							styleHtmlContent: false,
							text:'Collecting Marketing Stock Information'
						}
                    ]
                },
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
							//multiSelect : true,
							width: 437
                        },
						{
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            //hidden: true,
                            name: 'cbf_cluster_id',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 25px 0 0',
                            width: 20
                        },
                        {
                            //hidden: true,
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 5px 0',
                    defaults: {
                        margin: '0 10px 0 0'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'bot_date',
                            layout: 'hbox',
                            fieldLabel:'Purchaseletter Date'
                        },
                        {
                            xtype: 'datefield',
                            name: 'top_date',
                            margin: '8px 0px 0 0',
                            layout: 'hbox',
                            fieldLabel:''
                        }
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '20px 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_excel',
							checked: true,
							inputValue: '1',
                            readOnly: true,
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
                            xtype: 'label',
                            text: 'Export to Excel'
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
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Process'
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

