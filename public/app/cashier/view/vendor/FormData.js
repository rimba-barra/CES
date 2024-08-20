Ext.define('Cashier.view.vendor.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vendorformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    height: 600,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
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
                    value: 'default'
                },  
                 {
                    xtype: 'hiddenfield',
                    name: 'projectcode'
                },  
                {
                    xtype: 'ptbyusercombobox',
                    itemId: 'fs_pt_id',
                    name: 'projectpt_id',
                    forceSelection: true, 
                    anchor:'-15'

                },
                {
                    xtype: 'hiddenfield',
                    name: 'vendor_id',
                },
                {
                    xtype: 'tipevendorcombobox',
                    itemId: 'fdms_type_vendor',
                    name: 'type_vendor',
                    width: 300,
                    fieldLabel: 'Type',
                    allowBlank: false,
                    enforceMaxLength: true,
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
                            fieldLabel: 'Code',
                            itemId: 'fd_vendorcode',
                            id: 'vendorcode',
                            name: 'vendorcode',
                            width: 300,
                            maxLength: 20,
                            emptyText: 'Code',
                            allowBlank: true,
                            //readOnly:true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_flag_id',
                            name: 'flag_id',
                            boxLabel: 'Active',
                            padding: '0 0 0 0',
                            margin: '0 0 0 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    itemId: 'fd_vendorname',
                    id: 'vendorname',
                    name: 'vendorname',
                    emptyText: 'Vendor / Patner Name',
                    width: 120,
                    allowBlank: false,
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
                            xtype: 'jenisusahacombobox',
                            itemId: 'fdms_jenisusaha_id',
                            name: 'jenisusaha_id',
                            width: 300,
                            fieldLabel: 'Business Type',
                            allowBlank: true,
                            enforceMaxLength: true,
                        },
                        {
                            xtype: 'button',
                            action: 'create_jenisusaha',
                            itemId: 'btnCreateJenisusaha',
                            width: 140,
                            iconCls: 'icon-new',
                            text: 'Create Business Type'
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
                            fieldLabel: 'Office Phone',
                            itemId: 'fd_office_phone',
                            id: 'office_phone',
                            name: 'office_phone',
                            emptyText: '',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Mobile Phone',
                            itemId: 'fd_mobile_phone',
                            id: 'mobile_phone',
                            name: 'mobile_phone',
                            emptyText: '',
                            width: 300,
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
                            fieldLabel: 'Contact Person',
                            itemId: 'fd_contactperson',
                            id: 'contactperson',
                            name: 'contactperson',
                            emptyText: '',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Fax No.',
                            itemId: 'fd_fax',
                            id: 'fax',
                            name: 'fax',
                            emptyText: '',
                            width: 300,
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
                            fieldLabel: 'NPWP No.',
                            itemId: 'fd_npwp',
                            id: 'npwp',
                            name: 'npwp',
                            emptyText: 'NPWP No.',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'NPWP Name.',
                            itemId: 'fd_npwpname',
                            id: 'npwp_name',
                            name: 'npwp_name',
                            emptyText: 'NPWP Name.',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_addressa',
                    name: 'npwp_address',
                    fieldLabel: 'NPWP Address',
                    allowBlank: true,
                    enforceMaxLength: true,
                    grow: true,
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
                            fieldLabel: 'KTP No.',
                            itemId: 'fd_ktp_no',
                            id: 'ktp_no',
                            name: 'ktp_no',
                            emptyText: 'KTP No.',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'KTP Name.',
                            itemId: 'fd_ktpname',
                            id: 'ktp_name',
                            name: 'ktp_name',
                            emptyText: 'KTP Name.',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_ktpaddress',
                    name: 'ktp_address',
                    fieldLabel: 'KTP Address',
                    allowBlank: true,
                    enforceMaxLength: true,
                    grow: true,
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_address',
                    name: 'address',
                    fieldLabel: 'Bussiness Address',
                    allowBlank: true,
                    enforceMaxLength: true,
                    grow: true,
                },
                // {
//                    xtype: 'combobox',
//                    fieldLabel: 'KLU',
//                    name: 'klu',
//                    queryMode: 'local',
//                    store: ['A', 'B', 'C'],
//                    displayField: 'KLU',
//                    allowBlank: true,
//                    autoSelect: true,
//                    forceSelection: true,
//                },
//
//                {
//                    xtype: 'combobox',
//                    fieldLabel: 'Bussiness classfication ',
//                    name: 'bc',
//                    queryMode: 'local',
//                    store: ['A', 'B', 'C'],
//                    displayField: 'Bussiness classfication ',
//                    allowBlank: true,
//                    autoSelect: true,
//                    forceSelection: true,
//                },
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'No Tarih pph final',
//                    name: 'no_pph',
//                    emptyText: 'No TariF pph final',
//                    width: 120,
//                    allowBlank: true,
//                    enforceMaxLength: true,
//                    enableKeyEvents: true,
//                    rowdata: null
//                },


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
                            xtype: 'tipepajakpphcombobox',
                            fieldLabel: 'Tipe PPH',
                            name: 'type_pph',
                            queryMode: 'local',
                            displayField: 'description',
                            allowBlank: true,
                            autoSelect: true,
                            forceSelection: true,
                            valueField: 'tipepajak_id',
                            displayField: 'tipepajakdetail'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Kelas Kontraktor',
                            name: 'kelas_kontraktor',
                            queryMode: 'local',
                           // typeAhead: false,
                            //editable: false,
                            store: new Ext.data.JsonStore({
                                fields: ['type', 'description'],
                                data: [
                                    {type: '1', description: '-'},
                                    {type: '2', description: 'Kecil'},
                                    {type: '3', description: 'Menengah'},
                                    {type: '4', description: 'Besar'},
                                ]
                            }),
                            value :'1',
                            displayField: 'description',
                            allowBlank: true,
                            autoSelect: true,
                            forceSelection: true,
                            valueField: 'type'
                        },
                    ]
                },

                
   
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'Tarif PPH Final %',
//                    itemId: 'fd_pph_final',
//                    id: 'pph_final',
//                    name: 'pph_final',
//                    emptyText: 'Tarif PPH Final %.',
//                    width: 120,
//                    allowBlank: true,
//                    enforceMaxLength: true,
//                    enableKeyEvents: true,
//                    rowdata: null
//                },

                //  {
                //     xtype: 'fieldcontainer',
                //     layout: 'hbox',
                //     align: 'right',
                //     bodyBorder: false,
                //     defaults: {
                //         layout: 'fit'
                //     },
                //     items: [
                //         {
                //             xtype: 'textfield',
                //             fieldLabel: 'Email',
                //             itemId: 'fd_email',
                //             id: 'email',
                //             name: 'email',
                //             emptyText: '',
                //             width: 300,
                //             allowBlank: true,
                //             enforceMaxLength: true,
                //             enableKeyEvents: true,
                //             rowdata: null
                //         },
                //         {
                //             xtype: 'splitter',
                //             width: '20'
                //         },
                //          //Rizal 23 Mei 2019
                //         {
                //             xtype: 'textfield',
                //             fieldLabel: 'No. Rekening',
                //             name: 'no_rekening',
                //             emptyText: '',
                //             width: 300,
                //             allowBlank: true,
                //             enforceMaxLength: true,
                //             enableKeyEvents: true,
                //             rowdata: null
                //         },
                // //
                //     ]
                // },



                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'tabadditionalinformation',
                            name: 'panel',
                            activeTab: 0,
                            layout: 'hbox',
                            flex: 1,
                            id: 'tabadditionalinformation',
                            items: [
                                {
                                    xtype: 'vendorbankgrid',
                                    title: 'Bank Information',
                                    itemId: 'fd_vendorbankgrid',
                                    name: 'vendorbankgrid',
                                    width: '98%',
                                    height: 200
                                },
                                {
                                    xtype: 'vendoremailgrid',
                                    title: 'Email',
                                    itemId: 'fd_vendoremailgrid',
                                    name: 'vendoremailgrid',
                                    width: '98%',
                                    height: 200
                                },
                                {
                                    xtype: 'vendornotegrid',
                                    itemId: 'fd_vendornotegrid',
                                    name: 'vendornotegrid',
                                    title: 'Vendor/Partner Notes',
                                    width: '98%',
                                    height: 200
                                }
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
                padding: '0 0 0 250',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
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
                    },
                ]
            }
        ];
        return x;
    }
});

