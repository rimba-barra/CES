Ext.define('Gl.view.setlapneraca.Grid', {
    extend: 'Gl.library.template.view.Grid',
    alias: 'widget.setlapneracagrid',
    store: 'Setlapneraca',
    bindPrefixName: 'Setlapneraca',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemsCustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rptformat_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'rptformat_id',
                    text: 'Index'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sort',
                    width: 50,
                    align: 'right',
                    dataIndex: 'sort',
                    text: 'No. Urut'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_report_level',
                    width: 100,
                    dataIndex: 'report_level',
                    hideable: false,
                    text: 'Template Level'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 80,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'COA '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 300,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Name'
                },
                
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_level',
                    width: 60,
                    dataIndex: 'level',
                    hideable: false,
                    text: 'Level'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 60,
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Type [D/C]'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_flag',
                    width: 60,
                    dataIndex: 'flag',
                    hideable: false,
                    text: 'Flag'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemsCustome: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'level_from',
                        id: 'level_from',
                        name: 'level_from',
                        fieldLabel: 'From',
                        value:'1',
                        readOnly:true,
                        allowBlank: false,
                        enforceMaxLength: true,
                        maxLength: 2,
                        anchor: '10%',
                        width: 200,
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'level_until',
                        id: 'level_until',
                        name: 'level_until',
                        emptyText:'With Numeric',
                        fieldLabel: 'Until',
                        allowBlank: false,
                        enforceMaxLength: true,
                        maxLength: 2,
                        anchor: '10%',
                        width: 200
                    },
                    {
                        xtype: 'button',
                        action: 'generate',
                        hidden: true,
                        itemId: 'btnGenerate',
                        id: 'btnGenerate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Generate',
                        text: 'Generate'
                    },
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
});
