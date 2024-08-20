
Ext.define('Cashier.view.journal.DetailjournalGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.detailjournalgrid',
    storeConfig: {
        id: 'DetailJournalGridStore',
        idProperty: 'journaldetail_id',
        extraParams: {
            mode_read: 'generatetemplatecoa',
            template_id: 0
        }
    },
    
    height: 200,
    bindPrefixName: 'Journal',
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
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'receipt_no',
                    hideable: false,
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
                    header: 'Total Amount',
                    
//                    summaryType: 'sum',
//                    summaryRenderer: function (value, summaryData, dataIndex) {
//                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
//                        return  summaryvalue;
//                    }
//


                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cashflow',
                    titleAlign: 'center',
                    align: 'center',
                    
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
                        disabled: true,
                    },
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: false,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'createcopy',
                        hidden: false,
                        disabled: true,
                        itemId: 'btnCreateCopy',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
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
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore(),
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        if (tbar.hideRefresh) {
                            tbar.down('#refresh').hide();
                        }
                    }

                }
            }
        ];
        return dockedItems;
    },
});


