Ext.define('Erems.view.adminfeekpr.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.adminfeekprformsearch',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype      : 'textfield',
                    itemId     : 'fs_unit_number',
                    name       : 'unit_number',
                    fieldLabel : 'Unit Number'
                },
                {
                    xtype  : 'clustercombobox',
                    itemId : 'fs_cluster_id',
                    name   : 'cluster_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype  : 'blockcombobox',
                    itemId : 'fs_block_id',
                    name   : 'block_id',
                    anchor :'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype      : 'xnamefieldEST',
                    itemId     : 'fs_customer_name',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name'
                },
                {
                    xtype: 'panel',
                    height: 48,
                    bodyStyle: 'background:none;border:0;',
                    anchor: '-15',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            itemId: 'cair_start_date',
                            name: 'cair_start_date',
                            fieldLabel: 'Cair date',
                            labelSeparator: '',
                            width: 100,
                            labelAlign: 'top',
                            editable: false,
                            format: 'd-m-Y',
                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat: 'Y-m-d H:i:s.u'
                        },
                        {
                            xtype: 'label',
                            margin: '23px 5px 0 5px',
                            styleHtmlContent: false,
                            width: 10,
                            text: 'to'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'cair_end_date',
                            name: 'cair_end_date',
                            fieldLabel: '&nbsp;',
                            labelSeparator: '',
                            width: 100,
                            labelAlign: 'top',
                            editable: false,
                            format: 'd-m-Y',
                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat: 'Y-m-d H:i:s.u'
                        },
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'status',
                    fieldLabel: 'Status',
                    displayField: 'name',
                    valueField: 'value',
                    value:"",
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'name'],
                        data: [
                            {"value": 0, "name": "ALL"},
                            {"value": 1, "name": "Belum Cair"},
                            {"value": 2, "name": "Sudah Cair"}
                        ]
                    }),
                    typeAhead: true,
                    queryMode: 'local',
                    lastQuery: '',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});