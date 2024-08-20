Ext.define('Cashier.view.voucher.CustomerGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.vouchercustomergrid',
    storeConfig: {
        id: 'IDselectedCustomerStore',
        idProperty: 'customer_id',
        extraParams: {
            mode_read: 'customerlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Voucher',
    newButtonLabel: 'New Customer',
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
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'ktp',
                    hideable: false,
                    text: 'KTP No.'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'npwp',
                    hideable: false,
                    text: 'NPWP No.'
                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 300,
//                    dataIndex: 'address',
//                    hideable: false,
//                    text: 'Address'
//                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 100,
//                    dataIndex: 'mobile_phone',
//                    hideable: false,
//                    text: 'Mobile'
//                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 100,
//                    dataIndex: 'home_phone',
//                    hideable: false,
//                    text: 'home_phone'
//                },
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
                        disabled: true,
                        //hidden: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Pick and Close"
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {

        var cbf = new Cashier.template.ComboBoxFields();

        var x = [
            {
                xtype: 'combobox',
                name: 'pt_pt_id',
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_id',
                readOnly: false,
                allowBlank: true,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: false,
                typeAhead: false,
                dataBinder: 'pt',
                 id: 'ptArId',
                listeners: {
                    keyup: function (field) {
                        var c = 0;
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
                xtype: 'textfield',
                itemId: 'fsms_name',
                name: 'name',
                fieldLabel: 'Customer Name',
                enforceMaxLength: true,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                itemId: 'phone',
                name: 'mobile_phone',
                fieldLabel: 'Mobile Phone',
                enforceMaxLength: true,
            },
            
        ];
        return x;
    }
});