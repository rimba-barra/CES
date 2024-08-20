Ext.define('Erems.view.progressnonunit.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.progressnonunitformsearch',
    requires: [
        'Erems.template.ComboBoxFields',
        'Erems.library.template.view.combobox.Contractor'],
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '-2',
                storeUrl: 'progressnonunit'
            },
            items: [
                {xtype: 'textfield', fieldLabel: 'Spk Code', name: 'code',enableKeyEvents: true},
              //  {xtype: 'textfield', fieldLabel: 'Title', name: 'job_title'},
                {
                    xtype:'combobox',
                    name:'contractor_id',
                    fieldLabel: 'Contractor',
                    displayField: cbf.contractor.d,
                    valueField: cbf.contractor.v,
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
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
                me.createFieldRangeMulti({
                    xtype: 'datefield',
                    fieldLabel: 'SPK Date',
                    textName: 'spk_date',
                    rangeSeparator: 's/d',
                    format:'d-m-Y',
                    tailText: ''
                }),
                me.createFieldRangeMulti({
                    xtype: 'datefield',
                    fieldLabel: 'Construction Date',
                    textName: 'time_frame',
                    rangeSeparator: 's/d',
                    format:'d-m-Y',
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