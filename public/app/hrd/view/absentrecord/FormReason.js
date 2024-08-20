Ext.define('Hrd.view.absentrecord.FormReason', {
    alias: 'widget.absentrecordformreason',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields','Hrd.view.absentrecord.GridJatahCuti'],
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
                    name: 'absentdetail_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Pengambilan cuti',
                    name: 'is_cuti',
                    inputValue: '1',
                    flex: 1
                },
                {
                    xtype: 'combobox',
                    name: 'absenttype_absenttype_id',
                    fieldLabel: 'Alasan Tidak Hadir',
                    displayField: cbf.absenttype.d,
                    valueField: cbf.absenttype.v,
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'datefield',
                        labelWidth: 50,
                        format: 'd/m/Y',
                        submitFormat: 'Y-m-d',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: 'Tanggal',
                            name: 'start_date',
                            value: new Date()
                        },
                        {
                            fieldLabel: 's/d',
                            name: 'end_date',
                            labelWidth: 20,
                            margin: '0 0 0 20px',
                            value: new Date()
                        }
                    ]

                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin:'10px 0 10px 0',
                    items: [
                        {
                            xtype:'radio',
                            boxLabel: 'Satu Hari',
                            name: 'is_halfday',
                            checked: true,
                            inputValue: '0'
                        },
                        {
                            xtype:'radio',
                            margin:'0 0 0 10px',
                            boxLabel: 'Setengah Hari',
                            name: 'is_halfday',
                            inputValue: '1'
                        }
                    ]
                },
                // added by Michael 2021.06.15  
                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'attachment',
                                            fieldLabel: 'Attachment',
                                            readOnly: true,
                                            width:300,
                                            margin: '10 0px',
                                        },
                                        {
                                            xtype: 'filefield',
                                            fieldLabel: '',
                                            itemId: 'file_name_upload',
                                            name: 'file_name_upload',
                                            buttonOnly: true,
                                            buttonText: 'Browse',
                                            width:50,
                                            margin: '10 0 0 10px',
                                        },
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'View File',
                                            itemId: 'view_file_intranet',
                                            action:'view_file_intranet',
                                            margin: '10 0 0 10px',
                                        },

                                        //added by michael 16/11/2021
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'View File',
                                            itemId: 'view_file_intranet_cuti',
                                            action:'view_file_intranet_cuti',
                                            margin: '10 0 0 10px',
                                        },
                                        //end added by michael 16/11/2021

                                        // {
                                        //     xtype:'button',
                                        //     fieldLabel:' ',
                                        //     text:'Remove File',
                                        //     itemId: 'remove_file',
                                        //     action:'remove_file',
                                        //     margin: '10 0 0 10px',
                                        // },
                                    ]
                },
                {
                    xtype:'label',
                    itemId:'labelFile',
                    text:'File allowed : .jpg, .jpeg, .png',
                    margin: '0 0 30 0px',
                },
                // end added by Michael 2021.06.15  
                {
                   xtype:'absentrecordjcgrid',
                   height:120
                },
                /*
                 {
                 xtype: 'checkbox',
                 boxLabel: '1/2 Hari',
                 name: 'is_halfday',
                 inputValue: '1',
                 flex: 1
                 },
                 */
                {
                    xtype: 'textareafield',
                    name: 'note',
                    width: '100%',
                    fieldLabel: 'Keterangan Cuti/Izin'
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
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'deletereason',
                        itemId: 'btnReason',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-delete',
                        text: 'Remove'
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
                    },
                    {
                      xtype:'tbfill'  
                    },
                    {
                        xtype: 'button',
                        action: 'detailreason',
                        itemId: 'btnDetailreason',
                        padding: 5,
                        width: 170,
                        iconCls: 'icon-new',
                        text: 'Click to view other reason'
                    },
                ]
            }
        ];
        return x;
    }
});