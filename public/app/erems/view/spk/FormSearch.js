Ext.define('Erems.view.spk.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.spkformsearch',
    requires: [
        'Erems.library.template.view.combobox.SpkType',
        'Erems.library.template.view.combobox.Contractor'],
    initComponent: function() {
        var me = this;

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
             //   {xtype: 'cbspktype', name: 'spktype_id'},
              //  {xtype: 'cbcontractor', name: 'contractor_id', storeID: 'contractorSearchB'},
              {
                    xtype:'combobox',
                    name: 'spktype_id',
                    displayField:'spktype',
                    valueField: 'spktype_id',
                    fieldLabel:'Spk Type'
                },
                {
                    xtype:'combobox',
                    name: 'contractor_id',
                    displayField: 'contractorname',
                    valueField: 'contractor_id',
                    fieldLabel:'Contractor'
                },
                {xtype: 'textfield', fieldLabel: 'Spk Code', name: 'code'},
                {xtype: 'textfield', fieldLabel: 'Spk No', name: 'spk_no'},
                {
                    xtype: 'combobox',
                    name: 'status',
                    fieldLabel: 'Spk Status',
                    displayField: 'name',
                    valueField: 'value',
                    value:"",
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'name'],
                        data: [
                            {"value": "", "name": "ALL"},
                            {"value": "OPEN", "name": "OPEN"},
                            {"value": "CLOSE", "name": "CLOSE"},
                            {"value": "CANCEL", "name": "CANCEL"}
                        ]
                    })
                },
                me.createFieldRangeMulti({
                    xtype: 'dfdatefield',
                    fieldLabel: 'SPK Date',
                    textName: 'spk_date',
                    rangeSeparator: 's/d',
                    //format:'d-m-Y',
                    tailText: ''
                }),
                me.createFieldRangeMulti({
                    xtype: 'dfdatefield',
                    fieldLabel: 'Construction Date',
                    textName: 'time_frame',
                    rangeSeparator: 's/d',
                    //format:'d-m-Y',
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