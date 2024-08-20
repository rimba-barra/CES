Ext.define('Hrd.view.trainingarsip.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingarsipgrid',
    storeConfig:{
        id:'TrainingarsipGridStore',
        idProperty:'Trainingarsip_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingarsip',
    newButtonLabel: 'New Trainingarsip',
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
                   dataIndex: 'trainingname',
                   text: 'Training Name',
                   width:150
                },
                {
                   dataIndex: 'batch',
                   text: 'Batch',
                   width:50
                },
                {
                   dataIndex: 'periode',
                   text: 'Periode',
                   width:50
                },
                // {
                //    dataIndex: '',
                //    text: 'Employee Name',
                //    width:150
                // },
                {
                   dataIndex: 'file_name',
                   text: 'File Name',
                   width:150
                },
                // {
                //    dataIndex: '',
                //    text: 'Publish',
                //    width:50
                // },
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
                        text: 'New Arsip'
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