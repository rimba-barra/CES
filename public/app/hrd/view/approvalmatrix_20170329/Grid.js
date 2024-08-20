Ext.define('Hrd.view.approvalmatrix.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.approvalmatrixgrid',
    storeConfig: {
        id: 'ApprovalmatrixGridStore',
        idProperty: 'employee_id',
        extraParams: {}
    },
    bindPrefixName: 'Approvalmatrix',
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width: 75
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [{
                    xtype: 'rownumberer'
                }, {
                    dataIndex: 'employee_nik',
                    text: 'NIK'
                }, {
                    dataIndex: 'employee_name',
                    text: 'Employee Name',
                    width: 200
                }, {
                    dataIndex: 'department',
                    text: 'Department',
                    width: 200
                },
                {
                    dataIndex: 'package_name',
                    text: 'Package Document',
                    width: 200
                },
                {
                    xtype: 'booleancolumn',
                    text: 'Status',
                    dataIndex: 'is_dinilai',
                    trueText: '&#10003;',
                    falseText: ' ',
                    resizable: false,
                    width: 50,
                    align: 'center'
                },

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [{
                        xtype: 'button',
                        action: 'applyall',
                        hidden: true,
                        itemId: 'btnApplyall',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Applyall',
                        text: 'Apply all Package Document'
                    }, {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Set Matrix Approval',
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
                    }, {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    }]
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

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
            items: [{
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Set Matrix Approval',
                    tooltip: 'Set Matrix Approval'
                }, {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }]
        };

        return ac;
    }
});