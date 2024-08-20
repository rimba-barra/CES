Ext.define('Master.library.template.component.GalleryGrid', {
    extend: 'Master.library.template.view.Grid',
    newButtonLabel: 'New Project Facilities',
    requires:['Master.library.Config'],
    height: 200,
    folderImage:'',
    config:null,
    initComponent: function() {
        var me = this;
        me.config = new Master.library.Config();
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
                    renderer: me.renderIcon,
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
    },
    renderIcon: function(val) {
        return '<img src="'+this.config.getImageFolder(this.controllerName)+''+ val + '" width="50" height="50">';
    },
    generateContextMenu: function() {
        var contextmenu = [
            {
                text: 'Edit',
                itemId: 'mnuEditGallery',
                iconCls: 'icon-edit',
                action: 'update'
            },
            {
                text: 'Delete',
                itemId: 'mnuDeleteGallery',
                iconCls: 'icon-delete',
                action: 'destroy'
            }
        ];
        return contextmenu;
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                ui: 'footer',
                layout: {
                    type: 'hbox',
                    pack: 'end'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'gallery_show',
                        hidden: false,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        text: 'SHOW IMAGES GALLERY'
                    },
                    {
                        xtype: 'button',
                        action: 'gallery_add',
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        text: 'ADD NEW IMAGE'
                    }

                ]
            }

        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: 'icon-edit',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'icon-delete',
                    altText: 'Delete',
                    tooltip: 'Delete',
                    
                }
                //ux-actioncolumn icon-delete act-destroy
            ],
            afterRender: function(el) {
                var me = this;
             
                var actitem = this.items;
               
                Ext.each(actitem, function(item, index) {
                    item.getClass = function() {
                        return 'ux-actioncolumn ' + item.defaultIcon + ' act-' + item.action;
                        if (me.rights[item.action]) {
                            return 'ux-actioncolumn ' + item.defaultIcon + ' act-' + item.action;
                        } else {
                            return 'x-hide-display';
                        }
                    };

                });

            }
        };
        return ac;
    }
});