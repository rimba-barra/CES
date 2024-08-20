Ext.define('Erems.view.constorderpembangunanreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.constorderpembangunanreportformdata',
    requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Productcategorycombobox'
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
					width: '100%',
					items: [{
							xtype      : 'numberfield',
							fieldLabel : 'DP Inhouse',
							anchor     : '-5',
							name       : 'dp_inhouse',
							flex       : 1,
							value      : 0,
							minValue   : 0
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '5px 0 0 0',
					width: '100%',
					items: [{
							xtype      : 'numberfield',
							fieldLabel : 'DP Cash',
							anchor     : '-5',
							name       : 'dp_cash',
							flex       : 1,
							value      : 0,
							minValue   : 0
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '10px 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'fieldset',
							height: 50,
							width: '100%',
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									//columns: 1,
									fieldLabel: 'KPR',
									name: 'radiogroup_kpr',
									labelWidth: '10%',
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Belum Akad',
											name: 'radio_kpr',
											inputValue: 'belum_akad', 
											itemId: 'belum_akad'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Sudah Akad',
											name: 'radio_kpr',
											inputValue: 'sudah_akad', 
											itemId: 'sudah_akad'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Belum dan Sudah Akad',
											name: 'radio_kpr',
											inputValue: 'ALL',
											itemId: 'ALL',
											checked: true
										}
									]
								}
							]
						}
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'datefield',
							itemId: 'periode_startdate',
							name: 'periode_startdate',
							fieldLabel: 'Purchase Letter Date',
							labelWidth: 120,
							labelSeparator:'',
							//editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'periode_enddate',
							name: 'periode_enddate',
							//fieldLabel: 'to',
							//labelWidth: 20,
							labelSeparator:'',
							//editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true,
							//margin: '5px 0 0 0'
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

