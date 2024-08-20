Ext.define('Erems.view.progressunit.Grid', {
	extend      : 'Erems.library.template.view.GridDS2',
	storeConfig : {
		id          : 'ProgressunitGridStore',
		idProperty  : 'unit_id',
		extraParams : {}
	},
	alias          : 'widget.progressunitgrid',
	bindPrefixName : 'Progressunit',
	newButtonLabel : 'New Construction Progress',
	dStore : null,
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : Ext.create('Ext.selection.CheckboxModel', {
				checkOnly: true,
	            listeners: {
	            	// afterselect : function (test, record, index, eOpts, a, b) {
	             //    	console.log(test, record, index, eOpts, a, b)
	            	// },
	                beforeselect : function (test, record, index, eOpts, a, b) {
	      //           	console.log(test, record, index, eOpts, a, b)
	                	if(record.get('spk_spk_id') == ''){
	                		Ext.Ajax.abortAll();
	                		// this.up('window').close();
	                		
							var messagebox = Ext.Msg.show({
								title    : "Alert",
								msg      : "No SPK for unit <b>" + record.get('unit_number') + "</b>",
								closable : !0,
								icon     : Ext.Msg.ERROR,
								buttons  : Ext.Msg.OK
							});

							Ext.Function.defer(function () {
			                    messagebox.zIndexManager.bringToFront(messagebox);                
			                },100);

	                		return false;
	                	}
	                },
	            },
			}),
			defaults    : {
				xtype  : 'gridcolumn',
				width  : 100,
				hidden : false
			},
			columns : [
				{
					xtype : 'rownumberer'
				},
				{
					dataIndex : 'cluster_cluster',
					text      : 'Cluster'
				},
				{
					dataIndex : 'block_block',
					text      : 'Block'
				},
				{
					dataIndex : 'unit_number',
					text      : 'Unit'
				},
				{
					dataIndex : 'customer_name',
					text      : 'Customer Name'
				},
				{
					dataIndex : 'purchaseletter_purchaseletter_no',
					width     : 130,
					text      : 'Purchase Letter'
				},
				{
					dataIndex : 'purchaseletter_purchase_date',
					text      : 'Purchase Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					dataIndex : 'pricetype_pricetype',
					text      : 'Price Type'
				},
				{
					dataIndex : 'constructionb_payment_percentage',
					text      : 'Payment Percentage'
				},
				{
					dataIndex : 'constructionb_total_remaining_denda',
					text      : 'Remaining Denda'
				},
				{
					dataIndex : 'purchaseletter_rencanaserahterima_date',
					width     : 130,
					text      : 'Rencana Serah Terima',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					dataIndex : 'progress',
					width     : 130,
					text      : 'Construction Progress'
				},
				{
                    xtype     : 'booleancolumn',
                    header    : 'Order Bangun',
                    dataIndex : 'is_orderbangun',
                    itemId    : 'is_orderbangun',
                    hidden    : true,
                    width     : 80,
                    align     : 'center',
                    renderer  : function(val, meta, record, rowIndex, colIndex, store){
                    	return me.comboBoxFieldGen('is_orderbangun', record, true);
                    }
                },
				{
                    xtype     : 'numbercolumn',
                    dataIndex : 'nilai_survey',
                    itemId    : 'nilai_survey',
                    hidden    : true,
                    width     : 70,
                    text      : 'Nilai Survey'
                },
                {
                    xtype     : 'numbercolumn',
                    dataIndex : 'nilai_survey_nps',
                    itemId    : 'nilai_survey_nps',
                    hidden    : true,
                    width     : 60,
                    text      : 'Nilai NPS'
                },
				me.generateActionColumn(),
			]
		});

		me.callParent(arguments);
	},
	viewConfig: {
		listeners: {
			refresh: function (view) {
				var color, nodes, node, record, level, flag, cells, j, i;
				var jno, jid;
				// get all grid view nodes
				nodes = view.getNodes();
				for (i = 0; i < nodes.length; i++) {
					node = nodes[i];
				// console.log(node)
				// 	// get node record
					record = view.getRecord(node);
					// console.log(this, node, record)
				// 	// get level from record data    
				// 	if (record.get("recommended_tocancel_id") == "1") {
				// 		level = '#FCD03D';
				// 	} else if (record.get("recommended_tocancel_id") == "2") {
				// 		level = '#F1C9BA';
				// 	} else {
				// 		level = '#FFFAF0';
				// 	}


					if(record.get('spk_spk_id') == ''){
						cells = Ext.get(node).query('td.x-grid-cell-actioncolumn .x-grid-cell-inner');
						cells[0].hidden = true;
					}
					// console.log(cells)
				// 	// set bacground color to all row td elements
					// for (j = 0; j < cells.length; j++) {
					// 	var idQ = Ext.get(cells[j]).id;
						// console.log(Ext.get(cells[j]).id)
						// console.log($('#'+idQ))
				// 		Ext.fly(cells[j]).setStyle('background-color', level);
					// }
				}
			}
		}
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
						xtype      : 'button',
						action     : 'update',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnEdit',
						margin     : '0 5 0 0',
						iconCls    : 'icon-edit',
						text       : 'Edit',
						bindAction : me.bindPrefixName + 'Update'
					},
					{
						xtype    : 'button',
						action   : 'generateTargetKonstruksi',
						disabled : true,
						hidden   : true,
						itemId   : 'btnGenerateTargetKonstruksi',
						margin   : '0 5 0 0',
						iconCls  : 'icon-new',
						text     : 'Generate Target Konstruksi',
					},
					{
						xtype    : 'button',
						action   : 'updateDetailProgress',
						disabled : true,
						hidden   : true,
						itemId   : 'btnUpdateDetailProgress',
						margin   : '0 5 0 0',
						iconCls  : 'icon-new',
						text     : 'Update Detail Progress',
					},
                    //added by anas 09072021
                    {
						xtype    : 'button',
						action   : 'add_survey',
						disabled : true,
						hidden   : true,
						itemId   : 'btnSurvey',
						margin   : '0 5 0 0',
						text     : 'Isi Hasil Survey'
                    }
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				width       : 360,
				displayInfo : true,
				store       : this.getStore()
			}
		];
		return dockedItems;
	},
	generateActionColumn: function () {
		var me = this;
		var ac = {
			xtype     : 'actioncolumn',
			itemId    : 'actioncolumn',
			hidden    : true,
			width     : 50,
			resizable : false,
			align     : 'right',
			hideable  : false,
			// renderer: function (value, metadata, record, el, tt, a, b, c) {
			// 	if(record.get('spk_spk_id') == ''){
			// 		// this.items[0].disabled = true;
			// 		// console.log(this.items)
			// 		// Ext.each(this.items, function(item, index) {
			// 		// 	console.log(item, index)
			// 		// 	if(item.bindAction == me.bindPrefixName + 'Update'){
			// 		// 			item.hidden = true;
			// 		// 	}
			// 		// });
			// 	}
			// 		console.log(record)
			// 	if (record.get('spk_spk_id') == '') {
			// 		this.items[0].disabled = false;
			// 	} else {
			// 		this.items[0].disabled = true;
			// 	}
			// },
			items     : [
				{
					text       : 'Edit',
					iconCls    : 'icon-edit',
					bindAction : me.bindPrefixName + 'Update',
					altText    : 'Edit',
					tooltip    : 'Edit',
				},
			]
		};
		return ac;
	},
	comboBoxFieldGen: function(name, record, enable){
        if (record.get(name)) {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data-unit_id=' + record.get("unit_id") + ' checked />';
            }else{
                var a = '&#10003;';
            }
        }else {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data-unit_id=' + record.get("unit_id") + ' />';
            }else{
                var a = '';
            }
        }
        return a;  
    }
});