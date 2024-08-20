Ext.define('Erems.view.purchaseletterrevision.RevisionHistoryGrid', {
    extend: 'Erems.library.template.view.Grid', //Erems.library.template.view.Grid
    alias: 'widget.purchaseletterrevisionhistorygrid',
    store: 'Purchaseletterrevisionhistory',
   	bindPrefixName: 'Purchaseletterrevisionhistory',
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
                    itemId: 'colms_indeks',
                    width: 50,
                    dataIndex: 'indeks',
                    hideable: false,
                    text: 'Index',
					align: 'center'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_revision_note',
                    width: 200,
                    dataIndex: 'revision_note',
                    hideable: false,
                    text: 'Note'
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
                        action: 'viewrevisionhistory',
                        disabled: true,
						hidden: true, //ga dipake
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
    },
//    generateActionColumn: function() {
//        var me = this;
//        var ac = {
//            xtype: 'actioncolumn',
//            hidden: true,
//            itemId: 'actioncolumn',
//            width: 50,
//            resizable: false,
//            align: 'right',
//            hideable: false,
//            items: [
//                {
//                    text: 'Edit',
//                    iconCls: 'icon-edit',
//                    bindAction: me.bindPrefixName+'Update',
//                    altText: 'Edit',
//                    tooltip: 'Edit'
//                },
//                {
//                    text: 'Delete',
//                    iconCls: 'icon-delete',
//                    bindAction: me.bindPrefixName+'Delete',
//                    altText: 'Delete',
//                    tooltip: 'Delete'
//                }
//            ]
//        };
//        return ac;
//    }
	
});