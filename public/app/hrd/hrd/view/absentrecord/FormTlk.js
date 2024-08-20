Ext.define('Hrd.view.absentrecord.FormTlk', {
    alias: 'widget.absentrecordformtlk',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields','Hrd.view.parametertlk.Grid'],
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        
        var cbf = new Hrd.template.ComboBoxFields();
        
        Ext.applyIf(me, {
            items: [
                {
                  xtype:'hiddenfield',
                  name:'employee_employee_id'
                },
                {
                    xtype:'parametertlkgrid',
                    height:'500'
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    margin:'10px 0 0 0',
                    defaults:{
                        xtype:'datefield',
                       format:'d-m-Y',
                       submitFormat:'Y-m-d'
                    },
                    items:[
                        {
                            fieldLabel:'Periode Tanggal',
                            name:'start_date'
                        },
                        {
                            name:'end_date',
                            fieldLabel:'s/d',
                            labelWidth:50
                        }
                    ]
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'process',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});