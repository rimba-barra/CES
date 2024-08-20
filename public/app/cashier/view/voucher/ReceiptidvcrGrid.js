Ext.define('Cashier.view.voucher.ReceiptidvcrGrid', {
    extend     : 'Cashier.library.template.view.GridDS2Browse',
    alias      : 'widget.receiptidvcrgrid',
    storeConfig: {
        id         : 'IDselectedreceiptidvcr',
        idProperty : 'receipt_id',
        extraParams: {
            mode_read: 'receiptidvcr'
        }
    },
    id            : 'browsereceiptidvcrid',
    simpleSelect  : true,
    height        : 300,
    bindPrefixName: 'Voucher',
    newButtonLabel: 'New Unit',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig : {
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
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'receipt_type',
                    hideable : false,
                    text     : 'Type'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'prefix_no',
                    hideable : false,
                    text     : 'Prefix'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 150,
                    dataIndex: 'receipt_no',
                    hideable : false,
                    text     : 'Receipt #'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'status',
                    hideable : false,
                    text     : 'Status'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 150,
                    dataIndex: 'description',
                    hideable : false,
                    text     : 'Remarks'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 150,
                    dataIndex: 'voucherid',
                    hideable : false,
                    text     : 'Voucher ID'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 150,
                    dataIndex: 'addon',
                    hideable : false,
                    text     : 'Add on',
                    renderer : Ext.util.Format.dateRenderer('d-m-Y h:i:s'),
                    renderer : function (value, metaData, record, row, col, store, gridView) {
                        if (moment(record.get('addon')).format("DD-MM-YYYY") == "01-01-1900") {
                            return '-';
                        } else {
                            return moment(record.get('addon')).format("DD-MM-YYYY HH:mm:ss");
                        }

                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 150,
                    dataIndex: 'addbyname',
                    hideable : false,
                    text     : 'Add By'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype      : 'pagingtoolbar',
                dock       : 'bottom',
                width      : 360,
                displayInfo: true,
                store      : this.getStore()
            },
            {
                xtype : 'toolbar',
                dock  : 'top',
                height: 28,
                items : [{
                        xtype : 'button',
                        action: 'selectreceipt',
                        id    : 'btnselectreceipt',
                        itemId: 'btnselectreceipt',
  //                        disabled: true,
                        margin : '0 5 0 0',
                        iconCls: 'icon-approve',
                        text   : "Pick Receipt",
                        hidden : false,
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {


        var x = [
            {
                xtype: 'hiddenfield',
                id   : 'projectVoucherIdReffvcr',
                name : 'project_id'
            },
            {
                xtype           : 'combobox',
                name            : 'pt_id',
                fieldLabel      : 'Company',
                displayField    : 'name',
                valueField      : 'pt_id',
                width           : 250,
                allowBlank      : false,
                readOnly        : true,
                enforceMaxLength: true,
                dataBinder      : 'pt',
                queryMode       : 'local',
                matchFieldWidth : false,
                tpl             : Ext.create('Ext.XTemplate',
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
                enableKeyEvents : true,
                rowdata         : null,
                forceSelection  : false,
                typeAhead       : false,
                id              : 'ptVoucherIdReffvcr',
                listeners       : {
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
                xtype           : 'textfield',
                name            : 'receipt_no',
                fieldLabel      : 'Receipt No',
                width           : 100,
                enforceMaxLength: true,
                maskRe          : /[^\`\"\']/,
            },
                {
                    xtype         : 'combobox',
                    name          : 'status',
                    id            : 'statusVoucherIdReffvcr',
                    fieldLabel    : 'Status',
                    queryMode     : 'local',
                    valueField    : 'status',
                    allowBlank    : true,
                    forceSelection: true,
                    displayField  : 'description',
                    store         : new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data  : [
                            {status: 'all', description: 'ALL'},
                            {status: 'new', description: 'New'},
                            {status: 'used', description: 'Used'},
                            {status: 'void', description: 'Void'},
                        ]
                    }),
                    dvalue: 'new',
                },
                {
                    xtype         : 'combobox',
                    name          : 'receipt_type',
                    id            : 'typeVoucherIdReffvcr',
                    fieldLabel    : 'Type',
                    queryMode     : 'local',
                    valueField    : 'type',
                    allowBlank    : true,
                    forceSelection: true,
                    displayField  : 'description',
                    store         : new Ext.data.JsonStore({
                        fields: ['type', 'description'],
                        data  : [
                            {type: 'all', description: 'ALL'},
                            {type: 'default', description: 'Default'},
                            {type: 'rs', description: 'RS'},
                        ]
                    }),
                    dvalue: 'all',
                },
        ];
        return x;
    }
});