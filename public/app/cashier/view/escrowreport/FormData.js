Ext.define('Cashier.view.escrowreport.FormData', {
	extend       : 'Cashier.library.template.view.FormData',
	alias        : 'widget.escrowreportformdata',
	bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		var cbf = new Cashier.template.ComboBoxFields();

		Ext.applyIf(me, {
			dockedItems: me.generateDockedItems(),
			height     : 200,
			items      : [
				{
					xtype: 'hiddenfield',
					name : 'project_id'
				},
				{
					xtype: 'hiddenfield',
					name : 'pt_id'
				},
				{
					xtype: 'hiddenfield',
					name : 'Project'
				},
				{
					xtype: 'hiddenfield',
					name : 'Pt'
				},
				{
					xtype   : 'container',
					layout  : 'hbox',
					margin  : '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype         : 'datefield',
							itemId        : 'periode_startdate',
							name          : 'periode_startdate',
							fieldLabel    : 'Purchaseletter Date',
							labelWidth    : 120,
							labelSeparator: '',
							editable      : false,
							format        : 'd-m-Y',
							altFormats    : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat  : 'Y-m-d H:i:s.u',
						},
						{
							xtype           : 'label',
							styleHtmlContent: false,
							width           : 5,
							text            : 'to'
						},
						{
							xtype         : 'datefield',
							itemId        : 'periode_enddate',
							name          : 'periode_enddate',
							labelSeparator: '',
							editable      : false,
							format        : 'd-m-Y',
							altFormats    : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat  : 'Y-m-d H:i:s.u',
						},
						{
							xtype         : 'checkboxfield',
							fieldLabel    : '',
							name          : 'cbf_periode_id',
							checked       : true,
							inputValue    : '1',
							uncheckedValue: '0',
							margin        : '0 5px 0 0',
							width         : 20
						},
						{
							xtype: 'label',
							text : 'ALL'
						}
					]
				},
				{
					xtype   : 'container',
					layout  : 'hbox',
					margin  : '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype       : 'bankcombobox',
							name        : 'bank_id',
							fieldLabel  : 'Nama Bank',
							labelWidth  : 120,
							reportParams: true
						},
						{
							xtype         : 'checkboxfield',
							fieldLabel    : '',
							name          : 'cbf_bank_id',
							checked       : true,
							inputValue    : '1',
							uncheckedValue: '0',
							margin        : '0 5px 0 0',
							width         : 20
						},
						{
							xtype: 'label',
							text : 'ALL'
						}
					]
				},
				{
					xtype     : 'radiogroup',
					fieldLabel: 'Status',
					name      : 'status_lunas',
					itemId    : 'status_lunas',
					vertical  : false,
					items     : [
						{minWidth: 100, boxLabel: 'Lunas', name: 'Statuslunas', inputValue: 1, checked: true},
						{minWidth: 150, boxLabel: 'Belum lunas', name: 'Statuslunas', inputValue: 0},
						{minWidth: 150, boxLabel: 'All Unit', name: 'Statuslunas', inputValue: 2}
					]
				}
			]
		});
		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var dockedItems = [
			{
				xtype : 'toolbar',
				dock  : 'bottom',
				ui    : 'footer',
				layout: {
					padding: 6,
					type   : 'hbox'
				},
				items: [
					{
						xtype : 'button',
						action: 'processexcel',

						padding: 5,
						width  : 150,
						text   : 'Process to Excel'
					},
					{
						xtype  : 'button',
						action : 'reset',
						itemId : 'btnReset',
						padding: 5,
						width  : 75,
						iconCls: 'icon-reset',
						text   : 'Reset'
					},
				]
			}
		];
		return dockedItems;
	}
});

