Ext.define('Erems.view.purchaseletter.CGrid', {
    extend : 'Erems.library.template.view.GridDS2',
    alias  : 'widget.morecustomergrid',
    store  : 'Morecustomer',
    //    storeConfig: {
    //        id: 'morecustomerGridStore',
    //        idProperty: 'purchaseletter_customer_id',
    //        extraParams: {
    //            mode_read:'morecustomerlist'
    //        }
    //    },
    //    simpleSelect: true,
    height         : 300,
    bindPrefixName : 'Purchaseletter',
    newButtonLabel : 'New',
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),

            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype : 'gridcolumn',
                width : 11
            },
            columns: [
                {
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_id',
                    text      : 'Customer ID'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_name',
                    text      : 'Customer Name'
                },
                {
                    xtype     : 'numbercolumn',
                    dataIndex : 'customer_porsi_kepemilikan_customer',
                    text      : 'Porsi<br>Kepemilikan (%)'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_address',
                    text      : 'Alamat Koresponden'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_ktp',
                    text      : 'KTP Number'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_ktp_adress',
                    text      : 'KTP Address'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_npwp',
                    text      : 'No NPWP'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_homephone',
                    text      : 'Home Phone'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_mobilephone',
                    text      : 'Mobile Phone'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'customer_email',
                    text      : 'Email'
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
                        action: 'add',
                        disabled: false,
                        margin: '0 5 0 0',
                        text: "Add New"
                    },
                    {
                        xtype: 'button',
                        action: 'edit',
                        disabled: false,
                        margin: '0 5 0 0',
                        text: "Edit"
                    },
                    {
                        xtype: 'button',
                        action: 'delete',
                        disabled: false,
                        margin: '0 5 0 0',
                        text: "Delete"
                    }
                ]
            }
        ];
        return dockedItems;
    },

});