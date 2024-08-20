Ext.define('Erems.view.projectfacilities.GalleryGrid', {
    alias: 'widget.projectfacilitiesgallerygrid',
    extend: 'Erems.library.box.view.Grid',
    storeConfig: {
        id: 'ProjectfacilitiesgalleryGridStore',
        idProperty: 'projectfacilities_id',
        extraParams: {}
    },
    bindPrefixName: 'Projectfacilities',
    newButtonLabel: 'New Gallery',
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
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'projectfacilities_images_id',
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_code',
                    width: 200,
                    dataIndex: 'title',
                    hideable: false,
                    text: 'Image Title'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_projectfacilities',
                    width: 200,
                 //   renderer: me.renderIcon,
                    dataIndex: 'image',
                    hideable: false,
                    text: 'Image'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_description',
                    width: 50,
                    dataIndex: 'is_default',
                    hideable: false,
                    text: 'Default'
                },
                me.generateActionColumn()

            ]

        });

        me.callParent(arguments);
    }
});