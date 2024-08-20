Ext.define('Erems.view.bagihasilproses.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.bagihasilprosesformdata',
	frame: true,
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
			items: [{
					xtype: 'hiddenfield',
					itemId: 'fdms_purchaseletter_id',
					name: 'purchaseletter_id'
				},
				{
					xtype: 'projectptcombobox',
					name: 'pt_id',
					allowBlank: false,
					editable: false,
					hidden: true,
					fieldLabel: 'PT Name',
					valueField: 'pt_id',
					anchor: '-5',
				},
				{
					xtype: 'textfield',
					itemId: 'fdms_doc_no',
					name: 'doc_no',
					fieldLabel: 'No. Doc',
					//readOnly: true,
					anchor: '-5',
					listeners: {
						render: function (field) {
							var month = (new Date().getMonth() < 9) ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth() + 1);
							var days = (new Date().getDate() < 9) ? "0" + String(new Date().getDate()) : String(new Date().getDate());

							var today = String(new Date().getFullYear()) + month + days;
							field.setValue('LRP_' + today);
						}
					}
				},
				{
					xtype: 'datefield',
					fieldLabel: 'Tgl. Doc',
					anchor: '-5',
					name: 'proses_date',
					anchor: '-5',
					// editable: false,
					allowBlank: false,
					value: new Date(),
					format: 'd-m-Y',
					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
					submitFormat: 'Y-m-d H:i:s.u',
					maskRe: /[0-9-]/,
					enforceMaxLength: true,
					maxLength: 10,
					listeners: {
						blur: function (field) {
							var today = new Date();
							if (!field.isValid()) {
								Ext.Msg.alert('Info', 'Date is invalid!');
								field.setValue(today);
							}
						},
						change: function (field) {
							var v = field.getValue();
							var month = (v.getMonth() < 9) ? "0" + String(v.getMonth() + 1) : String(v.getMonth() + 1);
							var days = (v.getDate() < 9) ? "0" + String(v.getDate()) : String(v.getDate());

							var document_no = "LRP_" + String(v.getFullYear()) + month + days;

							var doc = Ext.ComponentQuery.query('#fdms_doc_no');
							doc[0].setValue(document_no);
						}
					}
				}
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});

