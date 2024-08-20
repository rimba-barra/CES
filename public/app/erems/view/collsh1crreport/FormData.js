Ext.define('Erems.view.collsh1crreport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.collsh1crreportformdata',
	requires: [
		'Erems.library.template.component.Clustercombobox',
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
							xtype: 'datefield',
							itemId: 'month_process',
							name: 'month_process',
							fieldLabel: 'Month Process',
							labelWidth: 120,
							labelSeparator: '',
							editable: false,
							format: 'm-Y',
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
							xtype: 'clustercombobox',
							name: 'cluster_id',
							fieldLabel: 'Cluster / Kawasan',
							labelWidth: 120,
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
							xtype: 'radiogroup',
							//columns: 1,
							width: 400,
							fieldLabel: 'Report Type',
							labelWidth: 120,
							name: 'radiogroup_laporantype',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Detail',
									name: 'radio_laporantype',
									inputValue: 'detail',
									itemId: 'detail',
									checked: true,
									width: '100px'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Laporan Manajemen',
									name: 'radio_laporantype',
									inputValue: 'laporan_manajemen',
									itemId: 'laporan_manajemen',
									width: '180px'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Aging',
									name: 'radio_laporantype',
									inputValue: 'aging',
									itemId: 'aging',
									width: '180px'
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

