Ext.define('Erems.view.gantinama.Grid', {
	extend: 'Erems.library.template.view.GridDS2',
	alias: 'widget.gantinamagrid',
	storeConfig: {
		id: 'GantiNamaGridStore',
		idProperty: 'changename_id',
		extraParams: {}
	},
	//store: 'Gantinama',
	bindPrefixName: 'Gantinama',
	newButtonLabel: 'New Changename',
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
					width: 150,
					align: 'center',
					dataIndex: 'cluster_cluster',
					text: 'Cluster'
				},
				{
					xtype: 'gridcolumn',
					width: 70,
					align: 'center',
					dataIndex: 'block_block',
					hideable: false,
					text: 'Block Code'
				},
				{
					xtype: 'gridcolumn',
					width: 70,
					align: 'center',
					dataIndex: 'unit_unit_number',
					hideable: false,
					text: 'Unit Number'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchase_date',
					width: 100,
					dataIndex: 'purchaseletter_purchaseletter_no',
					hideable: false,
					text: 'Purchase No'
				},

				{
					xtype: 'gridcolumn',
					itemId: 'colms_customer_name',
					width: 100,
					dataIndex: 'customernew_name',
					hideable: false,
					text: 'Customer Name'
				},

				{
					xtype: 'gridcolumn',
					itemId: 'colms_new_customer_name',
					width: 120,
					dataIndex: 'customerold_name',

					hideable: false,
					text: 'New Customer Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_reason',
					width: 100,
					dataIndex: 'reasonchgname_reasonchgname',
					hideable: false,
					text: 'Reason'
				},
				{
					xtype: 'booleancolumn',
					dataIndex: 'purchaseletterrevision_is_approve',
					text: 'Approved',
					align: 'center',
					falseText: ' ',
					trueText: '&#10003;'
				},
				{
					xtype: 'datecolumn',
					dataIndex: 'purchaseletterrevision_approve_date',
					text: ' Approve Date',
					format: 'd-m-Y'
				},
				{
					xtype: 'datecolumn',
					dataIndex: 'purchaseletterrevision_approvereal_date',
					text: ' Approve Real Date',
					format: 'd-m-Y'
				},
				{
					xtype: 'booleancolumn',
					dataIndex: 'purchaseletterrevision_is_rejected',
					text: 'Rejected',
					align: 'center',
					falseText: ' ',
					trueText: '&#10003;'
				},
				{
					xtype: 'datecolumn',
					dataIndex: 'purchaseletterrevision_rejected_date',
					text: 'Reject Date',
					format: 'd-m-Y'
				},

				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var me = this;

		var dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				height: 28,
				items: [
					{
						xtype: 'button',
						action: 'create',
						hidden: true,
						itemId: 'btnNew',
						margin: '0 5 0 0',
						iconCls: 'icon-new',
						bindAction: me.bindPrefixName + 'Create',
						text: me.newButtonLabel
					},
					{
						xtype: 'button',
						action: 'update',
						disabled: true,
						hidden: true,
						itemId: 'btnEdit',
						margin: '0 5 0 0',
						iconCls: 'icon-edit',
						text: 'Edit',
						bindAction: me.bindPrefixName + 'Update'
					},
					{
						xtype: 'button',
						action: 'destroy',
						disabled: true,
						hidden: true,
						itemId: 'btnDelete',
						bindAction: me.bindPrefixName + 'Delete',
						iconCls: 'icon-delete',
						text: 'Delete Selected'
					},
					{
						xtype: 'button',
						action: 'view',
						itemId: 'btnView',
						margin: '0 5 0 0',
						//padding:5,
						iconCls: 'icon-search',
						text: 'View',
						bindAction: me.bindPrefixName + 'Read',
						disabled: true,
						hidden:true
					},
					{
						xtype: 'button',
						action: 'print',
						hidden: true,
						itemId: 'btnPrint',
						margin: '0 5 0 0',
						bindAction: me.bindPrefixName + 'Print',
						iconCls: 'icon-print',
						text: 'Print / Save'
					},						
					{
						xtype: 'button',
						action: 'printmsword',
						margin: '0 5 0 0',
						iconCls: 'icon-print',
						text: 'Adendum'
					}
				]
			},
			{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				width: 360,
				displayInfo: true,
				store: this.getStore()
			}
		];
		return dockedItems;
	},
	generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
				{
					text: 'View',
					iconCls: 'icon-search',
					action: 'show',
					bindAction: me.bindPrefixName + 'Read',
					altText: 'View',
					tooltip: 'View',
					hidden:true
				}
            ]
        };
        return ac;
    },
});