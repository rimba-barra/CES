Ext.define('Hrd.view.transferapitransactionlog.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.transferapitransactionlogformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    xtype: 'combobox',
                    name: 'pt_id',
                    fieldLabel: 'Pt',
                    displayField: 'ptpt_name',
                    valueField: 'ptpt_id',
                    margin: '10px 0'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Payroll Process (Month)',
                    name: 'processpayroll_month',
                    store : new Ext.data.SimpleStore({
                                            data : [[1, '1'], [2, '2'],[3, '3'], [4, '4'],[5, '5'], [6, '6'],[7, '7'], [8, '8'],[9, '9'], [10, '10'],[11, '11'], [12, '12']],
                                                fields : ['value', 'text']
                                            }),
                    valueField : 'value',
                    displayField : 'text',
                    margin: '10px 0'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Payroll Process (Year)',
                    name: 'processpayroll_year',
                    store: 'Trainingperiode',
                    margin: '10px 0',
                    displayField: 'periode',
                    valueField: 'periode',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Transfer API Transaction',
                    name: 'data',
                    store : new Ext.data.SimpleStore({
                                            data : [['attendance', 'attendance'], ['cutibesar', 'cutibesar'],['medicalclaim', 'medicalclaim'], ['overtime', 'overtime'],['potongantransport', 'potongantransport'], ['saldocutibayar', 'saldocutibayar'],['saldocutiminus', 'saldocutiminus'], ['uangmakan', 'uangmakan'],['unpaidleave', 'unpaidleave']],
                                                fields : ['value', 'text']
                                            }),
                    valueField : 'value',
                    displayField : 'text',
                    margin: '10px 0'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});