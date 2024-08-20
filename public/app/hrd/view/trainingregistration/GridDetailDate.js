Ext.define('Hrd.view.trainingregistration.GridDetailDate', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingregistrationddgrid',
    storeConfig: {
        id: 'TrainingregistrationGridDDStore',
        idProperty: 'trainingregistrationdate_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingregistration',
    newButtonLabel: 'New',
    itemId:'TrainingregistrationGridDDID',
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
                    dataIndex: 'trainingregistrationdate',
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