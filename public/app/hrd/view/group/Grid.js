Ext.define('Hrd.view.group.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.groupgrid',
    storeConfig: {
        id: 'GroupGridStore',
        idProperty: 'group_id',
        extraParams: {}
    },
    bindPrefixName: 'Group',
    newButtonLabel: 'New Group',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',

            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'index_no',
                    text: 'Index No',
                    width: 70
                },
                {
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    dataIndex: 'group',
                    text: 'Group Name',
                    width: 200
                },

                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: 'Uang Makan',
                    dataIndex: 'uang_makan'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: 'Uang Makan Extra',
                    dataIndex: 'uang_makan_extra'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: 'Uang Transport',
                    dataIndex: 'uang_transport'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: 'Uang Hadir',
                    dataIndex: 'uang_hadir'
                },

                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'lembur',
                    text: 'Lembur'
                },
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'lambat',
                    text: 'Lambat'
                },
                {
                    text: 'Denda Terlambat',
                    dataIndex: 'denda_terlambat'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Uang Transport MOD',
                    dataIndex: 'uang_transport_mod'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Uang Makan MOD',
                    dataIndex: 'uang_makan_mod'
                },
                {
                    text: 'point',
                    dataIndex: 'point'
                },
                /*
                 {
                 text:'Split Shift',
                 dataIndex:'split_shift'
                 },*/
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'split_shift',
                    text: 'Split Shift'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    /* edited by ahmad riadi 26-07-2017 */
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: me.bindPrefixName + 'import',
                        hidden: true,
                        itemId: 'btnImport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'Copy Group (Head Office)'
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
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
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
    },
     /* edited by ahmad riadi 26-07-2017 */
});