Ext.define('Erems.view.kartupiutang.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    requires: [
        'Erems.template.ComboBoxFields',
        'Erems.library.template.component.Pricetypecombobox'
    ],
    alias: 'widget.kartupiutangformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            //defaults: me.generateDefaults(),
            defaults: {
                xtype: 'combobox',
                width: '100%',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '90%',
                //typeAhead: true,
                queryMode: 'local',
                //lastQuery: '',
                //forceSelection: true,
                listeners: {
                    beforequery: function (record) {
                        record.query = new RegExp(record.query, 'i');
                        record.forceAll = true;
                    },
                }
                    

            },

            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    name: 'unit_number',
                    enableKeyEvents: true,
                },
                {
                    xtype           : 'xnamefieldEST',
                    fieldLabel      : 'Customer Name',
                    name            : 'customer_name',
                    enableKeyEvents : true
                },
                {
                    name: 'cluster_id',
                    displayField: cbf.cluster.d,
                    valueField: cbf.cluster.v,
                    fieldLabel: 'Cluster',
                    //queryMode: 'local',
                    //lastQuery: '',
                    //typeAhead: true
                },
                {
                    name: 'block_id',
                    displayField: cbf.block.d,
                    valueField: cbf.block.v,
                    fieldLabel: 'Block',
                    queryMode: 'local',
                    lastQuery: '',
                    typeAhead: true
                },
                {
                    name: 'position_id',
                    displayField: cbf.position.d,
                    valueField: cbf.position.v,
                    fieldLabel: 'Position',
                    queryMode: 'local',
                    lastQuery: '',
                    typeAhead: true
                },
                {
                    name: 'productcategory_id',
                    displayField: cbf.productcategory.d,
                    valueField: cbf.productcategory.v,
                    fieldLabel: 'Product Category',
                    queryMode: 'local',
                    lastQuery: '',
                    typeAhead: true
                },
                {
                    name: 'type_id',
                    displayField: cbf.type.d,
                    valueField: cbf.type.v,
                    fieldLabel: 'Type',
                    queryMode: 'local',
                    lastQuery: '',
                    typeAhead: true
                },
                {
                    name: 'purpose_id',
                    displayField: cbf.purpose.d,
                    valueField: cbf.purpose.v,
                    fieldLabel: 'Purpose',
                    queryMode: 'local',
                    lastQuery: '',
                    typeAhead: true
                },
                {
                    name: 'side_id',
                    displayField: cbf.side.d,
                    valueField: cbf.side.v,
                    fieldLabel: 'Side',
                    queryMode: 'local',
                    lastQuery: '',
                    typeAhead: true
                },
                {
                    name: 'unitstatus_id',
                    displayField: cbf.unitstatus.d,
                    valueField: cbf.unitstatus.v,
                    fieldLabel: 'Unit Status',
                    queryMode: 'local',
                    lastQuery: '',
                    typeAhead: true
                },
                {
                    xtype: 'pricetypecombobox',
                    fieldLabel: 'Price Type',
                    name: 'pricetype_id',
                    anchor: '-15',
                    store: new Ext.data.ArrayStore({
                        fields: [
                            'pricetype_id',
                            'pricetype'
                        ],
                        data: [['', 'ALL'], [1, 'CASH'], [2, 'KPR'], [3, 'INHOUSE']]
                    }),
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'VA BCA',
                    name: 'unit_virtualaccount_bca',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'VA Mandiri',
                    name: 'unit_virtualaccount_mandiri',
                    enableKeyEvents: true
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Cancel Data',
                    name: 'is_cancel',
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0',
                    margin: '0 5px 0 0',
                    width: 20
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Pindah Unit / Kavling',
                    name: 'is_changekaveling',
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0',
                    margin: '0 5px 0 0',
                    width: 20
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});