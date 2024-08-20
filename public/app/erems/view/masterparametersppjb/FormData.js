Ext.define('Erems.view.masterparametersppjb.FormData', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.masterparametersppjbformdata',
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    height        : 600,
    bodyBorder    : true,
    bodyPadding   : 10,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator : ' ',
                labelClsExtra  : 'small',
                fieldStyle     : 'margin-bottom:3px;',
                anchor         : '100%'
            },
            items: [
                {
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_id',
                    name   : 'parametersppjb_id'
                },
                {
                    xtype            : 'textfield',
                    itemId           : 'fdms_parametersppjb',
                    name             : 'code',
                    fieldLabel       : 'Code',
                    allowBlank       : false,
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    minLength        : 1,
                    maxLength        : 5,
                    anchor           : '-5'
                },
                {
                    xtype            : 'textfield',
                    itemId           : 'fdms_kso_name',
                    name             : 'kso_name',
                    fieldLabel       : 'Nama KSO',
                    // allowBlank       : false,
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    minLength        : 1,
                    maxLength        : 150,
                    anchor           : '-5'
                },
                {
                    xtype            : 'textfield',
                    itemId           : 'fdms_pt_name',
                    name             : 'pt_name',
                    fieldLabel       : 'PT Ciputra',
                    anchor           : '-5',
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    maxLength        : 50
                },
                {
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_pt_kota',
                    name       : 'pt_kota',
                    fieldLabel : 'Kota',
                    anchor     : '-5',
                    maxLength  : 50
                },
                { // added by rico 22022024
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_kelurahan',
                    name       : 'kelurahan',
                    fieldLabel : 'Kelurahan',
                    anchor     : '-5',
                    maxLength  : 50
                },
                {
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_pt_kecamatan',
                    name       : 'pt_kecamatan',
                    fieldLabel : 'Kecamatan',
                    anchor     : '-5',
                    maxLength  : 50
                },
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Email',
                    anchor     : '-5',
                    itemId     : 'fdms_email',
                    name       : 'email',
                    flex       : 1,
                    maxLength  : 100,
                    vtype      : 'email',
                    listeners  : {
                        'blur' : function (thisField) {
                            if (!thisField.isValid()) {
                                this.setValue("");
                            }
                        }
                    },
                    enforceMaxLength:true,
                },
                {
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_phone',
                    name       : 'phone',
                    fieldLabel : 'Telp',
                    anchor     : '-5',
                    maxLength  : 50
                },
                {
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_no_perjanjian_kso',
                    name       : 'no_perjanjian_kso',
                    fieldLabel : 'No. Perjanjian KSO',
                    anchor     : '-5',
                    maxLength  : 50
                },
                {
                    xtype            : 'datefield',
                    itemId           : 'fdms_tgl_perjanjian_kso',
                    name             : 'tgl_perjanjian_kso',
                    fieldLabel       : 'Tgl. Perjanjian KSO',
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    format           : 'd-m-Y',
                    altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat     : 'Y-m-d H:i:s.u',
                    editable         :false
                },
                {
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_notaris_perjanjian_kso',
                    name       : 'notaris_perjanjian_kso',
                    fieldLabel : 'Notaris Perjanjian KSO',
                    anchor     : '-5',
                    maxLength  : 50
                },
                {
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_kotanotaris_perjanjian_kso',
                    name       : 'kotanotaris_perjanjian_kso',
                    fieldLabel : 'Kota Notaris Perjanjian KSO',
                    anchor     : '-5',
                    maxLength  : 50
                },
                {
                    xtype: 'box',
                    autoEl: {
                        html: '<hr />'
                    }
                },
                {
                    xtype            : 'textfield',
                    itemId           : 'fdms_name_01',
                    name             : 'name_01',
                    fieldLabel       : 'Penandatangan 1',
                    allowBlank       : false,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    maxLength        : 50
                },
				{
                    xtype            : 'textfield',
                    itemId           : 'fdms_position_01',
                    name             : 'position_01',
                    fieldLabel       : 'Jabatan 1',
                    allowBlank       : false,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    maxLength        : 50
                },
                {
                    xtype      : 'xaddressfieldEST',
                    height     : 60,
                    itemId     : 'fdms_address_01',
                    name       : 'address_01',
                    fieldLabel : 'Alamat Korespondensi Kantor 1',
                    anchor     : '-5'
                },
                {
                    xtype      : 'xaddressfieldEST',
                    height     : 60,
                    itemId     : 'fdms_objek_jualbeli_address',
                    name       : 'objek_jualbeli_address',
                    fieldLabel : 'Alamat Objek<br>Jual Beli',
                    anchor     : '-5'
                },
                {
                    xtype      : 'textfield',
                    itemId     : 'fdms_objek_jualbeli_kelurahan',
                    name       : 'objek_jualbeli_kelurahan',
                    fieldLabel : 'Kelurahan Objek<br>Jual Beli',
                    anchor     : '-5',
                    maskRe     : /[A-Za-z0-9\s./-]/,
                },
				{
                    xtype            : 'textfield',
                    itemId           : 'fdms_name_02',
                    name             : 'name_02',
                    fieldLabel       : 'Penandatangan 2',
                    //allowBlank     : false,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    maxLength        : 50
                },
				{
                    xtype            : 'textfield',
                    itemId           : 'fdms_position_02',
                    name             : 'position_02',
                    fieldLabel       : 'Jabatan 2',
                    //allowBlank     : false,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.-/]/,
                    maxLength        : 50
                },
                {
                    xtype      : 'xaddressfieldEST',
                    height     : 60,
                    itemId     : 'fdms_address_02',
                    name       : 'address_02',
                    fieldLabel : 'Alamat Korespondensi Kantor 2',
                    anchor     : '-5'
                },
				{
                    xtype            : 'textfield',
                    itemId           : 'fdms_akta_no',
                    name             : 'akta_no',
                    fieldLabel       : 'Nomor Kuasa Akta',
                    allowBlank       : false,
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s./-]/,
                    minLength        : 1,
                    maxLength        : 50,
                    anchor           : '-5'
                },
				{
                    xtype            : 'datefield',
                    itemId           : 'fdms_akta_date',
                    name             : 'akta_date',
                    fieldLabel       : 'Tgl. Kuasa Akta',
                    allowBlank       : false,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    format           : 'd-m-Y',
                    altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat     : 'Y-m-d H:i:s.u',
                    editable         :false
                },
				{
                    xtype            : 'textfield',
                    itemId           : 'fdms_notaris',
                    name             : 'notaris',
                    fieldLabel       : 'Notaris',
                    //allowBlank     : false,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    maxLength        : 50
                },
				{
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_notariskota',
                    name       : 'notariskota',
                    fieldLabel : 'Kota',
                    anchor     : '-5',
                    maxLength  : 50
				},
				{
                    xtype            : 'textfield',
                    itemId           : 'fdms_akta_no_2',
                    name             : 'akta_no_2',
                    fieldLabel       : 'Nomor Kuasa Akta 2',
                    ////allowBlank   : false,
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s./-]/,
                    minLength        : 1,
                    maxLength        : 50,
                    anchor           : '-5'
                },
				{
                    xtype            : 'datefield',
                    itemId           : 'fdms_akta_date_2',
                    name             : 'akta_date_2',
                    fieldLabel       : 'Tgl. Kuasa Akta 2',
                    ////allowBlank   : false,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    format           : 'd-m-Y',
                    altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat     : 'Y-m-d H:i:s.u',
                    editable         :false
                },
				{
                    xtype            : 'textfield',
                    itemId           : 'fdms_notaris_2',
                    name             : 'notaris_2',
                    fieldLabel       : 'Notaris 2',
                    ////allowBlank   : false,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    //maxLength      : 50,
                    anchor           : '-5',
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    maxLength        : 50
                },
				{
                    xtype      : 'xgeneralfieldEST',
                    itemId     : 'fdms_notaris2kota',
                    name       : 'notaris2kota',
                    fieldLabel : 'Kota 2',
                    anchor     : '-5',
                    maxLength  : 50
				},
				{
                    xtype       : 'fieldset',
                    bodyPadding : 10, 
                    width       : '100%',
                    title       : 'Rekening',
                    items       : [
						{
                            xtype      : 'xaddressfieldEST',
                            allowBlank : false,
                            height     : 60,
                            itemId     : 'fdms_account_name',
                            name       : 'account_name',
                            fieldLabel : 'Atas Nama',
                            anchor     : '-5'
						},
						{
                            xtype            : 'textfield',
                            itemId           : 'fdms_account_no',
                            name             : 'account_no',
                            fieldLabel       : 'Nomor dan Bank',
                            allowBlank       : false,
                            enforceMaxLength : true,
                            maskRe           : /[A-Za-z0-9\s./-]/,
                            minLength        : 1,
                            maxLength        : 150,
                            anchor           : '-5'
						},
						{
                            xtype      : 'xaddressfieldEST',
                            height     : 60,
                            itemId     : 'fdms_account_address',
                            name       : 'account_address',
                            fieldLabel : 'Alamat',
                            anchor     : '-5'
						},
					]
				},
				{
                    xtype       : 'fieldset',
                    bodyPadding : 10, 
                    width       : '100%',
                    title       : 'Kuasa Menjual PT Partner (Khusus Revenue Sharing / Provit Sharing)',
                    defaults    : {
						//labelAlign: 'top',
                        labelSeparator : ' ',
                        labelClsExtra  : 'small',
                        fieldStyle     : 'margin-bottom:3px;',
                        anchor         : '100%'
					},
					items: [
						{
                            xtype            : 'textfield',
                            itemId           : 'fdms_pt_namapartner',
                            name             : 'pt_namapartner',
                            fieldLabel       : 'PT Partner',
                            anchor           : '-5',
                            enforceMaxLength :true,
                            maxLength        :50,
                            maskRe           :/[A-Za-z0-9\s.]/
						},
						{
                            xtype      : 'xgeneralfieldEST',
                            itemId     : 'fdms_pt_kotapartner',
                            name       : 'pt_kotapartner',
                            fieldLabel : 'Kota',
                            anchor     : '-5',
                            maxLength  : 50,
						},
						{
                            xtype            : 'textfield',
                            itemId           : 'fdms_pt_aktano',
                            name             : 'pt_aktano',
                            fieldLabel       : 'No. Kuasa Akta-1-PT',
                            anchor           : '-5',
                            enforceMaxLength :true,
                            maxLength        :50,
                            maskRe           :/[A-Za-z0-9\s.]/
						},
						{
                            xtype        : 'datefield',
                            itemId       : 'fdms_pt_aktadate',
                            name         : 'pt_aktadate',
                            fieldLabel   : 'Tgl. Kuasa Akta-1',
                            anchor       : '-5',
                            format       : 'd-m-Y',
                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat : 'Y-m-d H:i:s.u',
                            editable     :false
						},
						{
                            xtype            : 'textfield',
                            itemId           : 'fdms_pt2_aktano',
                            name             : 'pt2_aktano',
                            fieldLabel       : 'No. Kuasa Akta-2-PT',
                            anchor           : '-5',
                            enforceMaxLength :true,
                            maxLength        :50,
                            maskRe           :/[A-Za-z0-9\s.]/
						},
						{
                            xtype        : 'datefield',
                            itemId       : 'fdms_pt2_aktadate',
                            name         : 'pt2_aktadate',
                            fieldLabel   : 'Tgl. Kuasa Akta-2',
                            anchor       : '-5',
                            format       : 'd-m-Y',
                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat : 'Y-m-d H:i:s.u',
                            editable     :false
						},
						{
                            xtype            : 'textfield',
                            itemId           : 'fdms_pt_notaris',
                            name             : 'pt_notaris',
                            fieldLabel       : 'Notaris',
                            anchor           : '-5',
                            enforceMaxLength :true,
                            maxLength        :50,
                            maskRe           :/[A-Za-z0-9\s.]/
						},
						{
                            xtype      : 'xgeneralfieldEST',
                            itemId     : 'fdms_pt_notariskota',
                            name       : 'pt_notariskota',
                            fieldLabel : 'Kota',
                            anchor     : '-5',
                            maxLength  :50,
						}
					]
				}
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

