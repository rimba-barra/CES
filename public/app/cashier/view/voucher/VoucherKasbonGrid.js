Ext.define('Cashier.view.voucher.VoucherKasbonGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.voucherkasbongrid',
    storeConfig: {
        id: 'IDselectedKasbon',
        idProperty: 'kasbon_id',
        extraParams: {
            mode_read: 'kasbonlist'
        }
    },
    id: 'browsekasbongridrealized',
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Voucher',
    newButtonLabel: 'New Unit',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
//               
                {xtype: 'datecolumn',
                    dataIndex: 'accept_date',
                    text: 'Accept date',
                    width: 100,
                    format: 'd-m-Y'
                },
                {
                    dataIndex: 'voucher_no',
                    text: 'Voucher No.',
                    width: 100
                },
                {
                    dataIndex: 'pt_name',
                    text: 'Company',
                    width: 200
                },
                {
                    dataIndex: 'project_name',
                    text: 'Project',
                    width: 200
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'amount',
                    text: 'Amount',
                    width: 100
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width: 300
                },
//                
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'savetoarrkasbon',
//                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Copy selected"
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'label',
                        forId: 'myFieldIdsd',
                        id: 'kasbonselected',
                        itemId: 'kasbonselected',
                        text: '0 Kasbon selected',
                        style: {
                            position: 'relative',
                            margin: '-5 10 0 0',
                            color: '#ff0000',
                        },
                    },
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-save',
                        text: "Load to voucher"
                    },
                    {
                        xtype: 'button',
                        action: 'cleararrkasbon',
                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: "Clear"
                    },
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {


        var x = [
            {
                xtype: 'hiddenfield',
                name: 'project_id'
            },
            {
                xtype: 'combobox',
                name: 'pt_id',
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_id',
                width: 250,
                allowBlank: false,
                readOnly: false,
                enforceMaxLength: true,
                dataBinder: 'pt',
                queryMode: 'local',
                matchFieldWidth: false,
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
                absoluteReadOnly: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: false,
                typeAhead: false,
                id: 'ptKasbonIdR',
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
                    change: function (v) {
                        if (v.value) {
                            //console.log(v);
                        }
                    },
                    buffer: 300,
                },
            },
            {
                xtype: 'combobox',
                name: 'pt_id_cashbon',
                fieldLabel: 'PT Cashbon',
                displayField: 'pt_name',
                valueField: 'pt_id_cashbon',
                width: 250,
                allowBlank: false,
                readOnly: false,
                enforceMaxLength: true,
                dataBinder: 'ptcashbon',
                queryMode: 'local',
                matchFieldWidth: false,
                tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px">',
                        '<tr class="x-grid-row">',
                        '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{pt_code}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                        ),
                absoluteReadOnly: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: false,
                typeAhead: false,
                id: 'ptForKasbonId',
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
                    change: function (v) {
                        if (v.value) {
                            //console.log(v);
                        }
                    },
                    buffer: 300,
                },
            },
            {
                xtype: 'textfield',
                name: 'voucher_no',
                fieldLabel: 'Voucher No. ',
                maxLength: 30,
                anchor: '-15',
                width: 100,
                listeners: {
                    afterrender: function (field) {
                        field.focus(false, 1000);
                    }
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Periode  ',
                name: 'from',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                width: 250,
                emptyText: 'FROM',
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                hideTrigger: false,
                onDownArrow: Ext.emptyFn,
                listeners: {
                    render: function () {
                        var picker = this.getPicker();
                        picker.on("select", function () {
                            this.hide();
                        });
                        //  this.triggerCell.hide();
                        this.inputCell.on("click", function () {
                            if (picker.hidden)
                                picker.show();
                            else
                                picker.hide();
                        });
                    }
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'To ',
                name: 'to',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                width: 250,
                emptyText: 'TO',
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                hideTrigger: false,
                onDownArrow: Ext.emptyFn,
                listeners: {
                    render: function () {
                        var picker = this.getPicker();
                        picker.on("select", function () {
                            this.hide();
                        });
                        //  this.triggerCell.hide();
                        this.inputCell.on("click", function () {
                            if (picker.hidden)
                                picker.show();
                            else
                                picker.hide();
                        });
                    }
                }
            },
            {
                xtype: 'textfield',
                name: 'description',
                fieldLabel: 'Description ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
            },
        ];
        return x;
    }
});