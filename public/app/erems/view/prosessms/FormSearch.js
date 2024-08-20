Ext.define('Erems.view.prosessms.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.prosessmsformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                
                {
                    xtype: 'textfield',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number'
                },
                {
                    xtype      : 'xnamefieldEST',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name'
                },
               
                {
                    xtype: 'dfdatefield',
                    name:'process_date',
                    fieldLabel: 'Process Date',
                    format: 'd-m-Y',
                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat: 'Y-m-d H:i:s.u',
                    editable:false
                },
                me.createFieldRangeMulti({
                    xtype: 'dfdatefield',
                    fieldLabel: 'Purchase Date',
                    textName: 'purchaseletter_date',
                    rangeSeparator: 's/d',
                    format:'d-m-Y',
                    tailText: ''
                }),
                {
                    xtype: 'combobox',
                    name:'smscategory_id',
                    displayField: 'smscategory',
                    valueField: 'smscategory_id',
                    fieldLabel: 'Category'
                },
                {
                    xtype: 'combobox',
                    name:'smsstatus',
                    displayField: 'smsstatus',
                    valueField: 'smsstatus_id',
                    fieldLabel: 'Status',
                    itemId: 'smsstatus_id',
                    queryMode:'local',
                    store:[['99' , 'BELUM PROSES'],['22' , 'DELIVERED']],
                }
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
