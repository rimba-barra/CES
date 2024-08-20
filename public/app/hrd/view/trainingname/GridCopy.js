Ext.define('Hrd.view.trainingname.GridCopy', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingnamecopygrid',
    storeConfig: {
        id: 'TrainingnameGridCopyStore',
        idProperty: 'trainingname_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingname',
    newButtonLabel: 'New',
    itemId:'TrainingnameGridCopyID',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: [],
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
                },{
                   dataIndex: 'trainingname',
                   text: 'Training Name',
                   width:200
                },
                {
                   dataIndex: 'vendor',
                   text: 'Vendor',
                   width:175
                },
                // {
                //    dataIndex: 'caption',
                //    text: 'Budget Type',
                //    width:175
                // },
                // {
                //    dataIndex: 'competency_name',
                //    text: 'Competency',
                //    width:150
                // },
                {
                   dataIndex: 'skill',
                   text: 'Skill Type',
                   width:120
                },
                {
                   dataIndex: 'type',
                   text: 'Training Type',
                   width:100
                },
                {
                   dataIndex: 'certificate',
                   text: 'Certificate',
                   width:75
                },
               
              //  me.generateActionColumn()
                
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
            //             action: 'generatedate',
            //             iconCls: 'icon-new',
            //             text: 'Generate Date'
            //         },
            //         {
            //             xtype: 'button',
            //             action: 'deletedate',
            //             iconCls: 'icon-delete',
            //             text: 'Delete Date'
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