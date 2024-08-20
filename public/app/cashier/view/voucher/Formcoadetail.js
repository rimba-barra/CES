Ext.define('Cashier.view.voucher.Formcoadetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformcoadetail',
    requires: ['Cashier.view.voucher.Gridsubcoadetail'],
    frame: true,
    minimizable: false,
    autoScroll: true,
    anchorSize: 100,
    kosongGa: -1,
    bodyBorder: true,
    bodyPadding: 10,
    rowIndex: -1,
    id: 'voucherformcoadetailID',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'is_ems'
                },{
                    xtype: 'hiddenfield',
                    name: 'kasbondept_no'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'is_cpms'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'is_ppn'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'is_pph'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucherdetail_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_kelsub_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'subgl_description'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'indexdata'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cashflowtype_cashflowtype'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cashflowtype_cashflowtype_id'
                },
//                {
//                    xtype: 'hiddenfield',
//                    name: 'cashflow_setupcashflow_id'
//                },
                {
                    xtype: 'hiddenfield',
                    name: 'subgl_code'
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
                            xtype: 'combobox',
                            allowBlank: false,
                            name: 'coa_coa_id',
                            fieldLabel: 'Coa Name',
                            // flex: 2,
                            displayField: 'name',
                            valueField: 'coa_id',
                            width: 420,
                            queryMode: 'local',
                            matchFieldWidth: false,
                            enforceMaxLength: true,
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="600px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="50px"><div class="x-column-header x-column-header-inner">Coa Account</div></th>',
                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                            absoluteReadOnly: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            forceSelection: true,
                            typeAhead: false,
                            listeners: {
                                keyup: function (field) {
                                    var c = 0;
                                    var searchString = field.getValue();
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('coa').toString().toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            }else if (record.get('name').toString().toUpperCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('coa').toString().toUpperCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            }  else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                                afterrender: function (field) {
                                    field.focus(false, 1000);
                                }
                            },
                        },
                        {
                            xtype: 'splitter',
                            width: 10,
                        },
                        {
                            xtype: 'textfield',
                            name: 'coa_coa',
                            fieldLabel: 'Coa Description',
                            anchor: '-5',
                            readOnly: true,
                            emptyText: 'Auto Value',
                            width: 100,
                            flex: 1
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            name: 'coa_name',
                            emptyText: 'Auto Value',
                            anchor: '-5',
                            width: 100,
                            readOnly: true,
                            flex: 1

                        },
//
                    ]
                },
//                {
//                    xtype: 'textfield',
//                    name: 'coa_coa',
//                    fieldLabel: 'Coa account',
//                    enforceMaxLength: true,
//                    maxLength: 50,
//                    anchor: '-5',
//                    readOnly:true
//
//                },
//                {
//                    xtype: 'textfield',
//                    name: 'coa_name',
//                    fieldLabel: 'Coa Description',
//                    enforceMaxLength: true,
//                    maxLength: 50,
//                    anchor: '-5',
//                    readOnly:true
//
//                },
//
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
                            fieldLabel: 'Kel Sub',
                            name: 'kelsub_kelsub',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            flex: 1
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            name: 'kelsub_description',
                            emptyText: 'Auto Value',
                            width: 195,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            // flex: 1
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype          : 'combobox',
                            fieldLabel     : 'CASHFLOW by COA ',                   //di hide
                            forceSelection : true,
                            name           : 'cashflow_setupcashflow_id_hidden',
                            displayField   : 'cashflowtype_cashflowtype',
                            valueField     : 'setupcashflow_id',
                            flex           : 2,
                            hidden         : true,
                            allowBlank     : true,
                            forceSelection : true,
                            typeAhead      : false,
                            enableKeyEvents: true,
                            listeners      : {
                                keyup: function (field) {
                                    var c = 0;
                                    var searchString = field.getValue();
                                    if(searchString == null){
                                        return false;
                                    }
                                    if (searchString.length > 0) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('cashflowtype_cashflowtype').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                                afterrender: function (field) {
                                    field.focus(false, 1000);
                                }
                            },
                        },
                        {
                            xtype          : 'combobox',
                            fieldLabel     : 'Cashflow ',
                            name           : 'cashflow_setupcashflow_id',
                            displayField   : 'cashflowtype_cashflowtype',
                            valueField     : 'setupcashflow_id',
                            flex           : 2,
                            queryMode      : 'local',
                            enableKeyEvents: true,
                            rowdata        : null,
                            forceSelection : true,
                            typeAhead      : false,
                            listeners      : {
                                keyup: function (field) {
                                    var c            = 0;
                                    var searchString = field.getValue();
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('cashflowtype_cashflowtype').toString().toLowerCase().indexOf(searchString.toString().toLowerCase()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            }else if (record.get('cashflowtype_cashflowtype').toString().toUpperCase().indexOf(searchString.toString().toUpperCase()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                            },
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
                            xtype: 'combobox',
                            fieldLabel: 'PPN',
                            forceSelection: true,
                            name: 'ppn_tipepajakdetail_id',
                            displayField: 'tipepajakdetail',
                            valueField: 'tipepajakdetail_id',
                            // flex: 2,
                            width: 300,
                            forceSelection: true,
                            typeAhead: false,
                        },
                        {
                            xtype: 'splitter',
                            width: 10,
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: '',
                            name: 'ppn_percentage',
                            emptyText: 'PPN Percentage',
                            readOnly: false,
                            allowBlank: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            width: 110,
                            // flex: 1
                        },
                        {
                            xtype: 'splitter',
                            width: 10,
                        },
                        {
                            xtype: 'combobox',
                            // allowBlank: false,
                            name: 'coa_coa_id_cf',
                            fieldLabel: 'Link Coa CF',
                            id: 'formcoadetail_coa_id_cf',
                            itemId: 'formcoadetail_coa_id_cf',
                            // flex: 2,
                            displayField: 'name',
                            valueField: 'coa_id',
                            width: 430,
                            hidden: true,
                            queryMode: 'local',
                            matchFieldWidth: false,
                            enforceMaxLength: true,
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="600px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="50px"><div class="x-column-header x-column-header-inner">Coa Account</div></th>',
                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                            absoluteReadOnly: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            forceSelection: true,
                            typeAhead: false,

                            listeners: {
                                keyup: function (field) {
                                    var c = 0;
                                    var searchString = field.getValue();
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('coa').toString().toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            }else if (record.get('name').toString().toUpperCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('coa').toString().toUpperCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            }  else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                            },
                        },
                        ,
                    ]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'PPh',
                            forceSelection: true,
                            name: 'pph_tipepajakdetail_id',
                            displayField: 'tipepajakdetail',
                            valueField: 'tipepajakdetail_id',
                            // flex: 2,
                            typeAhead: false,
                            width: 300,
                        },
                        {
                            xtype: 'splitter',
                            width: 10,
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: '',
                            name: 'pph_percentage',
                            emptyText: 'PPH Percentage',
                            width: 110,
                            readOnly: false,
                            allowBlank: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            // flex: 1
                        },
                        ,
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
                            xtype: 'combobox',
                            fieldLabel: 'Cashbon ',
                            name: 'kasbondept_id',
                            displayField: 'kasbondept_no',
                            valueField: 'kasbondept_id',
                            // flex: 2,
                            hidden: false,
                            typeAhead: false,
                            width: 420,
                        },
                        {
                            xtype: 'splitter',
                            width: 10,
                        },
                        {
                            xtype: 'combobox',
                            name: 'exclude_kwitansi',
                            fieldLabel: 'Exclude in Kwitansi',
                            queryMode: 'local',
                            valueField: 'value',
                            forceSelection: true,
                            msgTarget: "side",
                            displayField: 'description',
                            store: new Ext.data.JsonStore({
                                fields: ['value', 'description'],
                                data: [
                                    {value: 'no', description: 'No'},
                                    {value: 'yes', description: 'Yes'},
                                ]
                            }),
                            width: 430,
                        },
                    ],
                },
//                {
//                    xtype: 'textfield',
//                    name: 'type',
//                    fieldLabel: 'Data Flow',
//                    enforceMaxLength: true,
//                    maxLength: 30,
//                    anchor: '-5',
//                    readOnly:true
//
//                },
//                {
//                    xtype: 'textfield',
//                    itemId: 'attributevalue',
//                    name: 'persen',
//                    fieldLabel: 'Persen',
//                    enforceMaxLength: true,
//                    maxLength: 50,
//                    anchor: '-5',
//                    allowBlank: false,
//
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
                            xtype: 'label',
                            itemId: 'affiliasiNameId',
                            id: 'affiliasiNameId',
                            text: '',
                            hidden: true,
                            width: 50,
                        },
                        {
                            xtype: 'splitter',
                            width: '53',
                        },
                        {
                            xtype: 'textfield',
                            name: 'unit_number',
                            //fieldLabel: 'Description',
                            enforceMaxLength: true,
                            maxLength: 50,
                            anchor: '-5',
                            flex: 2,
                            hidden: true,
                            disabled: true,
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnBrowseAsset',
                            action: 'browseAsset',
                            padding: 5,
                            width: 30,
                            height: 25,
                            iconCls: 'icon-search',
                            text: '',
                            hidden: true,
                            disabled: true,
                        },
                        {
                            xtype: 'combobox',
                            forceSelection: true,
                            hidden: true,
                            name: 'subgl_subgl_id',
                            displayField: 'code',
                            valueField: 'subgl_id',
                            queryMode: 'local',
                            //pageSize: 25,
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="700px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                                    '<th width="150px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                            flex: 2,
                            typeAhead: false,
                            listeners: {
                                keyup: function (field) {
                                    var c = 0;
                                    var searchString = field.getValue();

                                    if (searchString.length > 0) {

                                        this.store.filterBy(function (record, id) {
                                            if (record.get('code').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('description').toLowerCase().indexOf(field.getValue()) > -1) {
                                                return true;

                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }

                                },
                                buffer: 300,
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{code} - {description}',
                                    '</tpl>'
                                    )
                        },
                    ]
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'amount',
                    fieldLabel: 'Amount ',
                    emptyText: 'Amount',
                    anchor: '-5',
                    maskRe: /[0-9\-\.]/,
                    allowBlank: false,
                    fieldStyle: 'text-align:right;align:right',
                    width: '500'
                },
                {
                    xtype: 'textareafield',
                    name: 'remarks',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    fieldStyle: 'text-transform: uppercase',
                    anchor: '-5',
                    flex: 2
                },
                //hidden on 25 APRIL 2018, perubahan teknis semy
                {xtype: 'vouchersubcoadetailgrid',
                    itemId: 'vouchersubcoadetail_grid',
                    name: 'vouchersubcoadetailgrid',
                    hidden: true}






            ],
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
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'savenew',
                        itemId: 'btnSaveNew',
                        padding: 5,
                        width: 105,
                        iconCls: 'icon-save',
                        text: 'Save & New'
                    },
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
                    }
                ]
            }
        ];
        return x;
    },
});

