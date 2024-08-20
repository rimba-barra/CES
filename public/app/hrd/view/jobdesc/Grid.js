Ext.define('Hrd.view.jobdesc.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.jobdescgrid',
    storeConfig: {
        id: 'JobdescGridStore',
        idProperty: 'jobdesc_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Jobdesc',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'


            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'position_position',
                   text: 'Jabatan',
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
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [


                ]
            },
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