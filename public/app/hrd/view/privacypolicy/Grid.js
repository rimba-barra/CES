Ext.define('Hrd.view.privacypolicy.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.privacypolicygrid',
    storeConfig:{
        id:'privacypolicyGridStore',
        idProperty:'id',
        extraParams:{}
    },
    bindPrefixName: 'Privacypolicy',
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
                me.generateActionColumn(),
                {
                    dataIndex: 'year_submit',
                    text: 'Periode',
                    width:70
                },
                {
                    dataIndex: 'project_name',
                    text: 'Project Name',
                    width:150
                },
                {
                    dataIndex: 'pt_name',
                    text: 'PT Name',
                    width:150
                },
                {
                    dataIndex: 'department',
                    text: 'Department',
                    width:180
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Employee Name',
                    width:200
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'submit_date',
                    text: 'Submited Date',
                    width:130,
                    format: 'd M Y H:i:s',
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'expired_date',
                    text: 'Expired Date',
                    width:100,
                    format: 'd M Y',
                },
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            action: 'view',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [

                {
                    xtype: 'button',
                    icon: 'app/main/images/icons/printer.png',
                    action: 'view',
                    bindAction: me.bindPrefixName + 'Read',
                    tooltip: 'View',
                },
            ]
        }

        return ac;

    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            // {
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     height: 28,
            //     items: [
            //         // {
            //         //     xtype: 'button',
            //         //     action: 'create',
            //         //     hidden: true,
            //         //     itemId: 'btnNew',
            //         //     margin: '0 5 0 0',
            //         //     iconCls: 'icon-new',
            //         //     bindAction: me.bindPrefixName + 'Create',
            //         //     text: 'New Training Caption'
            //         // },
            //         {
            //             xtype: 'button',
            //             action: 'update',
            //             disabled: true,
            //             hidden: true,
            //             itemId: 'btnEdit',
            //             margin: '0 5 0 0',
            //             iconCls: 'icon-edit',
            //             text: 'Edit',
            //             bindAction: me.bindPrefixName + 'Update'
            //         },
            //         // {
            //         //     xtype: 'button',
            //         //     action: 'destroy',
            //         //     disabled: true,
            //         //     hidden: true,
            //         //     itemId: 'btnDelete',
            //         //     bindAction: me.bindPrefixName + 'Delete',
            //         //     iconCls: 'icon-delete',
            //         //     text: 'Delete Selected'
            //         // },
            //     ]
            // },
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