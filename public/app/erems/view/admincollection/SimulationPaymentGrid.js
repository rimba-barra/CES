Ext.define('Erems.view.admincollection.SimulationPaymentGrid', {
	extend        : 'Erems.library.template.view.Grid',
	alias         : 'widget.admincollectionsimulationpaymentgrid',
	maxHeight     : 300,
	autoHeight    : true,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			selModel    : {},
			viewConfig  : { stripeRows : true },
			features    : [{ ftype: 'summary' }],
			columns     : [
				{
					xtype     : 'rownumberer',
					dataIndex : 'no',
					text      : 'No',
				},
				{
					xtype           : 'datecolumn',
					type            : 'date',
					itemId          : 'colms_code',
					width           : 80,
					format          : 'd-m-Y',
					dataIndex       : 'duedate',
					hideable        : false,
					text            : 'Duedate',
					summaryRenderer : function () {
						return '<b>Total</b>';
					}
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_type',
					width     : 35,
					dataIndex : 'scheduletype_scheduletype',
					hideable  : false,
					text      : 'Type',
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_ke',
					width     : 45,
					dataIndex : 'termin',
					hideable  : false,
					text      : 'Termin',
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_Recieveable',
					width     : 135,
					dataIndex : 'amount',
					hideable  : false,
					align     : 'right',
					text      : 'Amount',
					renderer : function(v) {
						return accounting.formatMoney(v);
					},
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_rest',
					width     : 135,
					dataIndex : 'remaining_balance',
					hideable  : false,
					align     : 'right',
					text      : 'Remaining Balance',
					renderer  : function(v) {
						return accounting.formatMoney(v);
					},
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_simulasi_nunggak',
					width     : 100,
					dataIndex : 'simulasi_nunggak',
					hideable  : false,
					align     : 'right',
					text      : 'Lama Nunggak',
					renderer  : function(v) {
						return accounting.formatMoney(v, {precision : 0});
					},
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_simulasi_denda',
					width     : 135,
					dataIndex : 'simulasi_denda',
					hideable  : false,
					align     : 'right',
					text      : 'Denda',
					renderer  : function(v) {
						return accounting.formatMoney(v);
					},
					summaryType     : 'sum',
					summaryRenderer : function (value, summaryData, dataIndex) {
						return '<b>' + accounting.formatMoney(value) + '</b>';
					}
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_simulasi_pokok',
					width     : 135,
					dataIndex : 'simulasi_pokok',
					hideable  : false,
					align     : 'right',
					text      : 'Pokok',
					renderer  : function(v) {
						return accounting.formatMoney(v);
					},
					summaryType     : 'sum',
					summaryRenderer : function (value, summaryData, dataIndex) {
						return '<b>' + accounting.formatMoney(value) + '</b>';
					}
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_simulasi_total_bayar',
					width     : 135,
					dataIndex : 'simulasi_total_bayar',
					hideable  : false,
					align     : 'right',
					text      : 'Total Bayar',
					renderer  : function(v) {
						return accounting.formatMoney(v);
					},
					summaryType     : 'sum',
					summaryRenderer : function (value, summaryData, dataIndex) {
						return '<b>' + accounting.formatMoney(value) + '</b>';
					},
				},
			]
		});

		me.callParent(arguments);
	},
	generateDockedItems: function() {
		
		var me = this;

		var dockedItems = [
			{
				xtype  : 'toolbar',
				dock   : 'bottom',
				height : 40,
				items  : [
					{
						xtype      : 'xdatefield',
						fieldLabel : 'Rencana Tanggal Bayar',
						name       : 'rencana_tanggal_bayar',
						flex       : 1,
						labelWidth : 130,
						onTriggerClick: function () {
							var dt1 = this;
							Ext.form.DateField.prototype.onTriggerClick.apply(dt1, arguments);

							var arr = [];
							me.getStore().data.each(function (record) {
								arr.push(record.get("duedate"));
							});

							var minDate = _myAppGlobal.getController("Admincollection").getMinDate(arr);
							dt1.setMinValue(new Date(minDate))
						},
					},
					{
						xtype : 'label', 
						text  : '', 
						width : 640
					},
					{
						xtype   : 'button',
						hidden  : false,
						itemId  : 'btnPrintSimulationPayment',
						margin  : '0 5 0 0',
						action  : 'print_simulation_payment',
						iconCls : 'icon-print',
						text    : 'Print',
					},
					{
						xtype : 'label', 
						text  : '', 
						width : 10
					},
				] 
			}
		];
		return dockedItems;
	},
});