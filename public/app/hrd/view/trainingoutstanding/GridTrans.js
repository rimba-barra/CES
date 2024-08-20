Ext.define('Hrd.view.trainingoutstanding.GridTrans', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingoutstandingtransgrid',
    storeConfig: {
        id: 'TrainingoutstandingGridTransStore',
        idProperty: 'trainingbudgetrecord_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingoutstanding',
    newButtonLabel: 'New',
    itemId:'TrainingoutstandingGridtransID',
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
            // selModel: Ext.create('Ext.selection.CheckboxModel', {
            // }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'periode',
                    text: 'Periode',
                    
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    
                },
                {
                    xtype:'numbercolumn',
                    align:'right',
                    dataIndex: 'budget',
                    text: 'Budget',
                    
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
            //             action: 'attenddate',
            //             iconCls: 'icon-new',
            //             text: 'Attend'
            //         },
            //         {
            //             xtype: 'button',
            //             action: 'notattenddate',
            //             iconCls: 'icon-delete',
            //             text: 'Not Attend'
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
