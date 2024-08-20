Ext.define('Erems.view.revenuesharing.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.revenuesharingformdata',
	requires: [
		'Erems.view.revenuesharing.GridDetail'
	],
	autoScroll: true,
	anchorSize: 100,
	//height: 600,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				//labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'fdms_id',
					name: 'purchaseletter_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'fdms_unit_id',
					name: 'unit_id'
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					height: 30,
					width: '100%',
					items: [
						{
							xtype: 'checkboxfield',
							itemId: 'cb_set_cluster',
							name: 'cb_set_cluster',
							fieldLabel: 'Set to Cluster ',
							labelWidth: '150px',
							inputValue: 1,
							uncheckedValue: 0,
//							width: '60%'
						},
						{
							xtype: 'clustercombobox',
							itemId: 'cluster_id',
							name: 'cluster_id',
							fieldLabel: ' ',
							labelWidth: '15px',
							readOnly: true
						},
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					height: 30,
					width: '100%',
					items: [
						{
							xtype: 'textfield',
							name: 'rangebagihasil_code',
							fieldLabel: 'Kode Range Bagi Hasil ',
							labelWidth: '150px',
							width: '35%',
							readOnly: true,
							allowBlank: false,
//							flex: 3
						},
						{
							xtype: 'rangebagihasilcombobox',
							itemId: 'rangebagihasil_id',
							name: 'rangebagihasil_id',
							fieldLabel: ' ',
							labelWidth: '15px',
//							width: '120%',
//							flex: 4
						},
					]
				},
				{
					xtype: 'container',
//					xtype: 'panel',
//					layout: 'fit',
//					title: 'Detail Pencairan Komisi',
					bodyStyle: 'border:0px',
					items: [
						{
							xtype: 'revenuesharinggriddetail',
//							title: 'Detail Pencairan Komisixx',
							height: 200,
							margin: '10 0 5 0'
						}
					]
				}
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

