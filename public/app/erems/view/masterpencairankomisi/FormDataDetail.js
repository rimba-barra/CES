Ext.define('Erems.view.masterpencairankomisi.FormDataDetail', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterpencairankomisiformdatadetail',
	requires: [
		'Erems.library.template.component.Penerimakomisicombobox',
		'Erems.library.template.component.Namapenerimakomisicombobox'
//		'Erems.view.masterpencairankomisi.GridDetail'
	],
	autoScroll: true,
	anchorSize: 100,
	height: 370,
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
					name: 'komisi_pencairan_detail_id'
				},
				{
					xtype: 'penerimakomisicombobox',
					labelWidth: '120px',
					forceSelection: true,
					name: 'komisi_penerima_id',
					allowBlank: false,
					anchor: '60%'
				},
				{
					xtype: 'radiogroup',
					fieldLabel: 'Komisi',
					allowBlank: false,
					labelWidth: '120px',
					name: 'rg_jenis_komisi',
					anchor: '50%',
					items: [
						{boxLabel: 'Persen', name: 'komisi_persen_nominal', inputValue: 'persen', checked: true},
						{boxLabel: 'Nominal', name: 'komisi_persen_nominal', inputValue: 'nominal'},
					]
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'margin-left:120px;background:none;background-color:#F2F2F2 !important;text-align:right',
					maskRe: /[0-9\.]/,
					value: 0.00,
					labelWidth: '120px',
					name: 'komisi_value',
					allowBlank: false,
					hideTrigger: true,
					anchor: '40%',
					decimalPrecision: 4,
					listeners: {
						blur: function (field) {
							var precision = 2;
							if (me.down('[name=rg_jenis_komisi]').getValue().komisi_persen_nominal == 'persen') {
								var precision = 4;
							}
							var val = field.getValue();
							if (val < 0) {
								field.setRawValue(accounting.formatMoney(val, {precision: precision, format: {neg: "%s -%v"}}));
							} else {

								field.setRawValue(accounting.formatMoney(val, {precision: precision}));
							}
						},
						focus: function (field) {
							field.setRawValue(accounting.unformat(field.getValue()));
						}
					}
				},
				{
					xtype: 'radiogroup',
					fieldLabel: 'Populated Data',
					allowBlank: false,
					labelWidth: '120px',
					name: 'rg_populated_data',
					columns: 3,
					vertical: true,
					items: [
						{boxLabel: 'All Employee', name: 'populated_data', inputValue: 'all'},
						{boxLabel: 'Salesman', name: 'populated_data', inputValue: 'salesman'},
						{boxLabel: 'Kode KC', name: 'populated_data', inputValue: 'kode_kc'},
						{boxLabel: 'Club Citra Group', name: 'populated_data', inputValue: 'club_citra'},
						{boxLabel: 'Member', name: 'populated_data', inputValue: 'member'},
						{boxLabel: 'Freetext', name: 'populated_data', inputValue: 'freetext', checked: true}
					]
				},
				{
					xtype: 'container',
					layout: 'vbox',
					width: '100%',
					anchor: '100%',
					items: [
						{
							xtype: 'namapenerimakomisicombobox',
							fieldLabel: 'Nama Penerima',
							labelWidth: '120px',
							forceSelection: true,
							name: 'reff_id',
							hidden: true,
							maskRe:/[A-Za-z0-9\s\.\-\/]/,
							allowBlank: false,
							anchor: '100%',
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Nama Penerima',
							labelWidth: '120px',
							forceSelection: true,
							name: 'reff_name',
							allowBlank: false,
							anchor: '60%',
						}
					]
				},
				{
					xtype: 'maskfield',
					mask: '##.###.###.#-###.###',
					fieldLabel: 'NPWP',
					labelWidth: '120px',
					name: 'npwp',
//					allowBlank: false,
					anchor: '60%',
				},
				{
					xtype      : 'xnotefieldEST',
					fieldLabel : 'Keterangan',
					labelWidth : '120px',
					name       : 'keterangan',
					anchor     : '100%'
				}
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

