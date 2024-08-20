Ext.define('Cashier.view.voucher.TenantGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.vouchertenantgrid',
    storeConfig: {
        id: 'IDselectedVendorStore',
        idProperty: 'vendor_id',
        extraParams: {
            mode_read: 'vendorlist',
            type_vendor: 'tenant'
        }
    },
    id: 'browseTenantGrid',
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Voucher',
    newButtonLabel: 'New Vendor',
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
                    dataIndex: 'vendorname',
                    hideable: false,
                    text: 'Vendor Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'project_name',
                    hideable: false,
                    text: 'Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'PT Name'
                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 200,
//                    dataIndex: 'address',
//                    hideable: false,
//                    text: 'Address'
//                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 200,
//                    dataIndex: 'office_phone',
//                    hideable: false,
//                    text: 'Office Phone'
//                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 200,
//                    dataIndex: 'mobile_phone',
//                    hideable: false,
//                    text: 'Mobile Phone'
//                },
//                {
//                    xtype: 'gridcolumn',
//                    width: 200,
//                    dataIndex: 'email',
//                    hideable: false,
//                    text: 'Email'
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
                    },
                     {
                        xtype: 'button',
                        action: 'create',
                        margin: '0 5 0 0',
                        text: "Add New ",
                        iconCls: 'icon-new',
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
                xtype: 'combobox',
                name: 'pt_pt_id',
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
                 id: 'ptArId',
                matchFieldWidth: false,
                tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="700" >',
                        '<tr class="x-grid-row">',
                        '<th width="250"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                        '<th width="300"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                        ),
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
                fieldLabel: 'Vendor Name',
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