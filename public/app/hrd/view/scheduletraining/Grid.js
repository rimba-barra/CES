Ext.define('Hrd.view.scheduletraining.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.scheduletraininggrid',
    storeConfig: {
        id: 'ScheduletrainingGridStore',
        idProperty: 'scheduletraining_id',
        extraParams: {}
    },
    bindPrefixName: 'Scheduletraining',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width:75
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
                    dataIndex: 'programtraining_code',
                    text: 'Code',
                    
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex:'start_date',
                    text:'Start Date',
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex:'end_date',
                    text:'End Date',
                },
                {
                    dataIndex:'location',
                    text:'Location',
                }
                
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
                        action: 'edit',
                        disabled:true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit'
                    },
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        margin: '0 5 0 0',
                        iconCls: 'icon-save',
                        disabled:true,
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        margin: '0 5 0 0',
                        iconCls: 'icon-cancel',
                        disabled:true,
                        text: 'Cancel'
                    },
                    
                    {
                        xtype: 'button',
                        action: 'delete',
                        disabled: true,
                   
                        itemId: 'btnDelete',
                   
                        iconCls: 'icon-delete',
                        text: 'Delete'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Print'
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
    }
});