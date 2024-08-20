Ext.define('Hrd.view.trainingbudget.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingbudgetgrid',
    storeConfig:{
        id:'TrainingbudgetGridStore',
        idProperty:'trainingbudget_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingbudget',
    newButtonLabel: 'New Training budget',
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
                   dataIndex: 'periode',
                   text: 'Periode',
                   width:75
                },
                {
                   dataIndex: 'caption',
                   text: 'Budget Program',
                   width:150
                },
                {
                   dataIndex: 'apply_budget_name',
                   text: 'Apply to',
                   width:150
                },
                {
                   dataIndex: 'banding',
                   text: 'Banding',
                   width:150
                },
                {
                   dataIndex: 'department',
                   text: 'Department',
                   width:150
                },
                {
                   xtype:'numbercolumn',
                   align:'right',
                   dataIndex: 'budget',
                   text: 'Budget',
                   width:100
                },
                {
                   dataIndex: 'employeestatus',
                   text: 'Employee Status',
                   width:100
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Apply',
                    dataIndex   : 'apply_check',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 100,
                    resizable   : false,
                    align       : 'center'
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
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: 'New Training Budget'
                    },
                    // {
                    //     xtype: 'button',
                    //     action: 'copy',
                    //     hidden: true,
                    //     itemId: 'btnCopy',
                    //     margin: '0 5 0 0',
                    //     iconCls: 'icon-new',
                    //     bindAction: me.bindPrefixName + 'Read',
                    //     text: 'Copy'
                    // },
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
                        action: 'apply',
                        //added by anas 24052022
                        disabled: true,         
                        //end added by anas               
                        itemId: 'btnApply',
                        bindAction: me.bindPrefixName + 'Apply',
                        iconCls: 'icon-new',
                        text: 'Apply'
                    },
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