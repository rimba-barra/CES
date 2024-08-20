Ext.define('Erems.view.buktipemilik.GridNjop', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.buktipemilikgridnjop',
    store: 'Buktipemiliknjop',
    bindPrefixName: 'Buktipemiliknjop',
    height: 150,
	id: 'buktipemiliknjopgrid',
    initComponent: function() {
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
                    xtype: 'rownumberer',
                    width: 40,
					resizable: true
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahun',
                    width: 75,
                    dataIndex: 'tahun',
                    text: 'Tahun',
                    renderer: Ext.util.Format.dateRenderer('Y')
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_njop',
                    width: 125,
                    dataIndex: 'njop',
                    text: 'NJOP'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby_name',
                    width: 150,
                    dataIndex: 'addby_name',
                    text: 'Addby'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 100,
                    dataIndex: 'addon',
                    text: 'Addon',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'modiby_name',
                    width: 150,
                    dataIndex: 'modiby_name',
                    text: 'Modiby'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    width: 100,
                    dataIndex: 'modion',
                    text: 'modion',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
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
                        action: 'create',
                        // hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName+'Create',
                        text: 'Add New NJOP'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        // hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName+'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        // hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName+'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'view',
                        hidden: false,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'View',
                        disabled: true
                    },
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
    },
    generateActionColumn: function() {
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
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    //bindAction: me.bindPrefixName+'Update',
                    altText: 'View',
                    tooltip: 'View'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    }

});