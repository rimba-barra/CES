Ext.define('Cashier.view.voucher.PemutihanGrid', {
    extend     : 'Cashier.library.template.view.GridDS2Browse',
    alias      : 'widget.voucherpemutihangrid',
    storeConfig: {
        id         : 'IDselectedPemutihanStore',
        idProperty : 'payment_id',
        extraParams: {
            mode_read: 'dendalist'
        }
    },
    id            : 'browsePemutihanGrid',
    simpleSelect  : true,
    height        : 300,
    bindPrefixName: 'Voucher',
    newButtonLabel: 'New Pemutihan Denda',
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
                {
                    xtype    : 'gridcolumn',
                    dataIndex: 'payment_no',
                    hideable : false,
                    text     : 'Receipt No.'
                },
                {
                    xtype    : 'gridcolumn',
                    dataIndex: 'unit_number',
                    hideable : false,
                    text     : 'Unit Number '
                },
                {
                    xtype    : 'gridcolumn',
                    dataIndex: 'payment_date',
                    hideable : false,
                    text     : 'Paid Date',
                    renderer : Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype    : 'gridcolumn',
                    dataIndex: 'total_payment',
                    hideable : false,
                    text     : 'Payment',
                    renderer : Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                    align    : 'right',
                    style    : 'text-align:left'
                },
                {
                    xtype    : 'gridcolumn',
                    dataIndex: 'note',
                    hideable : false,
                    text     : 'Description',
                    width    : 300,
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
                items : [
                    {
                        xtype   : 'button',
                        action  : 'selectpemutihandenda',
                        disabled: true,
                        id      : 'btnselectpemutihandenda',
                        itemId  : 'btnselectpemutihandenda',
                        hidden  : true,
                        margin  : '0 5 0 0',
                        iconCls : 'icon-approve',
                        text    : "Pilih Unit"
                    },
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {

        var cbf = new Cashier.template.ComboBoxFields();

        var x = [
            {
                xtype           : 'combobox',
                name            : 'pt_pt_id',
                fieldLabel      : 'Company',
                displayField    : 'name',
                valueField      : 'pt_id',
                readOnly        : false,
                allowBlank      : true,
                enforceMaxLength: true,
                enableKeyEvents : true,
                rowdata         : null,
                forceSelection  : false,
                typeAhead       : false,
                dataBinder      : 'pt',
                id              : 'ptArId',
                listeners       : {
                    keyup: function (field) {
                        var c            = 0;
                        var searchString = field.getValue();

                        if (searchString) {

                            this.store.filterBy(function (record, id) {

                                if (record.get('name').toLowerCase().indexOf(field.getValue()) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                }

                                else {
                                    return false;
                                    this.store.clearFilter(true);
                                }
                            });
                        }

                    },
                    buffer: 300,
                },
            },
            {
                xtype           : 'textfield',
                itemId          : 'fsms_name',
                name            : 'name',
                fieldLabel      : 'Unit Number',
                enforceMaxLength: true,
                maxLength       : 50
            },
            {
                xtype         : 'combobox',
                name          : 'cluster_name',
                fieldLabel    : 'Cluster Name',
                displayField  : 'cluster',
                valueField    : 'cluster_id',
                width         : '150',
                allowBlank    : true,
                forceSelection: true,
                dataBinder    : 'cluster',
                id            : 'clusterId',
                msgTarget     : "side",
                queryMode     : 'local',
                hidden        : true
            },
            {
                xtype           : 'textfield',
                itemId          : 'phone',
                name            : 'customer_name',
                fieldLabel      : 'Customer Name',
                enforceMaxLength: true,
                hidden          : true
            },
            {
                xtype           : 'textfield',
                itemId          : 'phonse',
                name            : 'customer_phone',
                fieldLabel      : 'Customer Phone',
                enforceMaxLength: true,
                hidden          : true
            },
        ];
        return x;
    }
});