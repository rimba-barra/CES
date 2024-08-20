Ext.define('Erems.view.masterformula.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterformulaformdata',
	requires: [
		'Erems.view.masterformula.BalloonGrid',
		'Erems.view.masterformula.FormAddDetail',
		'Erems.library.template.component.Typeperiodecombobox',
		'Erems.library.template.component.Pricetypecombobox'
	],
	frame: true,
	height: 500,
	autoScroll: true,
	bodyBorder: true,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;padding:5px 5px 0',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: {
				labelAlign: 'left',
				labelSeparator: ' '
			},
			items: [{
					xtype: 'hiddenfield',
					itemId: 'fdms_id',
					name: 'billingrules_id'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Code',
					itemId: 'h_code',
					padding: '10px 0 0 0',
					enforceMaxLength: true,
					maxLength: 5,
					name: 'code',
					anchor: '-280',
					allowBlank: false
				}, {
					xtype: 'pricetypecombobox',
					fieldLabel: 'Price type',
					padding: '10px 0 0 0',
					allowBlank: false,
					forceSelection: true,
					name: 'pricetype_id'
				}, {
					xtype      : 'xnotefieldEST',
					fieldLabel : 'Description',
					padding    : '10px 0 0 0',
					anchor     : '-5',
					name       : 'description'
				}, {
					//  bodyPadding: 10,
					defaults: {
						labelAlign: 'left',
						labelSeparator: ' '

					},
					padding: '10px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					items: [{
							xtype: 'numberfield',
							fieldLabel: 'Tanda jadi',
							anchor: '-5',
							minValue: 0,
							maxValue: 100,
							value: 0,
							name: 'persen_tandajadi',
							flex: 7
						}, {
							xtype: 'splitter', width: 10,
						}, {xtype: 'label', text: '% ', flex: 1}, {
							xtype: 'splitter', width: 10,
						}, {xtype: 'label', text: ' / ', flex: 1}, {
							xtype: 'splitter', width: 10,
						}, {xtype: 'label', text: 'Rp', flex: 1}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'xmoneyfield',
							fieldLabel: '',
							anchor: '-5',
							minValue: 0,
							value: 0,
							name: 'tandajadi',
							flex: 5,
							labelWidth: 100
						}]
				},{
					xtype: 'checkboxfield',
					fieldLabel: 'Jeda',
					name: 'is_jeda',
					inputValue: '1',
					uncheckedValue: '0'
				}, {
					//  bodyPadding: 10,
					defaults: {
						labelAlign: 'left',
						labelSeparator: ' '

					},
					padding: '10px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					items: [{
							xtype: 'numberfield',
							minValue: 0,
							value: 0,
							fieldLabel: 'Jeda setelah TJ',
							name: 'periode_jeda',
							flex: 4,
                                                        readOnly: true,
						}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'typeperiodecombobox',
							fieldLabel: '',
							name: 'type_periode_jeda',
							allowBlank: true,
							forceSelection: true,
							margin: '5px 0 0 0',
							flex: 3,
                                                        readOnly: true,
						}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'label',
							text: '',
							flex: 2
						}]
				},{
					//  bodyPadding: 10,
					defaults: {
						labelAlign: 'left',
						labelSeparator: ' '

					},
					padding: '10px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					items: [{
							xtype: 'numberfield',
							minValue: 0,
							maxValue: 100,
							value: 0,
							fieldLabel: 'Uang muka',
							anchor: '-5',
							name: 'persen_uangmuka',
							flex: 7
						}, {
							xtype: 'splitter', width: 10,
						}, {xtype: 'label', text: '% ', flex: 1}, {
							xtype: 'splitter', width: 10,
						}, {xtype: 'label', text: ' / ', flex: 1}, {
							xtype: 'splitter', width: 10,
						}, {xtype: 'label', text: 'Rp.', flex: 1}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'xmoneyfield',
							minValue: 0,
							value: 0,
							fieldLabel: '',
							anchor: '-5',
							name: 'uangmuka',
							flex: 5,
							labelWidth: 100
						}]
				}, {
					//  bodyPadding: 10,
					defaults: {
						labelAlign: 'left',
						labelSeparator: ' '

					},
					padding: '10px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					items: [{
							xtype: 'numberfield',
							minValue: 0,
							value: 0,
							fieldLabel: 'Periode uang muka',
							name: 'periode_uangmuka',
							flex: 4
						}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'typeperiodecombobox',
							fieldLabel: '',
							name: 'type_periode_uangmuka',
							allowBlank: false,
							forceSelection: true,
							margin: '5px 0 0 0',
							flex: 3
						}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'label',
							text: '',
							flex: 2
						}]
				}, {
					//  bodyPadding: 10,
					defaults: {
						labelAlign: 'left',
						labelSeparator: ' '

					},
					padding: '10px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					items: [{
							xtype: 'numberfield',
							minValue: 0,
							value: 0,
							fieldLabel: 'Term uang muka',
							anchor: '-5',
							name: 'term_uangmuka',
							flex: 2
						}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'label',
							text: 'Kali',
							flex: 2
						}]
				}, {
					//  bodyPadding: 10,
					defaults: {
						labelAlign: 'left',
						labelSeparator: ' '

					},
					padding: '10px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					items: [{
							xtype: 'numberfield',
							minValue: 0,
							value: 0,
							fieldLabel: 'Periode angsuran',
							anchor: '-5',
							name: 'periode_angsuran',
							flex: 4
						}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'typeperiodecombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'type_periode_angsuran',
							allowBlank: false,
							forceSelection: true,
							flex: 3
						}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'label',
							text: '',
							flex: 3
						}]
				}, {
					//  bodyPadding: 10,
					defaults: {
						labelAlign: 'left',
						labelSeparator: ' '

					},
					padding: '10px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [{
							xtype: 'numberfield',
							minValue: 0,
							value: 0,
							fieldLabel: 'Term angsuran',
							anchor: '-5',
							name: 'term_angsuran',
							flex: 1
						}, {
							xtype: 'splitter', width: 10,
						}, {
							xtype: 'label',
							text: 'Kali',
							flex: 1
						}]
				},
				{
					xtype: 'checkboxfield',
					fieldLabel: 'Active',
					name: 'Active',
					inputValue: '1',
					uncheckedValue: '0'
				},
				{
					xtype: 'checkboxfield',
					fieldLabel: 'Balloon',
					name: 'is_balloon',
					inputValue: '1',
					uncheckedValue: '0'
				},
				{
					xtype: 'fieldset',
					height: 250,
					itemId: 'DetailBalloonFieldSet',
					title: 'Detail Balloon',
					items: [
						{xtype: 'masterformulaballoongrid', itemId: 'masterformulaballoon_grid'}
					]
				}
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});