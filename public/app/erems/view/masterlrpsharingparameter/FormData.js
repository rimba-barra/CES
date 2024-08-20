Ext.define('Erems.view.masterlrpsharingparameter.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterlrpsharingparameterformdata',
	autoScroll: true,
	anchorSize: 100,
	height: 270,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	requires: [
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.library.template.component.Projectptcombobox',
	],
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
			items: [{
					xtype: 'hiddenfield',
					itemId: 'fdms_id',
					name: 'lrp_sharingparameter_id'
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [{
							xtype: 'projectptcombobox',
							name: 'pt_id',
							allowBlank: false,
							editable: false,
							hidden:true,
							fieldLabel: 'PT Name',
							valueField: 'pt_id',
							anchor: '-15',
						}, ]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [{
							xtype: 'pricetypecombobox',
							fieldLabel: 'Price Type',
							name: 'pricetype_id',
							editable: false,
							allowBlank: false,
							anchor: '-15',
							// listeners: {
							// select: function(combo, record, index){
							// var text = this.getRawValue();
							// if(text == 'KPR'){
							// Ext.Msg.alert('Info','Yang bisa didaftarkan hanya CASH dan INHOUSE saja.');
							// this.setValue();
							// }
							// }
							// }       
						}]
				},
				{
					padding: '5px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [{
							xtype: 'textfield',
							fieldLabel: 'Payment Start',
							labelClsExtra: 'small',
							anchor: '100%',
							name: 'payment_start',
							allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					padding: '5px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [{
							xtype: 'textfield',
							fieldLabel: 'Payment End',
							labelClsExtra: 'small',
							anchor: '100%',
							name: 'payment_end',
							allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					padding: '5px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [{
							xtype: 'textfield',
							fieldLabel: 'Sharing',
							labelClsExtra: 'small',
							anchor: '100%',
							name: 'sharing',
							allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					xtype: 'checkboxfield',
					fieldLabel: 'Sudah Ttd SPPJB',
					name: 'is_sppjb',
//                    checked: true,
					inputValue: '1',
					uncheckedValue: '0',
					margin: '0 5px 0 0',
					width: 20
				},
				{
					xtype: 'checkboxfield',
					fieldLabel: 'Sudah Akad',
					hidden: true,
					name: 'is_akad',
//                    checked: true,
					inputValue: '1',
					uncheckedValue: '0',
					margin: '0 5px 0 0',
					width: 20
				},
				{
					xtype: 'checkboxfield',
					fieldLabel: 'Sudah Sertifikat',
					name: 'is_sertifikat',
//                    checked: true,
					inputValue: '1',
					uncheckedValue: '0',
					margin: '0 5px 0 0',
					width: 20
				}
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});

