Ext.define('Erems.view.utility.UtilityFormImport', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.utilityformimport',
	requires: [],
	frame: true,
	autoScroll: true,
	anchorSize: 100,
//	height: 600,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'padding:5px 5px 0',
	defaults: {
		border: false,
		xtype: 'panel',
		flex: 1,
		layout: ''

	},
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			dockedItems: me.generateDockedItems(),
			items: [
				{
					xtype: 'filefield',
					itemId: 'excel_filename',
					emptyText: 'Select File',
					fieldLabel: 'Excel File',
					name: 'excel_filename',
					buttonText: 'Browse',
					allowBlank: false
				},
				{
					xtype: 'component',
					fieldLabel: 'qq',
					autoEl: {
						tag: 'a',
						href: 'app/erems/uploads/msexcel/upload_utilitas.xlsx',
						html: 'Download Template',
						style: 'margin-left:105px;'
					},
//					listeners: {
//						render: function (c) {
//							var label = c.getEl().up('.x-component').child('.x-form-item-label');
//							label.dom.htmlFor = '';
//							var a = label.child('a');
//							a.on('click', function () {
//								Ext.Msg.alert('Alert', 'Anchor clicked');
//							}, c, {stopEvent: true});
//						}
//					}
				}
			],
		});

		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				layout: {
					padding: 6,
					type: 'hbox'
				},
				items: [
					{
						xtype: 'button',
						action: 'process',
						itemId: 'btnSearch',
						padding: 5,
						width: 75,
						iconCls: 'icon-search',
						text: 'Upload'
					},
					{
						xtype: 'button',
						action: 'reset',
						itemId: 'btnReset',
						padding: 5,
						width: 75,
						iconCls: 'icon-reset',
						text: 'Reset'
					}
				]
			}
		];
		return dockedItems;
	}
});