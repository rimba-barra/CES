Ext.define('Hrd.view.trainingschedule.GridShareTrainingSchedule', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingschedulesharetngrid',
    storeConfig: {
        id: 'TrainingscheduleGridSharetTNStore',
        idProperty: 'trainingschedule_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingschedule',
    newButtonLabel: 'New',
    itemId:'TrainingscheduleGridShareTNID',
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
                   dataIndex: 'periode',
                   text: 'Periode',
                   width:175
                },
                {
                   dataIndex: 'batch',
                   text: 'Batch',
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