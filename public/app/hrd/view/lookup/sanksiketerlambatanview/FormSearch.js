Ext.define('Hrd.view.lookup.sanksiketerlambatanview.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookupsanksiketerlambatanviewformsearch',
    requires:[
              //  'Hrd.template.combobox.Department'
    
            ],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Periode',
                //     name: 'periode',
                //     store: 'Trainingperiode',
                //     displayField: 'periode',
                //     valueField: 'periode',
                // },
                {
                    xtype: 'combobox',
                    name: 'periode_month',
                    fieldLabel: 'Month',
                    store : new Ext.data.SimpleStore({
                    data : [[1, '1'], [2, '2'],[3, '3'], [4, '4'],[5, '5'], [6, '6'],[7, '7'], [8, '8'],[9, '9'], [10, '10'],[11, '11'], [12, '12']],
                                    fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Year',
                    maskRe: /[0-9]/,
                    name: 'periode',
                    enableKeyEvents: true,

                },
                // {
                //     xtype: 'textfield',
                //     fieldLabel: 'Periode',
                //     maskRe: /[0-9]/,
                //     name: 'periode',
                //     enableKeyEvents: true,

                // },
                {
                    xtype:'textfield',
                    fieldLabel:'Description',
                    name:'description'  
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});