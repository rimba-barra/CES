Ext.define('Hrd.view.anggarantaka.FormData', {
    alias: 'widget.anggarantakaformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields','Hrd.library.template.view.MoneyField'],
    id: 'formAnggarantakaID',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();
        
        var data = [{
                "value":"N", "text":"None"
            },{
                "value":"F", "text":"Flower Board"
            },{
                "value":"B", "text":"Bouquet"
            }];
       
        var fmStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });
        
        var bocStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });
        var esStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });
        
        var psStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'tandakasih_id'
                },
                {
                    xtype:'combobox',
                    name: 'group_group_id',
                    fieldLabel: 'Category',
                    displayField: cbf.group.d,
                    valueField: cbf.group.v
                }
                

            ],
            dockedItems: [],
        });

        me.callParent(arguments);
    },
    buatContainer:function(label,name){
        var data = [{
                "value":"N", "text":"None"
            },{
                "value":"F", "text":"Flower Board"
            },{
                "value":"B", "text":"Bouquet"
            }];
       
        var fmStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });
        
        var x = {
                    xtype: 'container',
                    layout:'hbox',
                    margin:'0 0 10px 0',
                    items: [
                        {
                            xtype:'xmoneyfield',
                            name: name+'_value',
                            fieldLabel:label,
                            widthLabel:200,
                            width:300
                        },
                        {
                            xtype:'label',
                            text:'+'
                        },
                        {
                            xtype:'combobox',
                            store:fmStore,
                            name:name+'_plus',
                            queryMode: 'local',
                            displayField: 'text',
                            valueField: 'value'
                        }
                    ]
                };
        return x;
    }

});