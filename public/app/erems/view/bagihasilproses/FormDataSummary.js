Ext.define('Erems.view.bagihasilproses.FormDataSummary', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.bagihasilprosesformdatasummary',
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
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    itemId:'pt_box',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
						{
							xtype: 'projectptcombobox',
							name: 'pt_id',
							allowBlank: false,
							fieldLabel: 'PT Name',
							valueField: 'pt_id',
							anchor: '-5',
							forceSelection: true,
							listeners: {
								beforequery: function (record) {
									record.query = new RegExp(record.query, 'i');
									record.forceAll = true;
								}
							}
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
		                },
                    ]
                },
				{
					xtype: 'datefield',
					fieldLabel: 'Periode Cut Off',
					anchor: '-5',
					name: 'periode_cutoff_date',
					anchor: '-5',
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
					}
				}
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});

