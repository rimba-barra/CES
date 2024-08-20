Ext.define('Gl.view.koreksisetelahposting.SubAccountGrid', {
    extend: 'Gl.library.template.view.Grid',
    alias: 'widget.kspsubaccountgrid',
    itemId: 'SubAccountGrid',
    store: 'KspSubAccountJournal',
    cls:'subaccountjournal',
    bindPrefixName: 'KspSubAccountJournal',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            //: me.generateDockedItems(),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            viewConfig: {
            },
           selModel: {
                injectCheckbox: 0,
                pruneRemoved: false
            },
            columns: [
                {xtype: 'rownumberer'},
                {
                    xtype: 'gridcolumn',
                    text: 'ID',
                    dataIndex: 'journalsubdetail_id_sub',
                    hidden: true,
                    hideable: false,
                    width: 40,
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sub Account',
                    dataIndex: 'code_sub',
                    hideable: false,
                    width: 150
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Code 1',
                    dataIndex: 'code1_sub',
                    hideable: false,
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Code 2',
                    dataIndex: 'code2_sub',
                    hideable: false,
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Code 3',
                    dataIndex: 'code3_sub',
                    hideable: false,
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Code 4',
                    dataIndex: 'code4_sub',
                    hideable: false,
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Keterangan',
                    dataIndex: 'keterangan_sub',
                    hideable: false,
                    width: 70
                },
                /*
                 {
                 xtype: 'gridcolumn',
                 text: 'Sub Amount',
                 dataIndex: 'amount_sub',
                 hideable: false,
                 width: 100
                 },
                 */
                {
                    header: 'Sub Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    dataIndex: 'amount_sub',
                    align: 'right',
                    width: 200,
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                        return  "Sum Total : " + summaryvalue;
                    }

                },
                me.generateActionColumn(),
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
//                    {
//                        text: 'Input Multi Account',
//                        itemId: 'btnMulAcc',
//                        action: 'multi',
//                        iconCls: 'icon-copy',
//                        bindAction: me.bindPrefixName + 'Create'
//                    },
//                    {
//                        text: 'Add Sub Account',
//                        itemId: 'btnAdd',
//                        action: 'create',
//                        iconCls: 'icon-add',
//                        bindAction: me.bindPrefixName + 'Create'
//                    },
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
//                    {
//                        xtype: 'button',
//                        action: 'destroy',
//                        disabled: true,
//                        hidden: true,
//                        itemId: 'btnDelete',
//                        iconCls: 'icon-delete',
//                        text: 'Delete Selected',
//                        bindAction: me.bindPrefixName + 'Delete'
//
//                    },
                ]
            }
        ]

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
//                {
//                    defaultIcon: 'icon-delete',
//                    action: 'destroy',
//                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
//                    altText: 'Delete',
//                    tooltip: 'Delete'
//                }
            ]
        }

        return ac;

    },
});