Ext.define('Hrd.view.trainingschedule.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingschedulegrid',
    storeConfig:{
        id:'TrainingscheduleGridStore',
        idProperty:'trainingschedule_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingschedule',
    newButtonLabel: 'New Training schedule',
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
                   dataIndex: 'quota',
                   text: 'Quota'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Publish',
                    dataIndex   : 'publish',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Closed',
                    dataIndex   : 'closed',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    align       : 'center'
                },
                // {
                //    dataIndex: 'closedon',
                //    text: 'Closed on'
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
                        text: 'New Training schedule'
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
                        action: 'share_trainingschedule',
                        hidden: true,
                        itemId: 'btnShare',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'Share to Project Pt'
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