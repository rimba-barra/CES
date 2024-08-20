Ext.define('Gl.view.journal.SubAccountGrid', {
    extend: 'Gl.library.template.view.Grid',
    alias: 'widget.SubAccountGrid',
    itemId: 'SubAccountGrid',
    store: 'SubAccountJournal',
    cls:'subaccountjournal',
    id: 'subaccountjournalID',
    bindPrefixName: 'JournalSubAccountJournal',
    initComponent: function () {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            plugins: [rowEditing],
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
                    editor: {
                        xtype: 'subaccountcodeongridcombobox',
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null,
                        forceSelection: false,
                        typeAhead: false,
                        matchFieldWidth: false,
                        width: 400
                    },
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
                    editor: {
                        xtype: 'textfield'
                    },
                    width: 200
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
                    width: 130,
                    summaryType: 'sum',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    },
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
                    {
                        text: 'Input Multi Account',
                        itemId: 'btnMulAcc',
                        action: 'multi',
                        cls: 'btnMulAcc',
                        iconCls: 'icon-copy',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Add Sub Account',
                        itemId: 'btnAdd',
                        action: 'create',
                        cls: 'btnAddSub',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Add New Row',
                        itemId: 'btnAddrow',
                        action: 'newrow',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create',
                        hidden: true
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
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'

                    },
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
            itemId: 'subaccountgridactioncolID',
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    cls: 'editCls',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    cls: 'deleteCls',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});