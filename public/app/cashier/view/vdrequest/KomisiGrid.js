Ext.define('Cashier.view.vdrequest.KomisiGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.vdrequestkomisigrid',
    storeConfig: {
        id: 'IDselectedCommissionStore',
        idProperty: 'komisi_klaim_id',
        extraParams: {
            mode_read: 'komisiklaimlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Vdrequest',
    newButtonLabel: 'New Commision',
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
                    width: 100,
                    dataIndex: 'penerima_komisi_code',
                    hideable: false,
                    text: 'Code Penerima'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'sales_name',
                    hideable: false,
                    text: 'Nama Sales'
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'cluster',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit No.'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'komisi_sudah_cair',
                    hideable: false,
                    text: 'Sudah Cair',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'komisi_belum_cair',
                    hideable: false,
                    text: 'Belum Cair',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'komisi_harus_cair',
                    hideable: false,
                    text: 'Harus Cair',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'persentase_komisi',
                    hideable: false,
                    align: 'right',
                    text: '% Komisi'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'nilai_komisi',
                    hideable: false,
                    text: 'Nilai Komisi',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'persentase_ppn',
                    hideable: false,
                    align: 'right',
                    text: '% PPN'
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'persentase_pph',
                    hideable: false,
                    align: 'right',
                    text: '% PPH'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Nama Customer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchaseletter No'
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
                name: 'pt_id',
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_projectpt_id',
                readOnly: false,
                allowBlank: true,
                enforceMaxLength: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: false,
                typeAhead: false,
                dataBinder: 'pt',
                id: 'ptCmsId',
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
                itemId: 'fsunit_number',
                name: 'unit_number',
                fieldLabel: 'Unit No',
                enforceMaxLength: true,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                itemId: 'fssales_name',
                name: 'sales_name',
                fieldLabel: 'Sales Name',
                enforceMaxLength: true,
            },
            {
                xtype: 'textfield',
                itemId: 'fspl_no',
                name: 'purchaseletter_no',
                fieldLabel: 'Purchaseletter No',
                enforceMaxLength: true,
            },
            
        ];
        return x;
    }
});