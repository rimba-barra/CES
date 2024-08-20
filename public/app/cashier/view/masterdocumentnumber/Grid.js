Ext.define('Cashier.view.masterdocumentnumber.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.masterdocumentnumbergrid',
    bindPrefixName: 'Masterdocumentnumber',
    storeConfig: {
        id: 'MasterDocumentNumberGridStore',
        idProperty: 'documentnumber_id',
        extraParams: {},
    },
    // itemId:'',
    newButtonLabel: 'New Voucher Setup ',
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
                    xtype: 'rownumberer'
                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 200,
//                    dataIndex: 'project_name',
//                    hideable: false,
//                    text: 'Project Name',
//                   
//                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'Company Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'year',
                    hideable: false,
                    text: 'Year',
                    align: 'center',
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'month',
                    hideable: false,
                    text: 'Month',
                    align: 'center',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'module_name',
                    hideable: false,
                    text: 'Module ',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'format',
                    hideable: false,
                    text: 'Prefix Code',
                },
                
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'counter',
                    hideable: false,
                    text: 'Number',
                    align: 'center',
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_posting_gl',
                    dataIndex: 'active',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 50,
                    hideable: false,
                    text: 'Active'
                },
               
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'modiby',
                    hideable: false,
                    text: 'Modiby'
                },
                me.generateActionColumn()
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
                        xtype: 'button',
                        action: 'create',
                        //disabled: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add Voucher Setup'
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                items: [
                 
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        width: 360,
                        displayInfo: true,
                        store: this.getStore()
                    },
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }

            ]
        };
        return ac;
    },
});


