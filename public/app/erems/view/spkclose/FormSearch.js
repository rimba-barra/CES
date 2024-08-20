Ext.define('Erems.view.spkclose.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.spkcloseformsearch',
    requires: [
        'Erems.library.template.view.combobox.SpkType',
        'Erems.library.template.view.combobox.Contractor'],
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            //defaults: me.generateDefaults(),
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '-2',
                storeUrl: 'spk'
            },
            items: [
             
                {
                    xtype: 'combobox', 
                    name: 'spktype_id',
                    fieldLabel: 'Spk Type', 
                    queryMode:'local',
                    displayField: cbf.spktype.d,
                    valueField: cbf.spktype.v,
                },
                {
                    xtype: 'combobox', 
                    name: 'contractor_id', 
                    fieldLabel: 'Contractor', 
                    queryMode:'local',
                    displayField: cbf.contractor.d,
                    valueField: cbf.contractor.v,

                },
                {
                    xtype: 'textfield', 
                    fieldLabel: 'Spk Code', 
                    name: 'code'
                },
                {
                    xtype: 'textfield', 
                    fieldLabel: 'Spk No', 
                    name: 'spk_no'
                },
                me.createFieldRangeMulti({
                    xtype: 'datefield',
                    fieldLabel: 'SPK Date',
                    textName: 'spk_date',
                    rangeSeparator: 's/d',
                    tailText: ''
                }),
                me.createFieldRangeMulti({
                    xtype: 'datefield',
                    fieldLabel: 'Construction Date',
                    textName: 'time_frame',
                    rangeSeparator: 's/d',
                    tailText: ''
                }),
                me.createFieldRangeMulti({
                    xtype: 'textfield',
                    fieldLabel: 'implement_time',
                    textName: 'implement_time',
                    rangeSeparator: '-',
                    tailText: ''
                }),
                me.createFieldRangeMulti({
                    xtype: 'textfield',
                    fieldLabel: 'Job Fee Range',
                    textName: 'fee',
                    rangeSeparator: '-',
                    tailText: ''
                })
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});