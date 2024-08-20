Ext.define('Erems.view.hgbsplit.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.hgbsplitformdata',
    requires: [
        
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        function dateOneYear() {
            var x = 12;
            var CurrentDate = new Date();
            CurrentDate.setMonth(CurrentDate.getMonth() + x);
            return CurrentDate;
        }

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'hgbajb_id',
                    name: 'hgbajb_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'buktipemilik_id',
                    name: 'buktipemilik_id'
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
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_customer_id',
                    name: 'customer_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'hgbinduk_id',
                    name: 'hgbinduk_id'
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
                                                    fieldLabel: 'PT Name',
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
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
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
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
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
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'label',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: ' ', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                /* HGB INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'HGB INFORMATION', collapsible: true,
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
                                                    xtype: 'combobox',
                                                    fieldLabel: 'HGB / HPL Induk Code',
                                                    anchor: '-5',
                                                    name: 'hgbinduk_code',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                    forceSelection:true,
                                                    listeners:{
                                                        beforequery: function(record){
                                                            record.query = new RegExp(record.query, 'i');
                                                            record.forceAll = true;
                                                        }
                                                    }
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'button',
                                                    text: 'Select HGB',
                                                    itemId: 'fd_browse_unit_btn',
                                                    padding: '2px 5px',
                                                    action: 'browse_hgbinduk',
                                                    iconCls: 'icon-search',
                                                    style: 'background-color:#FFC000;'
                                                },
                                                {xtype: 'label', text: '', flex: 2}]
                                        },
										{
											layout: 'hbox',
											bodyStyle: 'border:0px',
											width: '100%',
											items: [{
													xtype: 'textfield',
													fieldLabel: 'HGB / HPL Induk No.',
													anchor: '-5',
													name: 'hgbinduk_hgbinduk',
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
													fieldLabel: 'GS / SU Number',
													anchor: '-5',
													name: 'hgbinduk_gs',
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
													fieldLabel: 'Location',
													anchor: '-5',
													name: 'hgbinduk_desa',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}]
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
                                                    xtype: 'datefield',
                                                    fieldLabel: 'HGB / HPL Induk Date',
                                                    anchor: '-5',
                                                    name: 'hgbinduk_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'GS / SU Date',
                                                    anchor: '-5',
                                                    name: 'hgbinduk_gs_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'Luas',
                                                    anchor     : '-5',
                                                    name       : 'hgbinduk_luas',
                                                    flex       : 12,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'}]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
               /* HGB ATAS NAMA CUSTOMER */
               	{xtype: 'panel', bodyPadding: 10, title: 'HGB ATAS NAMA CUSTOMER', collapsible: true,
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
                                                    fieldLabel: 'No. Registrasi Balik Nama/ No Splitz', //HGB Number
                                                    anchor: '-5',
                                                    name: 'hgb_number',
                                                    flex: 1,
                                                    //allowBlank: false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Registrasi Balik Nama', //HGB Date
                                                    anchor: '-5',
                                                    name: 'hgb_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'No. GS / SU',
                                                    anchor     : '-5',
                                                    name       : 'hgb_gsgu_no',
                                                    flex       : 1,
                                                    maxLength  : 50
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'GS / SU Date',
                                                    anchor: '-5',
                                                    name: 'hgb_gsgu_date',
                                                    flex: 1,
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'Wide Area',
                                                    anchor     : '-5',
                                                    name       : 'hgb_gsgu_luas',
                                                }, 
												{xtype: 'splitter', width: 5}, 
												{xtype: 'label', text: 'm2'},
												{xtype: 'splitter', width: 100},
												{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'HGB Land Date',
                                                    anchor: '-5',
                                                    name: 'hgb_gsgu_land_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Send to Construction',
                                                    anchor: '-5',
                                                    name: 'hgb_tocontractor_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Send to Customer/Notaris', //Send to Customer
                                                    anchor: '-5',
                                                    name: 'hgb_tocustomer_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. ST SHGB Perijinan - Legal',
                                                    anchor: '-5',
                                                    name: 'hgb_perijinan_tolegal_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. ST SHGB Legal - Perijinan',
                                                    anchor: '-5',
                                                    name: 'hgb_legal_toperijinan_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. ST SHM Perijinan - Legal',
                                                    anchor: '-5',
                                                    name: 'hgb_shm_perijinan_tolegal_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. ST HGB/HM Notaris Ke Bank',
                                                    anchor: '-5',
                                                    name: 'hgb_notaris_tobank_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Target HGB',
                                                    anchor: '-5',
                                                    name: 'hgb_target_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'HM Number',
                                                    anchor: '-5',
                                                    name: 'hgb_hm_no',
                                                    flex: 1,
                                                    maskRe:/[A-Za-z0-9]/,
                                                    enforceMaxLength:true,
                                                    maxLength:50
                                                    //allowBlank: false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Kirim HM ke Bank/Cust/Notaris',
                                                    anchor: '-5',
                                                    name: 'hgb_hm_tocustomer_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'NOP',
                                                    anchor: '-5',
                                                    name: 'hgb_nop',
                                                    flex: 1,
                                                    maskRe:/[A-Za-z0-9]/,
                                                    enforceMaxLength:true,
                                                    maxLength:50
                                                    //allowBlank: false
                                                }]
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
				/* AJB INFORMATION */
               	{xtype: 'panel', bodyPadding: 10, title: 'AJB INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            flex: 3,
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: 'IS IJB',
                                    itemId: 'is_ijb',											
                                    name: 'is_ijb',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                }
                            ],
                        },
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
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'AJB Number',
                                                    anchor: '-5',
                                                    name: 'ajb_number',
                                                    flex: 1,
                                                    maskRe:/[A-Za-z0-9]/,
                                                    enforceMaxLength:true,
                                                    maxLength:50
                                                    //allowBlank: false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'AJB Date',
                                                    anchor: '-5',
                                                    name: 'ajb_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{

                                                    xtype: 'textfield',
                                                    fieldLabel: 'AJB Name',
                                                    anchor: '-5',
                                                    name: 'ajb_name',
                                                    flex: 1,
                                                    //allowBlank: false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'AJB Sign Date',
                                                    anchor: '-5',
                                                    name: 'ajb_sign_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'notariscombobox',
                                                    fieldLabel: 'Notaris / PPAT',
                                                    anchor: '-5',
													itemId: 'fd_hgbajb_notaris_id',
                                                    name: 'notaris_id',
                                                    forceSelection:true,
                                                    flex: 1,
                                                    listeners:{
                                                        beforequery: function(record){
                                                            record.query = new RegExp(record.query, 'i');
                                                            record.forceAll = true;
                                                        }
                                                    }
                                                    //allowBlank: false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Notaris Payment Date',
                                                    anchor: '-5',
                                                    name: 'ajb_notaris_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											//width: '65%',
                                            items: [{
                                                    xtype: 'checkboxfield',
													fieldLabel: 'Status Balik Nama',
													itemId: 'ajb_is_status_balik_nama',											
													name: 'ajb_is_status_balik_nama',
													inputValue: '1',
													uncheckedValue: '0',
													/*listeners: {
														change: function() {
															var txt = me.down('[name=ajb_balik_nama_date]');
															if(this.checked){
																txt.allowBlank = false;
															} else {
																txt.allowBlank = true;
															}
														}
													}*/
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Balik Nama',
                                                    anchor: '-5',
                                                    name: 'ajb_balik_nama_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'S.K.M.H.T Date',
                                                    anchor: '-5',
                                                    name: 'ajb_skmht_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'A.P.H.T Date',
                                                    anchor: '-5',
                                                    name: 'ajb_apht_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Send to Construction',
                                                    anchor: '-5',
                                                    name: 'ajb_tocontractor_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Kirim AJB ke Customer/Bank',
                                                    anchor: '-5',
                                                    name: 'ajb_tocustomer_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Serah Terima AJB Legal - Notaris',
													labelWidth: 230,
													anchor: '-5',
                                                    name: 'ajb_legal_tonotaris_date',
                                                    flex: 1,
													//editable: false,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                   	xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Terima AJB Notaris - Legal',
													labelWidth: 230,
                                                    anchor: '-5',
                                                    name: 'ajb_notaris_tolegal_date',
                                                    flex: 1,
													//editable: false,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. ST AJB Legal - Perijinan',
													labelWidth: 230,
                                                    anchor: '-5',
                                                    name: 'ajb_legal_toperijinan_date',
                                                    flex: 1,
													//editable: false,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
					{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tgl. Kelengkapan Berkas AJB',
                                                    labelWidth: 230,
                                                    anchor: '-5',
                                                    name: 'kelengkapan_berkas_ajb_date',
                                                    flex: 1,
                                                    //editable: false,
                                                    //allowBlank: false,
                                                    //value: new Date(),
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            bodyPadding: 10, 
                                            width: '100%',
                                            title: 'Additional Info SH-1',
                                            items: [
                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'No Akta',
                                                                    name: 'akta_no_sh1',
                                                                    flex: 1,
                                                                    maskRe:/[A-Za-z0-9]/,
                                                                    enforceMaxLength:true,
                                                                    maxLength:50
                                                                }]
                                                    },
                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Akta',
                                                                    name: 'akta_date_sh1',
                                                                    flex: 1,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                                    editable:false
                                                                }]
                                                    },
                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'notariscombobox',
                                                                    fieldLabel: 'Notaris',
                                                                    anchor: '-5',
                                                                    itemId: 'fd_hgbajb_notaris_id',
                                                                    name: 'notaris_id_sh1',
                                                                    flex: 1,
                                                                    forceSelection:true,
                                                                    listeners:{
                                                                        beforequery: function(record){
                                                                            record.query = new RegExp(record.query, 'i');
                                                                            record.forceAll = true;
                                                                        }
                                                                    }
                                                                    //allowBlank: false
                                                                }]
                                                    }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
            /* HPL INFORMATION */
                {
                    xtype: 'panel', bodyPadding: 10, title: 'HPL INFORMATION', collapsible: true,
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
                                                                                fieldLabel: 'No. GS/NIB',
                                                                                anchor: '-5',
                                                                                name: 'hpl_no_gs',
                                                                                flex: 1,
                                                                                maskRe:/[A-Za-z0-9]/,
                                                                                enforceMaxLength:true,
                                                                                maxLength:50
                                                                                //allowBlank: false
                                                                                
                                                                            }, {
                                                                                xtype: 'splitter', width: 20,
                                                                            }, {
                                                                                xtype: 'datefield',
                                                                                fieldLabel: 'Tgl. Terbit HPL',
                                                                                anchor: '-5',
                                                                                name: 'hpl_date',
                                                                                flex: 1,
                                                                                //allowBlank: false,
//                                                                                value: new Date(),
                                                                                format: 'd-m-Y',
                                                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                                submitFormat: 'Y-m-d H:i:s.u',
                                                                                editable:false
                                                                            }]
                                                                },
                                                                {
                                                                    //  bodyPadding: 10,
                                                                    padding: '10px 0 0 0',
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'border:0px',
                                                                    items: [{

                                                                                xtype: 'textfield',
                                                                                fieldLabel: 'Luas HPL',
                                                                                anchor: '-5',
                                                                                name: 'hpl_luas',
                                                                                flex: 1,
                                                                                maskRe: /[0-9\.]/
                                                                                //allowBlank: false
                                                                            }, {
                                                                                xtype: 'splitter', width: 20,
                                                                            }, {
                                                                                xtype: 'datefield',
                                                                                fieldLabel: 'Tgl Terima HPL',
                                                                                anchor: '-5',
                                                                                name: 'hpl_terima_date',
                                                                                flex: 1,
                                                                                //allowBlank: false,
//                                                                                value: new Date(),
                                                                                format: 'd-m-Y',
                                                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                                submitFormat: 'Y-m-d H:i:s.u',
                                                                                editable:false
                                                                            }]
                                                                },
                                                                {
                                                                    //  bodyPadding: 10,
                                                                    padding: '10px 0 0 0',
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'border:0px',
                                                                    items: [{

                                                                                xtype: 'textfield',
                                                                                fieldLabel: 'No SKPT HPL',
                                                                                anchor: '-5',
                                                                                name: 'hpl_skpt_no',
                                                                                flex: 1,
                                                                                maskRe:/[A-Za-z0-9]/,
                                                                                enforceMaxLength:true,
                                                                                maxLength:50
                                                                                //allowBlank: false
                                                                            }, {
                                                                                xtype: 'splitter', width: 20,
                                                                            }, {
                                                                                xtype: 'datefield',
                                                                                fieldLabel: 'Tgl. Keluar HPL',
                                                                                anchor: '-5',
                                                                                name: 'hpl_keluar_date',
                                                                                flex: 1,
                                                                                //allowBlank: false,
//                                                                                value: new Date(),
                                                                                format: 'd-m-Y',
                                                                                altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                                submitFormat: 'Y-m-d H:i:s.u',
                                                                                editable:false
                                                                            }]
                                                                },
                                                                {
                                                                    padding   : '10px 0 0 0',
                                                                    layout    : 'hbox',
                                                                    bodyStyle : 'border:0px',
                                                                    items     : [
                                                                        {

                                                                            xtype      : 'xgeneralfieldEST',
                                                                            fieldLabel : 'Kelurahan HPL',
                                                                            anchor     : '-5',
                                                                            name       : 'hpl_kelurahan',
                                                                            flex       : 1,
                                                                            maxLength  : 50
                                                                        }, 
                                                                        {
                                                                            xtype: 'splitter', width: 20,
                                                                        }, 
                                                                        {
                                                                            xtype        : 'datefield',
                                                                            fieldLabel   : 'Tgl. Akhir HPL',
                                                                            anchor       : '-5',
                                                                            name         : 'hpl_akhir_date',
                                                                            flex         : 1,
                                                                            format       : 'd-m-Y',
                                                                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                            submitFormat : 'Y-m-d H:i:s.u',
                                                                            editable     :false
                                                                        }
                                                                    ]
                                                                },
                                                                
                                    ]
                                }
                            ]
                        }
                    ]
                },
                                        
				/* HGB ATAS NAMA PT */
               	{xtype: 'panel', bodyPadding: 10, title: 'HGB ATAS NAMA PT', collapsible: true,
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
                                                    xtype: 'projectptcombobox',
                                                    fieldLabel: 'PT Name',
                                                    anchor: '-5',
													itemId: 'fd_hgbajb_pt_id',
                                                    name: 'pt_id',
                                                    flex: 1,
                                                    queryMode:'local',
                                                    typeAhead:true,
                                                    lastQuery:'',
                                                    forceSelection:true,
                                                    listeners:{
                                                        beforequery: function(record){
                                                            record.query = new RegExp(record.query, 'i');
                                                            record.forceAll = true;
                                                        },
                                                        blur:function(el){
                                                            if(el.value == '' ||el.value == null){
                                                                el.setValue('');
                                                                Ext.Msg.show({
                                                                    title: 'Failure',
                                                                    msg: 'PT Name yang dicari tidak ada.',
                                                                    icon: Ext.Msg.ERROR,
                                                                    buttons: Ext.Msg.OK
                                                                });
                                                            }
                                                        }
                                                    }
                                                    //allowBlank: false
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PT HGB Number',
                                                    anchor: '-5',
                                                    name: 'pt_hgb_no',
                                                    flex: 1,
                                                   // maskRe:/[A-Za-z0-9\s\-]/,
                                                    enforceMaxLength:true,
                                                    maxLength:50
                                                    //allowBlank: false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'PT HGB Date',
                                                    anchor: '-5',
                                                    name: 'pt_hgb_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'GS / SU Number',
                                                    anchor: '-5',
                                                    name: 'pt_gsgu_no',
                                                    flex: 1,
                                                    maskRe:/[A-Za-z0-9]/,
                                                    enforceMaxLength:true,
                                                    maxLength:50
                                                    //allowBlank: false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'GS / SU Date',
                                                    anchor: '-5',
                                                    name: 'pt_gsgu_date',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    //value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
                                                    editable:false
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'Wide Area',
                                                    anchor     : '-5',
                                                    name       : 'pt_luas',
                                                }, 
                                                {xtype: 'splitter', width: 5}, 
                                                {xtype: 'label', text: 'm2'}
                                            ]
                                        },
                                        {
                                                xtype: 'splitter', height: 20,
                                        },
                                        {
                                                xtype      : 'xnotefieldEST',
                                                anchor     : '100%',
                                                fieldLabel : 'Note',
                                                labelAlign : 'top',
                                                name       : 'note',
                                                width      : '100%'
                                        },
                                        {
                                            xtype: 'fieldset',
                                            bodyPadding: 10, 
                                            width: '100%',
                                            title: 'Additional Info Surabaya',
                                            items: [

                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Terbit',
                                                                    name: 'tgl_terbit_pt',
                                                                    flex: 1,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                                    hidden: true,
                                                                    editable:false
                                                                }]
                                                    },
                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Berakhir',
                                                                    name: 'tgl_berakhir_pt',
                                                                    flex: 1,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                                    editable:false
                                                                }]
                                                    },
                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Terima',
                                                                    name: 'tgl_terima_pt',
                                                                    flex: 1,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                                    editable:false
                                                                }]
                                                    },
                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'datefield',
                                                                    fieldLabel: 'Tanggal Keluar',
                                                                    name: 'tgl_keluar_pt',
                                                                    flex: 1,
                                                                    format: 'd-m-Y',
                                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                                    editable:false
                                                                }]
                                                    },
                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Posisi',
                                                                    name: 'posisi_pt',
                                                                    flex: 1,
                                                                    maskRe:/[A-Za-z0-9]/,
                                                                    enforceMaxLength:true,
                                                                    maxLength:50
                                                                }]
                                                    },
                                                    {
                                                        padding: '5px 0 0 0',
                                                        layout: 'hbox',
                                                        bodyStyle: 'border:0px',
                                                        items: [{
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Kelurahan',
                                                                    name: 'kelurahan_pt',
                                                                    flex: 1,
                                                                    maskRe:/[A-Za-z0-9]/,
                                                                    enforceMaxLength:true,
                                                                    maxLength:50
                                                                }]
                                                    }

                                            ]
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});