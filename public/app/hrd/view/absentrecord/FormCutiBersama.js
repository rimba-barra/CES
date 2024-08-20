Ext.define('Hrd.view.absentrecord.FormCutiBersama', {
    alias: 'widget.absentrecordformcutibersama',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.absentrecord.GridEmployeeCutiBersama'],
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
                    xtpye: 'fieldset',
                    title:'',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            flex:1,
                            title: 'Tanggal',
                            margin:'10 10 10 10',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'dfdatefield',
                                    name:'start_date',
                                    fieldLabel: '',
                                    flex:1
                                },
                                {
                                    xtype: 'dfdatefield',
                                    fieldLabel: 'S/D',
                                    labelWidth:20,
                                    name:'end_date',
                                    flex:1
                                }
                            ]
                        },
                        {
                            flex:1,
                            xtype: 'fieldset',
                            title: ' ',
                            layout: 'vbox',
                            margin:'15 10 10 0',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 1,
                                    items: [
                                        {boxLabel: '1 Hari', name: 'is_halfday', inputValue: "0", checked: true},
                                        {boxLabel: '1/2 Hari', name: 'is_halfday', inputValue: "1"},
                                    ]
                                },
                                {
                                    flex:1,
                                    // xtype:'textfield',
                                    //edited by michael 2022-06-13 sementara di hide dulu karena tidak jalan dan bikin bingung sudah ada date & button jg
                                    xtype:'hiddenfield',
                                    name:'jml_hari_kepotong',
                                    width:150,
                                    fieldLabel:'Jumlah hari yang dipotong cuti : ',
                                },
                                {
                                    // xtype:'label',
                                    //edited by michael 2022-06-13 sementara di hide dulu karena tidak jalan dan bikin bingung sudah ada date & button jg
                                    xtype:'hiddenfield',
                                    itemId:'labelTitik',
                                    text:'Gunakan titik [.] untuk nilai desimal',
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Keterangan',
                    items: [
                        {
                            xtype: 'textareafield',
                            width:'100%',
                            name:'note'
                        }
                    ]
                },
                {
                    xtype:'label',
                    itemId:'labelJumlah',
                    margin:'5px 5px 5px 5px',
                    text:'Jumlah karyawan terpilih: 0',
                },
                {
                    xtype: 'absentrecordemployeecutibersamagrid',
                    height: 200
                },
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