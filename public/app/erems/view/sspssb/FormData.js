Ext.define('Erems.view.sspssb.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.sspssbformdata',
    requires:[
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Notariscombobox',
		'Erems.library.template.component.Citycombobox'
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

		function dateOneYear(){
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth()+x);
			return CurrentDate;
		}

        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'sspssb_id',
                    name: 'sspssb_id'
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
				/*{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_unit_electricity',
                    name: 'unit_electricity'
                },*/
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
                                        /*{
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
                                        },*/
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
                                        /*{
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
                                        }*/
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
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
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
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Customer Address',
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
                                                    fieldLabel: 'NPWP',
                                                    anchor: '-5',
                                                    name: 'customer_npwp',
                                                    flex: 1,
													//allowBlank: false,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
													xtype: 'citycombobox',
													anchor: '-5',
													itemId:'fd_city',
													flex: 1,
													readOnly: true,
													fieldLabel: 'City',
													name: 'customer_city_id'
												}]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kode Akun Pajak',
                                                    anchor: '-5',
                                                    name: 'akunpajakcode',
                                                    flex: 1,
                                                    enforceMaxLength:true,
                                                    maxLength:30,
                                                    maskRe:/[A-Za-z0-9\s.]/
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kode Jenis Setoran',
                                                    anchor: '-5',
                                                    name: 'jenissetorcode',
                                                    flex: 1,
                                                    enforceMaxLength:true,
                                                    maxLength:30,
                                                    maskRe:/[A-Za-z0-9\s.]/
                                                }]
                                        },
										{

                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Uraian Pembayaran',
                                                    anchor     : '-5',
                                                    name       : 'notes',
                                                    flex       : 1,
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
												{xtype: 'label', text: 'Tahun Pajak',  style: 'font-weight:bold;font-size:14px;'},
												{
                                                    xtype: 'splitter', width: 20,
                                                },
												{
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : '',
                                                    name       : 'tax_year',
                                                    allowBlank : false,
                                                    maxLength  :4,
                                                    listeners  :{
                                                        blur: function(el){
                                                            var year = new Date().getFullYear();

                                                            if(el.value.length != 4 || (parseInt(el.value) < 1920) || (parseInt(el.value) > year)){
                                                                Ext.Msg.show({
                                                                    title: 'Info',
                                                                    msg: "Tahun pajak tidak sesuai.",
                                                                    icon: Ext.Msg.INFO,
                                                                    buttons: Ext.Msg.OK
                                                                });
                                                                el.setValue('');    
                                                            }
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
				/* A Information */
               	{xtype: 'panel', bodyPadding: 10, title: 'A', collapsible: true,
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
                                                    xtype      : 'xnamefieldEST',
                                                    fieldLabel : '1. Nama Wajib Pajak',
                                                    labelWidth : 120,
                                                    anchor     : '-5',
                                                    name       : 'wajibpajak_name',
                                                    flex       : 1,
                                                    allowBlank : false,
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: '2. NPWP',
													labelWidth: 120,
                                                    anchor: '-5',
                                                    name: 'wajibpajak_npwp',
                                                    flex: 1,
													allowBlank: false
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : '3. Alamat',
                                                    labelWidth : 120,
                                                    anchor     : '-5',
                                                    name       : 'wajibpajak_address',
                                                    flex       : 1,
                                                    allowBlank : false,
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : '4. Kelurahan',
                                                    name       : 'wajibpajak_kelurahan',
                                                    anchor     : '-5',
                                                    labelWidth : 120,
                                                    flex       : 1,
                                                    allowBlank : false,
                                                    maxLength  : 30,
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : '5. RT / RW',
                                                    name       : 'wajibpajak_rtrw',
                                                    anchor     : '-5',
                                                    flex       : 1,
                                                    allowBlank : false,
                                                    maxLength  : 30,
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : '6. Kecamatan',
                                                    name       : 'wajibpajak_kecamatan',
                                                    anchor     : '-5',
                                                    labelWidth : 120,
                                                    flex       : 1,
                                                    allowBlank : false,
                                                    maxLength  : 30,
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                },
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : '8. Kodepos',
                                                    anchor     : '-5',
                                                    name       : 'wajibpajak_zipcode',
                                                    flex       : 1,
                                                    maxLength  : 10,
                                                }
                                            ]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
													xtype: 'citycombobox',
													anchor: '-5',
													itemId:'fd_city_wajibpajak',
													flex: 1,
													allowBlank: false,
													//readOnly: true,
													fieldLabel: '7. Kabupaten Kota',
													labelWidth: 120,
													name: 'wajibpajak_city_id',
                                                    queryMode: 'local',
                                                    lastQuery: '',
                                                    listeners:{
                                                        blur:function(el){
                                                            if(el.value == '' ||el.value == null){
                                                                el.setValue('');
                                                                Ext.Msg.show({
                                                                    title: 'Failure',
                                                                    msg: 'Kabupaten yang dicari tidak ada.',
                                                                    icon: Ext.Msg.ERROR,
                                                                    buttons: Ext.Msg.OK
                                                                });
                                                            }
                                                        }
                                                    }
												}]
                                        },
										{ xtype: 'splitter', height: 30 },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Nomor Object (NOP) PBB',
													labelWidth: 150,
                                                    anchor: '-5',
                                                    name: 'nop',
                                                    flex: 1,
													allowBlank: false,
                                                    enforceMaxLength:true,
                                                    maxLength:30,
                                                    maskRe:/[A-Za-z0-9\s.-]/
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Letak tanah dan atau bangunan',
                                                    labelWidth : 150,
                                                    anchor     : '-5',
                                                    name       : 'nop_landaddress',
                                                    flex       : 1,
                                                    allowBlank : false,
                                                }
                                            ]
                                        },
										{
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : 'Kelurahan',
                                                    labelWidth : 120,
                                                    anchor     : '-5',
                                                    name       : 'nop_kelurahan',
                                                    flex       : 1,
                                                    allowBlank : false
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : 'RT / RW',
                                                    anchor     : '-5',
                                                    name       : 'nop_rtrw',
                                                    flex       : 1,
                                                    allowBlank : false
                                                }]
                                        },
										{
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : 'Kecamatan',
                                                    labelWidth : 120,
                                                    anchor     : '-5',
                                                    name       : 'nop_kecamatan',
                                                    flex       : 1,
                                                    allowBlank : false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
													xtype: 'citycombobox',
													anchor: '-5',
													itemId:'fd_city_nop',
													flex: 1,
													allowBlank: false,
													//readOnly: true,
													fieldLabel: 'Kabupaten Kota',
													labelWidth: 120,
													name: 'nop_city_id',
                                                    queryMode: 'local',
                                                    lastQuery: '',
                                                    listeners:{
                                                        blur:function(el){
                                                            if(el.value == '' ||el.value == null){
                                                                el.setValue('');
                                                                Ext.Msg.show({
                                                                    title: 'Failure',
                                                                    msg: 'Kabupaten yang dicari tidak ada.',
                                                                    icon: Ext.Msg.ERROR,
                                                                    buttons: Ext.Msg.OK
                                                                });
                                                            }
                                                        }
                                                    }
												}]
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
				/* PERHITUNGAN BPHTB */
				{xtype: 'panel', bodyPadding: 10, title: 'PERHITUNGAN BPHTB (Hanya diisi berdasarkan perhitungan wajib pajak **Dalam Rupiah)', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Nilai Perolehan Object Pajak (NPOP)', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'npop',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    maskRe: /[0-9\.]/,
                                    currencyFormat: true,
									readOnly: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }

                            ]
                        },
						{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                       {xtype: 'label', text: 'Nilai Perolehan Object Pajak Tidak Kena Pajak (NPOPTKP)', flex: 1},
										//{xtype: 'label', text: 'Nilai Jual Object Pajak Tidak Kena Pajak (NJOPTKP)', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'npoptkp',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    maskRe: /[0-9\.]/,
                                    currencyFormat: true,
									enableKeyEvents: true,
                                    value: 0.00,
									fieldStyle: 'text-align:right;'
                                }

                            ]
                        },
						{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Nilai Perolehan Object Pajak Kena Pajak (NPOPKP)', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'npopkp',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    maskRe: /[0-9\.]/,
                                    currencyFormat: true,
									readOnly: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Bea perolehan Hak atas Tanah & Bangunan yang terutang', flex: 6},
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            name: 'bphtb_persen',
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
											enableKeyEvents: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00,
                                            flex: 1
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'bphtb_value',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    maskRe: /[0-9\.]/,
                                    currencyFormat: true,
									readOnly: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00

                                }

                            ]
                        },
						{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Pengenaan 50% karena waris / hibah wasiat / pemberian hak pengelolaan', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'warishibah',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    maskRe: /[0-9\.]/,
                                    currencyFormat: true,
									enableKeyEvents: true,
                                    value: 0.00,
									fieldStyle: 'text-align:right;'
                                }

                            ]
                        },
						{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Bea perolehan Hak atas Tanah & Bangunan yang harus dibayar', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'bphtb_bayar',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    maskRe: /[0-9\.]/,
                                    currencyFormat: true,
									readOnly: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Jumlah Pembayaran Pajak (PPH)', flex: 6, style: 'font-weight:bold;font-size:14px;'},
										{
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            name: 'totalbayar_persen',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'totalbayar_value',
                                    flex: 3,
                                    padding: '0 25px 0 0',
									readOnly: true,
                                    maskRe: /[0-9\.]/,
                                    currencyFormat: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }
                            ]
                        }
                    ]
                }, // end sub panel
				
				/* PERHITUNGAN NJOP PBB */
				{xtype: 'panel', bodyPadding: 10, title: 'PERHITUNGAN NJOP PBB', collapsible: true,
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
                                    flex: 4,
                                    bodyStyle: 'border:0px',
                                    items: [
										{
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													//  bodyPadding: 10,
													xtype: 'fieldset',
													title: 'Uraian',
													margin: '10px 0 0 0',
													flex: 1,
													//border: 0,
													defaults: {
														width: '100%',
														//readOnly:true,
														disabled: true,
														fieldStyle: 'border:0;background:none;opacity:1 !important;',
														labelStyle: 'opacity:1 !important;',
														anchor: '-5',
													},
													layout: 'vbox',
													bodyStyle: 'border:0px',
													items: [
														{
															xtype: 'textfield',
															value: 'Tanah'
														}, 
														{
															xtype: 'textfield',
															value: 'Bangunan'
														}
													]
												},
												{
													//  bodyPadding: 10,
													xtype: 'fieldset',
													title: 'Luas',
													flex: 2,
													margin: '10px 0 0 0',
													layout: 'vbox',
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 7,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: '',
																	name: 'njop_landsize',
																	flex: 1,
																	//enableKeyEvents: true,
																	maskRe: /[0-9\.]/,
																	//currencyFormat: true,
																	readOnly:true,
																	fieldStyle: 'text-align:right',
																	value: 0.00
																},
																{xtype: 'label', text: 'm2', width: 50, padding: '0 0 0 10px'},
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 7,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: '',
																	name: 'njop_buildingsize',
																	flex: 1,
																	//enableKeyEvents: true,
																	maskRe: /[0-9\.]/,
																	//currencyFormat: true,
																	readOnly:true,
																	fieldStyle: 'text-align:right',
																	value: 0.00
																},
																{xtype: 'label', text: 'm2', width: 50, padding: '0 0 0 10px'},
															]
														},
														
													]
												},
												{
													//  bodyPadding: 10,
													xtype: 'fieldset',
													title: 'NJOP PBB / m2',
													flex: 2,
													margin: '10px 0 0 0',
													layout: 'vbox',
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 7,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Rp.',
																	labelWidth: 20,
																	name: 'njop_landprice',
																	flex: 1,
																	enableKeyEvents: true,
																	maskRe: /[0-9\.]/,
																	currencyFormat: true,
																	//readOnly:true,
																	fieldStyle: 'text-align:right',
																	value: 0.00
																},
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 7,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Rp.',
																	labelWidth: 20,
																	name: 'njop_buildingprice',
																	flex: 1,
																	enableKeyEvents: true,
																	maskRe: /[0-9\.]/,
																	currencyFormat: true,
																	//readOnly:true,
																	fieldStyle: 'text-align:right',
																	value: 0.00
																},
															]
														},
														
													]
												},
												{
													//  bodyPadding: 10,
													xtype: 'fieldset',
													title: 'Luas x NJOP PBB / m2',
													flex: 2,
													margin: '10px 0 0 0',
													layout: 'vbox',
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 7,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Rp.',
																	labelWidth: 20,
																	name: 'njop_landpbb',
																	flex: 1,
																	//enableKeyEvents: true,
																	maskRe: /[0-9\.]/,
																	currencyFormat: true,
																	readOnly:true,
																	fieldStyle: 'text-align:right',
																	value: 0.00
																},
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 7,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Rp.',
																	labelWidth: 20,
																	name: 'njop_buildingpbb',
																	flex: 1,
																	//enableKeyEvents: true,
																	maskRe: /[0-9\.]/,
																	currencyFormat: true,
																	readOnly:true,
																	fieldStyle: 'text-align:right',
																	value: 0.00
																},
															]
														},
														
													]
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 3,
													items: [
													]
												},
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 1,
													items: [
														{
															xtype: 'label',
															text: '',
															width: '100%',
															height: 2,
															padding: '8px 0 0 0',
															border: '0 0 2 0',
															style: {
																borderColor: 'black',
																borderStyle: 'solid',
															},
															flex: 1,
															margin: '0 0'
														},
														{xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
													]
												}
				
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'textfield',
													fieldLabel: 'NJOP PBB Rp.',
													labelAlign: 'right',
													labelWidth: 545,
													name: 'njop_totalpbb',
													flex: 7,
													padding: '0 25px 0 0',
													//enableKeyEvents: true,
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													readOnly:true,
													value: 0.00,
													fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
												}
				
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 3,
													items: [
													]
												},
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 1,
													items: [
														{
															xtype: 'label',
															text: '',
															width: '100%',
															height: 2,
															padding: '8px 0 0 0',
															border: '0 0 2 0',
															style: {
																borderColor: 'black',
																borderStyle: 'solid',
															},
															flex: 1,
															margin: '0 0'
														},
														//{xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
													]
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'textfield',
													fieldLabel: 'Harga transaksi / nilai pasar Rp.',
													labelAlign: 'right',
													labelWidth: 545,
													name: 'njop_hargajual',
													flex: 7,
													padding: '0 25px 0 0',
													//enableKeyEvents: true,
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													readOnly:true,
													value: 0.00,
													fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
												}
				
											]
										},
										{
											//  bodyPadding: 10,
											padding: '30px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px'
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Jenis perolehan hak atas tanah dan atau bangunan', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'njop_jenisphtb',
													flex: 3,
													padding: '0 25px 0 0',
                                                    enforceMaxLength:true,
                                                    maxLength:30,
                                                    maskRe:/[A-Za-z\s.-]/
												}
				
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Nomor sertifikat', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'hgb_no',
													flex: 3,
													padding: '0 25px 0 0',
                                                    enforceMaxLength:true,
                                                    maxLength:30,
                                                    maskRe:/[A-Za-z\s.-]/
												}
				
											]
										},
										
									]
								}
							]
						}
					]
				},
				/* END PERHITUNGAN NJOP PBB */
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});