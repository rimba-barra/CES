Ext.define('Hrd.view.trainingregistration.GridCompetency', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingregistrationcompetencygrid',
    storeConfig: {
        id: 'TrainingregistrationGridCompetencyStore',
        idProperty: 'competency_name_id',
        extraParams: {}
    },
    bindPrefixName: 'competency_name',
    newButtonLabel: 'New',
    itemId:'TrainingregistrationGridCompetencyID',
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
                   dataIndex: 'competency_name',
                   text: 'Competency Name',
                   width:200
                },
                {
                   dataIndex: 'competency_category',
                   text: 'Competency Category',
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