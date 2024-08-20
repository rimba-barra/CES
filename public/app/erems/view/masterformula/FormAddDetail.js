Ext.define('Erems.view.masterformula.FormAddDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterformulaformadddetail',
    requires:[
              'Erems.library.template.component.Typeperiodecombobox',
              'Erems.library.template.component.Scheduletypecombobox'
            ],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'billingrulesballoon_id',
                    name: 'billingrulesballoon_id'
                },
                {
                //  bodyPadding: 10,
                defaults: {
                        labelAlign: 'left',
                        labelSeparator: ' '
                      
                    },
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none;',
                    items: [
                        {
                            xtype: 'scheduletypecombobox',
                            fieldLabel: 'Schedule Type',
                            anchor: '-5',
                            itemId: 'schedule_type_balloon',
                            name: 'schedule_type_balloon',
                            flex: 3
                        },
                        {
                            xtype: 'splitter', width: 10,
                        },
                        {
                            xtype: 'label',
                            text: '',
                            flex: 3
                        }
                    ]
                },
                {
                    //  bodyPadding: 10,
                    defaults: {
                        labelAlign: 'left',
                        labelSeparator: ' '
                      
                    },
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none;',
                    items: [
                        {
                            xtype: 'numberfield',
                            minValue:0,
                            value:0,
                            fieldLabel: 'Periode angsuran',
                            anchor: '-5',
                            itemId: 'det_periode_angsuran',
                            name: 'periode_angsuran',
                            flex: 4
                        },
                        {
                            xtype: 'splitter', width: 10,
                        },
                        {
                            xtype: 'typeperiodecombobox',
                            fieldLabel: '',
                            anchor: '-5',
                            itemId: 'det_type_periode_angsuran',
                            name: 'type_periode_angsuran',
                            flex: 3
                        },
                        {
                            xtype: 'splitter', width: 10,
                        },
                        {
                            xtype: 'label',
                            text: '',
                            flex: 3
                        }
                    ]
                },
                {
                    //  bodyPadding: 10,
                   defaults: {
                        labelAlign: 'left',
                        labelSeparator: ' '
                      
                    },
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none;',
                    width:'100%',
                    items: [{
                            xtype: 'numberfield',
                            minValue:0,
                            value:0,
                            fieldLabel: 'Term angsuran',
                            anchor: '-5',
                            itemId: 'det_term_angsuran',
                            name: 'term_angsuran',
                            flex: 1
                        }, {
                            xtype: 'splitter', width: 10,
                        }, {
                            xtype: 'label',
                            text: 'Kali',
                            flex: 1
                        }]
                },
                {
                    //  bodyPadding: 10,
                   defaults: {
                        labelAlign: 'left',
                        labelSeparator: ' '
                      
                    },
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background:none;',
                    width:'100%',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Persen',
                            anchor: '-5',
                            maskRe: /[0-9\.]/,
                            currencyFormat: false,
                            fieldStyle: 'text-align:right',
                            itemId: 'det_persen',
                            name: 'persen',
                            flex: 1,
                            value: 0.00
                        }, {
                            xtype: 'splitter', width: 10,
                        }, {
                            xtype: 'label',
                            text: '',
                            flex: 1
                        }]
                }
            
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});