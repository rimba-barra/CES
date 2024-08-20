Ext.define('Hrd.view.trainingschedule.GridBanding', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingschedulebandinggrid',
    storeConfig: {
        id: 'TrainingscheduleGridBandingStore',
        idProperty: 'banding_id',
        extraParams: {}
    },
    bindPrefixName: 'banding',
    newButtonLabel: 'New',
    itemId:'TrainingscheduleGridBandingID',
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
                },
                {
                   dataIndex: 'code',
                   text: 'Code',
                   width:100
                },
                {
                   dataIndex: 'banding',
                   text: 'Banding',
                   width:200
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