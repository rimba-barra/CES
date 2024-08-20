Ext.define('Erems.view.fakturpajak.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.fakturpajakgrid',
    store: 'Fakturpajak',
    bindPrefixName: 'Fakturpajak',
    newButtonLabel: 'New Faktur Pajak',
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
                    itemId: 'colms_payment_no',
                    width: 150,
                    dataIndex: 'payment_no',
                    hideable: false,
                    text: 'Payment No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_paymentflag',
                    width: 150,
                    dataIndex: 'paymentflag',
                    hideable: false,
                    text: 'Payment Flag'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_payment_date',
                    width: 150,
                    dataIndex: 'payment_date',
                    hideable: false,
                    text: 'Payment Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_valid_date',
                    width: 150,
                    dataIndex: 'valid_date',
                    hideable: false,
                    text: 'Valid Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_payment',
                    width: 150,
                    dataIndex: 'payment',
					align: 'right',
                    hideable: false,
                    text: 'Payment Amount'
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
                    itemId: 'colms_notes',
                    width: 150,
                    dataIndex: 'notes',
                    hideable: false,
                    text: 'Note'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_fakturpajak_no',
                    width: 150,
                    dataIndex: 'fakturpajak_no',
                    hideable: false,
                    text: 'Faktur Pajak No',
					renderer: function(value, p, r){
						if(r.data['fakturpajak_no'] && r.data['counter']){
							return r.data['fakturpajak_no'] + '-' + r.data['counter']
						}
					}
                },
				{
                    xtype: 'booleancolumn',
					text: 'Status',
                    dataIndex: 'status',
					trueText: '&#10003;',
					falseText: ' ',                    
                    hideable: false,
					width: 50,
					align: 'center'
                },
				
                me.generateActionColumn()
            ],
			bbar: [
            '',
            {
                xtype: 'tbfill'
            },
            '',
            {
                xtype: 'tbfill'
            },
            {
                xtype: 'button',
                hidden: false,
                itemId: 'btnExportCSV',
                margin: '0 5 0 0',
                action: 'exportCSV',
                iconCls: 'icon-print',
               
                text: 'Export Faktur Pajak CSV'
			},
			{
                xtype: 'button',
                hidden: false,
				disabled: true,
                itemId: 'btnGenerateFP',
                margin: '0 5 0 0',
                action: 'generateFP',
                iconCls: 'icon-edit',
                text: 'Generate Faktur Pajak'
			},
			{
                xtype: 'button',
                hidden: false,
                itemId: 'btnExportFP',
                margin: '0 5 0 0',
                action: 'exportFP',
                iconCls: 'icon-print',
                text: 'Export Faktur Pajak'
			}
            ]
        });

        me.callParent(arguments);
    },
	
	/*generateActionColumn: function() {
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
    }*/
});