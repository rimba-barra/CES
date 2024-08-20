Ext.define('Cashier.view.vdrequest.RewardGrid', {
    extend        : 'Cashier.library.template.view.GridDS2Browse',
    alias         : 'widget.vdrequestrewardgrid',
    simpleSelect  : true,
    height        : 300,
    bindPrefixName: 'VDRequest',
    newButtonLabel: 'New Reward',
    controllername: 'vdrequest',
    initComponent : function () {
        var me        = this;
        var gridStore = Ext.create('Ext.data.Store', {
            storeId : 'rewardStore',
            url     : me.controllername,
            autoLoad: false,
            fields  : [
                {
                    name: 'purchaseletter_reward_id',
                    type: 'int'
                },
                {
                    name: 'purchaseletter_id',
                    type: 'int'
                },
                {
                    name: 'reward_id',
                    type: 'int'
                },
                {
                    name: 'reward_name',
                    type: 'string'
                },
                {
                    name: 'user_check',
                    type: 'int'
                },
                {
                    name: 'user_check_name',
                    type: 'string'
                },
                {
                    name: 'user_date_check',
                    type: 'date'
                },
                {
                    name: 'user_proses',
                    type: 'int'
                },
                {
                    name: 'user_date_proses',
                    type: 'date'
                },
                {
                    name: 'amount',
                    type: 'string'
                },
                {
                    name: 'amount_harus_cair',
                    type: 'string'
                },
                {
                    name: 'group_id',
                    type: 'int'
                },
                {
                    name: 'note',
                    type: 'string'
                },
                {
                    name: 'nomor_im',
                    type: 'string'
                },
                {
                    name: 'tanggal_im',
                    type: 'date'
                },
                {
                    name: 'purchaseletter_no',
                    type: 'string'
                },
                {
                    name: 'purchase_date',
                    type: 'date'
                },
                {
                    name: 'code',
                    type: 'string'
                },
                {
                    name: 'unit_no',
                    type: 'string'
                },
                {
                    name: 'cashbon_no',
                    type: 'string'
                }
            ],
            proxy: {
                type         : 'ajax',
                actionMethods: {
                    read   : 'POST',
                    create : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                api: {
                    read   : 'cashier/' + me.controllername + '/read',
                    create : 'cashier/' + me.controllername + '/create',
                    update : 'cashier/' + me.controllername + '/update',
                    destroy: 'cashier/' + me.controllername + '/delete'
                },
                reader: {
                    type         : 'json',
                    idProperty   : 'purchaseletter_reward_id',
                    root         : 'data',
                    totalProperty: 'totalRow'
                },
                writer: {
                    type  : 'json',
                    encode: true,
                    root  : 'data'
                },
                extraParams: {
                    hideparam: 'getreward',
                }
            },
        });

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig : {},
            selModel   : Ext.create('Ext.selection.CheckboxModel',{}),
            defaults   : {
                xtype: 'gridcolumn',
                width: 11
            },
            store  : gridStore,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 200,
                    dataIndex: 'purchaseletter_no',
                    hideable : false,
                    text     : 'Purchaseletter No.'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'unit_no',
                    hideable : false,
                    text     : 'Unit'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'code',
                    hideable : false,
                    text     : 'Code'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'reward_name',
                    hideable : false,
                    text     : 'Reward'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'user_check_name',
                    hideable : false,
                    text     : 'user_check_name'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'user_date_check',
                    hideable : false,
                    text     : 'user_date_check',
                    renderer : Ext.util.Format.dateRenderer('d-m-Y'),
                    renderer : function (value, metaData, record, row, col, store, gridView) {
                        if (moment(record.get('user_date_check')).format("DD-MM-YYYY") == "01-01-1900") {
                            return '-';
                        } else {
                            return moment(record.get('user_date_check')).format("DD-MM-YYYY");
                        }

                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'amount',
                    hideable : false,
                    text     : 'amount',
                    align    : 'right',
                    renderer : Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 200,
                    dataIndex: 'cashbon_no',
                    hideable : false,
                    text     : 'cashbon_no'
                },
            ],
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
                        margin  : '0 5 0 0',
                        iconCls : 'icon-approve',
                        text    : "Pick and Close"
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
                xtype           : 'combobox',
                name            : 'projectpt_id',
                fieldLabel      : 'Company',
                displayField    : 'name',
                valueField      : 'pt_projectpt_id',
                readOnly        : true,
                allowBlank      : true,
                enforceMaxLength: true,
                enableKeyEvents : true,
                rowdata         : null,
                forceSelection  : false,
                typeAhead       : false,
                dataBinder      : 'pt',
                id              : 'reward_pt_id',
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
                itemId          : 'fspl_no',
                name            : 'purchaseletter_no',
                fieldLabel      : 'Purchaseletter No',
                enforceMaxLength: true,
            },
            {
                xtype           : 'textfield',
                itemId          : 'fsunit_number',
                name            : 'unit_number',
                fieldLabel      : 'Unit No',
                enforceMaxLength: true,
                maxLength       : 50
            },
            
        ];
        return x;
    }
});