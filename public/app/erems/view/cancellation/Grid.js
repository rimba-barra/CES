Ext.define('Erems.view.cancellation.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.cancellationgrid',
    store: 'Cancellation',
    bindPrefixName: 'Cancellation',
    newButtonLabel: 'New Cancellation',
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
                    itemId: 'colms_cancellation_no',
                    width: 150,
					hideable: false,
                    dataIndex: 'cancellation_no',
                    text: 'Pembatalan No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kawasan',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit No.'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cust_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
					hideable: false,
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 100,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_realisation_serahterima_date',
                    width: 100,
                    dataIndex: 'realisation_serahterima_date',
                    hideable: false,
                    text: 'Tgl. Serah Terima',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cancelreason',
                    width: 150,
					hideable: false,
                    dataIndex: 'cancelreason',
                    text: 'Alasan Batal'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cancellation_date',
                    width: 100,
                    dataIndex: 'cancellation_date',
                    hideable: false,
                    text: 'Cancellation Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_totalpayment',
                    width: 150,
                    dataIndex: 'totalpayment',
					align: 'right',
                    hideable: false,
                    text: 'Total Pembayaran'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_lostpayment',
                    width: 150,
                    dataIndex: 'lostpayment',
					align: 'right',
                    hideable: false,
                    text: 'Uang Ditahan'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_returnpayment',
                    width: 150,
                    dataIndex: 'returnpayment',
					align: 'right',
                    hideable: false,
                    text: 'Uang Kembali'
                },
				{
                    xtype: 'booleancolumn',
					text: 'Is Approve',
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
                    xtype: 'booleancolumn',
					text: 'Is Reject',
                    dataIndex: 'is_reject',
					trueText: '&#10003;',
					falseText: ' ',                    
                    resizable: false,
					width: 70,
					align: 'center'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_reject_date',
                    width: 100,
                    dataIndex: 'reject_date',
                    hideable: false,
                    text: 'Reject Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
	
	generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
				{
                    text: 'View',
                    iconCls: 'icon-search',
                    className:'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
    },
	
	generateDockedItems: function() {
        var me = this;

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
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
					
					{
                        xtype: 'button',
                        action: 'approve_reject',
                        disabled: true,
                        //hidden: true,
                        itemId: 'btnApproveReject',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Approve / Reject',
                        //bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'view',
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        //padding:5,
                        iconCls: 'icon-search',
                        text: 'View',
                        bindAction: me.bindPrefixName + 'Read',
                        disabled: true,
                        hidden: true
                    },
                    {
                        xtype: 'button',
                        action: 'anulir_cancel',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnAnulirCancel',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Anulir Cancel',
                        //bindAction: me.bindPrefixName + 'Update'
                    },
					
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
	
});