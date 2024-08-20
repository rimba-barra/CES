Ext.define('Cashier.view.vdposting.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdpostinggriddetail',
    store: 'VDPostingdetail',
    bindPrefixName: 'VDPostingDetail',
    itemId: 'VDPostingdetail',
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
                    width: 100,
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
                    itemId: 'colms_kelsub',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'kelsub',
                    hideable: false,
                    text: 'Kelsub'
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
                    itemId: 'colms_indexdata',
                    width: 60,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'indexdata',
                    hideable: false,
                    text: 'Index'
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
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 150,
                    hideable: false,
                    text: 'Amount',
		    /*	
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                        return  "Sum Total : " + summaryvalue;
                    }*/
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'remarks',
                    hideable: false,
                    text: 'Description'
                },
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
                        bindAction: me.bindPrefixName + 'Create'
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
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingvoucherrequestdetail',
                width: 360,
                displayInfo: true,
                store: 'VDPostingdetail',
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


