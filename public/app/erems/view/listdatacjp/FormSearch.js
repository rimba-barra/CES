Ext.define('Erems.view.listdatacjp.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.listdatacjpformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_sertifikat_polis_no',
                    name: 'sertifikat_polis_no',
                    fieldLabel: 'Nomor Polis',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_spt_no',
                    name: 'spt_no',
                    fieldLabel: 'Nomor SPT',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_nama_nasabah',
                    name: 'nama_nasabah',
                    fieldLabel: 'Nama Customer / Nasabah',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal Lahir',
                    itemId: 'fd_tanggal_lahir' + me.uniquename,
                    id: 'tanggal_lahir' + me.uniquename,
                    name: 'tanggal_lahir',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    emptyText: 'Input Tanggal Lahir',
                    width: 150,
                    readOnly: false,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Mulai Pertanggungan',
                            defaultType: 'datefield',
                            bodyBorder: false,
                            defaults: {
                                flex: 3
                            },
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    itemId: 'fromdate' + me.uniquename,
                                    id: 'fromdate' + me.uniquename,
                                    name: 'fromdate',
                                    emptyText: 'From Date',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 150,
                                },
                                {
                                    xtype: 'label',
                                    forId: 'myFieldId',
                                    text: ' to',
                                    margin: '0 40 0 30'
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'untildate' + me.uniquename,
                                    id: 'untildate' + me.uniquename,
                                    name: 'untildate',
                                    emptyText: 'Until Date',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    enableKeyEvents: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    width: 150,
                                }

                            ]

                        },
                    ]

                },
                {
                    xtype: 'statusaplikasicombobox',
                    itemId: 'fs_status_aplikasi',
                    name: 'status_aplikasi',
                    fieldLabel: 'Status Aplikasi',
                },
                {
                    xtype: 'pricetypecombobox',
                    itemId: 'fs_pricetype',
                    name: 'pricetype',
                    fieldLabel: 'Status Pembayaran',
                },
                  
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
