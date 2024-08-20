Ext.define('Hrd.view.trainingregistration.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingregistrationgrid',
    storeConfig:{
        id:'TrainingregistrationGridStore',
        idProperty:'trainingregistration_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingregistration',
    newButtonLabel: 'New Training registration',
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
                // {
                //    dataIndex: 'total_employee',
                //    text: 'Total Employee'
                // },
                // {
                //    dataIndex: 'total_invited',
                //    text: 'Total Invited'
                // },
                // {
                //    dataIndex: 'total_confirm',
                //    text: 'Total Confirm by Email'
                // },
                {
                   dataIndex: 'total_confirm_schedule',
                   text: 'Total Confirm by Email'
                },

                {
                   dataIndex: 'total_register_ess',
                   text: 'Total ESS'
                },
                {
                   dataIndex: 'total_register_all',
                   text: 'Total Employee'
                },
                {
                   dataIndex: 'hc_already_check',
                   text: 'Hc Check'
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
                    //     text: 'New Training registration'
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
                        action: 'browse_intranet_training',
                        itemId: 'btnBrowse',
                        bindAction: me.bindPrefixName + 'Read',
                        iconCls: 'icon-new',
                        text: 'Browse Intranet'
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