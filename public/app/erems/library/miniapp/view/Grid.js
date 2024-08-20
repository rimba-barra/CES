Ext.define('Erems.library.miniapp.view.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.miniappviewgrid',
    store:'Unit',
    columnLines: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
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
                dock: 'bottom',
         
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        hidden: false,
                        itemId: 'btnNews',
                        margin: '0 5 0 0',
                        padding:5,
                        iconCls: 'icon-new',
                        //bindAction: me.bindPrefixName+'SelectUnit',
                        text: 'Select Unit'
                    }

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