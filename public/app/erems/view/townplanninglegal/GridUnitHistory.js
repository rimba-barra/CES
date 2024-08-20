Ext.define('Erems.view.townplanninglegal.GridUnitHistory',{
    
    alias:'widget.townplanninglegalgridunithistory',
    
    bindPrefixName:'Townplanninglegal',
   // itemId:'',
    newButtonLabel:'New Unit History',
    extend:'Erems.library.template.view.GridDS2',
   
    storeConfig:{
        id:'TownPlanningGridUnitHistoryStore',
        idProperty:'unithistory_id',
        extraParams:{
            mode_read:'history'
        }
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            defaults:{
                align: 'center',
                xtype:'gridcolumn'
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'change_date',
                    text: 'Change Date',
                    width:170
                },{
                    dataIndex: 'description',
                    text: 'Description',
                    width:300
                },{
                    dataIndex: 'instruksi_order',
                    text: 'Instruksi Order'
                },{
                    dataIndex: 'person_in_charge',
                    text: 'Person in Charge'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


