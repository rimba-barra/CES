Ext.define('Hrd.view.absentrecord.FormTlk', {
    alias: 'widget.absentrecordformtlk',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.absentrecord.GridTlk'],
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    margin:'0 0 5px 0',
                    items:[
                        {
                            xtype:'radio',
                            checked:true,
                            width:125,
                            name:'tlk_project_type',
                            inputValue:'1',
                            boxLabel:'Proyek'
                        },
                        {
                            xtype:'combobox',
                            name:'parametertlk_id',
                            width:300,
                            displayField: 'name',
                            valueField: 'parametertlk_id'
                            
                        }
                    ]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype:'radio',
                            width:125,
                            name:'tlk_project_type',
                             inputValue:'2',
                            boxLabel:'Proyek Lain'
                        },
                        {
                            xtype:'textfield',
                            name:'tlk_other',
                            width:250
                        }
                    ]
                },
                /*{
                    xtype: 'absentrecordgridtlk',
                    height: 300,
                    maxHeight: 300
                },*/
                
                /*
                 {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10px 0 0 0',
                 
                    items: [
                        
                        {
                            xtype:'textfield',
                            fieldLabel: 'Other : ',
                            width:500,
                            name: 'tlk_other'
                        },
                    ]
                },
                */
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10px 0 0 0',
                    defaults: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d'
                    },
                    items: [
                        
                        {
                            fieldLabel: 'Periode Tanggal',
                            name: 'start_date'
                        },
                        {
                            name: 'end_date',
                            margin:'0 0 0 10px',
                            fieldLabel: 's/d',
                            labelWidth: 30
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
                        text: 'Save'
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