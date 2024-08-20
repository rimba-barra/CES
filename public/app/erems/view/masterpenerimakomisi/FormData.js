Ext.define('Erems.view.masterpenerimakomisi.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterpenerimakomisiformdata',
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
					name: 'komisi_penerima_id'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Kode',
					labelWidth: '120px',
					name: 'code',
					allowBlank: false,
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Penerima Komisi',
					labelWidth: '120px',
					name: 'penerima_komisi',
					allowBlank: false,
				},
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});

