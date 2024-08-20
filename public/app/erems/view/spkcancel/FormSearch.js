Ext.define('Erems.view.spkcancel.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.spkcancelformsearch',
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
             
                {xtype: 'cbspktype', name: 'spktype_id'},
                {xtype: 'cbcontractor', name: 'contractor_id', storeID: 'contractorSearchB'},
                {xtype: 'textfield', fieldLabel: 'Spk Code', name: 'code'},
                {xtype: 'textfield', fieldLabel: 'Spk No', name: 'spk_no'},

                // me.createFieldRangeMulti({
                //     xtype: 'datefield',
                //     fieldLabel: 'SPK Date',
                //     textName: 'spk_date',
                //     rangeSeparator: 's/d',

                //     format:'d-m-Y',

                //     tailText: ''
                // }),
                // me.createFieldRangeMulti({
                //     xtype: 'datefield',
                //     fieldLabel: 'Construction Date',
                //     textName: 'time_frame',
                //     rangeSeparator: 's/d',
                //     format:'d-m-Y',
                //     tailText: ''
                // }),

                //updated by anas 05042021
                {xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            width: 100,
                            id:'fs_mastertype_bot'+'spk_date',
                            name:'bot_'+'spk_date',
                            fieldLabel: 'SPK Date',
                            labelSeparator:'',
                            labelAlign: 'top',
                            format: 'd-m-Y',
                            labelWidth: 50,
                            submitFormat: 'Y-m-d',
                            editable: false
                        },
                        {
                            xtype: 'label',
                            margin: '20px 5px',
                            padding: '0px 20px',
                            styleHtmlContent: false,
                            width: 15,
                            text:'s/d'
                        },
                        {
                            xtype: 'datefield',
                            width: 100,
                            id:'fs_mastertype_top'+'spk_date',
                            name:'top_'+'spk_date',
                            fieldLabel: '&nbsp;',
                            labelSeparator:'',
                            format: 'd-m-Y',
                            labelAlign: 'top',
                            submitFormat: 'Y-m-d',
                            editable: false
                        },
                        {
                            xtype: 'label',
                            margin: '20px 0px',
                            padding: '0px 5px',
                            text: ''
                        }
                    ]
                },

                {xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            width: 100,
                            id:'fs_mastertype_bot'+'time_frame',
                            name:'bot_'+'time_frame',
                            fieldLabel: 'Construction Date',
                            labelSeparator:'',
                            labelAlign: 'top',
                            format: 'd-m-Y',
                            labelWidth: 50,
                            submitFormat: 'Y-m-d',
                            editable: false
                        },
                        {
                            xtype: 'label',
                            margin: '20px 5px',
                            padding: '0px 20px',
                            styleHtmlContent: false,
                            width: 15,
                            text:'s/d'
                        },
                        {
                            xtype: 'datefield',
                            width: 100,
                            id:'fs_mastertype_top'+'time_frame',
                            name:'top_'+'time_frame',
                            fieldLabel: '&nbsp;',
                            labelSeparator:'',
                            format: 'd-m-Y',
                            labelAlign: 'top',
                            submitFormat: 'Y-m-d',
                            editable: false
                        },
                        {
                            xtype: 'label',
                            margin: '20px 0px',
                            padding: '0px 5px',
                            text: ''
                        }
                    ]
                },
                //end updated anas 05042021

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