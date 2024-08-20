Ext.define('Hrd.view.uploadtransaction.FormProcess', {
    alias: 'widget.uploadtransactionformprocess',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.uploadtransaction.GridProcess','Hrd.view.uploadtransaction.GridProcessCutiBesar','Hrd.view.uploadtransaction.GridProcessMedicalClaim','Hrd.view.uploadtransaction.GridProcessOvertime','Hrd.view.uploadtransaction.GridProcessUangMakan','Hrd.view.uploadtransaction.GridProcessUnpaidLeave','Hrd.view.uploadtransaction.GridProcessSaldoCutiBayar','Hrd.view.uploadtransaction.GridProcessPotonganTransport','Hrd.view.uploadtransaction.GridProcessSaldoCutiMinus'],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    // height: 500,
    // layout: 'fit',
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype: 'tabpanel',
                    itemId: 'tabID',
                    width: '100%',
                    activeTab: 0, // index or id
                    items: [
                        
                        {
                            title: 'Attendance',
                            itemId: 'pAttendanceTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocessgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Overtime',
                            itemId: 'pOvertimeTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocessovertimegrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Uang Makan Lembur',
                            itemId: 'pUangMakanTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocessuangmakangrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Medical Claim',
                            itemId: 'pMedicalClaimTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocessmedicalclaimgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Unpaid Leave',
                            itemId: 'pUnpaidLeaveTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocessunpaidleavegrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Cuti Besar',
                            itemId: 'pCutiBesarTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocesscutibesargrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Saldo Cuti Dibayarkan',
                            itemId: 'pSaldoCutiBayarTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocesssaldocutibayargrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Potongan Transport',
                            itemId: 'pPotonganTransportTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocesspotongantransportgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Saldo Cuti Minus',
                            itemId: 'pSaldoCutiMinusTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadtransactionprocesssaldocutiminusgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        
                    ]
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
                    // {
                    //     xtype: 'button',
                    //     action: 'process_cherry',
                    //     padding: 5,
                    //     iconCls: 'icon-save',
                    //     text: 'Process to Cherry'
                    // },
                    // {
                    //     xtype: 'button',
                    //     action: 'download_log',
                    //     padding: 5,
                    //     iconCls: 'icon-save',
                    //     text: 'Download Log'
                    // },
                    {
                        xtype: 'button',
                        action: 'process_cherry',
                        disabled: true,
                        padding: 5,
                        iconCls: 'icon-save',
                        text: 'Process to Cherry'
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