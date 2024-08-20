Ext.define('Cashier.view.voucher.FormDataVendor', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformvendor',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
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
                    name: 'type_vendor',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'vendor_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
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
                            emptyText: 'Vendor Code',
                            allowBlank: true,
                            // readOnly:true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            fieldStyle: 'background-color:#eee;background-image: none;'
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
                    fieldLabel: 'Vendor Name',
                    itemId: 'fd_vendorname',
                    id: 'vendorname',
                    name: 'vendorname',
                    emptyText: 'Vendor Name',
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
                            xtype: 'textfield',
                            fieldLabel: 'Office Phone',
                            itemId: 'fd_office_phone',
                            id: 'office_phone',
                            name: 'office_phone',
                            emptyText: '',
                            width: 250,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-]/,
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
                            width: 250,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-]/,
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
                            width: 250,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-]/,
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
                            width: 250,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-]/,
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'NPWP No.',
                    itemId: 'fd_npwp',
                    id: 'npwp',
                    name: 'npwp',
                    emptyText: 'NPWP No.',
                    width: 120,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    maskRe: /[0-9\-]/,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'NPWP Name.',
                    itemId: 'fd_npwpname',
                    id: 'npwp_name',
                    name: 'npwp_name',
                    emptyText: 'NPWP Name.',
                    width: 120,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
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
                    xtype: 'combobox',
                    fieldLabel: 'Tipe PPH',
                    name: 'type_pph',
                    queryMode: 'local',
                  // typeAhead: false,
                   // e//ditable: false,
                    store: new Ext.data.JsonStore({
                        fields: ['type', 'description'],
                        data: [
                            {type: '1', description: '-'},
                            {type: '2', description: 'PPH 21'},
                            {type: '3', description: 'PPH 23'},
                            {type: '4', description: 'Final Kontruksi'},
                            {type: '5', description: 'Final Sewa Harta'},
                            {type: '6', description: 'Final Sewa Tanah/Bangunan'},
                        ]
                    }),
                    value :'1',
                    displayField: 'description',
                    allowBlank: true,
                    autoSelect: true,
                    forceSelection: true,
                    valueField: 'type'
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
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_address',
                    name: 'address',
                    fieldLabel: 'Bussiness Address',
                    allowBlank: true,
                    enforceMaxLength: true,
                    grow: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    itemId: 'fd_email',
                    id: 'email',
                    name: 'email',
                    emptyText: '',
                    width: 300,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No. Rekening',
                    name: 'no_rekening',
                    emptyText: '',
                    width: 300,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
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

