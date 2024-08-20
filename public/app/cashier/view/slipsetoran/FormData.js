Ext.define('Cashier.view.slipsetoran.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.slipsetoranformdata',   
    height: 250,
    frame: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '50%'
            },
            items: [   
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'combobox',
                    name: 'nama_bank',
                    fieldLabel: 'Bank',
                    queryMode: 'local',
                    valueField: 'nama_bank',
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
                    displayField: 'description',
                    allowBlank: false,
                    store: new Ext.data.JsonStore({
                        fields: ['nama_bank', 'description'],
                        data: [
                            {nama_bank: 'BCA', description: 'BANK CENTRAL ASIA'},
                            {nama_bank: 'DBS', description: 'BANK DBS'},
                            {nama_bank: 'MANDIRI', description: 'BANK MANDIRI'},
                        ]
                    }),
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Penerima',
                    itemId: 'nama_customer',
                    id: 'nama_customer',
                    name: 'nama_customer',
                    emptyText: 'Nama Penerima',
                    width: 150,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Rekening Penerima',
                    itemId: 'norek_customer',
                    id: 'norek_customer',
                    name: 'norek_customer',
                    emptyText: 'No Rekening Penerima',
                    width: 100,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Alamat Penerima',
                    itemId: 'alamat_customer',
                    id: 'alamat_customer',
                    name: 'alamat_customer',
                    width: 300,
                    emptyText: '',
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    grow: true,
                }, 
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Penyetor',
                    itemId: 'nama_penyetor',
                    id: 'nama_penyetor',
                    name: 'nama_penyetor',
                    emptyText: 'Nama Penyetor',
                    width: 150,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Rekening Penyetor',
                    itemId: 'norek_penyetor',
                    id: 'norek_penyetor',
                    name: 'norek_penyetor',
                    emptyText: 'No Rekening Penyetor',
                    width: 100,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Alamat Penyetor',
                    itemId: 'alamat_penyetor',
                    id: 'alamat_penyetor',
                    name: 'alamat_penyetor',
                    width: 300,
                    emptyText: '',
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    grow: true,
                }, 
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 350px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-submit',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'reset',
                            itemId: 'btnReset',
                            iconCls: 'icon-reset',
                             padding: 5,
                            text: 'Reset',
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
