Ext.define('Erems.view.clusterfacilities.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.clusterfacilitiesformdata',
    requires: ['Erems.view.clusterfacilities.GalleryGrid',
        //  'Erems.library.template.component.Clustercombobox',
        //'Erems.library.template.component.Facilitiestypecombobox'
        'Erems.template.ComboBoxFields'
    ],
    frame: true,
    height: 500,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
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
                                    itemId: 'clusterfacilities_id',
                                    name: 'clusterfacilities_id'
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
                                    itemId: 'clusterfacilities_code',
                                    name: 'code',
                                    fieldLabel: 'Code',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maskRe: /[A-Za-z0-9\s\.\/\-]/,
                                    maxLength: 5,
                                    anchor: '-5'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'clusterfacilities',
                                    name: 'clusterfacilities',
                                    fieldLabel: 'Facilities Name',
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maskRe: /[A-Za-z0-9\s\.\/\-]/,
                                    maxLength: 50,
                                    anchor: '-5'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Cluster',
                                    displayField: cbf.cluster.d,
                                    valueField: cbf.cluster.v,
                                    name: 'cluster_cluster_id',
                                    typeAhead: true,    
                                    queryMode: 'local',
                                    lastQuery: '',
                                    anchor: '-5'
                                },
                                {
                                    // xtype: 'facilitiestypecombobox',
                                    xtype: 'combobox',
                                    fieldLabel: 'Facilities Type',
                                    displayField: cbf.facilitiestype.d,
                                    valueField: cbf.facilitiestype.v,
                                    itemId: 'clusterfacilities_facilitiestype',
                                    name: 'facilitiestype_facilitiestype_id',
                                    typeAhead: true,    
                                    queryMode: 'local',
                                    lastQuery: '',
                                    anchor: '-5'
                                }, {
                                    xtype: 'form',
                                    itemId: 'formku',
                                    bodyStyle: 'background:none;border:0',
                                    items: [{
                                            xtype: 'filefield',
                                            itemId: 'clusterfacilities_layermap',
                                            name: 'clusterfacilities_layermap',
                                            fieldLabel: 'Layer map images',
                                            emptyText: 'Select an image',
                                            buttonText: 'Browse'


                                        }]


                                }, {
                                    xtype      : 'xnotefieldEST',
                                    height     : 60,
                                    itemId     : 'description',
                                    name       : 'description',
                                    fieldLabel : 'Description',
                                    anchor     : '-5'
                                }


                            ]},
                        {items: [{
                                    xtype: 'panel',
                                    bodyStyle: 'background:none',
                                    itemId: 'clusterfacilities_layermapimage',
                                    height: 200,
                                    html: '',
                                    anchor: '100%'
                                }]}
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 250,
                    title: 'Detail Images',
                    items: [
                        {xtype: 'clusterfacilitiesgallerygrid', itemId: 'galleryimageclusterfacilities_grid'}
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

