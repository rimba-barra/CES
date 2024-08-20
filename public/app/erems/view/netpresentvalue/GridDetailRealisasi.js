Ext.define('Erems.view.netpresentvalue.GridDetailRealisasi', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.netpresentvaluegriddetailrealisasi',
	itemId         : 'netpresentvaluegriddetailrealisasi',
	store          : 'Netpresentvaluedetailrealisasi',
	bindPrefixName : 'Netpresentvalue',
	requires       : ['Erems.template.ComboBoxFields'],
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selType     : 'cellmodel',
			plugins     : [
				Ext.create('Ext.grid.plugin.CellEditing', {
					ptype        : 'cellediting',
					clicksToEdit : 1,
					rowIndex     : -1,
					listeners    :{
						beforeedit : function(cellEditor, context, eOpts ){
							rowIndex = context.rowIdx;
							context.column.getEditor().on('focus',function(field){
							},this,{delay : 1});
						},
					}
				})
			],
			selModel : Ext.create('Ext.selection.CheckboxModel', {
				mode : "SINGLE"
			}),
			columns : [
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_npv_detail_realisasi_id',
					text      : 'npv_detail_realisasi_id',
					dataIndex : 'npv_detail_realisasi_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_npv_id',
					text      : 'npv_id',
					dataIndex : 'npv_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_scheduletype_id',
					text      : 'scheduletype_id',
					dataIndex : 'scheduletype_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_deleted',
					text      : 'deleted',
					dataIndex : 'deleted',
					hidden    : true,
				},
				{
					xtype        : 'gridcolumn',
					itemId       : 'colms_record_no',
					text         : 'RecNo',
					dataIndex    : 'record_no',
					width        : '8%',
					sortable     : false,
					menuDisabled : true,
					editor       : {
						xtype: 'textfield',
						maskRe: /[1-9]/,
						fieldStyle: 'text-align:right'
					}
				},
				{
					xtype        : 'datecolumn',
					itemId       : 'colms_duedate',
					type         : 'date',
					text         : 'DueDate',
					dataIndex    : 'duedate',
					format       : 'd-m-Y',
					width        : '18%',
					hideable     : false,
					sortable     : false,
					menuDisabled : true,
					editor       : {
						xtype      : 'datefield',
						allowBlank : true,
						format     : 'd/m/Y',
					}
				},
				{
					xtype        : 'gridcolumn',
					itemId       : 'colms_scheduletype',
					text         : 'Type',
					dataIndex    : 'scheduletype',
					width        : '9%',
					sortable     : false,
					menuDisabled : true,
					editor       : {
						xtype        : 'combobox',
						store        : 'Scheduletype',
						displayField : 'scheduletype',
						valueField   : 'scheduletype',
						listeners: {
							change: function(el){
								var store      = me.getStore();
								var value      = el.value;
								var valueModel = el.valueModels;

								Ext.each(valueModel, function (rec) {
									if(rec.data.scheduletype == value){
										var recStore = store.getAt(rowIndex);
										recStore.beginEdit();
										recStore.set("scheduletype_id", rec.data.scheduletype_id);
										recStore.endEdit();
									}
								});
							}
						}
					}
				},
				{
					xtype        : 'gridcolumn',
					itemId       : 'colms_termin',
					text         : 'Termin',
					dataIndex    : 'termin',
					width        : '10%',
					sortable     : false,
					menuDisabled : true,
					editor       : {
						xtype: 'textfield',
						maskRe: /[0-9\.]/,
						fieldStyle: 'text-align:right'
					}
				},
				{
					xtype        : 'numbercolumn',
					itemId       : 'colms_amount',
					text         : 'Receiveable',
					dataIndex    : 'amount',
					width        : '24%',
					sortable     : false,
					menuDisabled : true,
					editor       : {
						xtype: 'textfield',
						maskRe: /[0-9\.]/,
						fieldStyle: 'text-align:right'
					}
				},
				{
					xtype        : 'numbercolumn',
					itemId       : 'colms_npv_value',
					text         : 'PV',
					dataIndex    : 'npv_value',
					width        : '26%',
					sortable     : false,
					menuDisabled : true,
					// editor    : {
					// 	xtype: 'textfield',
					// 	maskRe: /[0-9\.]/,
					// 	fieldStyle: 'text-align:right'
					// }
				},
			]
		});
		me.callParent(arguments);	
	},
	generateDockedItems: function() {
		var me = this;
		return [
			{
				layout  : 'hbox',
				dock   : 'top',
				height : 28,
				bodyStyle : 'border:0px',
				items  : [
					{
						xtype      : 'button',
						action     : 'create_realisasi',
						itemId     : 'create_realisasi',
						hidden     : false,
						margin     : '0 5px 0 0',
						iconCls    : 'icon-new',
						bindAction : me.bindPrefixName + 'Create',
						text       : 'Add Record'
					},
					{
						xtype      : 'button',
						action     : 'delete_realisasi',
						itemId     : 'delete_realisasi',
						hidden     : false,
						margin     : '0 5px 0 0',
						iconCls    : 'icon-delete',
						bindAction : me.bindPrefixName + 'Delete',
						text       : 'Delete'
					},
					{
						xtype      : 'button',
						action     : 'reschedule_realisasi',
						itemId     : 'reschedule_realisasi',
						hidden     : false,
						margin     : '0 5px 0 220px',
						iconCls    : 'icon-gear',
						bindAction : me.bindPrefixName + 'Create',
						text       : 'Tool Re-Schedule',
					},
				]
			},
			{	
				layout    : 'hbox',
				dock      : 'bottom',
				bodyStyle : 'border:0px',
				padding   : '20px 0 0 10px',
				items     : [
					{
						xtype      : 'xmoneyfield',
						fieldLabel : 'Total Realisasi',
						anchor     : '-5',
						name       : 'total_realisasi',
						flex       : 1,
						labelWidth : 100,
						readOnly   : true,
						fieldStyle : 'background:none;background-color:#EBEBE4;',
					},
					{
						xtype : 'label',
						text  : '',
						width : 150
					}
				]
			}
		];
	},
});