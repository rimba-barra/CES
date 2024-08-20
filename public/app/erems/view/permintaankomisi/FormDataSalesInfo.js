Ext.define('Erems.view.permintaankomisi.FormDataSalesInfo', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.salesinfoformdata',
	requires: [
//		'Erems.library.template.component.Namapenerimakomisicombobox',
		'Erems.library.template.component.Distchannelcombobox',
		'Erems.library.template.component.Pencairankomisicombobox',
		'Erems.library.template.component.Perhitungankomisicombobox',
		'Erems.view.permintaankomisi.GridSalesInfo'
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
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Purchaseletter No',
							labelWidth: '120px',
							fieldWidth: '320px',
							name: 'purchaseletter_no',
							readOnly: true,
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
//							anchor: '80%'
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Purchaseletter Date',
							labelWidth: '120px',
							name: 'purchaseletter_date',
							readOnly: true,
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							anchor: '60%'
						},
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
							xtype: 'textfield',
							fieldLabel: 'Customer Name',
							labelWidth: '120px',
							name: 'customer_name',
							readOnly: true,
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
							anchor: '60%'
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Pricetype',
							labelWidth: '120px',
							name: 'pricetype',
							readOnly: true,
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
							anchor: '60%'
						}
					]
				},
				{
					xtype: 'distchannelcombobox',
					labelWidth: '120px',
					forceSelection: true,
					name: 'komisi_distributionchannel_id',
					allowBlank: false,
					anchor: '60%'
				},
				{
					xtype: 'pencairankomisicombobox',
					labelWidth: '120px',
					forceSelection: true,
					fieldLabel: 'Skema Sales',
					name: 'komisi_pencairan_id',
					allowBlank: false,
					anchor: '60%'
				},
				{
					xtype: 'container',
//					xtype: 'panel',
//					layout: 'fit',
//					title: 'Detail Pencairan Komisi',
					bodyStyle: 'border:0px',
					items: [
						{
							xtype: 'salesinfogrid',
//							title: 'Detail Pencairan Komisixx',
							height: 200,
							margin: '10 0 5 0'
						}
					]
				},
				{
					xtype: 'perhitungankomisicombobox',
					labelWidth: '120px',
					forceSelection: true,
					fieldLabel: 'Pilih Perhitungan Komisi (Collection)',
					name: 'komisi_perhitungan_id',
					allowBlank: false,
					anchor: '60%'
				},
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

