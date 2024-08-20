Ext.define('Erems.view.pengumpulanberkas.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.pengumpulanberkasformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
//    width: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_berkas_surat_id',
                    name: 'berkas_surat_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
		{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_unit_id',
                    name: 'unit_id'
                },
		
                {xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
                    items: [
				{
                                    layout: 'hbox',
                                    padding: '10px 0 0 0',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [
                                            {
                                                xtype: 'panel', flex: 8,
                                                layout: {
                                                    type: 'vbox',
                                                    defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                                },
                                                bodyStyle: 'border:0px',
                                                items: [
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Kawasan / Cluster',
                                                                        anchor: '-5',
                                                                        name: 'code',
                                                                        flex: 5,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    }, {
                                                                        xtype: 'splitter', width: 5,
                                                                    },
                                                                    {
                                                                        xtype: 'clustercombobox',
                                                                        itemId: 'fd_clustercb',
                                                                        fieldLabel: '',
                                                                        anchor: '-5',
                                                                        name: 'unit_cluster_id',
                                                                        flex: 6,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    }
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Block name',
                                                                        anchor: '-5',
                                                                        name: 'block_code',
                                                                        flex: 5,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    }, {
                                                                        xtype: 'splitter', width: 5,
                                                                    }, {
                                                                        xtype: 'blockcombobox',
                                                                        itemId: 'fd_blockcb',
                                                                        fieldLabel: '',
                                                                        anchor: '-5',
                                                                        name: 'unit_block_id',
                                                                        flex: 6,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    }]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'PT',
                                                                        anchor: '-5',
                                                                        name: 'unit_pt_name',
                                                                        flex: 1,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    }]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'combobox',
                                                                        fieldLabel: 'Kavling / Unit No. ',
                                                                        anchor: '-5',
                                                                        name: 'unit_unit_number',
                                                                        flex: 6,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    }, {
                                                                        xtype: 'splitter', width: 5,
                                                                    }, {
                                                                        xtype: 'button',
                                                                        text: 'Browse Unit',
                                                                        itemId: 'fd_browse_unit_btn',
                                                                        padding: '2px 5px',
                                                                        action: 'browse_unit',
                                                                        iconCls: 'icon-search',
                                                                        style: 'background-color:#FFC000;'
                                                                    },
                                                                    {xtype: 'label', text: '', flex: 2}]
                                                        }
                                                ]
                                            },
                                            {xtype: 'splitter', width: 30},
                                            {
                                                xtype: 'panel', flex: 7,
                                                layout: {
                                                    type: 'vbox',
                                                    defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                                },
                                                bodyStyle: 'border:0px',
                                                items: [
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Product Category',
                                                                        anchor: '-5',
                                                                        name: 'unit_productcategory',
                                                                        flex: 1,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    }]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Type',
                                                                        anchor: '-5',
                                                                        name: 'unit_type_name',
                                                                        flex: 1,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    }]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Land Size',
                                                                        anchor: '-5',
                                                                        name: 'unit_land_size',
                                                                        flex: 12,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    },
                                                                    {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                                    {xtype: 'splitter', width: 30}, 
                                                                    {
                                                                            xtype: 'textfield',
                                                                            fieldLabel: 'Long',
                                                                            anchor: '-5',
                                                                            name: 'unit_long',
                                                                            flex: 6,
                                                                            readOnly: true,
                                                                            labelWidth: 30,
                                                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    },
                                                                    {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Building Size',
                                                                        anchor: '-5',
                                                                        name: 'unit_building_size',
                                                                        flex: 12,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    },
                                                                    {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                                    {xtype: 'splitter', width: 30}, 
                                                                    {
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Width',
                                                                        anchor: '-5',
                                                                        name: 'unit_width',
                                                                        flex: 6,
                                                                        labelWidth: 30,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    },
                                                                    {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            bodyStyle: 'border:0px',
                                                            width: '100%',
                                                            items: [{
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Kelebihan Tanah',
                                                                        anchor: '-5',
                                                                        name: 'unit_kelebihan',
                                                                        flex: 12,
                                                                        readOnly: true,
                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    },
                                                                    {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                                    {xtype: 'splitter', width: 30}, 
                                                                    {
                                                                        xtype: 'textfield',
                                                                        fieldLabel: 'Floor',
                                                                        anchor: '-5',
                                                                        name: 'unit_floor',
                                                                        flex: 6,
                                                                        labelWidth: 30,
                                                                        readOnly: true,

                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                    },
                                                                    {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
                                                            ]
                                                        }
                                                ]
                                            }
                                    ]
                                }

                    ]
                },
                /* PURCHASE LETTER INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'border:0px',
                                items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            flex: 3,
                                            bodyStyle: 'border:0px',
                                            items: [
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Purchase Letter No.',
                                                                    anchor: '-5',
                                                                    name: 'purchaseletter_no',
                                                                    flex: 1,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                }, 
                                                                {xtype: 'splitter', width: 20}, 
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Purchase Letter Date',
                                                                    anchor: '-5',
                                                                    name: 'purchase_date',
                                                                    flex: 1,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                }]
                                                    },
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Customer Name',
                                                                    anchor: '-5',
                                                                    name: 'customer_name',
                                                                    flex: 1,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                },
                                                                {xtype: 'splitter', width: 20}, 
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Akad Date',
                                                                    anchor: '-5',
                                                                    name: 'akad_date',
                                                                    flex: 1,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                                }]
                                                    },
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'KTP Number',
                                                                    anchor: '-5',
                                                                    name: 'customer_ktp',
                                                                    flex: 1,
                                                                    
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                }]
                                                    },
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'maskfield',
                                                                    mask: '##.###.###.#-###.###',
                                                                    fieldLabel: 'NPWP',
                                                                    anchor: '-5',
                                                                    name: 'customer_npwp',
                                                                    flex: 1,
                                                                    
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                }]
                                                    },
                                                    {
                                                        padding   : '10px 0 0 0',
                                                        layout    : 'hbox',
                                                        bodyStyle : 'border:0px',
                                                        items     : [
                                                            {
                                                                xtype      : 'xaddressfieldEST',
                                                                fieldLabel : 'Address',
                                                                anchor     : '-5',
                                                                name       : 'customer_address',
                                                                flex       : 1,
                                                                readOnly   : true,
                                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'City',
                                                                    anchor: '-5',
                                                                    name: 'customer_city',
                                                                    flex: 1,
                                                                    
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                },
                                                                {xtype: 'splitter', width: 20},
                                                                {
                                                                    xtype      : 'xphonenumberfieldEST',
                                                                    fieldLabel : 'Phone',
                                                                    anchor     : '-5',
                                                                    name       : 'customer_homephone',
                                                                    flex       : 1,
                                                                    readOnly   : true,
                                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                                }]
                                                    },
                                                    
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Email',
                                                                    anchor: '-5',
                                                                    name: 'customer_email',
                                                                    flex: 1,
                                                                    
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                },
                                                                {xtype: 'splitter', width: 20},
                                                                {
                                                                    xtype      : 'xphonenumberfieldEST',
                                                                    fieldLabel : 'Mobile Phone',
                                                                    anchor     : '-5',
                                                                    name       : 'customer_mobilephone',
                                                                    flex       : 1,
                                                                    readOnly   : true,
                                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                                }]
                                                    },
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype      : 'xphonenumberfieldEST',
                                                                    fieldLabel : 'Office Phone',
                                                                    anchor     : '-5',
                                                                    name       : 'customer_officephone',
                                                                    flex       : 1,
                                                                    readOnly   : true,
                                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                                }, 
                                                                {xtype: 'splitter', width: 20}, 
                                                                {
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Salesman',
                                                                    anchor: '-5',
                                                                    name: 'salesman_name',
                                                                    flex: 1,
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                }]
                                                    },
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Pricetype',
                                                                    anchor: '-5',
                                                                    name: 'pricetype',
                                                                    flex: 1,
                                                                    
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                },
                                                                {xtype: 'splitter', width: 20},
                                                                {
                                                                    xtype: 'numberfield',
                                                                    fieldLabel: 'Harga Total Jual',
                                                                    anchor: '-5',
                                                                    name: 'harga_total_jual',
                                                                    flex: 1,
                                                                    
                                                                    readOnly: true,
                                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                }]
                                                    },
                                            ]
                                        },
                                ]
                            }
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'SURAT HIMBAUAN PENGUMPULAN BERKAS', collapsible: true,
                    width: '100%',
                    items: [
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                bodyStyle: 'border:0px',
                                items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            flex: 3,
                                            bodyStyle: 'border:0px',
                                            items: [
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Nomor Surat',
                                                                    anchor: '-5',
                                                                    name: 'berkas_no',
                                                                    flex: 1,
                                                                    allowBlank: false,
                                                                }, 
                                                                {xtype: 'splitter', width: 20}, 
                                                                {
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Pembuatan',
                                                                    anchor: '-5',
                                                                    name: 'berkas_date',
                                                                    flex: 1,
                                                                    value: new Date(),
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                                    allowBlank: false,
                                                                }]
                                                    },
                                                    {
                                                        //  bodyPadding: 10,
                                                        padding: '10px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Jatuh Tempo Pengumpulan Berkas',
                                                                    anchor: '-5',
                                                                    name: 'berkas_jatuhtempo_date',
                                                                    flex: 1,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                                    allowBlank: false,
                                                                }]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        padding: '10px 0 0 0',
                                                        bodyStyle: 'border:0px',
                                                        items: [
                                                                    {
                                                                        xtype: 'pengumpulanberkasgriddetail',
                                                                        width: '100%',
//                                                                        itemId: 'M_formundanganajbgriddetail'
                                                                    }
                                                        ]
                                                    },
//                                                    {
//                                                        layout: 'hbox',
//                                                        padding: '10px 0 0 0',
//                                                        bodyStyle: 'border:0px',
//                                                        items: [
//                                                                    {
//                                                                        xtype: 'button',
//                                                                        text: 'Add New',
//                                                                        itemId: 'fd_new_btn',
//                                                                        padding: '2px 5px',
//                                                                        action: 'add_new',
//                                                                        style: 'background-color:#FFC000;'
//                                                                    },
//                                                                    {xtype: 'splitter', width: 20}, 
//                                                                    {
//                                                                        xtype: 'button',
//                                                                        text: 'Generate Berkas',
//                                                                        itemId: 'fd_generate_btn',
//                                                                        padding: '2px 5px',
//                                                                        action: 'generate',
//                                                                        style: 'background-color:#FFC000;'
//                                                                    },
//                                                        ]
//                                                    },
                                                    


                                            ]
                                        },
                                ]
                            }
                    ]
                },
				
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    
});

