Ext.define('Hrd.view.registertrainingbytype.GridDetailDate', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.registertrainingbytypeddgrid',
    storeConfig: {
        id: 'RegistertrainingbytypeGridDDStore',
        idProperty: 'registertrainingbytype_id',
        extraParams: {}
    },
    bindPrefixName: 'Registertrainingbytype',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: [],
            dockedItems: [],
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
                    dataIndex: 'programtraining_code',
                    text: 'Date',
                    
                },
                {
                    dataIndex:'location',
                    text:'Attendance',
                }
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        
    }
});