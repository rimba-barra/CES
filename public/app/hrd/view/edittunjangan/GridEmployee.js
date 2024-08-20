Ext.define('Hrd.view.edittunjangan.GridEmployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.edittunjanganemgrid',
    storeConfig: {
        id: 'EdittunjanganemGridStore',
        idProperty: 'edittunjangan_id',
        extraParams: {
            mode_read:'employee'
        }
    },
    bindPrefixName: 'Edittunjangan',
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
                    text: 'NIK'
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Nama Karyawan',
                    width:300
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [];
        return dockedItems;
    }
});