Ext.define('Hrd.view.trainingschedule.GridDetailDate', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingscheduleddgrid',
    storeConfig: {
        id: 'TrainingscheduleGridDDStore',
        idProperty: 'trainingscheduledate_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingschedule',
    newButtonLabel: 'New',
    itemId:'TrainingscheduleGridDDID',
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
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'trainingscheduledate',
                    text: 'Tanggal',
                    
                },
               
              //  me.generateActionColumn()
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'generatedate',
                        iconCls: 'icon-new',
                        text: 'Generate Date'
                    },
                    {
                        xtype: 'button',
                        action: 'deletedate',
                        iconCls: 'icon-delete',
                        text: 'Delete Date'
                    }
                ]
            },
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