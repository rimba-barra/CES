Ext.define('Hrd.view.transferapimaster.GridProcessGroup', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transferapimasterprocessgroupgrid',
    storeConfig: {
        id: 'TransferapimasterGridProcessGroupStore',
        idProperty: 'group_id',
        extraParams: {}
    },
    bindPrefixName: 'group',
    newButtonLabel: 'New',
    itemId:'TransferapimasterGridProcessGroupID',
    layout: 'fit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: [],
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width:775,
                height: 500,
                layout: 'fit',
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
                   dataIndex: 'action_process',
                   text: 'Action',
                   width:100
                },
                {
                   dataIndex: 'status_transfer',
                   text: 'Status Transfer',
                   width:100
                },
                {
                   dataIndex: 'project_name',
                   text: 'Project',
                   width:100
                },
                {
                   dataIndex: 'pt_name',
                   text: 'PT',
                   width:100
                },
                {
                   dataIndex: 'code',
                   text: 'Code',
                   width:100
                },
                {
                   dataIndex: 'group',
                   text: 'Group',
                   width:100
                },  
                // {
                //    dataIndex: 'uang_makan',
                //    text: 'Uang Makan',
                //    width:100
                // },
                // {
                //    dataIndex: 'uang_makan_extra',
                //    text: 'Uang Makan Extra',
                //    width:100
                // },
                // {
                //    dataIndex: 'uang_transport',
                //    text: 'Uang Transport',
                //    width:100
                // },  
                // {
                //    dataIndex: 'uang_hadir',
                //    text: 'Uang Hadir',
                //    width:100
                // },
                // {
                //    dataIndex: 'denda_terlambat',
                //    text: 'Denda Terlambat',
                //    width:100
                // },
                // {
                //    dataIndex: 'uang_transport_mod',
                //    text: 'Uang Transport MOD',
                //    width:100
                // },
                // {
                //    dataIndex: 'uang_makan_mod',
                //    text: 'Uang Makan MOD',
                //    width:100
                // },                 
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            // {
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     height: 28,
            //     items: [
            //         {
            //             xtype: 'button',
            //             action: 'choose_formcompetency',
            //             iconCls: 'icon-new',
            //             text: 'Choose Competency'
            //         },
            //         {
            //             xtype: 'button',
            //             action: 'delete_formcompetency',
            //             iconCls: 'icon-delete',
            //             text: 'Delete Competency'
            //         }
            //     ]
            // },
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },
   
});