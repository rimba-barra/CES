Ext.define('Cashier.view.tbank.FormEditHeaderGiro', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tbankformeditheadergiro',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: "_tbankformeditheadergiro",
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default',
                    id: 'hideparam' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                    id: 'kasbank_id' + me.uniquename,
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit',
                        padding: '0 0 0 0', //(top, right, bottom, left).
                    },
                    items: [
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Info Pengirim',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '10 10 10 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama',
                                    itemId: 'form_kr_nama',
                                    id: 'form_kr_nama' + me.uniquename,
                                    name: 'form_kr_nama',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Nama',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'right',
                                    bodyBorder: false,
                                    defaults: {
                                        layout: 'fit'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nomor Rekening',
                                            itemId: 'form_kr_rek_no',
                                            id: 'form_kr_rek_no' + me.uniquename,
                                            name: 'form_kr_rek_no',
                                            width: 200,
                                            maxLength: 50,
                                            emptyText: 'No Rek',
                                            allowBlank: true,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
                                        },
                                        {
                                            xtype: 'splitter',
                                            width: '10'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            itemId: 'form_kr_nama_bank',
                                            id: 'form_kr_nama_bank' + me.uniquename,
                                            name: 'form_kr_nama_bank',
                                            width: 250,
                                            maxLength: 100,
                                            emptyText: 'Nama Bank',
                                            allowBlank: true,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
                                        },
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Alamat',
                                    itemId: 'form_kr_alamat',
                                    id: 'form_kr_alamat' + me.uniquename,
                                    name: 'form_kr_alamat',
                                    width: 460,
                                    maxLength: 100,
                                    emptyText: 'Alamat',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Kota',
                                    itemId: 'form_kr_kota',
                                    id: 'form_kr_kota' + me.uniquename,
                                    name: 'form_kr_kota',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Kota',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Negara',
                                    itemId: 'form_kr_negara',
                                    id: 'form_kr_negara' + me.uniquename,
                                    name: 'form_kr_negara',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Negara',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Telpon',
                                    itemId: 'form_kr_telp',
                                    id: 'form_kr_telp' + me.uniquename,
                                    name: 'form_kr_telp',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Telpon',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            // Fieldset in Column 1
                            xtype: 'fieldset',
                            title: 'Info Penerima',
                            collapsible: false,
                            defaults: {anchor: '100%'},
                            layout: 'vbox',
                            padding: '10 10 10 10', //(top, right, bottom, left).
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama',
                                    itemId: 'form_tr_nama',
                                    id: 'form_tr_nama' + me.uniquename,
                                    name: 'form_tr_nama',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Nama',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'No Rekening',
                                    itemId: 'form_tr_rek_no',
                                    id: 'form_tr_rek_no' + me.uniquename,
                                    name: 'form_tr_rek_no',
                                    width: 460,
                                    maxLength: 100,
                                    emptyText: 'No Rekening',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Alamat',
                                    itemId: 'form_tr_alamat',
                                    id: 'form_tr_alamat' + me.uniquename,
                                    name: 'form_tr_alamat',
                                    width: 460,
                                    maxLength: 100,
                                    emptyText: 'Alamat',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Kota',
                                    itemId: 'form_tr_kota',
                                    id: 'form_tr_kota' + me.uniquename,
                                    name: 'form_tr_kota',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Kota',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Negara',
                                    itemId: 'form_tr_negara',
                                    id: 'form_tr_negara' + me.uniquename,
                                    name: 'form_tr_negara',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Negara',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Telpon',
                                    itemId: 'form_tr_telp',
                                    id: 'form_tr_telp' + me.uniquename,
                                    name: 'form_tr_telp',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Telpon',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Info Bank Penerima',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    padding: '10 10 10 10', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama',
                                    itemId: 'form_tr_nama_bank',
                                    id: 'form_tr_nama_bank' + me.uniquename,
                                    name: 'form_tr_nama_bank',
                                    width: 300,
                                    maxLength: 50,
                                    emptyText: 'Nama Bank',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '230'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Negara',
                                    itemId: 'form_tr_negara_bank',
                                    id: 'form_tr_negara_bank' + me.uniquename,
                                    name: 'form_tr_negara_bank',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: 'Negara Bank',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Cabang',
                                    itemId: 'form_tr_cabang_bank',
                                    id: 'form_tr_cabang_bank' + me.uniquename,
                                    name: 'form_tr_cabang_bank',
                                    width: 300,
                                    maxLength: 50,
                                    emptyText: 'Cabang Bank',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '230'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Keterangan 1',
                                    itemId: 'form_tr_ket1',
                                    id: 'form_tr_ket1' + me.uniquename,
                                    name: 'form_tr_ket1',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: '',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Alamat',
                                    itemId: 'form_tr_alamat_bank',
                                    id: 'form_tr_alamat_bank' + me.uniquename,
                                    name: 'form_tr_alamat_bank',
                                    width: 300,
                                    maxLength: 50,
                                    emptyText: 'Alamat',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '230'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Keterangan 2',
                                    itemId: 'form_tr_ket2',
                                    id: 'form_tr_ket2' + me.uniquename,
                                    name: 'form_tr_ket2',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: '',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Kota',
                                    itemId: 'form_tr_kota_bank',
                                    id: 'form_tr_kota_bank' + me.uniquename,
                                    name: 'form_tr_kota_bank',
                                    width: 300,
                                    maxLength: 50,
                                    emptyText: 'Kota',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '230'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Keterangan 3',
                                    itemId: 'form_tr_ket3',
                                    id: 'form_tr_ket3' + me.uniquename,
                                    name: 'form_tr_ket3',
                                    width: 300,
                                    maxLength: 100,
                                    emptyText: '',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: '0 0 0 450',
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'submit',
                        itemId: 'btnSubmit',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Submit'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }

                ]
            }
        ];
        return x;
    },
});

