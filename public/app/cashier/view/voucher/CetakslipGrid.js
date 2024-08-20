Ext.define('Cashier.view.voucher.CetakslipGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.vouchercetakslipgrid',
    storeConfig: {
        id: 'IDselectedCetakslipStore',
        idProperty: 'slip_id',
        extraParams: {
            mode_read: 'slipsetoran'
        }
    },
    id: 'browsecetakslipgrid',
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
                {
                    dataIndex: 'norek_customer',
                    text: 'No Rek Customer',
                    width: 150
                },
                {
                    dataIndex: 'nama_customer',
                    text: 'Nama Customer',
                    width: 150
                },
                {
                    dataIndex: 'alamat_customer',
                    text: 'Alamat Customer',
                    width: 150
                },
                {
                    dataIndex: 'nama_penyetor',
                    text: 'Nama Penyetor',
                    width: 150
                },
                {
                    dataIndex: 'norek_penyetor',
                    text: 'No Rek Penyetor',
                    width: 150
                },
                {
                    dataIndex: 'alamat_penyetor',
                    text: 'Alamat Penyetor',
                    width: 150
                },
                {
                    dataIndex: 'telp_penyetor',
                    text: 'Telp Penyetor',
                    width: 150
                },
                {
                    dataIndex: 'amount',
                    text: 'Amount',
                    width: 150
                },
                {
                    dataIndex: 'terbilang',
                    text: 'Terbilang',
                    width: 150
                },
                {
                    dataIndex: 'mata_uang',
                    text: 'Mata Uang',
                    width: 150
                },
                {
                    dataIndex: 'nama_bank',
                    text: 'Nama Bank',
                    width: 150
                },
                {
                    dataIndex: 'nama_yang_dapat_dihubungi',
                    text: 'Nama yang dapat dihubungi',
                    width: 150
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
                        id:'selectcsg',
                        itemId:'selectcsg',
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        disabled: true,
                        text: "Select"
                    },
                    {
                        xtype: 'button',
                        action: 'createnew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: "Create New"
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: "Update"
                    },
                    {
                        xtype: 'button',
                        action: 'delete',
                        id:'deletecsg',
                        itemId:'deletecsg',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        disabled: true,
                        text: "Delete"
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
                xtype: 'hiddenfield',
                id: 'csgkasbank_id',
                name: 'kasbank_id'
            },
            {
                xtype: 'textfield',
                itemId: 'fscsg_value',
                name: 'value',
                fieldLabel: 'Nama Penyetor',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 200
            },
            {
                xtype: 'textfield',
                itemId: 'fscsg_value2',
                name: 'value2',
                fieldLabel: 'Nama Bank',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 200
            },
            {
                xtype: 'textfield',
                itemId: 'fscsg_value3',
                name: 'value3',
                fieldLabel: 'Mata Uang',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 200
            },
            {
                xtype: 'textfield',
                itemId: 'fscsg_value4',
                name: 'value4',
                fieldLabel: 'Norek Penyetor',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 200
            },
        ];
        return x;
    }
});