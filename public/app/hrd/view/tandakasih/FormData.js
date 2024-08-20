Ext.define('Hrd.view.tandakasih.FormData', {
    alias: 'widget.tandakasihformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType','Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;

        var jenisTandaKasih = [{
                number: 1,
                name: '1. Pernikahan Pertama'
            }, {
                number: 2,
                name: '2. Kelahiran Anak 1 s.d 3'
            }, {
                number: 3,
                name: '3. Karyawan Sakit di R.S'
            }, {
                number: 4,
                name: '4. Orang Tua Karyawan Meninggal'
            }];


        var jenisTandaKasihStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: jenisTandaKasih
        });

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
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin:'5px 5px 5px 0',
                    },
                    items: [
                        {
                            fieldLabel: 'NIK - Name',
                            name: 'employee_employee_nik',
                            readOnly: true,
                            keepRO: true,
                            
                            width: 200
                        }, {
                            flex: 1,
                            name: 'employee_employee_name',
                            fieldLabel: '',
                            readOnly: true,
                            keepRO: true
                                    // name: 'nam',
                        },
                        {
                            xtype: 'button',
                            disabled:true,
                            text: 'browse',
                            width: 150,
                            action: 'lookupemployee'
                        }
                    ]
                },
                {
                    fieldLabel: 'Golongan',
                    name: 'group_code',
                    readOnly: true,
                    keepRO: true
                },
                {
                    fieldLabel: 'Status Karyawan',
                 
                    name: 'employeestatus_employeestatus',
                    readOnly: true,
                    keepRO: true
                },
                {
                    xtype:'dfdatefield',
                    fieldLabel: 'Tanggal Masuk',
                    name: 'employee_hire_date',
                    readOnly: true,
                    keepRO: true
                },
                {
                    xtype:'combobox',
                    fieldLabel: 'Level Karyawan Ori',
                    name:'group_group_id',
                    displayField: 'code',             
                    valueField: 'group_id', 
                    hidden:true
                    //   name: 'nam',
                    // readOnly: true,
                    //   keepRO: true
                },
                {
                    xtype:'combobox',
                    fieldLabel: 'Level Karyawan',
                    name:'group_group_id_display',
                    displayField: 'code',             
                    valueField: 'group_id'
                    //   name: 'nam',
                    // readOnly: true,
                    //   keepRO: true
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Jenis Tanda kasih',
                    name: 'jenis',
                   // store: jenisTandaKasihStore,
                    displayField: 'name',
                    width: 400,
                    valueField: 'tipetandakasih_id'
                    //readOnly: true
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        margin:'5px 5px 5px 0',
                    },
                    items: [
                        {
                            xtype: 'dfdatefield',
                            fieldLabel: 'Tanggal Pemberian',
                            name: 'date',
                        },
                        {
                            xtype: 'xmoneyfield',
                            fieldLabel: 'Jumlah Pemberian',
                             name: 'jumlah',
                        }, {
                            xtype: 'combobox',
                            fieldLabel: 'Plus',
                            name: 'plus',
                            store: fmStore,
                            displayField: 'text',
                      
                            valueField: 'value',
                            //readOnly: true
                        }, ,
                    ]
                },
                {
                    xtype:'textareafield',
                    fieldLabel: 'Keterangan',
                    name: 'note',
                    cols:80
                },
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});