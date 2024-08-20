Ext.define('Erems.view.approvalpricelistreport.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.approvalpricelistreportgrid',
	store          : 'Approvalpricelistreport',
	bindPrefixName : 'Approvalpricelistreport',
	width          : 400,
	height         : 350,
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : [],
			selModel    : {},
			columns     : [
				{
					text  : 'No.',
					xtype : 'rownumberer',
					width : 30,
					align : 'left',
					style : "border:none;"
				},
				{
					xtype     : 'gridcolumn',
					dataIndex : 'project_name',
					text      : 'Project',
					width     : 200,
					style     : "border:none;"
				},
				{
					xtype     : 'gridcolumn',
					dataIndex : 'modul',
					text      : 'Modul',
					width     : 100,
					style     : "border:none;",
				},
				{
					xtype     : 'gridcolumn',
					dataIndex : 'keterangan',
					text      : 'Description',
					width     : 350,
					style     : "border:none;"
				},
				{
					xtype     : 'gridcolumn',
					dataIndex : 'status',
					text      : 'Status',
					width     : 200,
					style     : "border:none;",
				},
				me.generateActionColumn()
			],
			bbar: [
				'->',
    			{
                    hidden  : true,
                    xtype   : 'button',
                    action  : 'export_excel',
                    itemId  : 'btnExport',
                    margin  : '0 5 0 0',
                    iconCls : 'icon-excel',
                    text    : 'Export Excel'
                },
            ]
		});

		me.callParent(arguments);
	},
	generateActionColumn: function() {
		var me = this;
		var ac = {
			xtype     : 'actioncolumn',
			itemId    : 'actioncolumn',
			width     : '50px',
			resizable : false,
			align     : 'right',
			hideable  : false,
			items     : [
				{
					iconCls : 'icon-expand-down',
					altText : 'View Detail',
					tooltip : 'View Detail',
					action  : 'expandRow'
				}
			]
		};
		return ac;
	},
	viewConfig: {
		listeners: {
			refresh : function(view){
				var color, nodes, node, record, level, flag, cells, j, i;
				var jno, jid;
				// get all grid view nodes
				nodes = view.getNodes();
				for (i = 0; i < nodes.length; i++) {
					node = nodes[i];
					cells = Ext.get(node).query('td');

					for (j = 0; j < cells.length; j++) {
						Ext.fly(cells[j]).setStyle('border-left', 'none');
						Ext.fly(cells[j]).setStyle('border-right', 'none');
					}
				}
			}
		}
	},
});