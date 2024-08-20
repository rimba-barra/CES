Ext.define('Erems.view.permintaankomisi.FormDataDetail', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.permintaankomisiformdatadetail',
	requires: [
//		'Erems.library.template.component.Penerimakomisicombobox',
//		'Erems.library.template.component.Namapenerimakomisicombobox'
		'Erems.view.permintaankomisi.GridUnitJual'
	],
	autoScroll: true,
	anchorSize: 100,
	height: 600,
	maxHeight: 700,
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
					name: 'purchaseletter_id_old'
				},
				{
					xtype: 'xmoneyfield',
					fieldLabel: 'Harga Netto',
					labelWidth: '150px',
					fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
					maskRe: /[0-9\.]/,
					value: 0.00,
					hideTrigger: true,
					decimalPrecision: 2,
					anchor: '-5',
					name: 'harga_netto',
					flex: 1,
					readOnly: true,
				},
				{
					xtype: 'xmoneyfield',
					fieldLabel: 'Harga Netto Komisi',
					labelWidth: '150px',
					fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
					maskRe: /[0-9\.]/,
					value: 0.00,
					hideTrigger: true,
					decimalPrecision: 2,
					anchor: '-5',
					name: 'harga_netto_komisi',
					flex: 1,
					readOnly: true,
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Penerima Komisi',
					labelWidth: '150px',
					anchor: '-5',
					name: 'penerima_komisi',
					flex: 1,
					readOnly: true,
					fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Nama Karyawan',
							labelWidth: '150px',
							anchor: '40%',
							name: 'reff_name',
							flex: 1,
							readOnly: true,
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
							labelStyle: 'font-size:10.8',
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'is_progresif',
							hidden: true,
							itemId: 'is_progresif',
							checked: false,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 0 0 10px',
							width: 20
						},
						{
							xtype: 'label',
							hidden: true,
							text: 'Progresif (SH2)',
							itemId: 'is_progresif_label',
							name: 'is_progresif_label',
						}
					]
				},
				{
					xtype: 'datefield',
					hidden: true,
					fieldLabel: 'Bulan Permintaan Komisi',
					labelWidth: '150px',
					anchor: '55%',
					name: 'komisi_permintaan_date',
					flex: 1,
					readOnly: true,
					fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
					format: 'm Y',
//					value: new Date(),
					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
					submitFormat: 'Y-m-d H:i:s.u'
				},
				{
//					xtype: 'container',
					xtype: 'fieldset',
					name: 'fs_progresif',
					width: '100%',
//					layout: 'accordion',
					title: 'Data Purchaseletter dan Target',
					collapsible: true,
					bodyStyle: 'background:none;border:0;',
					hidden: true,
					items: [
						{
							xtype: 'permintaankomisigridunitjual',
//							title: 'List Unit Terjual Sales Yang Bersangkutan',
							height: 150,
							margin: '10 0 5 0'
						},
						{
							xtype: 'xmoneyfield',
							fieldLabel: 'Total Sudah dibuat Permintaan Komisi',
							labelWidth: '250px',
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
							maskRe: /[0-9\.]/,
							value: 0.00,
							hideTrigger: true,
							decimalPrecision: 2,
							anchor: '-5',
							name: 'total_permintaan_komisi',
							flex: 1,
							readOnly: true,
						},
						{
							xtype: 'fieldset',
							name: 'fs_pindah_blok',
							width: '100%',
							title: 'Pindah Blok',
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
											name: 'is_changekavling',
											itemId: 'is_changekavling',
											checked: false,
											inputValue: '1',
											uncheckedValue: '0',
											margin: '0 0 0 10px',
											width: 20
										},
										{
											xtype: 'label',
											text: 'Pindah Blok (jangan dicentang bila unit sebelumnya belum dibuat Permintaan Komisi)',
											itemId: 'is_changekavling_label',
											name: 'is_changekavling_label',
										}
									]
								},
								{
									layout: 'hbox',
									bodyStyle: 'border:0px;background:none;',
									width: '100%',
									hidden: true,
									name: 'fs_changekav_search',
									items: [
										{
											xtype: 'textfield',
											fieldLabel: 'No Unit Lama',
//											labelWidth: '150px',
//											anchor: '40%',
											name: 'src_unit_lama',
											flex: 1,
											labelStyle: 'font-size:10.8',
										},
										{
											xtype: 'textfield',
											fieldLabel: 'Nama Customer',
//											labelWidth: '150px',
//											anchor: '40%',
											name: 'src_nama_customer',
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
											style: 'background-color:#FFC000;'
										},
										{
											xtype: 'button',
											action: 'reset',
											itemId: 'fdd_reset_btn',
											padding: '2px 5px',
											iconCls: 'icon-reset',
											text: 'Reset'
										}
									]
								},
								{
									xtype: 'permintaankomisigridunitbatal',
									name: 'grid_unit_batal',
									height: 200,
									hidden: true,
									margin: '10 0 5 0'
								},
								{
									xtype: 'permintaankomisigridtargetbatal',
									name: 'grid_target_batal',
									height: 200,
									hidden: true,
									margin: '10 0 5 0'
								}
							]
						},
						{
							xtype: 'permintaankomisigridtargetjual',
//							title: 'List Unit Terjual Sales Yang Bersangkutan',
							height: 200,
							margin: '10 0 5 0'
						},
					]
				},
				{
					xtype: 'numberfield',
//					xtype: 'xmoneyfield',
					fieldLabel: 'Persentase Komisi',
					labelWidth: '150px',
					fieldStyle: '!important;text-align:right',
					maskRe: /[0-9\.]/,
					value: 0.00,
					maxValue: 100,
					hideTrigger: true,
					decimalPrecision: 4,
					anchor: '31%',
					name: 'persentase_komisi',
					field: 'komisi',
					flex: 1,
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [
						{
							xtype: 'xmoneyfield',
							fieldLabel: 'Nilai Komisi Aktual',
							labelWidth: '150px',
							fieldStyle: '!important;text-align:right',
							maskRe: /[0-9\.]/,
							value: 0.00,
							hideTrigger: true,
							decimalPrecision: 2,
							anchor: '-5',
							name: 'nilai_komisi_aktual',
							hidden: true,
							readOnly: true,
							flex: 1,
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'is_replace_komisi',
							hidden: true,
							itemId: 'is_replace_komisi',
							checked: false,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 0 0 10px',
							width: 20
						},
						{
							xtype: 'label',
							hidden: true,
							text: 'Samakan nilai komisi dengan nilai aktual saat ini?',
							itemId: 'is_replace_komisi_label',
							name: 'is_replace_komisi_label',
						}
					]
				},
				{
					xtype            : 'xmoneyfield',
					fieldLabel       : 'Nilai Komisi',
					labelWidth       : '150px',
					fieldStyle       : '!important;text-align:right',
					maskRe           : /[0-9]/,
					value            : 0,
					hideTrigger      : true,
					decimalPrecision : 0,
					anchor           : '-5',
					name             : 'nilai_komisi',
					allowBlank       : false,
					flex             : 1,
				},
				{
					xtype: 'numberfield',
					fieldLabel: 'Persentase PPN',
					labelWidth: '150px',
					fieldStyle: '!important;text-align:right',
					maskRe: /[0-9\.]/,
					value: 0.00,
					maxValue: 100,
					hideTrigger: true,
					decimalPrecision: 2,
					anchor: '28.5%',
					name: 'persentase_ppn',
					field: 'ppn',
					flex: 1,
				},
				{
					xtype            : 'xmoneyfield',
					fieldLabel       : 'PPN',
					labelWidth       : '150px',
					fieldStyle       : '!important;text-align:right',
					maskRe           : /[0-9]/,
					value            : 0,
					hideTrigger      : true,
					decimalPrecision : 0,
					anchor           : '-5',
					name             : 'nilai_ppn',
					flex             : 1,
				},
				{
					xtype: 'radiogroup',
					fieldLabel: 'PPH',
					labelWidth: '150px',
					allowBlank: false,
					name: 'rg_pph',
//					anchor: '50%',
					items: [
						{boxLabel: 'PT', name: 'pph_pt_perorangan', inputValue: 'pt', checked: true},
						{boxLabel: 'Perorangan', name: 'pph_pt_perorangan', inputValue: 'perorangan'},
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [
						{
							xtype: 'numberfield',
							labelClsExtra: 'small',
							fieldLabel: 'Persentase PPH PT',
							labelWidth: '150px',
							fieldStyle: '!important;text-align:right;margin-bottom:5px',
							maskRe: /[0-9\.]/,
							value: 0.00,
							maxValue: 100,
							hideTrigger: true,
							decimalPrecision: 2,
							anchor: '55%',
							name: 'persentase_pph_pt',
							field: 'pph_pt',
							// flex: 1,
							width: 188
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'is_grossup_pph_pt',
							itemId: 'is_grossup_pph_pt_value',
							checked: false,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 0 0 10px',
							width: 20
						},
						{
							xtype: 'label',
							text: 'Gross Up',
							name: 'is_grossup_pph_pt_label',
							itemId: 'is_grossup_pph_pt_label',
						}
					]
				},
				{
					xtype: 'xmoneyfield',
					fieldLabel: 'PPH PT',
					labelWidth: '150px',
					fieldStyle: '!important;text-align:right',
					maskRe: /[0-9\.]/,
					value: 0.00,
					hideTrigger: true,
					decimalPrecision: 2,
//					decimalPrecision: 0,
					anchor: '-5',
					name: 'nilai_pph_pt',
					flex: 1,
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [
						{
							xtype: 'numberfield',
							labelClsExtra: 'small',
							fieldLabel: 'Persentase PPH Perorangan',
							labelWidth: '150px',
							fieldStyle: '!important;text-align:right;margin-bottom:5px',
							maskRe: /[0-9\.]/,
							value: 0.00,
							maxValue: 100,
							hideTrigger: true,
							decimalPrecision: 2,
							anchor: '55%',
							name: 'persentase_pph_perorangan',
							field: 'pph_perorangan',
							// flex: 1,
							width: 188
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'is_grossup_pph_perorangan',
							itemId: 'is_grossup_pph_perorangan_value',
							checked: false,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 0 0 10px',
							width: 20
						},
						{
							xtype: 'label',
							text: 'Gross Up',
							name: 'is_grossup_pph_perorangan_label',
							itemId: 'is_grossup_pph_perorangan_label',
						}
					]
				},
				{
					xtype: 'xmoneyfield',
					fieldLabel: 'PPH Perorangan',
					labelWidth: '150px',
					fieldStyle: '!important;text-align:right',
//					maskRe: /[0-9\.]/,
					maskRe: /[0-9]/,
//					value: 0.00,
					value: 0,
					hideTrigger: true,
//					decimalPrecision: 2,
					decimalPrecision: 0,
					anchor: '-5',
					name: 'nilai_pph_perorangan',
					flex: 1,
				},
				{
					xtype: 'xmoneyfield',
					fieldLabel: 'Pengurang Komisi',
					labelWidth: '150px',
					fieldStyle: '!important;text-align:right',
					maskRe: /[0-9]/,
					value: 0,
					anchor: '-5',
					name: 'pengurang_komisi',
					flex: 1,
				},
				{
					xtype: 'xmoneyfield',
					fieldLabel: 'Nilai Komisi Diterima',
					labelWidth: '150px',
					fieldStyle: '!important;text-align:right',
					maskRe: /[0-9]/,
//					value: 0.00,
					value: 0,
					hideTrigger: true,
//					decimalPrecision: 2,
//					decimalPrecision: 0,
					readOnly: true,
					anchor: '-5',
					name: 'total_komisi',
					allowBlank: false,
					flex: 1,
				},
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

