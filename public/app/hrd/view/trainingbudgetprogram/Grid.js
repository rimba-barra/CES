Ext.define('Hrd.view.trainingbudgetprogram.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingbudgetprogramgrid',
    storeConfig:{
        id:'TrainingbudgetprogramGridStore',
        idProperty:'trainingbudgetprogram_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingbudgetprogram',
    newButtonLabel: 'New Training budget program',
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
                   width:50
                },
                {
                   dataIndex: 'caption',
                   text: 'Caption',
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
                   xtype:'numbercolumn',
                   align:'right',
                   dataIndex: 'budget_used',
                   text: 'Budget Used',
                   width:100
                },
                {
                   dataIndex: 'notes',
                   text: 'Notes',
                   width:300
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
                        text: 'New Training Budget Program'
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