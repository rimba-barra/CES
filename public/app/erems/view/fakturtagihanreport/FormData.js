Ext.define('Erems.view.fakturtagihanreport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.fakturtagihanreportformdata',
	requires: [
		'Erems.library.template.component.Buildingclasscombobox',

		//added by anas 10052021
		'Erems.view.fakturtagihanreport.GridUnit'
	],
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	width: 500,
	//added by anas 10052021
	height: 400,
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
							xtype: 'buildingclasscombobox',
							name: 'buildingclass',
							fieldLabel: 'Group Admin',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_buildingclass',
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
							itemId: 'periode_date',
							name: 'periode_date',
							fieldLabel: 'Due Date',
							labelSeparator: '',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
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
							itemId: 'print_date',
							name: 'print_date',
							fieldLabel: 'Print Date',
							labelSeparator: '',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
						}
					]
				},

				//added by anas 10052021
				{
					xtype: 'fieldset',
					name: 'fs_unit',
					width: '100%',
					title: 'Unit',
					bodyStyle: 'background:none;border:0;',
					items: [
						{
							layout: 'hbox',
							bodyStyle: 'border:0px;background:none;',
							width: '100%',
							items: [
								{
									xtype: 'checkboxfield',
									fieldLabel: '',
									name: 'is_changeunit',
									itemId: 'is_changeunit',
									checked: true,
									inputValue: '1',
									uncheckedValue: '0',
									margin: '0 0 0 10px',
									width: 20
								},
								{
									xtype: 'label',
									text: 'All Unit',
									itemId: 'is_changeunit_label',
									name: 'is_changeunit_label',
								},
							]
						},
						{
							layout: 'hbox',
							bodyStyle: 'border:0px;background:none;',
							width: '100%',
							name: 'fs_changeunit_search',
							items: [
								{
									xtype: 'textfield',
									fieldLabel: 'No Unit',
									name: 'src_unit_lama',
									flex: 1,
									labelStyle: 'font-size:10.8',
								},
								{
									xtype: 'button',
									text: 'Search',
									itemId: 'fdd_search_btn',
									padding: '2px 5px',
									action: 'browse_unit_lama',
									iconCls: 'icon-search',
									style: 'background-color:#FFC000;',
								},
								{
									xtype: 'button',
									action: 'reset_unit',
									itemId: 'fdd_reset_unit_btn',
									padding: '2px 5px',
									iconCls: 'icon-reset',
									text: 'Reset',
								}
							]
						},
						{
							xtype: 'fakturtagihanreportgridunit',
							name: 'grid_unit',
							height: 200,
							margin: '10 0 5 0',
						},
					]
				},
						//end added by anas

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
						action: 'sendEmail',
						itemId: 'btnSendEmail',
						hidden: true,
						disabled: true,
						padding: 5,
						width: 100,
						icon: document.URL + 'app/main/images/icons/email.png',
						text: 'Send Email'
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

