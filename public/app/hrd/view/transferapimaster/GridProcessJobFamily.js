Ext.define('Hrd.view.transferapimaster.GridProcessJobFamily', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transferapimasterprocessjobfamilygrid',
    storeConfig: {
        id: 'TransferapimasterGridProcessJobFamilyStore',
        idProperty: 'jobfamily_id',
        extraParams: {}
    },
    bindPrefixName: 'jobfamily',
    newButtonLabel: 'New',
    itemId:'TransferapimasterGridProcessJobFamilyID',
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
                   dataIndex: 'code',
                   text: 'Code',
                   width:100
                },
                {
                   dataIndex: 'jobfamily',
                   text: 'Jobfamily',
                   width:100
                },                
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