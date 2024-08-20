Ext.define('Cashier.view.voucher.FormDataL', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.voucherformrealization',
    frame        : true,
    autoScroll   : true,
    anchorSize   : 100,
    bodyBorder   : true,
    bodyPadding  : 10,
    kosongGa     : -1,
    height       : 250,
    uniquename   : '_voucherrequesdsdsdstsubdetail',
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    name : 'mandatory_project_close_date',
                }, {
                    xtype: 'hiddenfield',
                    name : 'kasbank_id',
                }, {
                    xtype: 'hiddenfield',
                    name : 'kelsub_id'
                }, {
                    xtype: 'hiddenfield',
                    name : 'subgl_id'
                },
                {
                    xtype: 'hiddenfield',
                    name : 'kasbank_id_arpayment',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'voucher_no',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'paymentflag_id',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'dataflow',
                },
                    //                {
                    //                    xtype: 'hiddenfield',
                    //                    name: 'payment_paymentmethod_id',
                    //                },
                {
                    xtype: 'hiddenfield',
                    name : 'issued_date',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'is_temp_realized',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'cheque_cheque_id',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'purchaseletter_purchaseletter_id',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'unit_unit_id',
                },
                {
                    xtype         : 'combobox',
                    name          : 'temp_realized',
                    fieldLabel    : 'Tipe Realisasi',
                    queryMode     : 'local',
                    valueField    : 'type',
                    allowBlank    : false,
                    forceSelection: true,
                    displayField  : 'description',
                    store         : new Ext.data.JsonStore({
                        fields: ['type', 'description'],
                        data  : [
                            { type: '0', description: 'Realization' },
                            { type: '1', description: 'Temporary Realization' },
                        ]
                    }),
                },
                {
                    xtype           : 'textfield',
                    name            : 'voucherID',
                    fieldLabel      : 'Voucher ID',
                    enforceMaxLength: true,
                    maskRe          : /[^\`\"\']/,
                    anchor          : '-5',
                    width           : '300',
                    readOnly        : true,
                    allowBlank      : false,
                    fieldStyle      : 'background-color:#eee;background-image: none;'

                },
                {
                    xtype       : 'combobox',
                    name        : 'payment_paymentmethod_id',
                    fieldLabel  : 'Payment Type',
                    width       : '300',
                    valueField  : 'paymentmethod_id',
                    allowBlank  : true,
                    displayField: 'paymentmethod',
                },
                {
                    xtype         : 'combobox',
                    name          : 'voucherprefix_voucherprefix_id',
                    fieldLabel    : 'Kas/Bank',
                    displayField  : 'coa_coa',
                    valueField    : 'voucherprefix_id',
                    id            : 'formdatarealvoucherprefix_voucherprefix_id',
                    itemId        : 'formdatarealvoucherprefix_voucherprefix_id',
                    width         : '700',
                    forceSelection: true,
                    allowBlank    : false,
                    readOnly      : false,
                    queryMode     : 'local',
                    tpl           : Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="600px" >',
                        '<tr class="x-grid-row">',
                        '<th width="170px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                        '<th width="80px"><div class="x-column-header x-column-header-inner">COA</div></th>',
                        '<th width="300px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{coa_coa}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{no_acc}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                    ),
                },
                {
                    xtype         : 'combobox',
                    name          : 'voucherprefix_voucherprefixcashbon_id',
                    fieldLabel    : 'Cashback To',
                    displayField  : 'coa_coa',
                    valueField    : 'voucherprefix_id',
                    id            : 'formdatarealvoucherprefix_voucherprefixcashbon_id',
                    itemId        : 'formdatarealvoucherprefix_voucherprefixcashbon_id',
                    width         : '700',
                    forceSelection: true,
                    allowBlank    : true,
                    readOnly      : false,
                    hidden        : true,
                    queryMode     : 'local',
                    tpl           : Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="600px" >',
                        '<tr class="x-grid-row">',
                        '<th width="170px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                        '<th width="80px"><div class="x-column-header x-column-header-inner">COA</div></th>',
                        '<th width="300px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{coa_coa}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{no_acc}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                    ),
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                            //                        {
                            //                            xtype: 'textfield',
                            //                            name: 'bank_name',
                            //                            fieldLabel: 'Bank or Provider',
                            //                            width: '200',
                            //                            hidden: true
                            //                        },

                        {
                            xtype : 'label',
                            id    : 'chequenoidlabel',
                            itemId: 'chequenoidlabel',
                            text  : ' Cheque No.',
                            style : {
                                color: '#000000',
                            },
                            hidden: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '42'
                        },
                        {
                            xtype: 'textfield',
                            name : 'cheque_cheque_no',
                                // fieldLabel: 'Cheque No.',
                            emptyText: 'Cheque',
                            width    : '100',
                            hidden   : true,
                            readOnly : true,
                        },
                        {
                            xtype  : 'button',
                            itemId : 'btnbrowseCheque',
                            action : 'browseCheque',
                            padding: 5,
                            width  : 30,
                            height : 25,
                            iconCls: 'icon-search',
                            text   : '',
                            hidden : true,
                        },
                    ]
                },
                {
                    xtype           : 'xmoneyfield',
                    fieldLabel      : 'Cashback Amount',
                    name            : 'cashback_amount',
                    width           : 300,
                    allowBlank      : true,
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                    readOnly        : true,
                    hidden          : true,
                },
                {
                    xtype           : 'datefield',
                    fieldLabel      : 'Payment Date',
                    name            : 'payment_payment_date',
                    format          : 'd-m-Y',
                    submitFormat    : 'Y-m-d',
                    width           : 300,
                    emptyText       : 'Manual Input',
                    allowBlank      : true,
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                    hidden          : true,
                    onDownArrow     : Ext.emptyFn,
                    listeners       : {
                        render: function() {
                            var picker = this.getPicker();
                            picker.on("select", function() {
                                this.hide();
                            });
                                //  this.triggerCell.hide();
                            this.inputCell.on("click", function() {
                                if (picker.hidden)
                                    picker.show();
                                else
                                    picker.hide();
                            });
                        }
                    }
                },
                {
                    xtype           : 'datefield',
                    fieldLabel      : 'Realization Date',
                    name            : 'realization_date',
                    format          : 'd-m-Y',
                    submitFormat    : 'Y-m-d',
                    width           : 300,
                    emptyText       : 'Manual Input',
                    allowBlank      : false,
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                    hideTrigger     : false,
                    onDownArrow     : Ext.emptyFn,
                    listeners       : {
                        render: function() {
                            var picker = this.getPicker();
                            picker.on("select", function() {
                                this.hide();
                            });
                                //  this.triggerCell.hide();
                            this.inputCell.on("click", function() {
                                if (picker.hidden)
                                    picker.show();
                                else
                                    picker.hide();
                            });
                        }
                    }
                },
                {
                    xtype           : 'datefield',
                    fieldLabel      : 'Project Close Date (Cashbon)',
                    name            : 'project_close_date',
                    format          : 'd-m-Y',
                    submitFormat    : 'Y-m-d',
                    width           : 300,
                    emptyText       : 'Manual Input',
                    allowBlank      : true,
                    enforceMaxLength: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                    hideTrigger     : false,
                    hidden          : true,
                    onDownArrow     : Ext.emptyFn,
                    listeners       : {
                        render: function() {
                            var picker = this.getPicker();
                            picker.on("select", function() {
                                this.hide();
                            });
                                //  this.triggerCell.hide();
                            this.inputCell.on("click", function() {
                                if (picker.hidden)
                                    picker.show();
                                else
                                    picker.hide();
                            });
                        }
                    }
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [{
                            xtype     : 'textfield',
                            name      : 'subgl_code',
                            fieldLabel: 'Sub Kas/Bank',
                            width     : '300',
                            readOnly  : true,
                            allowBlank: true,
                            msgTarget : "side",
                            blankText : 'This should not be blank!',
                            hidden    : true,
                                // fieldStyle: 'background-color:#eee;background-image: none;'
                        },
                        {
                            xtype   : 'button',
                            id      : 'btnbrowseSub',
                            itemId  : 'btnbrowseSub',
                            action  : 'browseSub',
                            padding : 5,
                            width   : 30,
                            height  : 25,
                            iconCls : 'icon-search',
                            text    : '',
                            hidden  : true,
                            disabled: false
                        },
                    ]
                },
                {
                    xtype     : 'textfield',
                    name      : 'bank_name',
                    fieldLabel: 'Bank or Provider',
                    width     : '250',
                    hidden    : true
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [{
                            xtype : 'label',
                            id    : 'realIdsadsdd',
                            itemId: 'realdsadsaId',
                            text  : ' Voucher No.',
                            style : {
                                color: '#000000',
                            },
                        },
                        {
                            xtype: 'splitter',
                            width: '39'
                        },
                        {
                            xtype     : 'textfield',
                            name      : 'prefixcode',
                            itemId    : 'prefixcode',
                            readOnly  : true,
                            allowBlank: false,
                            align     : 'right'
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'voucherint',
                            allowBlank      : false,
                            maskRe          : /[0-9\-]/,
                            enforceMaxLength: true,
                            anchor          : '-5',
                            width           : '50',
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    name : 'requestunrealizecontainer',
                    width: 300,
                    hidden: true,
                    items: [{
                            xtype : 'label',
                            id    : 'labelRequestUnrealize',
                            itemId: 'labelRequestUnrealize',
                            text  : 'Reason Request Unrealize',
                            style : {
                                color: '#000000',
                            },
                            width: 100
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype     : 'textareafield',
                            name      : 'reasonrequestunrealize',
                            width     : 432,
                            allowBlank: true,
                            fieldStyle: 'text-transform: uppercase',
                            height    : 40,
                            readOnly  : true
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [{
            xtype : 'toolbar',
            dock  : 'bottom',
            ui    : 'footer',
            layout: {
                padding: 6,
                type   : 'hbox'
            },
            items: [{
                    xtype   : 'button',
                    action  : 'unreal',
                    itemId  : 'btnUnRealization',
                    padding : 5,
                    width   : 100,
                    iconCls : 'icon-cancel',
                    text    : 'UnRealization',
                    disabled: true,
                },
                {
                    xtype: 'tbspacer',
                    flex : 1
                },
                {
                    xtype  : 'button',
                    action : 'save',
                    itemId : 'btnSave',
                    padding: 5,
                    width  : 100,
                    iconCls: 'icon-save',
                    text   : 'Save'
                },
                {
                    xtype  : 'button',
                    action : 'cancel',
                    itemId : 'btnCancel',
                    padding: 5,
                    width  : 75,
                    iconCls: 'icon-cancel',
                    text   : 'Cancel',
                    handler: function() {
                        this.up('window').close();
                    }
                }
            ]
        }];
        return x;
    },
});