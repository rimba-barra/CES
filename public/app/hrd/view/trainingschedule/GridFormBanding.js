Ext.define('Hrd.view.trainingschedule.GridFormBanding', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingscheduleformbandinggrid',
    storeConfig: {
        id: 'TrainingscheduleGridFormBandingStore',
        idProperty: 'banding_id',
        extraParams: {}
    },
    bindPrefixName: 'banding',
    newButtonLabel: 'New',
    itemId:'TrainingscheduleGridFormBandingID',
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
                   width:175
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
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'choose_formbanding',
                        iconCls: 'icon-new',
                        text: 'Choose Banding'
                    },
                    {
                        xtype: 'button',
                        action: 'delete_formbanding',
                        iconCls: 'icon-delete',
                        text: 'Delete Banding'
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