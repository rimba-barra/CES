Ext.define('Cashier.view.voucher.VoucherRealizedGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.voucherrealizationgrid',
    storeConfig: {
        id: 'IDselectedVoucher',
        idProperty: 'kasbank_id',
        extraParams: {
            mode_read: 'voucherlist'
        }
    },
    id: 'browsevouchergridrealized',
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
                    dataIndex: 'realization_date',
                    text: 'Voucher date',
                    width: 100,
                    format: 'd-m-Y'
                },
                {
                    dataIndex: 'voucher_no',
                    text: 'Voucher No.',
                    width: 120
                },
                {
                    dataIndex: 'coa_coa',
                    text: 'Account',
                    width: 100
                },
                {
                    dataIndex: 'dataflow',
                    text: 'Mutation',
                    width: 80
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'amount',
                    text: 'Amount',
                    width: 200
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
                        action: 'select',
//                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Copy voucher selected"
                    }
                    ,{
                        xtype: 'combobox',
                        name: 'limit',
//                        fieldLabel: 'Records per Page',
                        emptyText: 'Records per Page',
                        queryMode: 'local',
                        valueField: 'limit',
                        // fieldLabel:'Cash IN/OUT',
                        //allowBlank: false,
                        forceSelection: true,
                        displayField: 'description',
                        width: 130,
                        store: new Ext.data.JsonStore({
                            fields: ['limit', 'description'],
                            data: [
                                {limit: '25', description: 'Default'},
                                {limit: '100', description: '100'},
                                {limit: '500', description: '500'},
                                {limit: '1000', description: '1000'},
                                {limit: '1500', description: '1500'},
                                {limit: '2000', description: '2000'},
                                {limit: '3000', description: '3000'},
                                {limit: '4000', description: '4000'},
                                {limit: '5000', description: '5000'},
                                {limit: '6000', description: '6000'},
                                {limit: '200000', description: 'ALL Data'},
                            ]
                        }),
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
                id: 'ptVoucherIdR',
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
                    change : function(v) {
                      if(v.value) {
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