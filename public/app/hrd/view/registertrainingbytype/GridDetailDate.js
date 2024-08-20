Ext.define('Hrd.view.registertrainingbytype.GridDetailDate', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.registertrainingbytypeddgrid',
    storeConfig: {
        id: 'RegistertrainingbytypeGridDDStore',
        idProperty: 'trainingdate_id',
        extraParams: {}
    },
    bindPrefixName: 'Registertrainingbytype',
    newButtonLabel: 'New',
    itemId:'RegistertrainingbytypeGridDDID',
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
                    dataIndex: 'date',
                    text: 'Tanggal',
                    
                },
               
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'hadir',
                    text: 'Hadir'
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
                        action: 'hadir',
                        iconCls: 'icon-new',
                        text: 'Hadir'
                    },
                    {
                        xtype: 'button',
                        action: 'tidakhadir',
                        iconCls: 'icon-delete',
                        text: 'Tidak Hadir'
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