Ext.define('Erems.view.complaint.DetailGridSurvey', {
	extend         : 'Ext.grid.Panel',
	alias          : 'widget.complaintdetailgridsurvey',
	store          : 'ComplaintSurvey',
	bindPrefixName : 'Complaintsurvey',
	height         : 250,
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			columns     : [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_survey_aftersales_id',
					width     : 50,
					dataIndex : 'survey_aftersales_id',
					hidden    : true,
					text      : 'No',
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_periode',
					width     : 100,
					dataIndex : 'periode',
					hideable  : false,
					text      : 'Periode',
					renderer  : Ext.util.Format.dateRenderer('M Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_nilai_survey',
					width     : 120,
					dataIndex : 'nilai_survey',
					hideable  : false,
					text      : 'Nilai Survey'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_nilai_survey_nps',
					width     : 120,
					dataIndex : 'nilai_survey_nps',
					hideable  : false,
					text      : 'Nilai Survey NPS'
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
				dock   : 'top',
				height : 28,
				items  : [
					{
						xtype      : 'button',
						action     : 'update',
						itemId     : 'btnEdit',
						margin     : '0 5 0 0',
						iconCls    : 'icon-edit',
						text       : 'Edit',
						bindAction : me.bindPrefixName+'Update'
					},
				]
			},
		];
		return dockedItems;
	},
});