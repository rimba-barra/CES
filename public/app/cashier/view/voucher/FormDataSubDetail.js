Ext.define('Cashier.view.voucher.FormDataSubDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vouchersubdetailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    uniquename: '_voucherrequestsubdetail',
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'statedata',
                    id: 'statedata' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'uniqueid',
                    id: 'uniqueid' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucher_id',
                    id: 'voucher_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucherdetail_id',
                    id: 'voucherdetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucherdetail_voucherdetail_id',
                    id: 'voucherdetail_voucherdetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'vouchersubdetail_id',
                    id: 'vouchersubdetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_kelsub_id',
                    id: 'kelsub_id' + me.uniquename,
                },
//                {
//                    xtype: 'hiddenfield',
//                    name: 'subgl_code',
//                },
                {
                    xtype: 'hiddenfield',
                    name: 'subgl_subgl_id',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            width: 700,
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'voucherdetail_indexdata',
                                    id: 'indexdata' + me.uniquename,
                                    fieldLabel: 'Index',
                                    width: 200,
                                    readOnly: true,
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10',
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'indexsubdata',
                                    readOnly: true,
                                    allowBlank: false,
                                    hidden: true,
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kel Sub.',
                            itemId: 'fd_kelsub' + me.uniquename,
                            id: 'kelsub' + me.uniquename,
                            name: 'kelsub_kelsub',
                            width: 300,
                            readOnly: true,
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            width: 700,
                            items: [
//                                {
//                                    xtype: 'combobox',
//                                    fieldLabel: 'Sub Code',
//                                    name: 'subgl_subgl_id',
//                                    emptyText: 'Select Sub Code',
//                                    width: 300,
//                                    displayField: 'code',
//                                    valueField: 'subgl_id',
//                                    allowBlank: false,
//                                    enforceMaxLength: true,
//                                    enableKeyEvents: true,
//                                    rowdata: null,
//                                    forceSelection: false,
//                                    typeAhead: false,
//                                    matchFieldWidth: false,
//                                    tpl: Ext.create('Ext.XTemplate',
//                                            '<table class="x-grid-table" width="700" >',
//                                            '<tr class="x-grid-row">',
//                                            '<th width="100"><div class="x-column-header x-column-header-inner">Subcode</div></th>',
//                                            '<th width="80"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
//                                            '<th width="80"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
//                                            '<th width="80"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
//                                            '<th width="80"><div class="x-column-header x-column-header-inner">Code 4</div></th>',
//                                            '<th width="150"><div class="x-column-header x-column-header-inner">Description</div></th>',
//                                            '</tr>',
//                                            '<tpl for=".">',
//                                            '<tr class="x-boundlist-item">',
//                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
//                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
//                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
//                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
//                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
//                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
//                                            '</tr>',
//                                            '</tpl>',
//                                            '</table>'
//                                            ),
//                                    listeners: {
//                                        keyup: function (field) {
//                                            var c = 0;
//                                            var searchString = field.getValue();
//
//                                            if (searchString) {
//
//                                                this.store.filterBy(function (record, id) {
//                                                    if (record.get('description').toLowerCase().indexOf(field.getValue()) > -1) {
//                                                        return true;
//                                                        this.store.clearFilter(true);
//                                                    }
//                                                    else if (record.get('code').toLowerCase().indexOf(field.getValue()) > -1) {
//                                                        return true;
//                                                        this.store.clearFilter(true);
//                                                    }
//                                                    else if (record.get('code1').toLowerCase().indexOf(field.getValue()) > -1) {
//                                                        return true;
//                                                        this.store.clearFilter(true);
//                                                    }
//                                                    else if (record.get('code2').toLowerCase().indexOf(field.getValue()) > -1) {
//                                                        return true;
//                                                        this.store.clearFilter(true);
//                                                    }
//                                                    else {
//                                                        return false;
//                                                        this.store.clearFilter(true);
//                                                    }
//                                                });
//                                            }
//
//                                        },
//                                        //buffer:300,
//                                    },
//                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Sub Code',
                                    name: 'subgl_code',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10',
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnBrowseSub',
                                    action: 'browsesubcode',
                                    padding: 5,
                                    width: 120,
                                    height: 25,
                                    iconCls: 'icon-search',
                                    text: 'Browse Sub Code',
                                    fieldLabel: 'Browse Sub Code',
                                    title: 'Browse Sub Code',
                                    hidden: false,
                                },
                            ]
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
                    width: 700,
                    items: [
                        {
                            xtype: 'splitter',
                            width: '105',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code1' + me.uniquename,
                            id: 'code1' + me.uniquename,
                            name: 'subgl_code1',
                            emptyText: 'Code 1',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code2' + me.uniquename,
                            id: 'code2' + me.uniquename,
                            name: 'subgl_code2',
                            emptyText: 'Code 2',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code3' + me.uniquename,
                            id: 'code3' + me.uniquename,
                            name: 'subgl_code3',
                            emptyText: 'Code 3',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code4' + me.uniquename,
                            id: 'subgl_code4' + me.uniquename,
                            name: 'subgl_code4',
                            emptyText: 'Code 4',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_description' + me.uniquename,
                            id: 'subgl_description' + me.uniquename,
                            name: 'subgl_description',
                            emptyText: 'Sub Description',
                            width: 100,
                            readOnly: true,
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
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_amount' + me.uniquename,
                            id: 'amount' + me.uniquename,
                            name: 'amount',
                            fieldLabel: 'Amount',
                            value: 0,
                            width: 300,
                            minValue: 1,
                            allowBlank: false,
                            maskRe: /[0-9\-\.]/,
                        },
                    ]
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Description',
                    itemId: 'fd_remarks' + me.uniquename,
                    id: 'remarks' + me.uniquename,
                    name: 'remarks',
                    emptyText: '',
                    fieldStyle: 'text-transform: uppercase',
                    width: 600,
                    grow: true,
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

