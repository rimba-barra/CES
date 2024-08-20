Ext.define('Hrd.view.trainingname.GridFormCompetency', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingnameformcompetencygrid',
    storeConfig: {
        id: 'TrainingnameGridFormCompetencyStore',
        idProperty: 'competency_name_id',
        extraParams: {}
    },
    bindPrefixName: 'competency_name',
    newButtonLabel: 'New',
    itemId:'TrainingnameGridFormCompetencyID',
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
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'choose_formcompetency',
                        iconCls: 'icon-new',
                        text: 'Choose Competency'
                    },
                    {
                        xtype: 'button',
                        action: 'delete_formcompetency',
                        iconCls: 'icon-delete',
                        text: 'Delete Competency'
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