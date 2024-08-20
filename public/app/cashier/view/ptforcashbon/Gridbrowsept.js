Ext.define('Cashier.view.ptforcashbon.Gridbrowsept', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.ptforcashbonbrowseptgrid',
    store: 'Pt',
    bindPrefixName: 'Tbank',
    itemId: 'Ptforcashbongridbrowsept',
    title: 'Browse Company',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 50,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 250,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Company'
                },
            ]
        });

        me.callParent(arguments);
    },
     generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            
            
        ];
        return dockedItems;
    },

});


