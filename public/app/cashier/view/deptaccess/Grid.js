Ext.define('Cashier.view.deptaccess.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.deptaccessgrid',
    store: 'Department',
    bindPrefixName: 'Deptaccess',
    itemId: 'Deptaccess',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },           
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Department ID',
                    dataIndex: 'department_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 200,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department',
                    renderer: function(value, meta, rec) {
                        return rec.data.code + ' - ' + rec.data.department;
                    }
                },
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
    },
});


