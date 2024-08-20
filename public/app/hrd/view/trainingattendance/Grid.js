Ext.define('Hrd.view.trainingattendance.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingattendancegrid',
    storeConfig:{
        id:'TrainingattendanceGridStore',
        idProperty:'trainingattendance_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingattendance',
    newButtonLabel: 'New Training attendance',
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
                   text: 'Training Name'
                },
                {
                   dataIndex: 'periode',
                   text: 'Periode'
                },
                {
                   dataIndex: 'batch',
                   text: 'Batch'
                },
                {
                   dataIndex: 'startdate',
                   text: 'Start Date'
                },
                {
                   dataIndex: 'enddate',
                   text: 'End Date'
                },
                //added by anas 11042022
                {
                    xtype : 'booleancolumn',
                    dataIndex: 'closed',
                    text: 'Closed',
                    trueText : '&#10003;',
                    falseText : ' ',
                    align : 'center'
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
                    // {
                    //     xtype: 'button',
                    //     action: 'create',
                    //     hidden: true,
                    //     itemId: 'btnNew',
                    //     margin: '0 5 0 0',
                    //     iconCls: 'icon-new',
                    //     bindAction: me.bindPrefixName + 'Create',
                    //     text: 'New Training Attendance'
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
                    {
                        xtype: 'button',
                        action: 'browse_intranet_training_attendance',
                        itemId: 'btnBrowse',
                        bindAction: me.bindPrefixName + 'Read',
                        iconCls: 'icon-new',
                        text: 'Browse Intranet'
                    },
                    {
                        xtype: 'button',
                        action: 'close_training_attendance',
                        itemId: 'btnClose',
                        bindAction: me.bindPrefixName + 'Read',
                        iconCls: 'icon-delete',
                        text: 'Close'
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