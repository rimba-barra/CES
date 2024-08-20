Ext.define('Hrd.view.lookup.cutitambahanview.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookupcutitambahanviewformsearch',
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
                    xtype: 'textfield',
                    fieldLabel: 'Periode',
                    maskRe: /[0-9]/,
                    name: 'periode',
                    enableKeyEvents: true,

                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Leave Group',
                    name: 'leavegroup',
                    store : new Ext.data.SimpleStore({
                    data : [['1', 'Yearly'], ['2', 'Big Leave']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
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