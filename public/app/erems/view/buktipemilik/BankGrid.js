Ext.define('Erems.view.buktipemilik.BankGrid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.buktipemilikbankgrid',
	store: 'Bankkpr',
	bindPrefixName: 'Bankkpr',
	newButtonLabel: 'New Bank KPR',
	height: 200,
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			// dockedItems: me.generateDockedItems(),
			viewConfig: {
			},
			// selModel    : { 
			// 	selType       : 'checkboxmodel',
			// 	mode          : 'SINGLE',
			// 	allowDeselect : true               
   //          },
			selModel: Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				checkOnly: 'true',
        		allowDeselect: true, 
			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					header    : "Use",
					hideable  : false,
					width     : 50,
					resizable : false,
					align     : 'center',
					renderer  : me.renderRadioBox,
					editor    : {
						xtype : 'radio'
					},
				},
				{
					xtype     : 'booleancolumn',
					itemId    : 'colms_is_use',
					width     : 50,
					resizable : false,
					align     : 'center',
					dataIndex : 'is_use',
					hidden    : true,
					text      : 'Use',
					falseText : ' ',
					trueText  : '&#10003;'
				},
				{
					header    : "Rencana",
					hideable  : false,
					width     : 50,
					resizable : false,
					align     : 'center',
					renderer  : me.renderRadioBox_rencana,
					editor    : {
						xtype : 'radio'
					},
				},
				{
					xtype: 'booleancolumn',
					itemId: 'colms_is_rencana_kpr',
					width: 50,
					resizable: false,
					align: 'center',
					dataIndex: 'is_rencana_kpr',
					//hideable: false,
					hidden: true,
					text: 'Use',
					falseText: ' ',
					trueText: '&#10003;'
				},
				// me.generateActionColumn(),
				{
					xtype: 'gridcolumn',
					itemId: 'colms_bank_id',
					width: 75,
					align: 'right',
					dataIndex: 'bank_id',
					hideable: false,
					text: 'Bank ID'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_bank_name',
					width: 150,
					dataIndex: 'bank_name',
					hideable: false,
					text: 'Bank Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_berkasmasuk_date',
					width: 150,
					dataIndex: 'berkasmasuk_date',
					hideable: false,
					text: 'Tgl Masuk Berkas',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_berkasbank_date',
					width: 150,
					dataIndex: 'berkasbank_date',
					hideable: false,
					text: 'Tanggal Di Bank',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_interviewplan_date',
					width: 150,
					dataIndex: 'interviewplan_date',
					hideable: false,
					text: 'Interview Plan Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_interview_date',
					width: 150,
					dataIndex: 'interview_date',
					hideable: false,
					text: 'Interview Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_kpr_interest',
					width: 100,
					dataIndex: 'kpr_interest',
					hideable: false,
					text: 'KPR Interest'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_kpr_acc_date',
					width: 150,
					dataIndex: 'kpr_acc_date',
					hideable: false,
					text: 'ACC KPR Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_kpr_realisation',
					width: 150,
					align: 'right',
					dataIndex: 'kpr_realisation',
					hideable: false,
					text: 'KPR Realisation'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_kpr_tenor',
					width: 100,
					align: 'right',
					dataIndex: 'kpr_tenor',
					hideable: false,
					text: 'KPR Tenor'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_kpr_cicilan',
					width: 150,
					align: 'right',
					dataIndex: 'kpr_cicilan',
					hideable: false,
					text: 'Cicilan'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_akadplan_date',
					width: 150,
					dataIndex: 'akadplan_date',
					hideable: false,
					text: 'Akad Plan Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_akad_date',
					width: 150,
					dataIndex: 'akad_date',
					hideable: false,
					text: 'Akad Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
			]
		});

		me.callParent(arguments);
	},

	renderRadioBox: function (val, meta, record, rowIndex, colIndex, store) {
		var chk = record.get('is_use') ? 'checked="checked"' : '';
		return '<input type= "radio" name="radiogroup" '+chk+' disabled />';
	},
	renderRadioBox_rencana : function (val, meta, record, rowIndex, colIndex, store) {
		var chk = record.get('is_rencana_kpr') ? 'checked="checked"' : '';
		return '<input type= "radio" name="radiogroup_rencana_kpr" '+chk+' disabled />';
	},

});