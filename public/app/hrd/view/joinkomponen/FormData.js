Ext.define('Hrd.view.joinkomponen.FormData', {
    alias: 'widget.joinkomponenformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType','Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'joinkomponen_id'
                },
                {
                    xtype:'combobox',
                    fieldLabel:'Komponen',
                    valueField:'komponengaji_id',
                    displayField:'code',
                    name:'master'
                },
                {
                   fieldLabel:'    ',
                   width:400,
                   keepRO:true,
                   readOnly:true
                   
                },
                {
                    xtype:'combobox',
                    fieldLabel:'Join Komponen 1',
                    valueField:'komponengaji_id',
                    displayField:'code',
                    name:'komponen1'
                },
                {
                   fieldLabel:'    ',
                   width:400,
                   keepRO:true,
                   readOnly:true
                   
                },
                {
                    xtype:'combobox',
                    fieldLabel:'Join Komponen 2',
                    valueField:'komponengaji_id',
                    displayField:'code',
                    name:'komponen2'
                },
                {
                   fieldLabel:'    ',
                   width:400,
                   keepRO:true,
                   readOnly:true
                   
                },
                {
                    xtype:'combobox',
                    fieldLabel:'Join Komponen 3',
                    valueField:'komponengaji_id',
                    displayField:'code',
                    name:'komponen3'
                },
                {
                   fieldLabel:'    ',
                   width:400,
                   keepRO:true,
                   readOnly:true
                   
                },
                {
                    xtype:'combobox',
                    fieldLabel:'Join Komponen 4',
                    valueField:'komponengaji_id',
                    displayField:'code',
                    name:'komponen4'
                },
                {
                   fieldLabel:'    ',
                   width:400,
                   keepRO:true,
                   readOnly:true
                   
                },
                {
                    xtype:'combobox',
                    fieldLabel:'Join Komponen 5',
                    valueField:'komponengaji_id',
                    displayField:'code',
                    name:'komponen5'
                },
                {
                   fieldLabel:'    ',
                   width:400,
                   keepRO:true,
                   readOnly:true
                   
                },
                {
                    xtype:'fieldset',
                    title:'Tanggal Proses',
                    layout:'hbox',
                    defaults:{
                        margin:'5px 10px 5px 5px'
                    },
                    items:[
                        {
                            xtype:'textfield',
                            fieldLabel:'',
                            width:50,
                            name:'tanggal_start'
                        },
                        {
                            xtype:'label',
                            text:'s/d',
                            width:30
                        },
                        {
                            xtype:'textfield',
                            fieldLabel:'',
                            width:50,
                            name:'tanggal_end'
                        },
                        {
                            xtype:'checkbox',
                            inputValue:'1',
                            boxLabel:'Bulan yang Sama',
                            name:'is_bulansama'
                        },
                        {
                            xtype:'checkbox',
                            inputValue:'1',
                            boxLabel:'Satu Bulan Sebelumnya',
                            name:'is_bulansebelumnya'
                        }
                    ]
                }
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});