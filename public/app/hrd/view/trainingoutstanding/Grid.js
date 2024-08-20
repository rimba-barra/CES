Ext.define('Hrd.view.trainingoutstanding.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingoutstandinggrid',
    storeConfig:{
        id:'TrainingoutstandingGridStore',
        idProperty:'employee_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingoutstanding',
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
                },{
                   dataIndex: 'employee_name',
                   text: 'Employee',
                   width:300
                },
                // {
                //     xtype       : 'booleancolumn',
                //     text        : 'Lock Budget',
                //     dataIndex   : 'lockbudget',
                //     trueText    : '&#10003;',
                //     falseText   : ' ',
                //     width       : 100,
                //     resizable   : false,
                //     align       : 'center'
                // },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            action: 'viewoutstanding',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    xtype: 'button',
                    icon: 'app/main/images/icons/user.png',
                    action: 'viewoutstanding',
                    bindAction: me.bindPrefixName + 'Update',
                    // text: 'View',
                    tooltip: 'View',
                },
                {
                    xtype: 'button',
                    action: 'print',
                    hidden: false,
                    itemId: 'btnPrint',
                    icon: 'app/main/images/icons/printer.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Print',
                    text: 'Print Document',
                    tooltip: 'Print Document',
                },
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