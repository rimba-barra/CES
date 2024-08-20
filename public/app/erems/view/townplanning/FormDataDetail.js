Ext.define('Erems.view.townplanning.FormDataDetail', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.townplanningformdatadetail',
	autoScroll: true,
	anchorSize: 100,
	height: 250,
	maxHeight: 250,
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
					xtype: 'textfield',
					fieldLabel: 'Change Date',
					labelWidth: '150px',
					anchor: '-5',
					name: 'change_date',
					flex: 1,
					readOnly: true,
					fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Instruksi Order',
					labelWidth: '150px',
					anchor: '-5',
					name: 'instruksi_order',
					flex: 1,
					readOnly: true,
					fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Person in Charge',
					labelWidth: '150px',
					anchor: '-5',
					name: 'person_in_charge',
					flex: 1,
					readOnly: true,
					fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
				},
				{
					xtype      : 'xnotefieldEST',
					fieldLabel : 'Description',
					labelWidth : '150px',
					anchor     : '-5',
					name       : 'description',
					flex       : 1,
					readOnly   : true,
					fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
				},
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	},

	generateDockedItem: function () {
		var x = [
			{
				xtype  : 'toolbar',
				dock   : 'bottom',
				ui     : 'footer',
				layout : {
					padding : 6,
					type    : 'hbox'
				},
				items: [
					{
						xtype   : 'button',
						action  : 'cancel',
						itemId  : 'btnCancel',
						padding : 5,
						width   : 75,
						iconCls : 'icon-cancel',
						text    : 'Cancel',
						handler : function () {
							this.up('window').close();
						}
					}
				]
			}
		];
		return x;
	},
});

