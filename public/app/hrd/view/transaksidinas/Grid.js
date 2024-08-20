Ext.define('Hrd.view.transaksidinas.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transaksidinasgrid',
    storeConfig: {
        id: 'TransaksidinasGridStore',
        idProperty: 'transaksidinas_id',
        extraParams: {}
    },
    bindPrefixName: 'Transaksidinas',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
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
                    dataIndex: 'employee_nik',
                    text: 'N.I.K',
                    width:70
                },
                {
                    dataIndex:'employee_name',
                    text:'Employee Name',
                    width:230
                }
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});