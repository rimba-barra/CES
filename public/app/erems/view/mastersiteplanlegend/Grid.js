Ext.define('Erems.view.mastersiteplanlegend.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.mastersiteplanlegendgrid',
	store: 'Mastersiteplanlegend',
	bindPrefixName: 'Mastersiteplanlegend',
	// itemId:'',
	newButtonLabel: 'New Master Siteplan Legend',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
//			viewConfig: {
//
//			},
			selModel: Ext.create('Ext.selection.CheckboxModel', {

			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					xtype: 'gridcolumn',
					header: 'siteplanlegend_id',
					dataIndex: 'siteplanlegend_id',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_file_svg',
					width: 80,
					dataIndex: 'file_svg',
					hideable: false,
					text: 'Legend',
					align: 'center',
					renderer: function (value, metadata, record) {
//						return value;
//						return '<object id="svglegend-' + record.get('siteplanlegend_id') + '" data="app/erems/uploads/siteplan/' + value + '" type="image/svg+xml" style="width:50px; height:50px"></object>';
						return '<object color="' + record.get('color') + '" legendid_svg="' + record.get('legendid_svg') + '" id="svglegend-' + record.get('siteplanlegend_id') + '" data="app/erems/uploads/siteplan/' + value + '?_=' + new Date().getTime() + '" type="image/svg+xml" style="width:50px; height:50px"></object>';
//						console.log(Ext.get('033201a9-f431-407f-8fae-dd5117efab30'));
					},
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_prefixcode_svg',
					width: 60,
					dataIndex: 'prefixcode_svg',
					hideable: false,
					text: 'Code<br/>Prefix SVG',
					align: 'center',
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_legendid_svg',
//					width: 200,
					dataIndex: 'legendid_svg',
					hideable: false,
					text: 'ID Legend SVG'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_color',
					width: 60,
					dataIndex: 'color',
					hideable: false,
					align: 'center',
					text: 'Color<br/>Legend'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_desc',
					width: 200,
					dataIndex: 'description',
					hideable: false,
					text: 'Description'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_list_rules',
					width: 200,
					dataIndex: 'list_rules',
					hideable: false,
					text: 'Rules'
				},

				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},

	viewConfig: {
		listeners: {
			refresh: function (view) {
				var nodes, node, record, cells, j, i;
				// get all grid view nodes
				nodes = view.getNodes();
				for (i = 0; i < nodes.length; i++) {
					node = nodes[i];
					// get node record
					record = view.getRecord(node);
//					var a = document.getElementById("svglegend-" + record.get('siteplanlegend_id'));
//						console.log(a);

					// It's important to add an load event listener to the object,
					// as it will load the svg doc asynchronously
					document.getElementById("svglegend-" + record.get('siteplanlegend_id')).addEventListener("load", function () {

						// get the inner DOM of alpha.svg
						var svgDoc = this.contentDocument;
						var legendid_svg = this.getAttribute('legendid_svg')
						var color = this.getAttribute('color')

						// get the inner element by id
						var delta = svgDoc.getElementById(legendid_svg);
//						console.log(delta);
//						console.log($(svgDoc).contents().find('#'+record.get('legendid_svg')));
						delta.setAttribute("style",
								"fill:" + color
								+ ";stroke-width: 1;stroke:black"
								);
//						delta.setAttributeNS(null, "style",
//								"fill:" + record.get('color')
////							+";stroke-width: 1;stroke:black"
//								);
//						console.log(delta);
						// add behaviour
//						delta.addEventListener("mousedown", function () {
//							alert('hello world!')
//						}, false);
					}, false);








					// get level from record data    
//					if (record.get("set_rs") == "1") {
//						cells = Ext.get(node).query('td');
//						// set bacground color to all row td elements
//						for (j = 0; j < cells.length; j++) {
//							Ext.fly(cells[j]).setStyle('background-color', '#FCD03D');
//						}
				}
			}
		}
	}
});


