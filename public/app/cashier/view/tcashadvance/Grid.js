Ext.define('Cashier.view.tcashadvance.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tcashadvancegrid',
    store: 'Tcashadvance',
    bindPrefixName: 'Tcashadvance',
    itemId: 'Tcashadvance',
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
                    xtype: 'rownumberer',
                    text: 'No.',
                    width: 40,
                    titleAlign: 'center',
                    align: 'center',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectcode',
                    dataIndex: 'projectcode',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptcode',
                    dataIndex: 'ptcode',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pt Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pt Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_havedata',
                    dataIndex: 'havedata',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Data'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_statusdata',
                    dataIndex: 'statusdata',
                    width: 90,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Status',
//                    renderer: function(value) {                       
//                        if(value=='T'){
//                            return 'UNPROCESS';
//                        }else if(value=='Y'){
//                             return 'PROCESSED';
//                        }else{
//                            return 'UNPROCESS';
//                        }
//                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_accept_date',
                    dataIndex: 'accept_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Accept Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_claim_date',
                    dataIndex: 'claim_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Claim Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_transno',
                    dataIndex: 'transno',
                    width: 80,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Trans No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    dataIndex: 'prefix',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Prefix'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Evidence No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Acc. No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    dataIndex: 'coaname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Acc. Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_paid',
                    dataIndex: 'paid',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Paid',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashback',
                    dataIndex: 'cashback',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Cashback',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_balance',
                    dataIndex: 'balance',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Balance',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


