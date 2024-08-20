Ext.define('Hrd.view.overtimetransaction.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.overtimetransactiongrid',
    storeConfig: {
        id: 'OvertimetransactionGridStore',
        idProperty: 'overtimeheader_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Overtimetransaction',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'


            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'employee_employee_name',
                   text: 'Employee Name'
                },
                {
                   xtype:'datecolumn',
                   dataIndex: 'date',
                   format:'d-m-Y',
                   text: 'Date'
                },{
                   xtype:'datecolumn',
                   dataIndex: 'plan_before_start',
                   format:'H:i:s',
                   text: 'Before Start Time'
                },
                {
                   xtype:'datecolumn',
                   dataIndex: 'plan_before_end',
                   format:'h:i:s',
                   text: 'Before End Time'
                },{
                   xtype:'datecolumn',
                   dataIndex: 'plan_after_start',
                   format:'h:i:s',
                   text: 'After Start Time'
                },
                {
                   xtype:'datecolumn',
                   dataIndex: 'plan_after_end',
                   format:'h:i:s',
                   text: 'After End Time'
                },
                
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
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
    generateActionColumn: function() {
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
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            
            ]
        };
        return ac;
    }
});