Ext.define('Hrd.view.group.GridBrowse', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.groupgridbrowse',
    storeConfig: {
        id: 'GroupGridBrowseStore',
        idProperty: 'group_id',
        extraParams: {
            mode_read: 'groupbrowselist'
        }
    },
    bindPrefixName: 'Group',
    newButtonLabel: 'Add',
    title: 'DATA GROUP (GOLONGAN)',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 30,
                },
                {
                    dataIndex: 'index_no',
                    text: 'Index No',
                    width: 80,
                    name: 'index_no',
                    sortable: true
                },
                {
                    dataIndex: 'code',
                    text: 'Code',
                    width: 120,
                    name: 'code',
                    sortable: true
                },
                {
                    dataIndex: 'group',
                    text: 'Name',
                    width: 250,
                    name: 'group',
                    sortable: true
                },
            ]
        });

        me.callParent(arguments);
    },

});