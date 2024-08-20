Ext.define('Cashier.view.kartupiutangacc.Grid',{
    extend:'Cashier.library.template.view.GridDS2',
    alias:'widget.kartupiutangaccgrid',
    store: 'Kartupiutangacc',
    bindPrefixName:'Kartupiutangacc',
    itemId: 'Kartupiutangacc',
    newButtonLabel:'New Expense_no',
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            // contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                mode: 'SINGLE'
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster',
                    text: 'Cluster',
                    width:200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'code',
                    text: 'Unit Number',
                    width:90,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_name',
                    text: 'Customer Name',
                    width:250,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No.',
                    width:250
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'purchase_date',
                    text: 'Purchase Date',
                    align: 'center'
                }
            ]
        });

        me.callParent(arguments);
    },
    viewConfig: {forceFit: true},
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            width: 50,
            resizable: false,
            align: 'right',
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-search',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit',
                    disabled: false
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
                        action: 'view',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'View',
                        bindAction: me.bindPrefixName + 'Update'
                    },  
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'
                    },                   
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: false,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Print Kartu Piutang'
                    },
                    {
                        xtype: 'button',
                        action: 'printv2',
                        hidden: true,
                        itemId: 'btnPrintv2',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Print Kartu Piutang v2'
                    },
                    {
                        xtype: 'button',
                        action: 'export',
                        hidden: false,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-excel',
                        text: 'Export'
                    },
                    {
                        xtype: 'button',
                        action: 'fetchdata',
                        hidden: false,
                        itemId: 'btnFetchData',
                        margin: '0 5 0 0',
                        iconCls: 'icon-refresh',
                        text: 'Fetch Data'
                    }
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
    }
});