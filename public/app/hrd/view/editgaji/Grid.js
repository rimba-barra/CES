Ext.define('Hrd.view.editgaji.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.editgajigrid',
    storeConfig: {
        id: 'EditgajiGridStore',
        idProperty: 'editgaji_id',
        extraParams: {}
    },
    bindPrefixName: 'Editgaji',
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
                    dataIndex: 'employee_employee_nik',
                    text: 'NIK'
                },
                {
                    dataIndex: 'employee_employee_name',
                    text: 'Nama',
                    width:200
                },
                {
                    
                    dataIndex: 'gaji',
                    xtype:'numbercolumn',
                    text: 'Gaji Pokok'
                },
                {
                    
                    dataIndex: 'gaji_baru',
                    xtype:'numbercolumn',
                    text: 'Gaji Pokok Baru'
                },
                {
                    
                    dataIndex: 'description',
                    text: 'Keterangan'
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
        ];
        return dockedItems;
    }
});