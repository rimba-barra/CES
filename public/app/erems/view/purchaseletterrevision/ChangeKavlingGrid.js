Ext.define('Erems.view.purchaseletterrevision.ChangeKavlingGrid', {
    extend: 'Erems.library.template.view.Grid', //Erems.library.template.view.Grid
    alias: 'widget.purchaseletterrevisionchangekavlinggrid',
    store: 'Purchaseletterrevisionchangekavling',
   	bindPrefixName: 'Purchaseletterrevisionchangekavling',
    //newButtonLabel: 'Add New',
    height: 200,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletterrevision_id',
                    width: 75,
					align: 'right',
                    dataIndex: 'purchaseletterrevision_id',
                    hideable: false,
                    text: 'Revision ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_revisiontype',
                    width: 100,
                    dataIndex: 'revisiontype',
                    hideable: false,
                    text: 'Revision Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_changekavling_id',
                    width: 100,
					align: 'right',
                    dataIndex: 'changekavling_id',
                    hideable: false,
                    text: 'Change Kavling ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_changekavling_date',
                    width: 150,
                    dataIndex: 'changekavling_date',
                    hideable: false,
                    text: 'Change Kavling Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_old',
                    width: 150,
					dataIndex: 'purchaseletter_old',
                    hideable: false,
                    text: 'Purchase Letter Lama'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_old_id',
                    width: 75,
					align: 'right',
                    dataIndex: 'purchaseletter_old_id',
                    hidden: true,
                    text: 'Purchaseletter ID Lama'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster_old',
                    width: 150,
					dataIndex: 'cluster_old',
                    hideable: false,
                    text: 'Cluster Lama'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block_old',
                    width: 150,
					dataIndex: 'block_old',
                    hideable: false,
                    text: 'Block Lama'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_old',
                    width: 150,
					dataIndex: 'unit_old',
                    hideable: false,
                    text: 'Unit Lama'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_old',
                    width: 150,
                    dataIndex: 'harga_old',
					align: 'right',
                    hideable: false,
                    text: 'Harga Lama'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_new',
                    width: 150,
					dataIndex: 'purchaseletter_new',
                    hideable: false,
                    text: 'Purchase Letter Baru'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_new_id',
                    width: 75,
					align: 'right',
                    dataIndex: 'purchaseletter_new_id',
                    hidden: true,
                    text: 'Purchaseletter ID Baru'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster_new',
                    width: 150,
					dataIndex: 'cluster_new',
                    hideable: false,
                    text: 'Cluster Baru'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block_new',
                    width: 150,
					dataIndex: 'block_new',
                    hideable: false,
                    text: 'Block Baru'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_new',
                    width: 150,
					dataIndex: 'unit_new',
                    hideable: false,
                    text: 'Unit Baru'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_new',
                    width: 150,
                    dataIndex: 'harga_new',
					align: 'right',
                    hideable: false,
                    text: 'Harga Baru'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_alasan_changekavling',
                    width: 200,
                    dataIndex: 'alasan_changekavling',
                    hideable: false,
                    text: 'Alasan Perubahan'
                },
				{
                    xtype: 'booleancolumn',
					text: 'Approved',
                    dataIndex: 'is_approve',
					trueText: '&#10003;',
					falseText: ' ',                    
                    resizable: false,
					width: 70,
					align: 'center'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_approve_date',
                    width: 100,
                    dataIndex: 'approve_date',
                    hideable: false,
                    text: 'Approve Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_approve_by_name',
                    width: 150,
                    dataIndex: 'approve_by_name',
                    hideable: false,
                    text: 'Approve By'
                },
				//me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
		
        var me = this;
		
		var griddepan = Ext.getCmp('purchaseletterrevisiongrid_id');
		var storedepan = griddepan.getStore();
		var recorddepan = storedepan.getAt(storedepan.indexOf(griddepan.getSelectionModel().getSelection()[0]));
		var plId = recorddepan.data.purchaseletter_id;
		
		var store = Ext.StoreMgr.lookup(this.getStore());
		store.getProxy().setExtraParam('purchaseletter_id', plId);

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'viewrevisionchangekavling',
                        disabled: true,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'View',
                        bindAction: me.bindPrefixName+'Read'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: store//this.getStore()
            }
        ];
        return dockedItems;
    }
	
});