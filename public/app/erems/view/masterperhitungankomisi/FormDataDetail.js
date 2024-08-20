Ext.define('Erems.view.masterperhitungankomisi.FormDataDetail', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterperhitungankomisiformdatadetail',
	requires: [
		'Erems.library.template.component.pricetypecombobox'
	],
	autoScroll: true,
	anchorSize: 100,
	height: 270,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				//labelAlign: 'top',
				labelSeparator: ' ',
				// labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'fdms_id',
					name: 'komisi_perhitungan_detail_id'
				},
				{
					xtype: 'pricetypecombobox',
					labelWidth: '120px',
					forceSelection: true,
					name: 'pricetype_id',
                    itemId: 'pricetype_id',
					allowBlank: false,
					anchor: '100%'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Collection',
					labelWidth: '120px',
					forceSelection: true,
					name: 'collection_name',
					allowBlank: false,
					anchor: '100%'
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [
						{
							xtype: 'numberfield',
							name: 'persen_uangmasuk_coll',
							allowBlank: false,
							hideTrigger: true,
							decimalPrecision: 2,
							minValue: 1,
							maxValue: 100,
							fieldLabel: '% Uang Masuk',
							labelWidth: '120px',
							width: '65%'
						},
						{
							xtype: 'label', text: '%', margin: '0 20px 0 10px'
						},
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'is_uangmuka',
							itemId: 'is_uangmuka_value',
							checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 0 0 0px',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'Uang Muka',
							itemId: 'is_uangmuka_label',
                        }
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [
						{
							xtype: 'numberfield',
							name: 'persen_pencairan_komisi',
							allowBlank: false,
							hideTrigger: true,
							decimalPrecision: 2,
							minValue: 1,
							maxValue: 100,
							fieldLabel: '% Pencairan Komisi',
							labelWidth: '120px',
							width: '60%'
						},
						{
							xtype: 'label', text: '%', margin: '0 0 0 10px'
						}
					]
				},
				{
					xtype: 'label',
					text: 'Syarat',
					margin: '10px 0'
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'is_sppjb',
							checked: false,
							inputValue: '1',
							uncheckedValue: '0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'Sudah TTD SPPJB'
						},
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'is_akad',
							itemId: 'is_akad_value',
							checked: false,
							inputValue: '1',
							uncheckedValue: '0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'Sudah Akad',
							itemId: 'is_akad_label',
						},
					]
				},

			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

