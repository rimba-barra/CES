Ext.define('Erems.view.informasitagihan.GridDetailSchedule', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.informasitagihangriddetailschedule',
	itemId         : 'informasitagihangriddetailschedule',
	store          : 'Informasitagihandetailschedule',
	bindPrefixName : 'Informasitagihan',
	requires       : [ 'Erems.template.ComboBoxFields' ],
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : {},
			columns     : [
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tagihan_detail_schedule_id',
					text      : 'tagihan_detail_schedule_id',
					dataIndex : 'tagihan_detail_schedule_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tagihan_id',
					text      : 'tagihan_id',
					dataIndex : 'tagihan_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tagihan_detail_id',
					text      : 'tagihan_detail_id',
					dataIndex : 'tagihan_detail_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_id',
					text      : 'purchaseletter_id',
					dataIndex : 'purchaseletter_id',
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
					itemId       : 'colms_scheduletype',
					text         : 'Type',
					dataIndex    : 'scheduletype',
					width        : '8%',
				},
				{
					xtype        : 'gridcolumn',
					itemId       : 'colms_termin',
					text         : 'Termin',
					dataIndex    : 'termin',
					width        : '6.5%',
				},
				{
					xtype        : 'datecolumn',
					itemId       : 'colms_duedate',
					type         : 'date',
					text         : 'DueDate',
					dataIndex    : 'duedate',
					format       : 'd-m-Y',
					width        : '13%',
				},
				{
					xtype        : 'numbercolumn',
					itemId       : 'colms_amount',
					text         : 'Receiveable',
					dataIndex    : 'amount',
					width        : '18%',
				},
				{
					xtype        : 'numbercolumn',
					itemId       : 'colms_remaining_balance',
					text         : 'Rest',
					dataIndex    : 'remaining_balance',
					width        : '18%',
				},
				{
					xtype        : 'numbercolumn',
					itemId       : 'colms_denda',
					text         : 'Denda',
					dataIndex    : 'denda',
					width        : '18%',
				},
				{
					xtype        : 'numbercolumn',
					itemId       : 'colms_remaining_denda',
					text         : 'Rest Denda',
					dataIndex    : 'remaining_denda',
					width        : '18%',
				},
			]
		});
		me.callParent(arguments);
	},
	generateDockedItems: function() {
		var me = this;
		return [
			{
				layout    : 'hbox',
				dock      : 'top',
				bodyStyle : 'border:0px; background:none;',
				margin    : '0',
				items     : [
					{
						xtype : 'label',
						text  : 'Detail Tagihan',
						width : 180
					},
				]
			},
		];
	},
});