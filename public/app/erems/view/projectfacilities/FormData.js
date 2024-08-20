Ext.define('Erems.view.projectfacilities.FormData', {
    alias: 'widget.projectfacilitiesformdata',
    requires: ['Erems.view.projectfacilities.GalleryGrid', 'Erems.template.ComboBoxFields'],
    extend: 'Erems.library.box.view.FormData',
    //  requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'fieldcontainer',
                    fieldDefaults: {
                        labelAlign: 'top',
                        msgTarget: 'side'
                    },
                    defaults: {
                        border: false,
                        xtype: 'panel',
                        bodyStyle: 'background:none',
                        flex: 1,
                        layout: 'anchor'
                    },
                    layout: 'hbox',
                    items: [
                        {width: 600,
                            items: [{
                                    xtype: 'hiddenfield',
                                    itemId: 'projectfacilities_id',
                                    name: 'projectfacilities_id'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    itemId: 'layer_img',
                                    name: 'layer_img'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    itemId: 'edit_image_flag',
                                    name: 'edit_image_flag'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'projectfacilities_code',
                                    name: 'code',
                                    fieldLabel: 'Code',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maskRe: /[A-Za-z0-9]/,
                                    maxLength: 5,
                                    anchor: '-5'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'projectfacilities',
                                    name: 'projectfacilities',
                                    fieldLabel: 'Facilities',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maskRe: /[A-Za-z0-9\s]/,
                                    maxLength: 50,
                                    anchor: '-5'
                                },
                                /* {
                                 xtype: 'facilitiestypecombobox',
                                 itemId: 'projectfacilities_facilitiestype',
                                 name: 'facilitiestype_id',
                                 anchor: '-5'
                                 }*/
                                {
                                    xtype: 'combobox',
                                    name: 'facilitiestype_facilitiestype_id',
                                    itemId:'facilitiestype_facilitiestype_id',
                                    displayField: cbf.facilitiestype.d,
                                    valueField: cbf.facilitiestype.v,
                                    forceSelection : true,
                                    editable:false,
                                    anchor: '-5'
                                },
                                {
                                    xtype: 'form',
                                    itemId: 'formku',
                                    bodyStyle: 'background:none;border:0',
                                    items: [{
                                            xtype: 'filefield',
                                            itemId: 'projectfacilities_layermap',
                                            name: 'projectfacilities_layermap',
                                            fieldLabel: 'Layer map images',
                                            emptyText: 'Select an image',
                                            buttonText: 'Browse'
                                        }]
                                },
                                {
                                    xtype      : 'xnotefieldEST',
                                    height     : 60,
                                    itemId     : 'description',
                                    name       : 'description',
                                    fieldLabel : 'Description',
                                    anchor     : '-5'
                                }]},
                        {items: [{
                                    xtype: 'panel',
                                    bodyStyle: 'background:none',
                                    itemId: 'projectfacilities_layermapimage',
                                    height: 200,
                                    html: 'Layer map image',
                                    anchor: '100%'
                                }]}
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 300,
                    title: 'Detail Images',
                    items: [
                        // {xtype: 'projectfacilitiesgallerygrid',itemId:'fmpfgg_grid',height:200},
                        {
                            xtype: 'gridpanel',
                            itemId: 'pfImagesGalleryGrid',
                            height: 200,
                            defaults: {
                                xtype: 'gridcolumn',
                                width: 100,
                            },
                            columns: [
                                {
                                    xtype: 'rownumberer'
                                },
                                {
                                    dataIndex: 'projectfacilities_images_id',
                                    text: 'ID'
                                },
                                {
                                    dataIndex: 'title',
                                    text: 'Image Title'
                                },
                                {
                                    dataIndex: 'image',
                                    renderer: function(val) {
                                     
                                        return '<img src="app/erems/uploads/projectfacilities/' + val + '" width="50" height="50">';
                                    },
                                    text: 'Image'
                                }, {
                                    dataIndex: 'is_default',
                                    renderer: me.renderIconDefault,
                                    text: 'Default'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 50,
                                    hidden: false,
                                    resizable: false,
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
                                }
                            ],
                        },
                        {
                            xtype: 'button',
                            align: 'right',
                            action: 'addimage',
                            text: 'Add Image'
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
    ,renderIconDefault: function(val) {
        var me = this;
        if(val == '1'){
            return '✓';
        }
        else{
            return '-';
        }
    }
});

