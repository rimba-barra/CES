Ext.define('Hrd.view.mastersk.GridApply', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.masterskgridapply',
    storeConfig: {
        id: 'MasterskGridApplyStore',
        idProperty: 'mastersk_id',
        extraParams: {
            mode_read: 'masterskapplylist'
        }
    },
    bindPrefixName: 'Mastersk',
    newButtonLabel: 'Add',
    title: 'DATA mastersk (GOLONGAN)',
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
                    dataIndex: 'name',
                    text: 'Document Name',
                    width: 250,
                    name: 'name',
                    sortable: true
                },
                {
                    dataIndex: 'nomor',
                    text: 'Number',
                    width: 120,
                    name: 'nomor',
                    sortable: true
                },
            ]
        });

        me.callParent(arguments);
    },

});