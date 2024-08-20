Ext.define('Hrd.view.trainingbudgetadjustment.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingbudgetadjustmentgrid',
    storeConfig:{
        id:'TrainingbudgetadjustmentGridStore',
        idProperty:'trainingbudgetadjustment_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingbudgetadjustment',
    newButtonLabel: 'New Training Adjustment',
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
                // {
                //    dataIndex: 'caption',
                //    text: 'Caption',
                //    width:150
                // },
                {
                   dataIndex: 'apply_adjustment_to_name',
                   text: 'Apply to',
                   width:150
                },
                {
                   dataIndex: 'caption_budgetprogram',
                   text: 'Budget Program',
                   width:150
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Employee Name',
                   width: 150
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Minus',
                    dataIndex   : 'minus',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },
                {
                   xtype:'numbercolumn',
                   align:'right',
                   dataIndex: 'adjustment',
                   text: 'Adjustment',
                   width: 150
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Apply',
                    dataIndex   : 'apply_check',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
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
                        text: 'New Training Adjustment'
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
                        action: 'apply_adj',
                        //updated by anas 24052022
                        disabled: true,         
                        //end added by anas  
                        hidden: false,
                        itemId: 'btnApplyAdj',
                        bindAction: me.bindPrefixName + 'Read',
                        iconCls: 'icon-new',
                        text: 'Apply'
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