Ext.define('Erems.view.townplanning.Grid', {

	alias: 'widget.townplanninggrid',

	bindPrefixName: 'Townplanning',
	// itemId:'',
	newButtonLabel: 'New Town Planning',
	extend: 'Erems.library.template.view.GridDS2',

	storeConfig: {
		id: 'TownPlanningGridStore',
		idProperty: 'unit_id',
		extraParams: {}
	},
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {

			},
			selModel: Ext.create('Ext.selection.CheckboxModel', {

			}),
			defaults: {
				align: 'center',
				xtype: 'gridcolumn'
			},
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					ptype: 'cellediting',
					clicksToEdit: 1
				})
			],
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					dataIndex: 'unit_id',
					text: 'ID',
					width: 50
				},
				// added by rico 17022023
				{
					xtype: 'booleancolumn',
					header: 'Rumah Contoh',
					dataIndex: 'is_rumahcontoh',
					// hidden: true,
					width: 50,
// 					renderer: function (value, metadata, record) {
// 						console.log("VALUE");
// 						console.log(record.raw.unit.is_rumahcontoh);
// 
// 						me.inlineEditRumah(record.raw.unit.is_rumahcontoh, metadata, record);
// 		            },
					renderer: me.inlineEditRumah
				},
				{
					xtype: 'booleancolumn',
					header: 'Siap Stock',
					dataIndex: 'is_readystock',
//                    hidden: true,
					width: 60,
					renderer: me.inlineEditStock
				},
				{
					xtype: 'booleancolumn',
					header: 'Legal',
					dataIndex: 'is_readylegal',
					hidden: true,
					width: 50,
					renderer: me.inlineEditLegal
				},
				{
					dataIndex: 'unit_number',
					text: 'Kav. Number',
					width: 65
				},
				{
					dataIndex: 'cluster_code',
					text: 'Cluster Code',
					width: 50
				},
				{
					dataIndex: 'cluster_cluster',
					text: 'Cluster'
				}, {
					dataIndex: 'block_block',
					text: 'Block Name'
				}, {
					dataIndex: 'pt_name',
					text: 'PT. Name'
				},
				// added by rico 08032023
				{
					dataIndex: 'tanahcode_name',
					text: 'PT. Tanah'
				}, {
					dataIndex: 'type_name',
					text: 'Type'
				}, {
					dataIndex: 'productcategory_productcategory',
					text: 'Category'
				}, {
					dataIndex: 'land_size',
					text: 'Land Size',
					width: 40
				}, {
					dataIndex: 'building_size',
					text: 'Building Size',
					width: 40
				}, {
					dataIndex: 'kelebihan',
					text: 'Kelebihan',
					width: 40
				}, {
					dataIndex: 'floor',
					text: 'Floor',
					width: 40
				}, {
					dataIndex: 'floor_size',
					text: 'Floor size',
					width: 40
				}, {
					dataIndex: 'bedroom',
					text: 'Bedroom',
					width: 40
				}, {
					dataIndex: 'bathroom',
					text: 'Bathroom',
					width: 40
				}, {
					dataIndex: 'electricity',
					text: 'Electricity',
					width: 40
				}, {
					dataIndex: 'unitstatus_status',
					text: 'Status'
				}, {dataIndex: 'progress',
					text: 'Progress ( % )'
				}, {dataIndex: 'list_nomor_spk',
					text: 'SPK Number'
				},
				{dataIndex: 'tanahcode_pt_id',
					text: 'Tanahcode',
					hidden: true
				},
				{dataIndex: 'customer_no',
					text: 'Cust. No',
					hidden: true
				},
				{dataIndex: 'customer_int',
					text: 'Cust. Int',
					hidden: true
				},
				{dataIndex: 'virtualaccount_bca',
					text: 'VA BCA',
					hidden: true
				},
				{dataIndex: 'virtualaccount_mandiri',
					text: 'VA MANDIRI',
					hidden: true
				},
				//addby imaam 2019-03-14 
				{
					dataIndex: 'koordinat',
					text: 'Koordinat'
				},
				/* start added by ahmad riadi 10-01-2017 */
				{
					dataIndex: 'useradd',
					text: 'Added By'
				},
				{
					dataIndex: 'Addon',
					text: 'Added Date'
				},
				{
					dataIndex: 'useredit',
					text: 'Edited By'
				},
				{
					dataIndex: 'Modion',
					text: 'Edited Date'
				},
				/* end added by ahmad riadi 10-01-2017 */

				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var me = this;

		var sortByStore = Ext.create('Ext.data.Store', {
			fields: ['id', 'text'],
			data: [
				{"id": "unit_id", "text": "Unit ID"},
				{"id": "cluster_code", "text": "Cluster Code"},
				{"id": "cluster_name", "text": "Cluster Name"},
				{"id": "type_type", "text": "Type"},
				{"id": "unit_number", "text": "Unit Number"}
			]
		});

		var sortTypeStore = Ext.create('Ext.data.Store', {
			fields: ['id', 'text'],
			data: [
				{"id": "ASC", "text": "Ascending"},
				{"id": "DESC", "text": "Descending"}
			]
		});

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
						name: 'btnEditName',
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
						disabled: true
					},
					/* start: added fatkur 271119 */
					{
						xtype: 'button',
						action: 'upload_townplanning',
						hidden: false,
						itemId: 'btnTownPlanning',
						bindAction: me.bindPrefixName + 'Modalupload',
						iconCls: 'icon-excel',
						text: 'Upload',
					},
					{
                        xtype: 'button',
                        action: 'update_floor',
                        disabled: true,
                        //hidden: true,
                        itemId: 'btnFloor',
                        margin: '0 5 0 0',
                        //bindAction: me.bindPrefixName+'Print',
                        //iconCls: 'icon-print',
                        text: 'Update Floor'
                    },
					'->',
					{
						xtype: 'combobox',
						store: sortByStore,
						queryMode: 'local',

						labelWidth: 50,
						name: 'sort_by',
						valueField: 'id',
						autoSelect: true,
						displayField: 'text',
						value: 'unit_id',
						width: 170,
						forceSelection: true,
						fieldLabel: 'Sort by '
					},
					{
						xtype: 'combobox',
						name: 'sort_type',
						store: sortTypeStore,
						queryMode: 'local',
						valueField: 'id',

						width: 90,
						autoSelect: true,
						displayField: 'text',
						value: 'DESC',
						forceSelection: true,
						fieldLabel: ''
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
	inlineEditStock: function (val, meta, record, rowIndex, colIndex, store) {
		name = 'is_readystock';
		return this.comboBoxFieldGen(name, record, true);
	},
	inlineEditSell: function (val, meta, record, rowIndex, colIndex, store) {
		name = 'is_readysell';
		return this.comboBoxFieldGen(name, record, false);
	},
	inlineEditLegal: function (val, meta, record, rowIndex, colIndex, store) {
		name = 'is_readylegal';
		return this.comboBoxFieldGen(name, record, false);
	},
	inlineEditRumah: function (val, meta, record, rowIndex, colIndex, store) {
		name = 'is_rumahcontoh';
		return this.comboBoxFieldGen(name, record, false);
	},
	comboBoxFieldGen: function (name, record, enable) {
		if (record.get(name)) {
			if (enable) {
				// added by rico 17022023
				if(record.get("is_rumahcontoh") == 1){
					var a = '<input type="checkbox" name="' + name + '" data=' + record.get("unit_id") + ' checked disabled/>';
				}else{
					var a = '<input type="checkbox" name="' + name + '" data=' + record.get("unit_id") + ' checked />';
				}
			} else {
				var a = '&#10003;';
			}
		} else {
			if (enable) {
				// added by rico 17022023
				if(record.get("is_rumahcontoh") == 1){
					var a = '<input type="checkbox" name="' + name + '" data=' + record.get("unit_id") + ' disabled/>';
				}else{
					var a = '<input type="checkbox" name="' + name + '" data=' + record.get("unit_id") + ' />';
				}
			} else {
				var a = '';
			}
		}
		return a;
	}
});


