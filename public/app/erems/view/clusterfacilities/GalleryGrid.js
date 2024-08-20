Ext.define('Erems.view.clusterfacilities.GalleryGrid', {
    alias: 'widget.clusterfacilitiesgallerygrid',
    extend: 'Erems.library.template.view.GridFlash',
    newButtonLabel: 'New Image',
    formFile:'FormAddImage',
    storeConfig: {
        id: 'MasterClusterFacilitiesGalleryStore',
        idProperty: 'clusterfacilitiesgallery_id',
        extraParams: {
            mode_read:'imagelist'
        }
    },
    height: 200,
    bindPrefixName:'Clusterfacilities',
    folderImage:'app/erems/uploads/clusterfacilities/', /// kosongin , tar di isi pada saat after render di controller
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
                    dataIndex: 'clusterfacilities_images_id',
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_code',
                    width: 120,
                    dataIndex: 'title',
                    hideable: false,
                    text: 'Image Title'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_projectfacilities',
                    width: 120,
                    renderer: me.renderIcon,
                    dataIndex: 'image',
                    hideable: false,
                    text: 'Image'
                }, {
                    xtype: 'booleancolumn',
                    text:'Default',
                    itemId: 'colpf_description',
                    width: 50,
                    dataIndex: 'is_default',
                    hideable: false,
                    falseText: ' ',
                    // trueText: '&#10003;',
                    renderer: me.renderIconDefault,
                },
                me.generateActionColumn()

            ]

        });

        me.callParent(arguments);
    },
    renderIcon: function(val) {
        var me = this;
        if(val){
            if(val.length > 0){
                return '<img src="'+me.folderImage+''+ val + '" width="50" height="50">';
            }
        }
        return '<div style="width:50px height:50px;display:block;">&nbsp;</div>';
        
    },
    renderIconDefault: function(val) {
        var me = this;
        if(val == '1'){
            return '✓';
        }
        else{
            return '-';
        }
    },
});