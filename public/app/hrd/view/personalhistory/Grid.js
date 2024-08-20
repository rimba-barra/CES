Ext.define('Hrd.view.personalhistory.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistorygrid',
    storeConfig: {
        id: 'PersonalhistoryGridStore',
        idProperty: 'personalhistory_id',
        extraParams: {}
    },
    bindPrefixName: 'Personalhistory',
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
                    width:100
                },
                {
                    dataIndex:'employee_name',
                    text:'Employee Name',
                    width:200
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