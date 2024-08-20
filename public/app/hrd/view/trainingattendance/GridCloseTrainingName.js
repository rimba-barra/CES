Ext.define('Hrd.view.trainingattendance.GridCloseTrainingName', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingattendanceclosetrainingnamegrid',
    storeConfig: {
        id: 'TrainingattendanceGridCloseTrainingNameStore',
        idProperty: 'trainingname_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingname',
    newButtonLabel: 'New',
    itemId:'TrainingattendanceGridCloseTrainingNameID',
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
                   dataIndex: 'batch',
                   text: 'Batch'
                },
                {
                   dataIndex: 'periode',
                   text: 'Periode'
                },
                {
                   dataIndex: 'startdate',
                   text: 'Start Date'
                },
                {
                   dataIndex: 'enddate',
                   text: 'End Date'
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