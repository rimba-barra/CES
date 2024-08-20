Ext.define('Erems.view.schedulemonitor.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.schedulemonitorformsearch',
    initComponent: function () {
        var me = this;


        var pricetype = [{
                "number": 99, "name": 'ALL'
            },{
                "number": 1, "name": 'CASH'
            },
            {
                "number": 2, "name": 'KPR'
            },
            {
                "number": 3, "name": 'INHOUSE'
            }];

        ////
        var pricetypeStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: pricetype
        });

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [{
                    fieldLabel: 'Unit Number',
                    name: 'unit_unit_number',
                    enableKeyEvents: true
                },{
                    fieldLabel: 'Purchaseletter Number',
                    name: 'purchaseletter_no',
                    enableKeyEvents: true
                }, {
                    xtype           : 'xnamefieldEST',
                    fieldLabel      : 'Customer Name',
                    name            : 'customer_name',
                    enableKeyEvents : true
                },  {
                    xtype: 'combobox',
                    fieldLabel: 'Price Type',
                    name: 'pricetype',
                    displayField: 'name',
                    valueField: 'number',
                    store: pricetypeStore,
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
                {
                    fieldLabel: 'Selisih di bawah ',
                    maskRe: /[0-9_&]/i,
                    regex: /^[0-9_ &]+$/,
                    name: 'selisih_dibawah',
                    enableKeyEvents: true
                }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
