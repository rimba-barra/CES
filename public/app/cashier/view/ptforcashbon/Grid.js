Ext.define('Cashier.view.ptforcashbon.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.ptforcashbongrid',
    store: 'Ptforcashbon',
    bindPrefixName: 'Ptforcashbon',
    itemId: 'Ptforcashbon',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptnameowner',
                    width: 250,
                    dataIndex: 'ptnameowner',
                    hideable: false,
                    text: 'Pt Owner'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 300,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project Name Casbon'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 300,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Pt Name Casbon'
                },

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    xtype: 'button',
                    action: 'destroy',
                    disabled: false,
                    hidden: true,
                    itemId: 'btnDelete',
                    bindAction: me.bindPrefixName + 'Delete',
                    iconCls: 'icon-delete',
                    text: 'Delete Selected'
                },
            ]
        };
        return ac;
    },
});


