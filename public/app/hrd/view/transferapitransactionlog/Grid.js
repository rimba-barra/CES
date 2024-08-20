Ext.define('Hrd.view.transferapitransactionlog.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transferapitransactionloggrid',
    storeConfig:{
        id:'TransferapitransactionlogGridStore',
        idProperty:'employee_id',
        extraParams:{}
    },
    bindPrefixName: 'Transferapitransactionlog',
    newButtonLabel: 'New Training outstanding',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
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
                   dataIndex: 'pt_name',
                   text: 'PT',
                   width:200
                },
                {
                   dataIndex: 'log_process_id',
                   text: 'Log Process',
                   width:70
                },
                {
                   dataIndex: 'processpayroll_month',
                   text: 'Payroll Process (Month)',
                   width:130
                },
                {
                   dataIndex: 'processpayroll_year',
                   text: 'Payroll Process (Year)',
                   width:130
                },
                {
                   dataIndex: 'data',
                   text: 'Transfer API Transaction',
                   width:140
                },
                {
                   dataIndex: 'processdata_from',
                   text: 'Periode (Start)',
                   width:85
                },
                {
                   dataIndex: 'processdata_end',
                   text: 'Periode (End)',
                   width:85
                },
                {
                   dataIndex: 'user_name',
                   text: 'User Name',
                   width:100
                },
                {
                   dataIndex: 'addon',
                   text: 'Addon',
                   width:75
                },

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            action: 'downloadLog',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    xtype: 'button',
                    icon: 'app/main/images/icons/printer.png',
                    action: 'downloadLog',
                    bindAction: me.bindPrefixName + 'Read',
                    // text: 'View',
                    tooltip: 'Download',
                },
                // {
                //     xtype: 'button',
                //     action: 'print',
                //     hidden: false,
                //     itemId: 'btnPrint',
                //     icon: 'app/main/images/icons/printer.png',
                //     margin: '0 0 0 0',
                //     bindAction: me.bindPrefixName + 'Print',
                //     text: 'Print Document',
                //     tooltip: 'Print Document',
                // },
            ]
        }

        return ac;

    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    // {
                    //     xtype: 'button',
                    //     action: 'create',
                    //     hidden: true,
                    //     itemId: 'btnNew',
                    //     margin: '0 5 0 0',
                    //     iconCls: 'icon-new',
                    //     bindAction: me.bindPrefixName + 'Create',
                    //     text: 'New Training Caption'
                    // },
                    // {
                    //     xtype: 'button',
                    //     action: 'update',
                    //     disabled: true,
                    //     hidden: true,
                    //     itemId: 'btnEdit',
                    //     margin: '0 5 0 0',
                    //     iconCls: 'icon-edit',
                    //     text: 'Edit',
                    //     bindAction: me.bindPrefixName + 'Update'
                    // },
                    // {
                    //     xtype: 'button',
                    //     action: 'destroy',
                    //     disabled: true,
                    //     hidden: true,
                    //     itemId: 'btnDelete',
                    //     bindAction: me.bindPrefixName + 'Delete',
                    //     iconCls: 'icon-delete',
                    //     text: 'Delete Selected'
                    // },
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