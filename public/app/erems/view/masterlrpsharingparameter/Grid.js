Ext.define('Erems.view.masterlrpsharingparameter.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterlrpsharingparametergrid',
	store: 'Masterlrpsharingparameter',
	bindPrefixName: 'Masterlrpsharingparameter',
	// itemId:'',
	newButtonLabel: 'New Sharing Parameter',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {

			},
			selModel: Ext.create('Ext.selection.CheckboxModel', {

			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_ptname',
					width: 200,
					hidden: true,
					dataIndex: 'ptname',
					hideable: false,
					text: 'PT Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_pricetype',
					width: 100,
					dataIndex: 'pricetype',
					hideable: false,
					text: 'Price Type'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_payment_start',
					width: 100,
					dataIndex: 'payment_start',
					hideable: false,
					align: 'right',
					text: 'Payment Start'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_payment_end',
					width: 100,
					dataIndex: 'payment_end',
					hideable: false,
					align: 'right',
					text: 'Payment End'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_sharing',
					width: 100,
					dataIndex: 'sharing',
					hideable: false,
					align: 'right',
					text: 'Sharing'
				},

				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	}
});


