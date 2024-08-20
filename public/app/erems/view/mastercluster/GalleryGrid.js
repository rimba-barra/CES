Ext.define('Erems.view.mastercluster.GalleryGrid', {
    
    alias: 'widget.masterclustergallerygrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterClusterGalleryGridStore',
        idProperty: 'clusterimages_id',
        extraParams: {}
    },
    newButtonLabel: 'New Master cluster',
    height: 200,
    bindPrefixName: 'Mastercluster',
    folderImage:'', /// kosongin , tar di isi pada saat after render di controller
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
                    dataIndex: 'clusterimages_id',
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
                    renderer: me.renderIcon,
                    dataIndex: 'image',
                    hideable: false,
                    text: 'Image'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_description',
                    width: 50,
                    renderer: me.renderIconDefault,
                    dataIndex: 'is_default',
                    hideable: false,
                    text: 'Default'
                },

                // {
                   
                //     itemId: 'colpf_description',
                //     width: 50,
                //     dataIndex: 'is_default',
                //     hideable: false,
                //     text: 'Default',
                //     xtype: 'booleancolumn',
                //     resizable: false,
                //     align: 'center',
                //     falseText: ' ',
                //     trueText: '&#10003;'
                // },
                me.generateActionColumn()

            ]

        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
         
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
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
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype:'button',
                        action:'add',
                        text:'Add'
                    },
                    {
                        xtype:'button',
                        action:'gallery',
                        text:'Show Images Gallery'
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
    },
});