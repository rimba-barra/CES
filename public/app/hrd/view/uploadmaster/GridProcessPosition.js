Ext.define('Hrd.view.uploadmaster.GridProcessPosition', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.uploadmasterprocesspositiongrid',
    storeConfig: {
        id: 'UploadmasterGridProcessPositionStore',
        idProperty: 'position_id',
        extraParams: {}
    },
    bindPrefixName: 'position',
    newButtonLabel: 'New',
    itemId:'UploadmasterGridProcessPositionID',
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
            // selModel: Ext.create('Ext.selection.CheckboxModel', {
            // }),
            columns: [
                {
                    xtype: 'rownumberer'
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
                   dataIndex: 'position',
                   text: 'Position',
                   width:100
                },
                {
                   dataIndex: 'description',
                   text: 'Description',
                   width:100
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Transfer',
                    dataIndex   : 'upload_check',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },               
                {
                   dataIndex: 'action_process',
                   text: 'Action Transfer',
                   width:100
                },
                {
                   dataIndex: 'status_transfer',
                   text: 'Status Transfer',
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