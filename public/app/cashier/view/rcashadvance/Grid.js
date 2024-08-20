Ext.define('Cashier.view.rcashadvance.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.rcashadvancegrid',
    store: 'Rcashadvance',
    bindPrefixName: 'Rcashadvance',
    itemId: 'Rcashadvance',
    newButtonLabel: 'Add New',
    initComponent: function () {
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
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 120,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 180,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'PT (Company)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 180,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_statusdata',
                    width: 120,
                    dataIndex: 'statusdata',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_accept_date',
                    width: 100,
                    dataIndex: 'accept_date',
                    hideable: false,
                    text: 'Accept Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_claim_date',
                    width: 100,
                    dataIndex: 'claim_date',
                    hideable: false,
                    text: 'Claim Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_transno',
                    width: 80,
                    dataIndex: 'transno',
                    hideable: false,
                    text: 'Trans No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    width: 80,
                    dataIndex: 'dataflow',
                    hideable: false,
                    text: 'Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    width: 120,
                    dataIndex: 'prefix',
                    hideable: false,
                    text: 'Prefix'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_trxnumber',
                    width: 100,
                    dataIndex: 'trxnumber',
                    hideable: false,
                    text: 'Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 120,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Evidence No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    width: 120,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_paid',
                    width: 120,
                    dataIndex: 'paid',
                    hideable: false,
                    text: 'Paid',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashback',
                    width: 120,
                    dataIndex: 'cashback',
                    hideable: false,
                    text: 'Cashback',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_balance',
                    width: 120,
                    dataIndex: 'balance',
                    hideable: false,
                    text: 'Balance',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 120,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Coa'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa_desc',
                    width: 180,
                    dataIndex: 'coa_desc',
                    hideable: false,
                    text: 'Coa Desc'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashbon_projectptname',
                    width: 150,
                    dataIndex: 'cashbon_projectptname',
                    hideable: false,
                    text: 'For Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_no',
                    width: 150,
                    dataIndex: 'chequegiro_no',
                    hideable: false,
                    text: 'Giro No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_via',
                    width: 80,
                    dataIndex: 'via',
                    hideable: false,
                    text: 'Via'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_posting',
                    width: 80,
                    dataIndex: 'is_posting',
                    hideable: false,
                    text: 'Flag Posting'
                },                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;
        var dockedItems = [           
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
                    text: 'Revizion',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Revizion',
                    tooltip: 'Revizion'
                },                
		{ //========= added on march 15th 2016 by Tirtha
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
});


