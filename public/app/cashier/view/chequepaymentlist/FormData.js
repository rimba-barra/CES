Ext.define('Cashier.view.chequepaymentlist.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.chequepaymentlistformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    minHeight: 150,
    maxHeight: 220,
    autoHeight: true,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
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
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_pt_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 200,
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'projectpt_id',
                            fieldLabel: 'Company',
                            displayField: 'name',
                            valueField: 'pt_projectpt_id',
                            readOnly: false,
                            id: 'ptchequepaymentlist',
                            itemId: 'ptchequepaymentlist',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            flex: 2,
                            forceSelection: true,
                            typeAhead: false,
                            absoluteReadOnly: true,
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="500px">',
                                    '<tr class="x-grid-row">',
                                    '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                            listeners: {
                                keyup: function (field) {
                                    var searchString = field.getValue();
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
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
//                {
//                xtype: 'button',
//                action: 'selectyear',
//                itemId: 'btnSelectYearid',
//                padding: 5,
//                width: 150,
//                maxWidth:150,
//                iconCls: 'icon-save',
//                text: 'Year',
//                align:'right',
//                cls:'btnYear',
//                disabled:true,
//                },


                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 100,
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'voucherprefix_voucherprefix_id',
                            fieldLabel: 'Bank',
                            displayField: 'description',
                            valueField: 'voucherprefix_id',
                            flex: 2,
                            forceSelection: true,
                            allowBlank: true,
                            readOnly: true,
                            enforceMaxLength: true,
                            queryMode: 'local',
                            rowdata: null,
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            matchFieldWidth: false,
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="430px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="50px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="380px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix_prefix}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'allprefix',
                            boxLabel: 'All prefix',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: 1,
                            uncheckedValue: 0,
                            checked: true,
                            flex: 1,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'allpaymenttype',
                            boxLabel: 'All Payment Types',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: 1,
                            uncheckedValue: 0,
                            checked: false,
                            flex: 1,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 100,
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Issued Date ',
                            name: 'from',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'To ',
                            name: 'to',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                        },
                    ]
                },
                {
                    xtype: 'splitter',
                    height: '20'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                    ]
                },
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
                    type: 'hbox'
                }, items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        itemId: 'btnSelectChequePayment',
                        id: 'btnselectid',
                        padding: 5,
                        width: 75,
                        flex: 1,
                        maxWidth: 75,
                        iconCls: 'icon-search',
                        text: 'Process',
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
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

