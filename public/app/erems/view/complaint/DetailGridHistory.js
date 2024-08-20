Ext.define('Erems.view.complaint.DetailGridHistory', {
	extend         : 'Ext.grid.Panel',
	alias          : 'widget.complaintdetailgridhistory',
	store          : 'Complainthistory',
	bindPrefixName : 'Complainthistory',
	newButtonLabel : 'Add New Letter / Telp',
	height         : 150,
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			viewConfig : {},
			selModel   : Ext.create('Ext.selection.CheckboxModel', {}),
			columns    : [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_modul',
					width     : 100,
					dataIndex : 'modul',
					hideable  : false,
					text      : 'Modul'
				},
				{
					itemId: 'colms_rencana_serahterima_date_old',
					xtype     : 'gridcolumn',
					width     : 150,
					dataIndex : 'rencana_serahterima_date_old',
					hideable  : false,
					text      : 'Tgl. Rencana ST Lama',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_rencana_serahterima_date_new',
					width     : 150,
					dataIndex : 'rencana_serahterima_date_new',
					hideable  : false,
					text      : 'Tgl. Rencana ST Baru',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_user_email',
					width     : 100,
					dataIndex : 'user_email',
					hideable  : false,
					text      : 'User Edit'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_modion',
					width     : 150,
					dataIndex : 'modion',
					hideable  : false,
					text      : 'Tgl. Edit',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
			]
		});

		me.callParent(arguments);
	}
});