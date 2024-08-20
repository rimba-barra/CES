Ext.define('Erems.view.batasplafon.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.batasplafonformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow:-1,
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
              //  labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'batasplafon_id'
                },
                {
                    xtype:'combobox',
                    name: 'plafon_plafon_id',
                    displayField: cbf.plafon.d,
                    valueField: cbf.plafon.v,
                    // editable:false,
                    fieldLabel:'Plafon',
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
                    xtype: 'numberfield',
                    name: 'persen_desc',
                    fieldLabel: 'Percent',
                    width:200,
                    value: 0,
                    allowBlank: false,
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype:'numberfield',
                            fieldLabel:'Target RS',
                            name:'target_RS'
                        },
                        {
                            width:100,
                            margin:'0 0 15px 20px',
                            xtype:'label',
                            text:'Hari'
                        }
                    ]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype:'numberfield',
                            name:'target_RE',
                            fieldLabel:'Target RE'
                        },
                        {
                            width:100,
                            margin:'0 0 15px 20px',
                            xtype:'label',
                            text:'Hari'
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

