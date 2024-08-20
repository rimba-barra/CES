Ext.define('Hrd.view.trainingname.GridShareProjectPt', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingnameshareppgrid',
    storeConfig: {
        id: 'TrainingnameGridSharePPStore',
        idProperty: 'projectpt_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingname',
    newButtonLabel: 'New',
    itemId:'TrainingnameGridSharePPID',
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
                   dataIndex: 'project_name',
                   text: 'Project Name',
                   width:200
                },
                {
                   dataIndex: 'pt_name',
                   text: 'PT Name',
                   width:175
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