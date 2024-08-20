Ext.define('Cashier.view.voucher.UnitGrid', {
    extend     : 'Cashier.library.template.view.GridDS2Browse',
    alias      : 'widget.voucherunitgrid',
    storeConfig: {
        id         : 'IDselectedUnitStore',
        idProperty : 'unit_id',
        extraParams: {
            mode_read: 'unitlist'
        }
    },
    id            : 'browseUnitGrid',
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
                {
                    xtype    : 'gridcolumn',
                    width    : 200,
                    dataIndex: 'unit_cluster',
                    hideable : false,
                    text     : 'Cluster'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'unit_unit_number',
                    hideable : false,
                    text     : 'Unit Number '
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 200,
                    dataIndex: 'customer_name',
                    hideable : false,
                    text     : 'Customer'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 200,
                    dataIndex: 'project_name',
                    hideable : false,
                    text     : 'Project '
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 200,
                    dataIndex: 'pt_name',
                    hideable : false,
                    text     : 'Company '
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
                        action  : 'select',
                        disabled: true,
                        id      : 'btnselectunit',
                        itemId  : 'btnselectunit',
                          //hidden: true,
                        margin : '0 5 0 0',
                        iconCls: 'icon-approve',
                        text   : "Pick and Close"
                    },
                    {
                        xtype   : 'button',
                        action  : 'selectunitothers',
                        disabled: true,
                        id      : 'btnselectunit2',
                        itemId  : 'btnselectunit2',
                        hidden  : true,
                        margin  : '0 5 0 0',
                        iconCls : 'icon-approve',
                        text    : "Pick Unit"
                    },
                    {
                        xtype   : 'button',
                        action  : 'selectconvertunit',
                        disabled: true,
                        id      : 'btnselectconvertunit',
                        itemId  : 'btnselectconvertunit',
                        hidden  : true,
                        margin  : '0 5 0 0',
                        iconCls : 'icon-approve',
                        text    : "Choose Unit to Convert"
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
            },
            {
                xtype           : 'textfield',
                itemId          : 'phone',
                name            : 'customer_name',
                fieldLabel      : 'Customer Name',
                enforceMaxLength: true,
            },
             {
                xtype           : 'textfield',
                itemId          : 'phonse',
                name            : 'customer_phone',
                fieldLabel      : 'Customer Phone',
                enforceMaxLength: true,
            },
        ];
        return x;
    }
});