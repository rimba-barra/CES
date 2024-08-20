
Ext.define('Cashier.view.journaleliminasi.DetailjournalGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.detailjournaleliminasigrid',
    storeConfig: {
        id: 'DetailJournalGridStore',
        idProperty: 'journaldetail_id',
        extraParams: {
            mode_read: 'generatetemplatecoa',
            template_id: 0
        }
    },
    
    height: 200,
    bindPrefixName: 'Journaleliminasi',
    itemId: 'Journalcoadetail',
    title: 'Coa Detail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 30
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'receipt_no',
                    hideable: false,
                    hidden: true,
                    text: '#Receipt',
                    flex : 2
                },
                
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'remarks',
                    titleAlign: 'center',
                    align: 'left',
                    flex : 7,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'subgl_description',
                    hideable: false,
                    text: 'SubGL'
                },
                {
                    xtype: 'gridcolumn',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'subgl_subgl_id',
                    hideable: false,
                    hidden: true,
                    text: 'SubGL ID'
                },
                {
                    xtype: 'gridcolumn',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'cashflowtype_cashflowtype_id',
                    hidden: true,
                    hideable: false,
                    text: 'Cashflow TYPE ID'
                },
                {
                    xtype: 'gridcolumn',
                    hidden: true,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'kelsub_description',
                    hideable: false,
                    text: 'Sub'
                },
                {
                    xtype: 'gridcolumn',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'coa_coa',
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'coa_name',
                    titleAlign: 'center',
                    align: 'left',
                    
                    hideable: false,
                    text: 'Coa Description'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    renderer: function(v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                    hideable: false,
                    header: 'Debet',

                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'amountc',
                    titleAlign: 'center',
                    align: 'right',
                    renderer: function(v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                    hideable: false,
                    header: 'Credit',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cashflowtype',
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'CashFlow Type',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cashflow',
                    titleAlign: 'center',
                    align: 'center',
                    hidden: true,
                    hideable: false,
                    text: 'Cash Flow',
                },
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    viewConfig: {forceFit: true},
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Generate Detail',
                        itemId: 'btnGenerate',
                        action: 'generate',
                        iconCls: 'icon-print',
                        hidden:true,
                        disabled: true,
                    },
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: false,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New Eliminasi',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'createcopy',
                        hidden: false,
                        itemId: 'btnCreateCopy',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add Copy',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        hidden: false,
                        disabled: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        hidden: false,
                        disabled: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'saveasdraft',
                        hidden: true,
                        itemId: 'btnSaveAsDraft',
                        iconCls: 'icon-save',
                        text: 'Save As Draft'
                    },
                    {
                        xtype: 'button',
                        action: 'loaddraft',
                        hidden: true,
                        itemId: 'btnLoadDraft',
                        iconCls: 'icon-refresh',
                        text: 'Load From Draft'
                    }                     
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                name: 'detailjournalpagingtoolbar',
                //store: this.getStore(),
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        //if (tbar.hideRefresh) {
                        //    tbar.down('#refresh').hide();
                        //}
                    }

                }
            }
        ];
        return dockedItems;
    },
});


