Ext.define('Erems.view.futurecollectionreport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.futurecollectionreportformdata',
	requires: [
		'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Productcategorycombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Pricetypecombobox'
	],
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	width: 600,
	//height: 300,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
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
							xtype: 'clustercombobox',
							name: 'cluster_id',
							fieldLabel: 'Cluster / Kawasan',
							reportParams: true
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
							fieldLabel: 'Purchase Date',
							labelWidth: 120,
							labelSeparator: '',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text: 'to'
						},
						{
							xtype: 'datefield',
							itemId: 'periode_enddate',
							name: 'periode_enddate',
							//fieldLabel: 'to',
							//labelWidth: 20,
							labelSeparator: '',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true,
							//margin: '5px 0 0 0'
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_periode_id',
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
							itemId: 'jatuh_tempo',
							name: 'jatuh_tempo',
							fieldLabel: 'Periode Jatuh Tempo',
							labelWidth: 120,
							labelSeparator: '',
							editable: false,
							format: 'Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date(),
							disabled: true
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
                            xtype: 'radiogroup',
                            //columns: 1,
                            width: 400,
                            fieldLabel: 'Report Type',
                            name: 'radiogroup_laporantype',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Summary (Default)',
                                    name: 'radio_laporantype',
                                    inputValue: 'rekap',
                                    itemId: 'rekap',
                                    checked: true
                                    
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Detail',
                                    name: 'radio_laporantype',
                                    inputValue: 'detail',
                                    itemId: 'detail',
                                    
                                },
                                
                                
                            ]
                        }
                    ]
                },
			]

		});

		me.callParent(arguments);
	},
	generateDockedItems: function () {
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

