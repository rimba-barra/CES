Ext.define('Cashier.view.vdrequest.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdrequestgriddetail',
    store: 'VDRequestdetail',
    bindPrefixName: 'VDRequestDetail',
    itemId: 'VDRequestdetail',
    title: 'COA',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 70,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Coa'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 150,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'coaname',
                    hideable: false,
                    text: 'Coa Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    width: 190,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'remarks',
                    hideable: false,
                    text: 'Description',
                    renderer: function(value, meta, record) {
                        meta.style = 'text-transform:uppercase';
                        return value;
                    }
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 100,
                    hideable: false,
                    text: 'Amount'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 50,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'kelsub',
                    hideable: false,
                    text: 'Kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashflowtype',
                    width: 90,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'cashflowtype',
                    hideable: false,
                    text: 'Cashflow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subgl',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'subgl',
                    hideable: false,
                    text: 'Sub Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashbon_no',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'cashbon_no',
                    hideable: false,
                    text: 'CA No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subgl',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'subgldesc',
                    hideable: false,
                    text: 'Sub Code Desc'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_typetransdetail',
                    width: 60,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'typetransdetail',
                    hideable: false,
                    text: 'Type Data'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_indexdata',
                    width: 30,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'indexdata',
                    hideable: false,
                    text: 'Idx'
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create',
                        id: 'btnAddNewDetailVdrequest'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: false,
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
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                            xtype: 'splitter',
                            width: '30',
                    },
                    {
                        text: 'Generate Pajak',
                        itemId: 'btnGenerate',
                        action: 'generatepajak',
                        iconCls: 'icon-refresh'
                        //bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Generate Multi Kasbon',
                        itemId: 'btnGeneratekasbon',
                        action: 'generatekasbon',
                        iconCls: 'icon-refresh',
                        hidden: true,
                        //bindAction: me.bindPrefixName + 'Create'
                    },
//                     {
//                        xtype: 'button',
//                        action: 'test',
//                       // disabled: true,
//                        hidden: false,
//                        name: 'btnDelete',
//                        //bindAction: me.bindPrefixName + 'Delete',
//                        iconCls: 'icon-print',
//                        text: 'test '
//                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingvoucherrequestdetail',
                width: 360,
                displayInfo: true,
                store: 'VDRequestdetail',
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
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


